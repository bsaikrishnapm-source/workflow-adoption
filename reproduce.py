"""Reproduce the portfolio's synthetic analyses. Python 3 standard library only."""
import json
import math
from pathlib import Path

ROOT = Path(__file__).resolve().parent

def read(path):
    return json.loads((ROOT / path).read_text())

def adoption():
    rows = read("data/accounts.json")
    fields = ("signed_up", "connected", "first_workflow", "activated_7d")
    assert len({r["account_id"] for r in rows}) == len(rows)
    for r in rows:
        values = [r[k] for k in fields]
        assert r["segment"] in ("self_serve", "assisted")
        assert all(v in (0, 1) for v in values)
        assert values == sorted(values, reverse=True)
    print("\nWORKFLOW ADOPTION — synthetic accounts")
    for segment in ("self_serve", "assisted", "all"):
        subset = rows if segment == "all" else [r for r in rows if r["segment"] == segment]
        counts = [sum(r[k] for r in subset) for k in fields]
        print(f"{segment}: stages={counts}, activation={counts[-1]/counts[0]:.1%}")
    assert [sum(r[k] for r in rows) for k in fields] == [40, 30, 23, 16]
    p1, p2, z_alpha, z_power = .20, .30, 1.96, .84
    pbar = (p1 + p2) / 2
    n = ((z_alpha * math.sqrt(2*pbar*(1-pbar)) +
          z_power * math.sqrt(p1*(1-p1)+p2*(1-p2)))**2 / (p2-p1)**2)
    print(f"Illustrative sample size per arm: {math.ceil(n)}; planning target=300")


if __name__ == "__main__":
    adoption()
