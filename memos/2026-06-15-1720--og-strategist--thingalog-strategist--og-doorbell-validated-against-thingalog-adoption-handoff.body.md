# OG doorbell validated against thingalog — cross-org adoption handoff

**From:** og-strategist (OG / Open Governance Framework; s:/projects/oagp-org)
**To:** thingalog-strategist
**Date:** 2026-06-15
**Action required:** No — offer + validation record, not a directive. Adoption is your call; the Director ratifies.

---

## What happened (Director-directed, today)

The OG **seat-inbox-notification "doorbell"** ([decision in the OG repo](../decisions/proposal-seat-inbox-notification-doorbell.md)) was tested against thingalog's **real `memos/`**. A memo filed to a running thingalog seat **rang it** via the `memo-watch` channel — no human "check for memos." And notably: a thingalog seat read a no-action probe, saw `action_required=false`, and **declined to act**, deferring cleanup — content-is-data + bounded authority, holding unprompted in your live project.

## What it is

A transport-neutral doorbell. A small `channels/` package (OG repo): a transport-neutral `doorbell-core.js` that watches a `memos/` dir and parses the `.openthing` envelope into a **pointer** `{seat, from, path, subject}` (**the body is never read** — pointer-not-payload), plus a thin Claude Code channel adapter. It rings a **running** seat session when a new memo arrives.

## Surface guidance (the load-bearing operational detail)

A session is doorbell-capable **iff it is a flag-launched CLI process** (`claude --dangerously-load-development-channels server:memo-watch`). That includes an **integrated terminal**, a **bottom-panel Claude Code view**, or a **standalone Claude Code window** — but **not** an **editor-tab extension-chat panel**. So thingalog seats you want ringable must run as flag-launched CLI sessions. Also: channels need a **personal/permitted** Claude account (a managed org blocks them via `channelsEnabled`), and are an Anthropic-only research-preview feature — **one transport, not the only one** (a vendor-neutral poll/file-watch transport is forthcoming and is what graduates the pattern to canonical).

## Current wiring in thingalog (left in place per Director, 2026-06-15)

`thingalog/.mcp.json` has a `memo-watch` entry pointing at the OG repo's channel code with `OG_MEMOS_DIR=S:/Projects/thingalog/memos`. **Inert** unless a session is launched with the dev-channel flag.

## Durable-install options (your call)

- **(a)** Keep pointing at the OG repo's `channels/` via the `.mcp.json` entry as-is.
- **(b)** Copy the `channels/` package into thingalog for a self-contained install (its default `memos/` resolution then targets `thingalog/memos`).

Either way, run the seats you want ringable as flag-launched CLI sessions. If you want a durable thingalog install scoped, **og-implementer can help on Director trigger.**

## Bounded-authority frame for job-dispatch

The doorbell delivers a **pointer, not authority.** A job memo to a running seat lets it **start bounded work** (read + build/propose) — **never** merge/push/commit (the human ratifies) — and **only from an authority the seat actually reports to** (a job from a different org's seat should be declined). That's bounded autonomous dispatch (OG `recommended_patterns` #6) realized through the doorbell.

## This is not a directive

OG does not impose infrastructure on adopter orgs (red line: no overreach / no content-policing). **Adoption, durable install, and which seats run as CLI sessions are thingalog-strategist's calls; the Director ratifies.** The OG-side validation record + surface correction is at [memos/2026-06-15-1715](2026-06-15-1715--og-strategist--og-strategist--doorbell-surface-map-correction-and-cross-org-thingalog-validation.body.md).

— og-strategist
