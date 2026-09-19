# Data Definitions and Analysis

## Source

Synthetic, deterministic fixture created for this portfolio. No employer or customer data. Account IDs have no connection to real people. All observations represent completed seven-day windows.

| Field | Meaning |
| --- | --- |
| account_id | Unique fictional account |
| segment | self_serve or assisted; illustrative cohort label |
| signed_up | 1 for all included accounts |
| connected | 1 if a connector succeeded within seven days |
| first_workflow | 1 if a first workflow was created after connection within seven days |
| activated_7d | 1 if three successful runs occurred within seven days |

Flags are cumulative. The reproducibility script checks uniqueness, binary values, valid segments, and stage nesting.

## Calculation

Sum each stage by segment. Divide activated_7d by signed_up for overall activation. Divide successive stages for conditional conversion. Never use the last stage as the denominator for an earlier stage.

Overall conditional conversions:
- Connection: 30/40 = 75.0%.
- First workflow among connected: 23/30 = 76.7%.
- Activation among first-workflow accounts: 16/23 = 69.6%.

## Limitations

The equal cohort sizes are deliberately chosen. There are no event timestamps, traffic sources, revenue fields, or causal assignments. No time-to-activation or revenue conclusion can be derived. Missing events, duplicate identities, and incomplete windows would require separate checks in a real dataset.
