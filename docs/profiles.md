# Profiles, models, and task ownership

The product name and role names are independent of model generations. The current
release combines GPT-6 Astra and GPT-5.5. Future releases can update model policy
without changing the install command or renaming your agents.

[`payload/profiles.json`](../payload/profiles.json) is the machine-readable routing
policy. [`dispatch.md`](../payload/skills/workforce-orchestrate/references/dispatch.md)
explains its use and the user-facing selection gate. Both ship with the release.
This is configuration and agent guidance, not a scheduler that intercepts tool calls.

## Standard

Use when the requirements and solution are sufficiently described. Astra low owns
orchestration, GPT-5.5 medium owns bounded investigation, GPT-5.5 high implements,
GPT-5.5 xhigh independently reviews complete blocks, and Astra high accepts major
stages. A bounded open decision can still receive Astra high assistance.

## Enhanced

The same workers, block reviewers, and acceptance flow remain. Astra high orchestrates
and owns bounded uncertain design or algorithm work. Once a contract is clear, ordinary
implementation and consumer migration return to GPT-5.5. Use xhigh/max only with a
stated unresolved question and expected benefit, respecting the user's limits.

The distinction is solution uncertainty. Many lines of code, a long runtime, or a
sophisticated algorithm do not automatically require Enhanced.

## Selection contract

The user-facing agent asks before substantive execution and delegation, explains
both profiles, and waits for an explicit answer. A profile explicitly supplied in
the task or by a native launch shortcut counts as the choice. Children inherit it.
Follow-ups and resumed work retain it; a new task without a choice gets a new question.

Read-only orientation that does not depend on the answer may continue while waiting.
Implementation may not. Unattended work needs an explicit preset in its prompt or
launch configuration; otherwise it returns PROFILE_REQUIRED. Analysis-only requests
do not become implementation and do not need a profile question merely to answer.

The installer does not select a permanent default. Examples:

```text
Use Standard. Implement the described adapter and switch its consumers.
Use Enhanced. Resolve the ambiguous contract, then complete the migration.
Analyze these options only. Do not edit files.
```

## Actual model settings

Current Codex CLI supports named config layers. The kit installs two optional layers:

```sh
codex -p workforce-standard
codex -p workforce-enhanced
```

Launching one is an explicit profile choice. It sets the root model/effort for that
launch and tells the agent which policy to follow. It does not modify base settings.
If a client lacks these config layers, set the root model and effort through that
client's controls. A prompt alone cannot change a running model. Effective routing
must be reported as unverified if the runtime doesn't expose it.

Roles omit model/effort intentionally, because Codex role configuration can override
spawn parameters. The orchestrator supplies actual model/effort per role. A runtime
without those capabilities cannot provide this routing; the agent must disclose
that and request an acceptable fallback, not silently use another model.

## Complete blocks, proportional verification

Every implementation packet includes the user's original outcome, an acceptance
example, exact inputs, ownership, and intermediate results that do not count as done.
Workers self-review. Independent review happens after a substantial block is ready,
not after every edit. An independent Astra stage review checks the original outcome.

A minimal isolated test can establish a component contract; it cannot by itself
prove a real consumer was switched. An inventory can support planning; it cannot
stand in for implementation. Review reports state the scope they actually prove.
Findings return to the same owner as one packet, followed by affected checks and
review of the correction's impact. Required project acceptance gates still apply.

## What the research does and does not establish

Higher reasoning effort can reduce the number of attempts enough to offset a more
expensive request. That happened in the [ARC Astra benchmark](https://arcprize.org/blog/astra).
A [coding experiment](https://dev.to/shinpr/switching-from-gpt-56-sol-to-gpt-6-astra-start-with-medium-effort-25ao)
instead favored medium over high on cost for its particular task. Neither establishes
a universal best effort or a guaranteed reduction in subscription quota usage.

Use available total usage, accepted outcomes, and rework as evidence. Do not invent
token measurements. The kit has no telemetry collection, paid API client, or billing
integration, and ordinary installer tests never launch models.
