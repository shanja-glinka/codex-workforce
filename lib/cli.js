import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { runCommand } from './installer.js';

const PACKAGE_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const HELP = `codex-workforce

Usage:
  codex-workforce install [--codex-home PATH] [--skills-dir PATH] [--dry-run] [--force]
  codex-workforce update [--codex-home PATH] [--skills-dir PATH] [--dry-run] [--force]
  codex-workforce uninstall [--codex-home PATH] [--skills-dir PATH] [--dry-run] [--force]
  codex-workforce status [--codex-home PATH] [--skills-dir PATH]

Options:
  --codex-home PATH   Install into PATH. Precedence: CLI option, CODEX_HOME, ~/.codex.
  --skills-dir PATH   Native skill discovery directory. Defaults to ~/.agents/skills.
  --dry-run           Check and print planned changes without writing.
  --force             Back up edited owned files before replacing or removing them.
  --json              Print machine-readable command results.
  -h, --help          Show this help.
`;

export async function runCli(argv, io = {}) {
  const stdout = io.stdout ?? process.stdout;
  const stderr = io.stderr ?? process.stderr;
  let parsed;

  try {
    parsed = parseArgv(argv);
  } catch (error) {
    stderr.write(`${error.message}\n\n${HELP}`);
    return 2;
  }

  if (parsed.help) {
    stdout.write(HELP);
    return 0;
  }

  if (!parsed.command) {
    stderr.write(`Missing command.\n\n${HELP}`);
    return 2;
  }

  try {
    const result = await runCommand(parsed.command, {
      codexHome: parsed.codexHome,
      skillsDir: parsed.skillsDir,
      env: io.env ?? process.env,
      dryRun: parsed.dryRun,
      force: parsed.force,
      packageRoot: io.packageRoot ?? PACKAGE_ROOT,
    });

    if (parsed.json) {
      stdout.write(`${JSON.stringify(result, null, 2)}\n`);
    } else {
      stdout.write(formatResult(result));
    }

    return result.exitCode;
  } catch (error) {
    stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
    return 1;
  }
}

function parseArgv(argv) {
  const parsed = {
    command: undefined,
    codexHome: undefined,
    skillsDir: undefined,
    dryRun: false,
    force: false,
    json: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '-h' || arg === '--help') {
      parsed.help = true;
      continue;
    }
    if (arg === '--dry-run') {
      parsed.dryRun = true;
      continue;
    }
    if (arg === '--force') {
      parsed.force = true;
      continue;
    }
    if (arg === '--json') {
      parsed.json = true;
      continue;
    }
    if (arg === '--codex-home' || arg === '--skills-dir') {
      const value = argv[index + 1];
      if (!value || value.startsWith('--')) {
        throw new Error(`${arg} requires a path value.`);
      }
      if (arg === '--codex-home') {
        parsed.codexHome = value;
      } else {
        parsed.skillsDir = value;
      }
      index += 1;
      continue;
    }
    if (arg.startsWith('--codex-home=')) {
      parsed.codexHome = arg.slice('--codex-home='.length);
      continue;
    }
    if (arg.startsWith('--skills-dir=')) {
      parsed.skillsDir = arg.slice('--skills-dir='.length);
      continue;
    }
    if (arg.startsWith('--')) {
      throw new Error(`Unknown option: ${arg}`);
    }
    if (parsed.command) {
      throw new Error(`Unexpected argument: ${arg}`);
    }
    parsed.command = arg;
  }

  if (parsed.command && !['install', 'update', 'uninstall', 'status'].includes(parsed.command)) {
    throw new Error(`Unknown command: ${parsed.command}`);
  }

  return parsed;
}

function formatResult(result) {
  const lines = [];
  lines.push(`${result.command}: ${result.summary}`);
  lines.push(`codex home: ${result.codexHome}`);
  lines.push(`skills dir: ${result.skillsDir}`);

  if (result.actions.length > 0) {
    lines.push('actions:');
    for (const action of result.actions) {
      lines.push(`  - ${action}`);
    }
  }

  if (result.issues.length > 0) {
    lines.push('issues:');
    for (const issue of result.issues) {
      lines.push(`  - ${issue}`);
    }
  }

  if (result.backups.length > 0) {
    lines.push('backups:');
    for (const backup of result.backups) {
      lines.push(`  - ${backup}`);
    }
  }

  return `${lines.join('\n')}\n`;
}
