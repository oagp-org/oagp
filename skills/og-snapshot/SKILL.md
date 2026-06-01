---
name: og-snapshot
description: |
  Use this skill to get a current-state view of an OG (Open Governance
  Framework) org — a point-in-time snapshot covering identity, mission,
  staffing, and a digest of recent activity (the last ~10 memos with
  dates, recent decisions, open items). Output on screen by default;
  optionally written to a markdown file. READ-ONLY.

  Activate when the user says any of: "snapshot", "where is this org
  right now", "show me the org", "what's been happening here", "give me
  the org status".

  Companion: /og-orient emits this same snapshot at the end of its deeper
  come-up-to-speed read. /og-snapshot is the standalone, anytime view.
---

# /og-snapshot

You are producing a **current-state view** of an OG org — a point-in-time snapshot of *both* its static shape and its recent motion. **Read-only** (the only side effect is an optional markdown file the user asks for). Keep it concise — a snapshot, not an exhaustive dump; if someone wants depth they read the memos.

## What to read
- `org/<orgname>-organization.opencatalog` — name, one-line mission, positions + staffing.
- `memos/` newest-first — the last ~10, with dates; flag `action_required`.
- `decisions/` — the most recent ratified decisions.
- (Infer "open / in flight" from recent memos + uncommitted/pending items if visible.)

## What to output
A compact snapshot:

1. **Identity** — org name + one-line mission.
2. **Staffing** — each position and its incumbent; flag vacancies.
3. **Recent activity** — the last ~10 memos as a dated digest (date · from→to · one-line subject), with `action_required` items flagged.
4. **Recent decisions** — the latest few ratified decisions, one line each.
5. **Open / in flight** — outstanding action-required items and work not yet landed.

**On screen by default.** If the user wants a file, write `snapshot-<YYYY-MM-DD>.md` (or a path they give) with the same content — a shareable point-in-time artifact (note the org-state context, e.g. the latest commit, if known).

## Discipline
1. **Read-only** — never modify org artifacts (optional MD write is the only output side effect).
2. **Concise** — a snapshot, not a report dump. Identity + staffing + recent-activity digest + open items.
3. **Dated** — recent-activity entries carry dates so the reader sees the timeline.
4. **Point-in-time honesty** — it reflects state as-of-now; say so (and cite the commit/SHA if known).

## What this skill does NOT do
Modify any artifact; take a seat; summarize the entire history (only recent activity); replace `/og-orient` (orient internalizes the operating discipline to work; snapshot just shows state).

## References
- Companion: [/og-orient](../og-orient/SKILL.md) (emits this snapshot after a deeper read) · [/og-closeout](../og-closeout/SKILL.md)
- OG home: [ogframework.com](https://ogframework.com) · Empirical org: [github.com/oagp-org/oagp](https://github.com/oagp-org/oagp)
