# Workflow Adoption: Find the Activation Bottleneck

**Status:** Completed synthetic-data case study. **Demonstrates:** Funnel analysis, segmentation, instrumentation, and experiment design.

## Recommendation

Test a guided connector-setup checklist for self-serve accounts before redesigning the entire onboarding experience. In this constructed dataset, signup-to-connection loses the most accounts: ten of forty.

## Scenario and definition

A fictional workflow platform asks new accounts to connect a system, build a first workflow, and complete three successful workflow runs within seven days. The third successful run defines activation; creating a workflow alone does not.

The dataset contains 40 fictional accounts with a complete seven-day observation window. Twenty use self-serve onboarding and twenty receive assistance. The stages are nested, and every account appears once. The data was designed to illustrate a bottleneck, not sampled from a real population.

## Findings

| Segment | Signup | Connected | First workflow | Activated | Signup-to-activation |
| --- | --- | --- | --- | --- | --- |
| Self-serve | 20 | 12 | 8 | 4 | 20% |
| Assisted | 20 | 18 | 15 | 12 | 60% |
| Total | 40 | 30 | 23 | 16 | 40% |

Overall stage losses are 10, 7, and 7 accounts. Self-serve loses eight accounts at connection versus two in assisted onboarding.

Assisted onboarding has a 40-percentage-point higher activation rate. This is a descriptive difference—not evidence that assistance caused the difference. Account complexity, intent, and eligibility could differ.

## Opportunity sizing

As a scenario only, recovering four of the eight self-serve connection failures and retaining the observed downstream activation rate of 4/12 would imply roughly 1.3 additional activated accounts per 20 self-serve signups. This is not a forecast; the rate may change for recovered accounts.

## Artifacts

- [40 account records](data/accounts.json)
- [Data definitions and reproducibility](DATA.md)
- [Tracking plan and experiment brief](EXPERIMENT.md)
- [Analysis script](reproduce.py)

## Product decision

Prioritize a focused connector-setup experiment. Preserve workflow success as the outcome; improving connection alone is insufficient if users still cannot execute useful work. The case study is complete; the proposed experiment has not been run.

## Run locally

Requires Python 3. No additional packages or API keys are needed.

```bash
git clone https://github.com/bsaikrishnapm-source/workflow-adoption.git
cd workflow-adoption
python3 reproduce.py
```

[View the full product management portfolio](https://github.com/bsaikrishnapm-source/bsaikrishnapm-source)
