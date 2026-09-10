---
name: workforce-orchestrate
description: "Orchestrate implementation, refactoring, and automation through complete owned blocks, independent review, and stage acceptance. User-facing session only; select Standard or Enhanced before execution."
---

# Workforce: deliver the requested result

Use one plan and the task's existing state. Do not create a second workflow engine,
parallel journal, or reporting system. User restrictions, including no GSD, take
precedence over workflow defaults.

## Choose the profile first

Read [dispatch](references/dispatch.md). Before substantive execution or delegation,
ask once in the user's language: **Standard or Enhanced?** Explain both hybrid
profiles, including model/effort and responsibilities. Wait for the answer.
An explicit profile already supplied by the user satisfies this gate. Preserve it
in the existing plan/context across follow-ups and compaction; children inherit it.
Unattended tasks need a profile in their task instructions or remain PROFILE_REQUIRED.

For analysis-only requests, deliver analysis and stop before implementation.
A request to consider improvements is not permission to edit. Direct questions and
status reports do not require profile selection. Small authorized changes can run
inline after profile selection without inventing stages or spawning workers.

## Preserve the deliverable

Read applicable instructions, relevant entry points, and existing dirty changes.
Define the requested result, concrete acceptance examples, ownership, dependencies,
and necessary checks with cwd. Preserve the user's branch and excluded directories.
Find actual package checks, including relevant harnesses outside the default glob.

Each block states REQUEST_KIND (analysis or implementation), USER_OUTCOME,
ACCEPTANCE_EXAMPLE, and NOT_DONE_IF. These belong in the assignment or existing plan,
not mandatory new files. A worker cannot replace implementation with an inventory,
or treat an intermediate prerequisite as completion. If its scope cannot reach the
outcome, fix ownership/dependencies rather than silently shrinking that outcome.

Plan complete paths: source -> produced artifact -> real consumer -> execution ->
removal of the replaced path where applicable. For migrations, retain required
historical compatibility and neighboring consumers. Counts and typecheck alone
do not prove the requested behavior. Baseline failures remain separate from new bugs.

## Delegate coherent work

Use [dispatch](references/dispatch.md) and the actual [tool schema](references/tools.md).
Assign substantial independent blocks with disjoint WRITE_SETs, not tasks per file.
Give shared contracts and lockfiles one owner. Launch independent work before waiting;
do not fill slots without useful work. Children do not spawn more children.

Astra owns requirements, open decisions, integration, dependencies, and acceptance.
GPT-5.5 owns the bulk of implementation in **both** profiles. Astra need not write
product code to stay busy; small integration edits are allowed after resolving file
ownership. In Enhanced, Astra may own a bounded unresolved design/algorithm block.
Once that contract is stable, pass ordinary implementation to GPT-5.5.

Reuse workers for related corrections. Do not repeat their investigation; inspect
exact evidence needed for a decision or verification. Workers self-review conventions,
documentation, compatibility, and completeness. No permanent paired auditors and
no independent review after each small edit.

If attempts repeat without new evidence or a changed result, stop that loop. Identify
whether the cause is the assignment, missing contract, environment, or unresolved
reasoning. Correct that cause and revise the same owner's assignment. Escalate a
bounded reasoning problem under dispatch; do not relaunch the whole project blindly.

## Integrate the real change

READY_FOR_INTEGRATION requires a complete block, self-review, relevant checks, and
stable contracts. Inspect the actual diff, including new files and real consumers;
an author's report is not a substitute. For each claimed replacement, be able to
identify the old declaration/path, actual replacement contents, switched consumers,
and justified remaining compatibility. No fictional fields or empty generated shells
count as implemented replacements.

Start dependent work when its inputs are ready. Bundle findings back to the owner;
the reviewer does not fix them. If a shared contract changes, pause affected work,
confirm the pause, and update dependent assignments and invalidated evidence.

## Review once the block is ready

Use an independent GPT-5.5 xhigh reviewer for a completed substantial block. Before
closing a major stage, use a separate Astra high stage review. Do not call each edit
a stage. Freeze the reviewed scope and identify its revision plus dirty diff.

Block review checks bugs, regressions, conventions, docs, and consumer integration.
Stage review checks the original outcome, cross-boundary behavior, removed old paths,
compatibility, and mandatory affected-package gates. Honor project-specific acceptance
requirements; incorporate them into stage review when allowed rather than duplicating
the same audit. Do not silently skip a genuinely separate required gate.

Run full required gates on the stable stage result. After corrections, repeat checks
and review for the affected delta and its impact, not the entire repository without
reason. Tests must reach the claimed consumer; isolated mocks prove only that scope.
Do not blame the environment without evidence. Failed, blocked, and not-run are not PASS.

## Report honestly

Distinguish submitted -> block reviewed -> stage accepted -> merge ready. Every major
stage criterion must be met before acceptance. Report achieved behavior, verification,
review findings, and remaining scope. Progress is accepted outcomes, not tool calls or
files touched. Label estimates. Do not finish with unhandled running children.
Commit, push, merge, deployment, and messages to third parties require authorization
from the user; the skill does not grant it. Avoid duplicated logs and report files.
