# Activation Analytics — product walkthrough

## Implemented user value

Event-level seven-day activation, exact duplicate removal, conflicting-ID exclusion, chronology normalization, observation-window exclusions, segmented funnels and explicit validation notes.

## Five-minute review

Use clean events; select self-serve; inject a duplicate; reverse input order; remove a signup; add a conflicting ID; change cutoff to January 5.

Choose **Save comparison snapshot** to retain up to five result snapshots in the current tab. **Download evidence JSON** exports the current result and captured snapshots. Refreshing clears all session state. Exports describe synthetic data and local actions only.

## Architecture

| File | Responsibility |
| --- | --- |
| demo/index.html | Page structure, local script references and evidence boundary |
| demo/style.css | Responsive workspace, focus styles and readable tables |
| demo/data.js | Bundled synthetic fixture data; no network requests |
| demo/engine.js | Pure decision functions and in-memory workflow state |
| demo/app.js | Labeled controls, local actions, result rendering and downloads |
| test_demo.cjs | Node built-in behavioral tests against the decision engine |

The UI inserts scenario text through textContent. CSV exports, where present, quote fields and neutralize formula-like leading characters. No external libraries, trackers, authentication credentials or model endpoints are used.

## Product scope and trade-offs

Events were generated from 40 synthetic account summaries. They are not behavioral telemetry. Same-time events retain input order; the supplied fixtures use distinct times. Event IDs, not payload similarity, define duplicates. No causal impact, retention forecast or completed A/B test is claimed.

## Review criteria

A reviewer should be able to explain the decision, change an assumption, inspect a failure path and export the evidence. A successful prototype test demonstrates only the declared fixture behavior; it does not establish production readiness.

## Run verification

Requires Node.js 18 or newer for the built-in test runner (the demo itself requires only a browser).

```bash
node --test test_demo.cjs
```

Expected: 8 passing decision tests. The existing Python entry point remains available in the main README.

## Accessibility design

Controls use visible labels, keyboard focus outlines and native buttons/selects. Error text uses an alert region; metric updates and snapshot counts use polite live regions. A skip link targets scenario controls. Tables scroll inside the result panel on narrow displays. Browser rendering and assistive-technology testing have not been completed in this environment.

## Data and retention

Use synthetic records only. Demo decisions and logs live in memory, with no localStorage or remote persistence. Downloading evidence explicitly writes a file through the user's browser. Clearing a buffer or refreshing does not delete a previously downloaded export.

## Event contract and experiment proposal

Required event fields: event_id, account_id, event, timestamp. Signup also supplies segment (self_serve or assisted). Exactly one signup per account is required. Valid events are signup, connected, workflow_created and run_success. Observation closes after seven full days. Three distinct successful-run events after a valid connection and workflow creation constitute activation. Identical duplicate IDs are ignored; conflicting IDs exclude both implicated accounts. Input order is normalized by timestamp; events outside the account window are ignored and reported. Missing prerequisites never advance the funnel.

A future connector-checklist experiment would randomize eligible self-serve accounts 50/50 at signup, retain assignment through the seven-day window, and analyze intent-to-treat seven-day activation. Guardrails: workflow failure rate, support-contact rate and time spent in setup. Fix sample size and stopping rules before enrollment; do not repeatedly peek for significance. No experiment was run. The original experiment brief remains a planning artifact.
