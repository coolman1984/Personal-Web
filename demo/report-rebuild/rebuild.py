"""
The 10-Minute Report Rebuild — rebuild a messy recurring plant report as a
checked Python + SQL pipeline, then hand a review packet to an AI reviewer
and a human approver.

DEMO DATA ONLY. Run `python generate_demo_data.py` first.

Steps (each one is timed and printed, so the audience sees the pipeline work):
  1. Ingest      read the four messy files as they arrive
  2. Clean       one schema: dates, line codes, numbers, costs; drop TOTAL rows and duplicates
  3. Reconcile   source control totals vs cleaned detail
  4. Load        write a SQLite database
  5. Report      one SQL query builds the monthly scrap report
  6. Check       output totals = input totals, every line costed and mapped, outliers flagged
  7. Review      write a review packet for the AI reviewer and the human approver

Usage:
  python rebuild.py                         # writes ./out
  python rebuild.py --site-json PATH        # also writes the summary the website shows
"""
from __future__ import annotations

import argparse
import json
import sqlite3
import time
from dataclasses import dataclass, field
from pathlib import Path

import pandas as pd

HERE = Path(__file__).parent
DATA_DIR = HERE / "data"
OUT_DIR = HERE / "out"

# الشهر يتعلّم عليه لو نسبة الفاقد أعلى من متوسط باقي شهور الخط بالنسبة دي
OUTLIER_FACTOR = 1.5


@dataclass
class Run:
    steps: list[dict] = field(default_factory=list)
    checks: list[dict] = field(default_factory=list)
    findings: list[str] = field(default_factory=list)
    _t: float = 0.0

    def start(self) -> None:
        self._t = time.perf_counter()

    def step(self, name: str, detail: str) -> None:
        ms = (time.perf_counter() - self._t) * 1000
        self.steps.append({"step": name, "detail": detail, "ms": round(ms, 1)})
        print(f"  {len(self.steps)}. {name:<10} {ms:7.1f} ms  {detail}")
        self._t = time.perf_counter()

    def check(self, name: str, ok: bool, detail: str) -> None:
        self.checks.append({"check": name, "passed": ok, "detail": detail})


def ingest() -> dict[str, pd.DataFrame]:
    return {
        "plant_a": pd.read_csv(DATA_DIR / "plant_A_daily_output.csv", dtype=str),
        "plant_b": pd.read_excel(DATA_DIR / "plant_B_export.xlsx", dtype=object),
        "costs": pd.read_csv(DATA_DIR / "standard_scrap_cost.csv", dtype=str),
        "centres": pd.read_excel(DATA_DIR / "cost_centre_map.xlsx", dtype=str),
    }


def to_int(series: pd.Series) -> pd.Series:
    return pd.to_numeric(series.astype(str).str.replace(",", "", regex=False).str.strip()).astype("int64")


def clean(raw: dict[str, pd.DataFrame], run: Run) -> dict[str, pd.DataFrame]:
    a = raw["plant_a"].rename(
        columns={"Date": "day", "Line": "line", "Good Units": "good", "Scrap Units": "scrap"}
    )
    a["day"] = pd.to_datetime(a["day"], format="%d/%m/%Y")
    a["plant"] = "Plant A"

    b = raw["plant_b"].rename(
        columns={"prod_date": "day", "line_code": "line", "good_qty": "good", "scrap_qty": "scrap"}
    )
    total_row = b[b["day"].astype(str).str.upper() == "TOTAL"]
    b = b.drop(total_row.index)
    b["day"] = pd.to_datetime(b["day"])
    b["plant"] = "Plant B"

    out = pd.concat([a, b], ignore_index=True)
    out["line"] = out["line"].astype(str).str.strip().str.upper()
    out["good"] = to_int(out["good"])
    out["scrap"] = to_int(out["scrap"])

    before = len(out)
    deduped = out.drop_duplicates(subset=["plant", "day", "line"], keep="first")
    dupes = before - len(deduped)

    costs = raw["costs"].rename(columns={"line": "line", "scrap cost per unit": "unit_cost"})
    costs["line"] = costs["line"].str.strip().str.upper()
    costs["unit_cost"] = pd.to_numeric(
        costs["unit_cost"].str.replace("EGP", "", regex=False).str.replace(",", "", regex=False).str.strip()
    )

    centres = raw["centres"].rename(
        columns={"Line": "line", "Cost centre": "cost_centre", "Department": "department"}
    )
    centres["line"] = centres["line"].str.strip().str.upper()

    run.findings.append(f"Removed {len(total_row)} manual TOTAL row and {dupes} duplicated day from the plant B export.")
    return {
        "output": deduped.reset_index(drop=True),
        "output_with_dupes": out,
        "plant_b_total": total_row,
        "costs": costs,
        "centres": centres,
        "dupes": pd.DataFrame({"n": [dupes]}),
    }


