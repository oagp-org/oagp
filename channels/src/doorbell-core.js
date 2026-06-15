// doorbell-core.js — transport-NEUTRAL memo-arrival detection for the OG seat doorbell.
//
// This module knows nothing about Claude Code, channels, or MCP. It watches an OG
// `memos/` directory, detects a NEW memo arriving, and hands a *pointer* (never the
// memo body) to a caller-supplied `onRing` callback. A Claude Code channel adapter,
// a poll loop, an MCP-inbox push, or a test harness can all reuse this core unchanged.
//
// Governance invariants enforced HERE (so every transport inherits them):
//   - Pointer, not payload: onRing receives {seat, path, subject, file} parsed from the
//     `.openthing` envelope only. The `.body.md` is NEVER read. (proposal OQ4)
//   - Read-state: a memo is rung at most once. Files present when the doorbell starts are
//     treated as already-seen, so we only ring for arrivals AFTER start. (proposal OQ2)
//   - No autonomy: the core delivers a notification object; it takes no action on the memo.

import fs from 'node:fs';
import path from 'node:path';

// The arrival trigger is the envelope file. The paired `.body.md` is intentionally ignored
// so we ring exactly once per memo and never touch the body.
const ENVELOPE_EXT = '.openthing';

/**
 * @typedef {Object} Pointer
 * @property {string} seat    Recipient seat (memodef `to`); "?" if unparseable.
 * @property {string} path    Repo-relative path to the envelope file.
 * @property {string} subject Memo subject (envelope metadata, not body); "" if absent.
 * @property {string} file    Bare envelope filename.
 * @property {string} from    Sender seat (memodef `from`); "?" if unparseable.
 * @property {boolean} actionRequired  Envelope `action_required` flag (best-effort).
 */

/**
 * Build a one-line, payload-free pointer string from a Pointer object.
 * This is the human/agent-readable doorbell text. It deliberately carries only
 * addressing + subject — the seat reads the actual memo from the substrate.
 * @param {Pointer} p
 * @returns {string}
 */
export function formatPointer(p) {
  const flag = p.actionRequired ? ' [action_required]' : '';
  const subj = p.subject ? ` — subject: ${p.subject}` : '';
  return `New memo filed to ${p.seat} (from ${p.from})${flag}: ${p.path}${subj}`;
}

/**
 * Parse a memo `.openthing` envelope into a Pointer. Reads ONLY the envelope (JSON
 * metadata), never the body. Tolerant of partial writes: returns null on parse failure
 * so the caller can retry.
 * @param {string} dir       Directory holding the memo.
 * @param {string} file      Envelope filename (`*.openthing`).
 * @param {string} relPrefix Path prefix to present in the pointer (e.g. "memos/").
 * @returns {Pointer | null}
 */
export function parseEnvelope(dir, file, relPrefix) {
  let raw;
  try {
    raw = fs.readFileSync(path.join(dir, file), 'utf8');
  } catch {
    return null;
  }
  let env;
  try {
    env = JSON.parse(raw);
  } catch {
    return null; // likely a partial write; caller retries
  }
  return {
    seat: typeof env.to === 'string' ? env.to : '?',
    from: typeof env.from === 'string' ? env.from : '?',
    subject: typeof env.subject === 'string' ? env.subject : '',
    actionRequired: env.action_required === true,
    path: `${relPrefix}${file}`,
    file,
  };
}

/**
 * Start the doorbell. Returns a handle with `stop()`.
 *
 * @param {Object} opts
 * @param {string}  opts.dir            Absolute path to the memos directory to watch.
 * @param {(p: Pointer) => void} opts.onRing  Called once per newly-arrived memo.
 * @param {string} [opts.relPrefix]     Prefix shown in the pointer path. Default "memos/".
 * @param {number} [opts.settleMs]      Debounce before reading a new file (let writes finish). Default 150.
 * @param {number} [opts.parseRetries]  Re-read attempts on JSON parse failure. Default 5.
 * @param {(msg: string) => void} [opts.log]  Optional diagnostic sink (stderr-style).
 * @returns {{ stop: () => void, seen: Set<string> }}
 */
export function startDoorbell({
  dir,
  onRing,
  relPrefix = 'memos/',
  settleMs = 150,
  parseRetries = 5,
  log = () => {},
}) {
  if (!dir) throw new Error('startDoorbell: dir is required');
  if (typeof onRing !== 'function') throw new Error('startDoorbell: onRing must be a function');

  // Read-state: seed the seen-set with everything already on disk, so the doorbell
  // only rings for memos that ARRIVE after it starts (proposal OQ2, minimum bar).
  const seen = new Set();
  try {
    for (const f of fs.readdirSync(dir)) {
      if (f.endsWith(ENVELOPE_EXT)) seen.add(f);
    }
  } catch (e) {
    log(`doorbell: could not seed seen-set from ${dir}: ${e.message}`);
  }
  log(`doorbell: watching ${dir} (${seen.size} existing memos marked seen)`);

  const ring = (file, attempt = 0) => {
    const p = parseEnvelope(dir, file, relPrefix);
    if (!p) {
      if (attempt < parseRetries) {
        setTimeout(() => ring(file, attempt + 1), settleMs);
      } else {
        log(`doorbell: gave up parsing ${file} after ${parseRetries} retries`);
      }
      return;
    }
    onRing(p);
  };

  const watcher = fs.watch(dir, (_eventType, filename) => {
    if (!filename || !filename.endsWith(ENVELOPE_EXT)) return;
    if (seen.has(filename)) return;          // de-dup: fs.watch fires repeatedly
    if (!fs.existsSync(path.join(dir, filename))) return; // a delete/rename-away, not an arrival
    seen.add(filename);                      // mark immediately so duplicate events no-op
    setTimeout(() => ring(filename), settleMs);
  });

  return {
    seen,
    stop() {
      watcher.close();
    },
  };
}
