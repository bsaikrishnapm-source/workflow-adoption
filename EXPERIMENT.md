# Guided Connection Experiment

## Hypothesis

For self-serve administrators, a prerequisite checklist and actionable connector errors increase seven-day activation by helping accounts reach their first working integration.

## Treatment

Before connecting, show required administrator permissions, the supported system type, and a three-step checklist. On permission failure, explain the missing permission and provide Retry and Contact administrator actions. Preserve entered non-secret configuration. Never display or log credentials.

Control: existing connection flow. Randomize eligible accounts 1:1 at signup and persist the assignment. Exclude accounts already receiving assisted onboarding and internal test accounts. Analyze by assigned group, including users who never open setup.

## Measurement

Primary: proportion of eligible accounts completing three successful workflow runs within seven days of signup.
Secondary: successful connection within seven days; first-workflow creation.
Guardrails: support contacts per account, repeated connector failures per attempted account, and security incidents.

| Event | Trigger | Required properties |
| --- | --- | --- |
| account_created | Persisted account created | account_id, event_id, occurred_at, experiment_variant |
| connector_attempted | Authorized request submitted | account_id, connector_type, attempt_id, event_id |
| connector_succeeded | Server confirms working connection | account_id, attempt_id, event_id, occurred_at |
| connector_failed | Server rejects or times out | account_id, attempt_id, error_category, event_id |
| workflow_created | First persisted workflow | account_id, workflow_id, event_id, occurred_at |
| workflow_run_succeeded | Server confirms completed run | account_id, workflow_id, run_id, event_id, occurred_at |

Deduplicate event_id; count distinct successful run_id; use UTC event times and account-created time to define the window. Monitor client/server disagreement. Analyze only fully matured seven-day windows.

## Sample planning

Illustrative baseline: 20%; minimum effect of interest: 10 percentage points; two-sided alpha 0.05 and power 80%. A standard two-proportion normal approximation gives about 293 accounts per arm. Round up to 300 per arm for planning; this rounding is not an allowance for material attrition. Re-estimate from actual historical traffic and baseline before launch. The 40 synthetic accounts are not enough to run this experiment.

## Decision rule

Pre-register a fixed 600-account target and wait for all seven-day windows to mature. Recommend rollout only if the treatment effect is positive with a 95% interval excluding zero, the point estimate meets the 10-point business target, support contacts do not rise by more than 0.05 per account, and no treatment-linked security incident occurs. Otherwise hold or revise. Do not stop early because a dashboard looks favorable.

## Risks and ownership

Product owns the decision; analytics owns assignment and metric checks; engineering owns connector instrumentation; support owns error-language review. Potential confounders include connector type and company size; balance and inspect them without retroactively replacing the primary metric.