def reconcile(c: dict[str, pd.DataFrame], run: Run) -> None:
    # مقارنة سطر TOTAL اللي في ملف المصنع B بمجموع التفاصيل نفسها
    t = c["plant_b_total"].iloc[0]
    b_rows = c["output_with_dupes"][c["output_with_dupes"]["plant"] == "Plant B"]
    detail_good, detail_scrap = int(b_rows["good"].sum()), int(b_rows["scrap"].sum())
    diff_good, diff_scrap = detail_good - int(t["good"]), detail_scrap - int(t["scrap"])
    dupe_rows = b_rows[b_rows.duplicated(subset=["day", "line"], keep="first")]
    explained = diff_good == int(dupe_rows["good"].sum()) and diff_scrap == int(dupe_rows["scrap"].sum())
    run.check(
        "Plant B control total",
        explained,
        f"Detail exceeds the export's TOTAL row by {diff_good:,} good and {diff_scrap:,} scrap units; "
        + ("fully explained by the duplicated day." if explained else "NOT explained by duplicates."),
    )


def load(c: dict[str, pd.DataFrame], db_path: Path) -> sqlite3.Connection:
    if db_path.exists():
        db_path.unlink()
    con = sqlite3.connect(db_path)
    out = c["output"].copy()
    out["day"] = out["day"].dt.strftime("%Y-%m-%d")
    out[["plant", "day", "line", "good", "scrap"]].to_sql("daily_output", con, index=False)
    c["costs"].to_sql("scrap_cost", con, index=False)
    c["centres"].to_sql("cost_centre", con, index=False)
    return con


REPORT_SQL = """
SELECT
  o.plant,
  substr(o.day, 1, 7)                          AS month,
  o.line,
  COALESCE(cc.department, 'UNMAPPED')          AS department,
  COALESCE(cc.cost_centre, 'UNMAPPED')         AS cost_centre,
  SUM(o.good)                                  AS good_units,
  SUM(o.scrap)                                 AS scrap_units,
  ROUND(1.0 * SUM(o.scrap) / (SUM(o.good) + SUM(o.scrap)), 4) AS scrap_rate,
  ROUND(SUM(o.scrap) * c.unit_cost, 2)         AS scrap_cost
FROM daily_output o
LEFT JOIN scrap_cost  c  ON c.line  = o.line
LEFT JOIN cost_centre cc ON cc.line = o.line
GROUP BY o.plant, month, o.line
ORDER BY o.plant, o.line, month
"""


def build_report(con: sqlite3.Connection) -> pd.DataFrame:
    return pd.read_sql_query(REPORT_SQL, con)


def run_checks(report: pd.DataFrame, c: dict[str, pd.DataFrame], run: Run) -> pd.DataFrame:
    src = c["output"]
    run.check(
        "Output equals input",
        int(report["good_units"].sum()) == int(src["good"].sum())
        and int(report["scrap_units"].sum()) == int(src["scrap"].sum()),
        f"{int(src['good'].sum()):,} good and {int(src['scrap'].sum()):,} scrap units in both the cleaned input and the report.",
    )
    uncosted = sorted(report.loc[report["scrap_cost"].isna(), "line"].unique())
    run.check("Every line has a scrap cost", not uncosted, "All lines costed." if not uncosted else f"Missing: {', '.join(uncosted)}")

    unmapped = sorted(report.loc[report["cost_centre"] == "UNMAPPED", "line"].unique())
    run.check(
        "Every line has a cost centre",
        not unmapped,
        "All lines mapped." if not unmapped else f"{', '.join(unmapped)} is missing from the cost-centre map.",
    )
    for line in unmapped:
        run.findings.append(f"{line} has no cost centre. Its scrap cost is reported but cannot be charged to a department.")

    # كل شهر بيتقارن بمتوسط باقي شهور نفس الخط، عشان الشهر الشاذ ميرفعش المتوسط بتاعه
    sums = report.groupby("line")["scrap_rate"].transform("sum")
    counts = report.groupby("line")["scrap_rate"].transform("count")
    others_avg = (sums - report["scrap_rate"]) / (counts - 1)
    flagged = report[report["scrap_rate"] > others_avg * OUTLIER_FACTOR].copy()
    for _, r in flagged.iterrows():
        run.findings.append(
            f"{r['line']} in {r['month']}: scrap rate {r['scrap_rate']:.1%}, more than {OUTLIER_FACTOR}x the line's other months."
        )
    run.check("Scrap-rate outliers", True, f"{len(flagged)} line-month(s) flagged for review.")
    return flagged


