# The 10-Minute Report Rebuild

The signature live demo from Master Profile v3 §4.3. A messy recurring plant report gets rebuilt, live, into a checked Python + SQL pipeline. That pipeline hands a review packet to an AI reviewer and a human approver, and the demo ends with a before/after comparison.

> **Demo data only.** The two plants, their lines, volumes and costs are invented. Never swap in client or employer files.

## Run it

```bash
cd demo/report-rebuild
python -m pip install -r requirements.txt   # pandas, openpyxl
python generate_demo_data.py                # writes ./data (already committed)
python rebuild.py                           # writes ./out
python -m unittest test_rebuild.py          # 4 checks on the committed inputs
```

To refresh the numbers shown on the website's `/demo` page:

```bash
python rebuild.py --site-json ../../src/content/report-rebuild-results.json
```

## What is messy on purpose

| File | Problem planted in it |
|---|---|
| `plant_A_daily_output.csv` | `dd/mm/yyyy` dates, thousands separators inside numbers |
| `plant_B_export.xlsx` | Different headers, real Excel dates, some lower-case line codes, one day pasted twice, a manual `TOTAL` row |
| `standard_scrap_cost.csv` | Costs typed as text: `"1,250.00 EGP"` |
| `cost_centre_map.xlsx` | Line `B-PACK` missing, so its scrap cannot be charged to a department |

There is also a real signal in the data: scrap on `B-ASSY` jumps in August. The pipeline should flag it.

## What the pipeline does

1. **Ingest:** reads the four files as they arrive.
2. **Clean:** puts everything on one schema, removes the `TOTAL` row and the duplicated day.
3. **Reconcile:** compares plant B's `TOTAL` row with its detail rows. The gap equals the duplicated day, so it is explained.
4. **Load:** writes a SQLite database with three tables.
5. **Report:** one SQL query builds the monthly scrap report by plant, line and cost centre.
6. **Check:** confirms output totals equal input totals and that every line is costed and mapped, then flags outlier months.
7. **Review:** writes `out/review_packet.md` for the AI reviewer and `out/monthly_scrap_report.xlsx` for the approver.

## Run-of-show (10 minutes)

| Minute | What happens |
|---|---|
| 0–2 | Open the four files and show the mess: different headers, text numbers, a `TOTAL` row, the missing line. Ask the room how long this takes them every month. Write their answer down: that is the baseline. |
| 2–5 | Run `python rebuild.py` and talk through each step as it prints. |
| 5–7 | Open the Excel report and the checks sheet. Show that output equals input and where the duplicate went. |
| 7–9 | Paste `review_packet.md` into an AI assistant. Ask it the three questions at the bottom. A person approves before anything is sent. |
| 9–10 | Before/after: the room's baseline against the pipeline's run time, plus the time to review the packet. Say what the demo does not prove (below). |

## Guardrails (Master Profile v3 §4.3)

- Demo data only, every time.
- Keep a recorded backup of the run in case the live demo fails. 👈 Record it, and the same recording becomes the 2-minute video for the home page and LinkedIn.
- Never promise full transformation from one session. The demo shows one report on clean demo inputs. Real data needs a scan, access rules, a baseline measured on site, and a pilot.
