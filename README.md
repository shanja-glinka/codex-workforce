# Codex Workforce

**Two hybrid profiles. Complete work blocks. Reviews when the work is ready.**

[Русский](README.ru.md) · [Profiles and workflow](docs/profiles.md) · [Installer contract](docs/installation.md) · [Contributing](CONTRIBUTING.md)

A small, inspectable set of Codex agents and skills that combines **GPT-6 Astra**
with **GPT-5.5**. Astra orchestrates and accepts the result; GPT-5.5 does the bulk
of implementation. Choose Standard for a sufficiently described solution, or
Enhanced when the solution itself still needs to be found.

No API proxy, background service, GSD dependency, or new task management engine.
This is an instruction pack with a Node.js installer, not a guarantee of model
behavior or lower cost. Independent community project; not affiliated with OpenAI.

## Install

Requires Node.js 22+ and npm, Git for the GitHub package spec, and a Codex runtime
with custom agents, explicit model/effort overrides, and access to both models.
The package runs directly from GitHub; an npm registry publication is not required.

```sh
npx --yes github:shanja-glinka/codex-workforce install
```

The current release also installs optional native launch shortcuts:

```sh
codex -p workforce-standard
codex -p workforce-enhanced
```

These explicitly choose a profile and set the root model/effort for that launch.

Restart Codex or start a fresh session to load the new global instructions and roles.
Before a new implementation task, the orchestrator explains the profiles and asks
which to use. It waits for your answer. You can also write **“Use Enhanced”** in
the task itself; workers inherit the choice and do not ask again.

```sh
# Replace the kit's previous version, removing stale owned files
npx --yes github:shanja-glinka/codex-workforce update

# Inspect the installed files and discovery links
npx --yes github:shanja-glinka/codex-workforce status

# Remove this kit, preserving other agents, settings, and instructions
npx --yes github:shanja-glinka/codex-workforce uninstall
```

For a reproducible version, replace the package spec with
`github:shanja-glinka/codex-workforce#v1.0.0`. Use a newer tag when updating a pinned
installation. `npx --yes` accepts npm's download prompt; it does not answer the
agent's Standard/Enhanced question or grant publishing rights.

## Choose a profile

| Responsibility | Standard | Enhanced |
| --- | --- | --- |
| Orchestrator | Astra low | Astra high |
| Bounded research | GPT-5.5 medium | GPT-5.5 medium |
| Main implementation | GPT-5.5 high | GPT-5.5 high |
| Unresolved design/algorithm | Targeted Astra assistance as needed | Bounded Astra high work |
| Completed block review | GPT-5.5 xhigh | GPT-5.5 xhigh |
| Major stage acceptance | Astra high | Astra high |

Both profiles retain both families. Enhanced does not move all work to Astra.
A fully specified difficult algorithm can stay with GPT-5.5. Astra xhigh/max is a
reasoned escalation for uncertainty, not an automatic choice for every long task.

The selected profile is a routing policy. **Instructions cannot change the already
running orchestrator's model.** Set Astra and the corresponding effort in your
client; the agent must disclose a mismatch instead of pretending it changed settings.
The installer does not overwrite your `config.toml`, model defaults, or permissions.

## How work flows

1. Choose a profile once for the task.
2. Agree the actual outcome and concrete acceptance example. “Analyze” stays analysis.
3. Assign complete blocks with clear ownership and exact sources.
4. Workers implement, connect consumers, and self-review their whole result.
5. Independently review each completed substantial block; return findings as one packet.
6. Astra checks the original outcome before closing a major stage.

No permanent auditor per worker. No mandatory fan-out for tiny edits. No new reviewer
after every correction. Repeat affected checks and review the correction's impact.
An inventory, a generated shell, or a green typecheck is not a completed migration.

## What gets installed

- Three model-neutral roles: `workforce_probe`, `workforce_worker`, `workforce_reviewer`.
- Five skills: orchestration, worker, probe, review, and optional live smoke.
- A marked instruction block in the effective global `AGENTS` file.
- Owned-file metadata for update, status, and removal.

Files live under `CODEX_HOME` (default `~/.codex`). Skills are linked into
`~/.agents/skills` for native discovery. Paths can be overridden for isolated profiles
and tests. Existing project-local agents/skills and global overrides may take
precedence; see [installation details](docs/installation.md).

## Develop

```sh
git clone https://github.com/shanja-glinka/codex-workforce.git
cd codex-workforce
npm test
node bin/codex-workforce.js --help
```

Tests use disposable homes. They do not invoke paid models or mutate your actual
Codex installation. See [contributing](CONTRIBUTING.md) for the distinction between
installer tests, instruction cases, and live model verification.

## License

[MIT](LICENSE). Contributions and reproducible bug reports are welcome.
