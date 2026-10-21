"""
Generate the messy DEMO inputs for "The 10-Minute Report Rebuild".

Everything here is invented: two fictional plants, made-up lines, costs and volumes.
Never replace these files with client or employer data (Master Profile v3 §4.3).

The files are messy on purpose, the way recurring plant reports usually are:
- two plants export with different headers, date formats and file types;
- plant B's export has a manual TOTAL row and one duplicated day;
- standard costs are typed as text with thousands separators and a currency suffix;
- one production line is missing from the cost-centre map.

Usage:  python generate_demo_data.py            (writes ./data)
"""
from __future__ import annotations

import csv
import random
from datetime import date, timedelta
from pathlib import Path

from openpyxl import Workbook

SEED = 20261021
DATA_DIR = Path(__file__).parent / "data"
START = date(2026, 7, 1)
END = date(2026, 9, 30)

PLANT_A_LINES = {"A-SMT1": (2400, 0.018), "A-SMT2": (2100, 0.022), "A-ASSY": (1800, 0.012)}
PLANT_B_LINES = {"B-SMT1": (2600, 0.016), "B-ASSY": (1700, 0.031), "B-PACK": (2900, 0.008)}

# تكلفة الوحدة المعيبة لكل خط — مكتوبة كنص زي ما بتيجي من الشيت اليدوي
STANDARD_COST = {
    "A-SMT1": "1,250.00 EGP",
    "A-SMT2": "1,180.50 EGP",
    "A-ASSY": "640.00 EGP",
    "B-SMT1": "1,310.00 EGP",
    "B-ASSY": "702.25 EGP",
    "B-PACK": "95.00 EGP",
}

# B-PACK ناقص عمدًا عشان خطوة المراجعة تمسكه
COST_CENTRES = [
    ("A-SMT1", "CC-1101", "Surface mount"),
    ("A-SMT2", "CC-1102", "Surface mount"),
    ("A-ASSY", "CC-1201", "Final assembly"),
    ("B-SMT1", "CC-2101", "Surface mount"),
    ("B-ASSY", "CC-2201", "Final assembly"),
]


def days():
    d = START
    while d <= END:
        if d.weekday() != 4:  # الجمعة إجازة في المصنعين
            yield d
        d += timedelta(days=1)


def daily(rng: random.Random, base: int, scrap_rate: float, day: date) -> tuple[int, int]:
    good = int(base * rng.uniform(0.85, 1.08))
    rate = scrap_rate * rng.uniform(0.6, 1.5)
    # موجة فاقد في أغسطس على خط واحد عشان التقرير يبيّن حاجة تستاهل
    if base == 1700 and day.month == 8 and 10 <= day.day <= 24:
        rate *= 2.4
    return good, max(0, round(good * rate))


def write_plant_a(rng: random.Random) -> None:
    path = DATA_DIR / "plant_A_daily_output.csv"
    with path.open("w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["Date", "Line", "Good Units", "Scrap Units"])
        for d in days():
            for line, (base, rate) in PLANT_A_LINES.items():
                good, scrap = daily(rng, base, rate, d)
                w.writerow([d.strftime("%d/%m/%Y"), line, f"{good:,}", scrap])


def write_plant_b(rng: random.Random) -> None:
    wb = Workbook()
    ws = wb.active
    ws.title = "export"
    ws.append(["prod_date", "line_code", "good_qty", "scrap_qty"])
    total_good = total_scrap = 0
    duplicated = False
    for d in days():
        for line, (base, rate) in PLANT_B_LINES.items():
            good, scrap = daily(rng, base, rate, d)
            ws.append([d, line.lower() if d.day % 9 == 0 else line, good, scrap])
            total_good += good
            total_scrap += scrap
            # يوم اتنسخ مرتين وقت اللصق
            if not duplicated and d == date(2026, 8, 17) and line == "B-ASSY":
                ws.append([d, line, good, scrap])
                duplicated = True
    ws.append(["TOTAL", None, total_good, total_scrap])
    wb.save(DATA_DIR / "plant_B_export.xlsx")


def write_costs() -> None:
    with (DATA_DIR / "standard_scrap_cost.csv").open("w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["line", "scrap cost per unit"])
        for line, cost in STANDARD_COST.items():
            w.writerow([line, cost])


def write_cost_centres() -> None:
    wb = Workbook()
    ws = wb.active
    ws.title = "map"
    ws.append(["Line", "Cost centre", "Department"])
    for row in COST_CENTRES:
        ws.append(list(row))
    wb.save(DATA_DIR / "cost_centre_map.xlsx")


def main() -> None:
    DATA_DIR.mkdir(exist_ok=True)
    rng = random.Random(SEED)
    write_plant_a(rng)
    write_plant_b(rng)
    write_costs()
    write_cost_centres()
    print(f"Demo inputs written to {DATA_DIR}")


if __name__ == "__main__":
    main()