def write_outputs(report: pd.DataFrame, flagged: pd.DataFrame, run: Run) -> None:
    with pd.ExcelWriter(OUT_DIR / "monthly_scrap_report.xlsx") as xw:
        report.to_excel(xw, sheet_name="report", index=False)
        pd.DataFrame(run.checks).to_excel(xw, sheet_name="checks", index=False)

    lines = [
        "# Review packet: monthly scrap report (DEMO DATA)",
        "",
        "Prepared by the pipeline for an AI reviewer and a human approver.",
        "The AI reviewer explains the findings and drafts questions; the human approves before anything is sent.",
        "",
        "## Checks",
        *[f"- [{'x' if c['passed'] else ' '}] {c['check']}: {c['detail']}" for c in run.checks],
        "",
        "## Findings to review",
        *[f"- {f}" for f in run.findings],
        "",
        "## Ask the reviewer",
        "1. Which finding matters most for the plant manager, and why?",
        "2. What would you ask the line owner before this report goes out?",
        "3. Is anything in the report inconsistent with the checks above?",
    ]
    (OUT_DIR / "review_packet.md").write_text("\n".join(lines) + "\n", encoding="utf-8")


def summary(report: pd.DataFrame, flagged: pd.DataFrame, run: Run, raw_rows: int) -> dict:
    by_month = (
        report.groupby("month")[["good_units", "scrap_units", "scrap_cost"]].sum().reset_index().to_dict("records")
    )
    return {
        "dataLabel": "Demo data: two fictional plants, July to September 2026",
        "inputs": {"files": 4, "rows": raw_rows},
        "pipelineMs": round(sum(s["ms"] for s in run.steps), 0),
        "steps": run.steps,
        "checks": run.checks,
        "findings": run.findings,
        "byMonth": [
            {
                "month": r["month"],
                "goodUnits": int(r["good_units"]),
                "scrapUnits": int(r["scrap_units"]),
                "scrapCost": round(float(r["scrap_cost"]), 2),
            }
            for r in by_month
        ],
        "flagged": [
            {"line": r["line"], "month": r["month"], "scrapRate": float(r["scrap_rate"])}
            for _, r in flagged.iterrows()
        ],
    }


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__.split("\n")[1])
    parser.add_argument("--site-json", type=Path, help="also write the website summary here")
    args = parser.parse_args()

    OUT_DIR.mkdir(exist_ok=True)
    run = Run()
    print("The 10-Minute Report Rebuild (demo data)")
    run.start()

    raw = ingest()
    raw_rows = sum(len(df) for df in raw.values())
    run.step("Ingest", f"4 files, {raw_rows:,} rows, 4 different layouts")

    c = clean(raw, run)
    run.step("Clean", f"{len(c['output']):,} daily rows on one schema; {int(c['dupes']['n'][0])} duplicate and 1 TOTAL row removed")

    reconcile(c, run)
    run.step("Reconcile", run.checks[-1]["detail"])

    con = load(c, OUT_DIR / "report.sqlite")
    run.step("Load", "SQLite database with 3 tables")

    report = build_report(con)
    con.close()
    run.step("Report", f"{len(report)} line-month rows from one SQL query")

    flagged = run_checks(report, c, run)
    passed = sum(1 for ch in run.checks if ch["passed"])
    run.step("Check", f"{passed} of {len(run.checks)} checks passed, {len(run.findings)} findings")

    write_outputs(report, flagged, run)
    run.step("Review", "review packet and Excel report written")

    total = sum(s["ms"] for s in run.steps)
    print(f"Done in {total / 1000:.2f} s. Outputs in {OUT_DIR}")

    data = summary(report, flagged, run, raw_rows)
    (OUT_DIR / "summary.json").write_text(json.dumps(data, indent=2), encoding="utf-8")
    if args.site_json:
        args.site_json.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")
        print(f"Website summary written to {args.site_json}")


if __name__ == "__main__":
    main()
