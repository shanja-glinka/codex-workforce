# Installation contract

## Distribution and commands

Node.js 22+, npm, and Git are required for the GitHub package command:

```sh
npx --yes github:shanja-glinka/codex-workforce install
npx --yes github:shanja-glinka/codex-workforce update
npx --yes github:shanja-glinka/codex-workforce status
npx --yes github:shanja-glinka/codex-workforce uninstall
```

Use `github:shanja-glinka/codex-workforce#v1.0.0` to pin this release, or a reviewed
commit SHA. Updating with a pinned spec installs that pinned version; choose a newer
tag explicitly. `update` reads the payload in the invoked package. It does not run
`git pull`, an npm updater, or an arbitrary remote install script inside the CLI.

The package has no install/prepare lifecycle hooks. Downloading or packing it does
not modify Codex. A mutation requires an explicit `install`, `update`, or `uninstall`
command. A separate npm registry publication is unnecessary for this distribution.

## Destinations

Codex home is selected in this order: `--codex-home PATH`, existing `CODEX_HOME`,
then `~/.codex`. The command does not rewrite environment variables or shell profiles.

```text
CODEX_HOME/
  agents/workforce_probe.toml
  agents/workforce_worker.toml
  agents/workforce_reviewer.toml
  skills/workforce-orchestrate/...
  skills/workforce-worker/...
  skills/workforce-probe/...
  skills/workforce-review/...
  skills/workforce-smoke/...
  workforce-standard.config.toml
  workforce-enhanced.config.toml
  codex-workforce/profiles.json
  codex-workforce/manifest.json
  AGENTS.md                         (or the active AGENTS.override.md)
```

Native skill discovery uses links in `~/.agents/skills`, or `--skills-dir PATH` when
specified. File contents stay in Codex home. Windows may require permission to create
directory links. An alternate discovery directory is useful for isolated tests but
is not automatically a Codex discovery root; use a directory your runtime scans.

Both destinations must be isolated when testing:

```sh
node bin/codex-workforce.js install --codex-home /tmp/workforce-demo/codex --skills-dir /tmp/workforce-demo/skills
node bin/codex-workforce.js status --codex-home /tmp/workforce-demo/codex --skills-dir /tmp/workforce-demo/skills
node bin/codex-workforce.js uninstall --codex-home /tmp/workforce-demo/codex --skills-dir /tmp/workforce-demo/skills
```

For multiple Codex homes, the same global skill names cannot simultaneously link
to different owners. The installer must report this collision rather than replace
another home's links. Choose the intended installation and discovery arrangement.

## Preservation and ownership

The installer tracks owned file hashes, skill links, and its exact marked instruction
block. It preserves other agents, skills, base `config.toml`, authentication files,
and instruction text outside its markers. It never deletes the entire agents or
skills directory to perform an update.

If a nonempty global `AGENTS.override.md` is active, the managed block belongs there;
otherwise it belongs in `AGENTS.md`. A symlinked instruction file remains a symlink;
the existing target receives the narrow block edit. `status` detects when another
effective global file hides the installed instructions.

Changes are preflighted before writes. Unowned collisions or unexpected edited owned
content produce an error with a path. `--force` is for backing up and replacing/removing
edited **owned** content, not for taking over arbitrary files. Keep reported backups
until you are satisfied. Updates remove stale unchanged owned files as well as writing
the new payload. Uninstall removes the kit's block and owned content while retaining
unrelated additions. Removal does not revoke tasks already running in Codex.

Use `--dry-run` with a mutation command to inspect the proposed operation without
writing. `--json` provides structured results for scripts. Consult `--help` for the
complete installed CLI surface. Do not manually edit the ownership manifest.

## Loading and verification

Start a fresh Codex session after installing or updating. Current Codex automatically
discovers named TOML agents; this kit does not add legacy agent registration tables
or change `[agents]` settings. If your configuration disables subagents, installation
does not silently enable them. You must resolve that runtime setting yourself.

Run `status` to verify owned files, links, and the effective instruction block. This
is a file-level check. It does not prove account model access, runtime dispatch,
instruction-following quality, or a successful product implementation.

For native CLI profile layers, current Codex supports:

```sh
codex -p workforce-standard
codex -p workforce-enhanced
```

These optional shortcuts explicitly choose a profile and set the root model/effort
for that launch. They do not permanently select a profile for all future work.
Each layer also supplies a short `developer_instructions` value identifying the
explicit choice. As with other Codex config layers, this replaces that configuration
key for the launch; it does not merge a custom base `developer_instructions` string.
If you rely on that base key, use the client's model/effort controls and state the
profile in your task instead. Global and project `AGENTS.md` discovery still applies.
Older clients may lack named layers or dynamic model overrides; use supported client
controls, and do not claim full compatibility until the relevant capability is proven.
The desktop app may use a different Codex home than your shell: target it explicitly
when needed. A text instruction cannot switch an already-running root model.

## Existing project-local packs

Project-local roles and instructions may take precedence; skills with the same name
can also appear more than once. The global installer does not recursively modify
your repositories. Inspect the project's managed workflow block and update it to
route to `workforce-orchestrate` and the three `workforce_*` roles when migrating.
Retire obsolete local copies only after existing tasks no longer depend on them.

The old `astra_*`/`astra-*` names are not installed by this package. Existing copies
are not claimed or deleted merely because their names look related. This prevents
an update from destroying unrelated or locally customized work.

## References

Native discovery and precedence follow [Codex custom agents](https://learn.chatgpt.com/docs/agent-configuration/subagents),
[skill discovery](https://learn.chatgpt.com/docs/build-skills), and
[global AGENTS instructions](https://learn.chatgpt.com/docs/agent-configuration/agents-md).
The local CLI's `--help` is the authority for supported launch flags on your machine.
