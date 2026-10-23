"""Checks that the demo pipeline still tells the story it is built to tell.

Run:  python -m unittest test_rebuild.py
"""
import json
import subprocess
import sys
import unittest
from pathlib import Path

HERE = Path(__file__).parent


class RebuildTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        # بيشتغل على ملفات data/ المتسجّلة زي ما هي، من غير ما يعيد توليدها فيتغيّر الـxlsx
        subprocess.run([sys.executable, "rebuild.py"], cwd=HERE, check=True, capture_output=True)
        cls.summary = json.loads((HERE / "out" / "summary.json").read_text(encoding="utf-8"))

    def checks(self):
        return {c["check"]: c["passed"] for c in self.summary["checks"]}

    def test_all_seven_steps_run(self):
        self.assertEqual([s["step"] for s in self.summary["steps"]],
                         ["Ingest", "Clean", "Reconcile", "Load", "Report", "Check", "Review"])

    def test_output_reconciles_to_input(self):
        self.assertTrue(self.checks()["Output equals input"])
        self.assertTrue(self.checks()["Plant B control total"])

    def test_planted_problems_are_caught(self):
        # الملفات فيها مشكلتين متعمدين: خط من غير مركز تكلفة، وموجة فاقد في أغسطس
        self.assertFalse(self.checks()["Every line has a cost centre"])
        self.assertIn({"line": "B-ASSY", "month": "2026-08"},
                      [{"line": f["line"], "month": f["month"]} for f in self.summary["flagged"]])

    def test_three_months_reported(self):
        self.assertEqual([m["month"] for m in self.summary["byMonth"]], ["2026-07", "2026-08", "2026-09"])


if __name__ == "__main__":
    unittest.main()
