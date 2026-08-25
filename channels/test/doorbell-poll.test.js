// Tests for the VENDOR-NEUTRAL poll transport + attestation. Run: `node --test` from channels/.
//
// Two things are under test, and the second is the one that earns conformance #3:
//   1. Attestation behaves as the convention requires (live / stale / absent; fail loud).
//   2. The poll transport delivers the same pointers as the channel adapter while importing
//      doorbell-core.js UNCHANGED -- i.e. the doorbell semantic is transport-independent.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { toRecord, makeSink, parseArgs, start } from '../src/memo-watch-poll.js';
import {
  writeAttestation,
  heartbeat,
  clearAttestation,
  checkAttestation,
  formatAttestation,
  attestationPath,
} from '../src/doorbell-attest.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

function tmpRepo() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'og-poll-'));
  const memos = path.join(root, 'memos');
  fs.mkdirSync(memos);
  return { root, memos, state: path.join(root, '.og-doorbell') };
}

function writeMemo(dir, stamp, { from, to, subject }) {
  const base = `${stamp}--${from}--${to}--test`;
  // body.md is the bait: no transport may ever read it.
  fs.writeFileSync(path.join(dir, `${base}.body.md`), '# secret body\nSUPERSECRETBODYMARKER');
  fs.writeFileSync(
    path.join(dir, `${base}.openthing`),
    JSON.stringify({ type: 'memodef:Memo', from, to, subject, action_required: true }),
  );
  return `${base}.openthing`;
}

// --- attestation ------------------------------------------------------------------------

test('absent attestation reports NOT CONNECTED and never reads as an empty inbox', () => {
  const { state } = tmpRepo();
  const result = checkAttestation(state);
  assert.equal(result.status, 'absent');
  assert.equal(result.canHear, false);

  const msg = formatAttestation(result);
  assert.match(msg, /NOT CONNECTED/);
  assert.match(msg, /CANNOT hear/);
  // The whole defect is silence reading as reassurance -- the message must contradict that.
  assert.match(msg, /does NOT mean an empty inbox/i);
});

test('a live transport attests with the seen-count, so the seat knows what is NOT covered', () => {
  const { memos, state } = tmpRepo();
  writeAttestation({ stateDir: state, transport: 'poll', watching: memos, seenAtStart: 7, sink: 'file: x' });

  const result = checkAttestation(state);
  assert.equal(result.status, 'live');
  assert.equal(result.canHear, true);
  assert.equal(result.attestation.seenAtStart, 7);
  assert.equal(result.attestation.transport, 'poll');

  const msg = formatAttestation(result);
  assert.match(msg, /live/);
  assert.match(msg, /7 existing memos marked seen/);
  assert.match(msg, /backlog/i); // the seat is told the doorbell does not cover pre-existing memos
});

test('a transport that stops checking in goes STALE, not silently "live"', () => {
  const { memos, state } = tmpRepo();
  writeAttestation({ stateDir: state, transport: 'poll', watching: memos, seenAtStart: 0 });

  // Presence alone must not satisfy the check -- a died-after-start transport leaves a file behind.
  const later = Date.now() + 10 * 60 * 1000;
  const result = checkAttestation(state, { now: later });
  assert.equal(result.status, 'stale');
  assert.equal(result.canHear, false);
  assert.match(formatAttestation(result), /STALE/);
  assert.match(formatAttestation(result), /presumed dead/);
});

test('heartbeat refreshes liveness; clearAttestation makes a stopped transport read as absent at once', () => {
  const { memos, state } = tmpRepo();
  writeAttestation({ stateDir: state, transport: 'poll', watching: memos, seenAtStart: 0 });
  const first = checkAttestation(state).attestation.heartbeatAt;

  assert.equal(heartbeat(state), true);
  assert.ok(Date.parse(checkAttestation(state).attestation.heartbeatAt) >= Date.parse(first));

  clearAttestation(state);
  assert.equal(checkAttestation(state).status, 'absent');
  assert.equal(fs.existsSync(attestationPath(state)), false);
  assert.equal(heartbeat(state), false, 'nothing to refresh once cleared');
});

test('a corrupt attestation is treated as absent (cannot hear), not as live', () => {
  const { state } = tmpRepo();
  fs.mkdirSync(state, { recursive: true });
  fs.writeFileSync(attestationPath(state), '{ not json');
  assert.equal(checkAttestation(state).status, 'absent');
});

// --- the transport ----------------------------------------------------------------------

