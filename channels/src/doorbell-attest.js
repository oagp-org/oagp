// doorbell-attest.js — transport-NEUTRAL attestation for the OG seat doorbell.
//
// Answers one question, for any transport: **can this seat actually hear?**
//
// The convention defect this exists to close (og-strategist ruling, memos/2026-08-24-1505 §4):
// a seat cannot distinguish "no memos for you" from "your doorbell is not connected". Silence
// reads identically in both cases, so a deaf seat sits quietly while action_required memos rot.
// The convention *creates the reliance it then fails silently* — once a Director believes the
// doorbell works they stop saying "please check for memos".
//
// The org already holds that roledef resolution must FAIL CLOSED rather than guess
// (memos/2026-05-25-0001). This is the delivery-side counterpart: **delivery must fail LOUD
// rather than go quiet.**
//
// Mechanism: a running transport writes an attestation file and refreshes a heartbeat. A seat
// reads it and learns one of three things -- live / stale / absent -- instead of inferring from
// silence. Staleness matters as much as absence: a transport that started and then died leaves
// a file behind, and a seat that trusted mere presence would be deaf again.
//
// Deliberately dependency-free (node builtins only) and transport-agnostic: the vendor-neutral
// poll transport, the Claude Code channel adapter, and any future MCP-inbox push all write the
// SAME shape, so a seat's "can I hear?" check never needs to know which transport it has.
//
// Governance note: an attestation carries transport liveness ONLY. It is not a memo, it never
// contains memo bodies, and it confers no authority.

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

/** Default directory for doorbell runtime state, relative to the watched repo root. */
export const DEFAULT_STATE_DIRNAME = '.og-doorbell';
const ATTESTATION_FILE = 'attestation.json';

/** A heartbeat older than this many ms means the transport is presumed dead. */
export const DEFAULT_STALE_AFTER_MS = 90_000;

/**
 * @typedef {Object} Attestation
 * @property {string} transport   Transport identifier, e.g. "poll" / "claude-code-channel".
 * @property {string} watching    Absolute path of the watched memos directory.
 * @property {number} seenAtStart Count of artifacts marked already-seen at startup (OQ2).
 * @property {string} startedAt   ISO timestamp the transport connected.
 * @property {string} heartbeatAt ISO timestamp of the most recent liveness refresh.
 * @property {number} pid         OS process id of the transport.
 * @property {string} sink        Human description of where pointers are delivered.
 */

export function attestationPath(stateDir) {
  return path.join(stateDir, ATTESTATION_FILE);
}

/**
 * Announce a transport to the seat (requirement 1: startup attestation).
 * Writes atomically via rename so a seat never reads a half-written file.
 *
 * @param {Object} opts
 * @param {string} opts.stateDir    Directory to hold the attestation.
 * @param {string} opts.transport   Transport identifier.
 * @param {string} opts.watching    Watched memos directory (absolute).
 * @param {number} opts.seenAtStart Artifacts marked seen at startup.
 * @param {string} [opts.sink]      Where pointers go.
 * @returns {Attestation}
 */
export function writeAttestation({ stateDir, transport, watching, seenAtStart, sink = 'unspecified' }) {
  fs.mkdirSync(stateDir, { recursive: true });
  const now = new Date().toISOString();
  /** @type {Attestation} */
  const att = {
    transport,
    watching,
    seenAtStart,
    startedAt: now,
    heartbeatAt: now,
    pid: process.pid,
    // Host is recorded so a reader knows whether `pid` is meaningful to it. An attestation
    // written in another container or on another machine must NOT be pid-checked locally.
    host: os.hostname(),
    sink,
  };
  writeAtomic(attestationPath(stateDir), JSON.stringify(att, null, 2) + '\n');
  return att;
}

/**
 * Refresh the liveness timestamp. A transport that stops calling this goes "stale" rather than
 * silently continuing to look connected -- which is the whole point.
 * @param {string} stateDir
 * @returns {boolean} false if there is no attestation to refresh.
 */
export function heartbeat(stateDir) {
  const att = readAttestation(stateDir);
  if (!att) return false;
  att.heartbeatAt = new Date().toISOString();
  writeAtomic(attestationPath(stateDir), JSON.stringify(att, null, 2) + '\n');
  return true;
}

