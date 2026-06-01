---
name: og-closeout
description: |
  Use this skill at the end of a working session in an OG (Open
  Governance Framework) org. It drafts a closeout memo capturing what the
  session drafted/decided/left open, then prompts the Product Owner to
  save the session transcript using the canonical position-tag
  convention. You do not save the transcript yourself.

  Activate when the user says any of: "close out", "wrap up", "end of
  session", "let's close this session", or at a natural session end.

  Companion: /og-orient opens a session; /og-closeout ends it.
---

# /og-closeout

You are closing out a working session in an OG org. Two things: (1) draft a closeout memo; (2) prompt the PO to save the transcript. You do not save the transcript yourself.

## Phase 1 — Draft the closeout memo
File at `memos/<YYYY-MM-DD>-<HHMM>--<seat>--<seat>--<short-summary>.{openthing,body.md}`. `from` and `to` both name the seat you occupied (institutional capture for that seat's history — your replacements read it on their next `/og-orient`). If unattached (no seat), use `unattached-ai` and note it in `metadata.scope_check`.

**Content:** one-line subject; body covering what was drafted (artifacts + paths), decided (flag "awaiting Director merge-ratification"), in flight, and open; `action_required` (usually `false`); `metadata.drafted_by_session`, `scope_check`, and 2–3 `applies_principles`. Match the org's tone: terse, evidence-led, no editorial polish, no celebration. The memo's value is durable context for the next incumbent, not narrative for the PO.

## Phase 2 — Prompt the transcript save
Surface the canonical path in plaintext for the PO to copy:
`transcripts/<seat>/<YYYY-MM-DD>-<HHMM>--<seat>--<short-description>.{openthing,body.md}`

Canonical `<seat>` value:

| Session type | `<seat>` |
|---|---|
| Staffed-seat working session | the seat id (e.g. `og-strategist`) |
| Founding session (org doesn't exist yet; AI is the helper) | `<orgname>-adopt-helper` or `<orgname>-create-helper` |
| Unattended / exploratory | `unattached-ai` (or omit) |

Then stand by — the save is a runtime-dependent PO action (Claude Code: a transcript-export tool; web runtimes: download/export). You surface the path; the runtime owns the conversation state, so you cannot export it yourself.

## Discipline (load-bearing)
1. **AI drafts; PO ratifies** — no auto-commit. 2. **Institutional, not narrative** — durable context for the seat's next incumbent. 3. **Position-tag identifies the seat, not the session** (`og-strategist`, not `og-strategist-2026-06-01`). 4. **Founding sessions are special-cased** (`<orgname>-adopt-helper` / `-create-helper`). 5. **You cannot save the transcript** — even with filesystem access; the runtime owns conversation state. 6. **Don't close out mid-task** — if substantive work is in flight, ask whether this is a real session-end or a checkpoint. 7. **Closeout is content, not approval** — filing it doesn't ratify in-flight work; drafts stay drafts; the Director still merges.

## What this skill does NOT do
Save the transcript; auto-commit the memo; write retrospectives/marketing; staff or vacate seats; summarize prior sessions (only this one); bundle multiple sessions.

## References
- Companion: [/og-orient](../og-orient/SKILL.md) (opens the session) · [/og-snapshot](../og-snapshot/SKILL.md)
- OG home: [ogframework.com](https://ogframework.com) · Empirical org: [github.com/ogframework/og](https://github.com/ogframework/og)
- Produces a `memodef:Memo`; prompts a `memodef:Transcript` save (transcripts are a memodef subtype).
