# Workflow Adoption: Find the Activation Bottleneck

## Start here

**Problem:** Find where new users stop during onboarding and choose a focused improvement.

**What is built:** An independent Python prototype or analysis, with product documents and synthetic data.

**Code to run:** `python3 reproduce.py`

**What you will see:** Prints the funnel for self-serve and assisted accounts, activation rates, and illustrative experiment sample size.

**Scope:** Runs locally in a terminal. No live customer integration, deployed application, or real AI model call is included.


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

[Full PM portfolio](https://github.com/bsaikrishnapm-source/bsaikrishnapm-source) · [Portfolio roadmap](https://github.com/bsaikrishnapm-source/bsaikrishnapm-source/blob/main/ROADMAP.md) · [Project backlog](https://github.com/bsaikrishnapm-source/workflow-adoption/issues) · [Planning board](https://github.com/users/bsaikrishnapm-source/projects/1)

## Inspect the data in Excel

```bash
python3 export_data.py --output exports
```

Creates CSV tables from the bundled synthetic data. The terminal output identifies each table and its row count. For a different JSON file, add `--input path/to/data.json`. Existing table CSV files in the output directory are replaced. These exports contain scenario inputs, not production results.