/**
 * Remove the attestation on clean shutdown, so a stopped transport reads as ABSENT immediately
 * rather than waiting out the stale window.
 * @param {string} stateDir
 */
export function clearAttestation(stateDir) {
  try {
    fs.unlinkSync(attestationPath(stateDir));
  } catch {
    /* already gone */
  }
}

/**
 * @param {string} stateDir
 * @returns {Attestation | null} null if absent or unparseable (treated the same: cannot hear).
 */
export function readAttestation(stateDir) {
  try {
    return JSON.parse(fs.readFileSync(attestationPath(stateDir), 'utf8'));
  } catch {
    return null;
  }
}

/**
 * The seat-side question, answered explicitly instead of inferred from silence.
 *
 * @param {string} stateDir
 * @param {Object} [opts]
 * @param {number} [opts.staleAfterMs]
 * @param {number} [opts.now] Epoch ms; injectable for tests.
 * @returns {{ status: 'live'|'stale'|'absent', canHear: boolean, ageMs: number|null, attestation: Attestation|null }}
 */
export function checkAttestation(
  stateDir,
  { staleAfterMs = DEFAULT_STALE_AFTER_MS, now = Date.now(), isAlive = defaultIsAlive, hostname = os.hostname() } = {},
) {
  const attestation = readAttestation(stateDir);
  if (!attestation) return { status: 'absent', canHear: false, reason: 'absent', ageMs: null, attestation: null };

  const beat = Date.parse(attestation.heartbeatAt);
  const ageMs = Number.isNaN(beat) ? Infinity : now - beat;

  // A hard-killed or crashed transport never runs clearAttestation(), so its file survives and
  // the heartbeat alone would report "live" for the whole stale window -- exactly the false
  // confidence this module exists to remove, merely delayed. Found by running it: TaskStop on
  // Windows kills without signal delivery, and the status tool still said "live".
  //
  // So check the process too. Only when the attestation was written on THIS host, because a pid
  // from another machine or container is meaningless here (and would be a false negative).
  const pidCheckable = attestation.host === hostname && typeof attestation.pid === 'number';
  if (pidCheckable && !isAlive(attestation.pid)) {
    return { status: 'stale', canHear: false, reason: 'process-gone', ageMs, attestation };
  }

  if (ageMs > staleAfterMs) {
    return { status: 'stale', canHear: false, reason: 'heartbeat-stale', ageMs, attestation };
  }
  return { status: 'live', canHear: true, reason: null, ageMs, attestation };
}

/**
 * Existence probe: signal 0 tests for a live process without touching it. EPERM means the
 * process exists but is owned by someone else -- still alive, so still true.
 * @param {number} pid
 */
function defaultIsAlive(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch (e) {
    return e.code === 'EPERM';
  }
}

/**
 * Render the check as the plain sentence a seat should say out loud (requirements 2 and 4:
 * fail loud, and deafness is reportable). Never returns an empty or reassuring string for a
 * non-live doorbell.
 * @param {ReturnType<typeof checkAttestation>} result
 * @returns {string}
 */
export function formatAttestation(result) {
  const { status, attestation, ageMs } = result;
  if (status === 'absent') {
    return (
      'DOORBELL: NOT CONNECTED — no transport has attested. This seat CANNOT hear memo arrivals. ' +
      'Silence does NOT mean an empty inbox; read memos/ explicitly before assuming there is nothing waiting.'
    );
  }
  if (status === 'stale') {
    const why =
      result.reason === 'process-gone'
        ? `its process (pid ${attestation.pid}) is gone`
        : `it last checked in ${Math.round(ageMs / 1000)}s ago and is presumed dead`;
    return (
      `DOORBELL: STALE — transport "${attestation.transport}" is not running: ${why}. ` +
      'This seat CANNOT rely on hearing memo arrivals. Read memos/ explicitly.'
    );
  }
  return (
    `DOORBELL: live — transport "${attestation.transport}" watching ${attestation.watching} ` +
    `(${attestation.seenAtStart} existing memos marked seen at start; pointers -> ${attestation.sink}). ` +
    'Arrivals after that point ring; anything older is backlog and is NOT covered by the doorbell.'
  );
}

function writeAtomic(file, contents) {
  const tmp = `${file}.${process.pid}.tmp`;
  fs.writeFileSync(tmp, contents);
  fs.renameSync(tmp, file);
}
