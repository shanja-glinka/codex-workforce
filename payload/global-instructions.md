## Codex Workforce

For a new implementation, refactoring, or automation task, use the installed
`workforce-orchestrate` skill at `{{CODEX_HOME}}/skills/workforce-orchestrate/SKILL.md`.
Before substantive execution or delegation, the user-facing orchestrator must ask
the user to choose **Standard** or **Enhanced**, explaining both profiles using
`references/dispatch.md`. Wait for an explicit answer; a preselected option or
elapsed time is not consent. An explicit profile in the user's request already
counts as the answer. Keep that choice for the task and its continuations.

Both profiles combine GPT-6 Astra and GPT-5.5. Standard uses Astra low for
orchestration, GPT-5.5 medium for research, GPT-5.5 high for implementation,
GPT-5.5 xhigh for block review, and Astra high for stage acceptance. Enhanced
retains these GPT-5.5 roles, uses Astra high for orchestration, and assigns bounded
unresolved design/algorithm work to Astra high; xhigh/max requires a stated reason.

Only the user-facing orchestrator asks. Delegated agents inherit PROFILE and read
their assigned worker/probe/review skill; they do not ask the user again or spawn
children. Direct answers, status reports, and analysis-only requests do not start
implementation. For tiny changes, use the selected profile without mandatory fan-out.
For unattended work without a previously chosen profile, report PROFILE_REQUIRED
and leave execution pending rather than guessing.

Delegate complete results with explicit ownership; workers self-review, an
independent reviewer checks a completed substantial block, and Astra accepts a
major stage. Do not attach permanent auditors, repeat reviews after every edit,
or substitute inventory/counts for requested implementation. Follow applicable
project conventions and the user's scope and publication permissions.

Model and effort must be selected through actual runtime controls. Never claim
that an instruction changed the running model. Read dispatch for mismatch handling.
This kit neither requires GSD nor grants extra file, network, or publication rights.
