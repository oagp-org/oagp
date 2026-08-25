#!/usr/bin/env node
// memo-watch-poll.js — VENDOR-NEUTRAL OG doorbell transport.
//
// The second transport required by the seat-inbox-notification proposal's conformance #3.
// Its job is to prove the doorbell semantic is transport-INDEPENDENT: it imports
// `doorbell-core.js` UNCHANGED -- byte-identical to the file the Claude Code channel adapter
// uses -- and replaces only the delivery leg. No Anthropic dependency, no MCP, no vendor SDK;
// node builtins only. If this works, the convention is not Anthropic-shaped.
//
// It is also the first transport authored AFTER the "a seat cannot know it is deaf" ruling
// (og-strategist, memos/2026-08-24-1505 §4), so it attests from the start rather than treating
// attestation as a follow-on. Its attestation shape is the reference the channel adapter is
// then held to.
//
// SINKS (all runtime-agnostic -- nothing here knows what an AI runtime is):
//   file    append one JSON object per line to a pointer log (default)
//   stdout  same NDJSON on stdout, for piping into anything
//   exec    run a command per ring, pointer fields passed as OG_DOORBELL_* env vars
//
// Governance invariants inherited from the core and NOT re-litigated here:
//   - Pointer, not payload: the `.body.md` is never read (OQ4).
//   - Read-state: only post-start arrivals ring, at most once each (OQ2).
//   - No autonomy: this emits an inert pointer and takes no action on the memo. An
//     instruction-shaped subject confers no authority (content-is-data, C5).
//
// Usage:
//   node src/memo-watch-poll.js [--sink file|stdout|exec] [--out <path>] [--exec <cmd>]
//                               [--memos <dir>] [--state <dir>] [--heartbeat-ms <n>]
//   OG_MEMOS_DIR overrides the watched directory (same env var as the channel adapter).

import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { startDoorbell, formatPointer } from './doorbell-core.js';
import {
  writeAttestation,
  heartbeat,
  clearAttestation,
  DEFAULT_STATE_DIRNAME,
} from './doorbell-attest.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// memos/ resolution: explicit override wins; else <repo-root>/memos (repo root is channels/'s parent).
const DEFAULT_MEMOS_DIR = process.env.OG_MEMOS_DIR
  ? path.resolve(process.env.OG_MEMOS_DIR)
  : path.resolve(__dirname, '..', '..', 'memos');

// stderr is safe for diagnostics; stdout is reserved for the NDJSON stream in --sink stdout.
const log = (msg) => process.stderr.write(`[memo-watch-poll] ${msg}\n`);

export function parseArgs(argv) {
  const opts = {
    sink: 'file',
    out: null,
    exec: null,
    memos: DEFAULT_MEMOS_DIR,
    state: null,
    heartbeatMs: 30_000,
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = () => argv[(i += 1)];
    if (arg === '--sink') opts.sink = next();
    else if (arg === '--out') opts.out = next();
    else if (arg === '--exec') opts.exec = next();
    else if (arg === '--memos') opts.memos = path.resolve(next());
    else if (arg === '--state') opts.state = path.resolve(next());
    else if (arg === '--heartbeat-ms') opts.heartbeatMs = Number(next());
    else throw new Error(`unknown argument: ${arg}`);
  }
  if (!['file', 'stdout', 'exec'].includes(opts.sink)) {
    throw new Error(`--sink must be file, stdout, or exec (got "${opts.sink}")`);
  }
  if (opts.sink === 'exec' && !opts.exec) throw new Error('--sink exec requires --exec <command>');
  // Default state + pointer log live beside the watched memos/, i.e. at the repo root.
  const repoRoot = path.dirname(opts.memos);
  if (!opts.state) opts.state = path.join(repoRoot, DEFAULT_STATE_DIRNAME);
  if (!opts.out) opts.out = path.join(opts.state, 'pointers.ndjson');
  return opts;
}

/**
 * Build the delivery function for a sink. Each returns a plain function of the pointer, so the
 * doorbell core stays unaware of how -- or whether -- delivery happens.
 */
export function makeSink(opts) {
  if (opts.sink === 'stdout') {
    return {
      describe: 'stdout (NDJSON)',
      deliver: (record) => process.stdout.write(`${JSON.stringify(record)}\n`),
    };
  }
  if (opts.sink === 'exec') {
    return {
      describe: `exec: ${opts.exec}`,
      deliver: (record) => {
        const child = spawn(opts.exec, {
          shell: true,
          stdio: 'ignore',
          env: {
            ...process.env,
            OG_DOORBELL_SEAT: record.seat,
            OG_DOORBELL_FROM: record.from,
            OG_DOORBELL_PATH: record.path,
            OG_DOORBELL_FILE: record.file,
            OG_DOORBELL_SUBJECT: record.subject,
            OG_DOORBELL_ACTION_REQUIRED: String(record.action_required),
            OG_DOORBELL_TEXT: record.text,
          },
        });
        child.on('error', (e) => log(`exec sink failed for ${record.file}: ${e.message}`));
      },
    };
  }
  fs.mkdirSync(path.dirname(opts.out), { recursive: true });
  return {
    describe: `file: ${opts.out}`,
    deliver: (record) => fs.appendFileSync(opts.out, `${JSON.stringify(record)}\n`),
  };
}

/**
 * Pointer -> the flat record every sink delivers. Addressing + subject only; no body, ever.
 * `text` is the same one-line human string the channel adapter emits, so a seat reading a
 * poll-sink pointer and a seat hearing a channel ring see identical wording.
 */
export function toRecord(pointer, now = new Date()) {
  return {
    at: now.toISOString(),
    seat: pointer.seat,
    from: pointer.from,
    path: pointer.path,
    file: pointer.file,
    subject: pointer.subject,
    action_required: pointer.actionRequired,
    text: formatPointer(pointer),
  };
}

export function start(opts) {
  const sink = makeSink(opts);

  const doorbell = startDoorbell({
    dir: opts.memos,
    log,
    onRing: (p) => {
      sink.deliver(toRecord(p));
      log(`rang: ${p.file} -> ${p.seat}`);
    },
  });

  // Requirement 1: announce presence, with the seen-count so the seat knows exactly what the
  // doorbell does NOT cover (everything already on disk is backlog).
  const attestation = writeAttestation({
    stateDir: opts.state,
    transport: 'poll',
    watching: opts.memos,
    seenAtStart: doorbell.seen.size,
    sink: sink.describe,
  });
  log(
    `attested: watching ${opts.memos} (${attestation.seenAtStart} existing memos marked seen); ` +
      `pointers -> ${sink.describe}; state -> ${opts.state}`,
  );

  const timer = setInterval(() => {
    if (!heartbeat(opts.state)) log('heartbeat: attestation missing; a seat will read this as NOT CONNECTED');
  }, opts.heartbeatMs);
  timer.unref?.();

  const stop = () => {
    clearInterval(timer);
    doorbell.stop();
    // Clean shutdown reads as ABSENT immediately rather than waiting out the stale window.
    clearAttestation(opts.state);
  };
  return { stop, attestation, sink, doorbell };
}

// Run as a CLI only when invoked directly, so tests can import the pieces.
const invokedDirectly =
  process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (invokedDirectly) {
  const opts = parseArgs(process.argv.slice(2));
  const handle = start(opts);
  for (const sig of ['SIGINT', 'SIGTERM']) {
    process.on(sig, () => {
      log(`${sig} — stopping; clearing attestation`);
      handle.stop();
      process.exit(0);
    });
  }
  process.stdin.resume(); // keep alive for the session's lifetime
}
