# Profiles and assignments

Current release routing is recorded in `{{CODEX_HOME}}/codex-workforce/profiles.json`.
This document explains that policy. A future model upgrade changes the versioned
policy and guidance together; it does not rename roles or alter the workflow.

Both profiles use **GPT-6 Astra and GPT-5.5**. Enhanced extends Standard; it never
replaces all workers with Astra. Select by uncertainty in the solution, not duration
or code volume. A sophisticated but fully specified algorithm can stay with GPT-5.5.

| Responsibility | Standard | Enhanced |
| --- | --- | --- |
| User-facing orchestrator | `gpt-6-astra`, `low` | `gpt-6-astra`, `high` |
| Bounded research (`workforce_probe`) | `gpt-5.5`, `medium` | `gpt-5.5`, `medium` |
| Main implementation (`workforce_worker`) | `gpt-5.5`, `high` | `gpt-5.5`, `high` |
| Unresolved design/algorithm | Targeted Astra assistance when needed | Bounded Astra `high` block |
| Completed block (`workforce_reviewer`, `MODE=block`) | `gpt-5.5`, `xhigh` | `gpt-5.5`, `xhigh` |
| Major stage (`workforce_reviewer`, `MODE=stage`) | `gpt-6-astra`, `high` | `gpt-6-astra`, `high` |

## Ask once, wait, inherit

Only the user-facing orchestrator asks before execution. Use an available question
tool or ask in plain text when none exists. Explain in the user's language:

**Standard:** Astra low manages the task; GPT-5.5 medium investigates, GPT-5.5 high
implements, GPT-5.5 xhigh reviews complete blocks, and Astra high accepts major stages.
Suitable when requirements and the solution are sufficiently described.

**Enhanced:** The same GPT-5.5 workers and reviewers remain. Astra high orchestrates
and takes bounded uncertain architectural/algorithmic work. Stronger Astra reasoning
can be used when justified. Suitable when the solution itself still has to be found.

Then ask: **Which profile should I use: Standard or Enhanced?**
In Russian: **Как выполнять работу: стандартным или усиленным профилем?**

Do not silently choose the preselected option or treat a timeout as an answer. Before
the answer, only non-dependent read-only orientation is allowed. An explicit profile
in the request or a still-active choice for this task satisfies the gate. Preserve it
in the existing task state; do not ask on every turn, block, correction, or resumption.
Children inherit PROFILE; a missing value is a question to the parent, not the user.
For unattended tasks with no prior choice, report PROFILE_REQUIRED and leave execution
pending. An explicit user preference changes the profile; do not change it silently.

## Actual routing and escalation

The role TOMLs intentionally omit model and effort: those fields would override
spawn choices. Pass explicit model/effort through the runtime, using an empty fork
and a short complete assignment. Inspect available models and tool schemas first.
Do not infer actual model identity from an agent's self-description.

A prompt cannot change the running orchestrator's model or effort. If runtime
controls allow changing it, use the authorized setting and verify it. Otherwise
explain the mismatch and the required app/CLI setting; wait for that setting or an
explicitly accepted deviation before claiming execution under the chosen profile.
Do not create an extra orchestrator or new user task to conceal a mismatch.
If availability cannot be verified, say so; never claim verified routing.

Use Astra high for a bounded unresolved decision, not routine searching or mechanical
edits. For prolonged uncertainty where better reasoning can reduce retries, xhigh/max
may be appropriate: state the unresolved question and expected benefit first. No
automatic max based on elapsed time, task size, or any single failure. In Standard,
targeted Astra high assistance preserves the profile; broad escalation to Enhanced
requires the user's choice. Respect explicit user effort/budget limits in both modes.
Stage-review effort increases only when the acceptance problem itself warrants it.

Compare available total usage, attempts, rework, and accepted outcomes. If telemetry
is missing, report it as unavailable. Do not promise subscription savings or treat
benchmark results as a guaranteed price reduction for every coding task.

## Self-contained work packet

```text
TASK: identifier and assignment version
PROFILE: standard | enhanced (user-selected, inherited)
REQUEST_KIND: analysis | implementation
ROOT / BRANCH: absolute checkout and agreed branch
USER_OUTCOME: result requested by the user
GOAL: complete result owned by this block
ACCEPTANCE_EXAMPLE: concrete before/after scenario
NOT_DONE_IF: intermediate results that do not satisfy GOAL
INPUTS: exact sources, contracts, revision and relevant dirty diff
WRITE_SET: owned files/modules, or none for read-only work
DO_NOT_TOUCH: exclusions and others' ownership
DEPENDENCIES: ready inputs and handoff conditions
CHECKS: relevant commands with cwd and required behavior
RETURN: concise result, evidence, gaps
MODE: block | stage (reviewer only)
REVIEW_INSTRUCTIONS: exact applicable sources, or not_applicable
```

Include: read the assigned skill and applicable project instructions; preserve others'
changes; no children, branch switching, or push. A commit needs an explicit assignment.
An analysis assignment must not mutate source files. Expand inadequate ownership
through the parent rather than quietly abandoning the user outcome.

Shared checkout edits already exist on disk; a new child is not a new worktree.
Use worktrees only for concrete conflicts. Bundle follow-up findings to the same owner.
