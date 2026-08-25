#!/usr/bin/env node
// doorbell-status.js — the seat-side "can I hear?" check.
//
// This is the thing a seat runs so that requirements 2-4 of the doorbell convention
// (og-strategist ruling, memos/2026-08-24-1505 §4) are actionable rather than aspirational:
//
//   2. Fail loud, not silent  — a seat that finds no attestation MUST say so plainly and MUST
//                               NOT treat silence as an empty inbox.
//   3. Explicit backstop      — on absent attestation the seat reverts to an explicit memos/
//                               read rather than relying on having coincidentally run a card
//                               that does one.
//   4. Deafness is reportable — "I cannot hear the doorbell" is a first-class thing to report
//                               to the Director, on the same footing as any other bounded-
//                               authority limit.
//
// Transport-agnostic by construction: it reads the attestation shape, not any transport. A seat
// asking "can I hear?" never needs to know whether it has the poll transport, the Claude Code
// channel adapter, or something not written yet.
//
// Exit codes are chosen so a script can branch without parsing prose:
//   0  live    — the doorbell is connected; post-start arrivals will ring.
//   3  stale   — a transport attested and then stopped checking in; presumed dead.
//   4  absent  — nothing has attested; this seat is deaf.
//
// Note the deliberate asymmetry: only exit 0 means "you may rely on the doorbell". Both other
// states are failures, because the defect being closed is silence that reads as reassurance.
//
// Usage:
//   node src/doorbell-status.js [--state <dir>] [--memos <dir>] [--stale-after-ms <n>] [--json]

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  checkAttestation,
  formatAttestation,
  DEFAULT_STATE_DIRNAME,
  DEFAULT_STALE_AFTER_MS,
} from './doorbell-attest.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const EXIT = { live: 0, stale: 3, absent: 4 };

export function parseArgs(argv) {
  const opts = { state: null, memos: null, staleAfterMs: DEFAULT_STALE_AFTER_MS, json: false };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = () => argv[(i += 1)];
    if (arg === '--state') opts.state = path.resolve(next());
    else if (arg === '--memos') opts.memos = path.resolve(next());
    else if (arg === '--stale-after-ms') opts.staleAfterMs = Number(next());
    else if (arg === '--json') opts.json = true;
    else throw new Error(`unknown argument: ${arg}`);
  }
  if (!opts.state) {
    const repoRoot = opts.memos
      ? path.dirname(opts.memos)
      : process.env.OG_MEMOS_DIR
        ? path.dirname(path.resolve(process.env.OG_MEMOS_DIR))
        : path.resolve(__dirname, '..', '..');
    opts.state = path.join(repoRoot, DEFAULT_STATE_DIRNAME);
  }
  return opts;
}

const invokedDirectly =
  process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (invokedDirectly) {
  const opts = parseArgs(process.argv.slice(2));
  const result = checkAttestation(opts.state, { staleAfterMs: opts.staleAfterMs });
  if (opts.json) {
    process.stdout.write(`${JSON.stringify({ ...result, stateDir: opts.state }, null, 2)}\n`);
  } else {
    process.stdout.write(`${formatAttestation(result)}\n`);
    if (!result.canHear) {
      process.stdout.write(
        `Checked: ${opts.state}\n` +
          'Backstop: read memos/ directly (newest-first) and triage any unread action_required items.\n',
      );
    }
  }
  process.exit(EXIT[result.status]);
}