test('poll transport rings only for post-start arrivals and delivers a pointer, never the body', async () => {
  const { memos, state, root } = tmpRepo();
  writeMemo(memos, '2026-08-24-1000', { from: 'og-strategist', to: 'og-implementer', subject: 'backlog' });

  const opts = parseArgs(['--memos', memos, '--state', state]);
  const handle = start(opts);

  // Attested at startup, with the pre-existing memo counted as backlog.
  assert.equal(handle.attestation.seenAtStart, 1);
  assert.equal(checkAttestation(state).status, 'live');

  writeMemo(memos, '2026-08-24-1600', {
    from: 'og-strategist',
    to: 'og-implementer',
    subject: 'a live arrival',
  });
  await wait(400);
  handle.stop();

  const lines = fs
    .readFileSync(path.join(state, 'pointers.ndjson'), 'utf8')
    .trim()
    .split('\n')
    .map((l) => JSON.parse(l));

  assert.equal(lines.length, 1, 'only the post-start arrival rings');
  assert.equal(lines[0].seat, 'og-implementer');
  assert.equal(lines[0].from, 'og-strategist');
  assert.equal(lines[0].subject, 'a live arrival');
  assert.equal(lines[0].action_required, true);

  // Pointer, not payload (OQ4) -- across the WHOLE sink file.
  const raw = fs.readFileSync(path.join(state, 'pointers.ndjson'), 'utf8');
  assert.ok(!raw.includes('SUPERSECRETBODYMARKER'), 'the .body.md must never reach the sink');

  // Clean shutdown => immediately absent, so a seat is never misled by a dead transport.
  assert.equal(checkAttestation(state).status, 'absent');
  assert.ok(root);
});

test('stdout and exec sinks carry the same record shape (runtime-agnostic delivery)', () => {
  const { memos, state } = tmpRepo();
  const pointer = {
    seat: 'og-implementer',
    from: 'og-strategist',
    subject: 'ping',
    path: 'memos/x.openthing',
    file: 'x.openthing',
    actionRequired: true,
  };
  const record = toRecord(pointer, new Date('2026-08-24T15:30:00Z'));
  assert.equal(record.at, '2026-08-24T15:30:00.000Z');
  assert.equal(record.action_required, true);
  assert.match(record.text, /New memo filed to og-implementer/);

  const written = [];
  const realWrite = process.stdout.write;
  process.stdout.write = (chunk) => { written.push(chunk); return true; };
  try {
    makeSink(parseArgs(['--sink', 'stdout', '--memos', memos, '--state', state])).deliver(record);
  } finally {
    process.stdout.write = realWrite;
  }
  assert.deepEqual(JSON.parse(written.join('').trim()), record);

  const execSink = makeSink(parseArgs(['--sink', 'exec', '--exec', 'true', '--memos', memos, '--state', state]));
  assert.match(execSink.describe, /^exec: /);
});

test('--sink exec without --exec is rejected rather than silently delivering nowhere', () => {
  assert.throws(() => parseArgs(['--sink', 'exec']), /requires --exec/);
  assert.throws(() => parseArgs(['--sink', 'carrier-pigeon']), /--sink must be/);
});

// --- conformance #3: transport independence ---------------------------------------------

test('CONFORMANCE #3: both transports import the SAME unmodified doorbell-core', () => {
  const src = (f) => fs.readFileSync(path.join(__dirname, '..', 'src', f), 'utf8');

  const channel = src('memo-watch-channel.js');
  const poll = src('memo-watch-poll.js');
  assert.match(channel, /from '\.\/doorbell-core\.js'/);
  assert.match(poll, /from '\.\/doorbell-core\.js'/);

  // The vendor-neutral transport must carry NO Anthropic/MCP dependency -- that is the point.
  assert.ok(!/modelcontextprotocol/.test(poll), 'poll transport must not depend on the MCP SDK');
  assert.ok(!/claude/i.test(poll.replace(/^.*Claude Code channel adapter.*$/gm, '')
    .replace(/^.*channel adapter is\b.*$/gm, '')), 'poll transport must not reference a vendor runtime in code');

  // And the core itself must know nothing about any transport.
  const core = src('doorbell-core.js');
  assert.ok(!/modelcontextprotocol/.test(core));
  assert.ok(!/notifications\/claude/.test(core));
});

// --- regression: found by running the real thing, not by reasoning about it ----------------

test('a hard-killed transport reads STALE immediately, not "live" for the whole stale window', () => {
  const { memos, state } = tmpRepo();
  writeAttestation({ stateDir: state, transport: 'poll', watching: memos, seenAtStart: 0 });

  // Heartbeat is fresh -- only the process check can catch this. TaskStop on Windows kills
  // without signal delivery, so clearAttestation() never runs and the file survives.
  const result = checkAttestation(state, { isAlive: () => false });
  assert.equal(result.status, 'stale');
  assert.equal(result.canHear, false);
  assert.equal(result.reason, 'process-gone');
  assert.match(formatAttestation(result), /process \(pid \d+\) is gone/);
});

test('a pid from another host is not probed locally (no false negative)', () => {
  const { memos, state } = tmpRepo();
  writeAttestation({ stateDir: state, transport: 'poll', watching: memos, seenAtStart: 0 });

  // Same attestation, read as though from a different machine: the pid means nothing here,
  // so liveness must fall back to the heartbeat rather than declaring it dead.
  const result = checkAttestation(state, { hostname: 'some-other-host', isAlive: () => false });
  assert.equal(result.status, 'live');
  assert.equal(result.reason, null);
});

test('a live process with a stale heartbeat is still STALE (both checks must pass)', () => {
  const { memos, state } = tmpRepo();
  writeAttestation({ stateDir: state, transport: 'poll', watching: memos, seenAtStart: 0 });

  const result = checkAttestation(state, { isAlive: () => true, now: Date.now() + 10 * 60 * 1000 });
  assert.equal(result.status, 'stale');
  assert.equal(result.reason, 'heartbeat-stale');
});
