# Correction + extension — doorbell surface map & cross-org thingalog validation

**From:** og-strategist (s:/projects/oagp-org)
**To:** og-strategist (institutional capture)
**Date:** 2026-06-15
**Action required:** No

Corrects gate #3 of the [2026-06-15-1145 Path A findings](2026-06-15-1145--og-strategist--og-strategist--channels-path-a-validated-doorbell-transport-findings.body.md) and records cross-org validation. Director-directed.

---

## 1. Correction — gate #3 was overstated

The 1145 findings, the proposal, and the decision all said **"channels are terminal-CLI-only, not the panel."** Two empirical tests this session disproved that:

- The Director launched memo-watch in a **bottom-panel "Claude Code" view**, then a **standalone Claude Code window** — **both received the doorbell.**
- The Director typed the launch flag into an **editor-tab extension panel** — it correctly replied it's *not a command it can run* (*"can't re-launch claude from inside a session"*).

**Corrected rule (the unifying principle):** a session is channel-capable **iff it is a flag-launched CLI process** (`--channels` / `--dangerously-load-development-channels`) — **regardless of where it's docked** (integrated terminal, bottom-panel Claude Code view, or standalone window). The **editor-tab extension chat is not** such a process and cannot host a channel.

**Practical consequence:** to have a doorbell-able working seat, run it as a flag-launched CLI session (terminal or standalone window), **not** an editor-tab panel.

## 2. Cross-org validation (new — Path A/B were OG-repo-internal)

With thingalog's `.mcp.json` carrying a `memo-watch` entry pointed at `OG_MEMOS_DIR=S:/Projects/thingalog/memos`, memos filed into thingalog's **real `memos/`** rang live thingalog seats. The org-agnostic `doorbell-core.js` ran **unchanged** against a different, active, multi-seat org (269 memos; `thingalog-strategist`, `implementer`, `thingalog-ux-engineer`, `thingalog-performance-engineer`).

**The safety posture held in the wild:** a thingalog seat read a no-action probe, recognized `action_required=false`, **explicitly declined to act**, and deferred cleanup to og-strategist — content-is-data + bounded authority, unprompted, in someone else's live project.

## 3. Bounded autonomous dispatch — observed (charter #6 realized)

The Director ran a standalone window occupying thingalog's **already-staffed implementer seat** with the doorbell loaded (the rejected write was the claim-seat *application* memo — correctly unnecessary for an already-staffed seat). This means a **job memo from a legitimate authority can ring the implementer and it *starts*** — with two guardrails:

1. **"Start" = bounded:** build/propose, **never** merge/push/commit. The human ratifies. The doorbell delivers a *pointer*, not authority.
2. **Legitimate authority only:** the job must come from an authority the seat actually reports to (thingalog-strategist / Director). A job from a *different* org's strategist should be **declined**.

This is the agent-sdk v0.2 three-tier model meeting the doorbell: **doorbell = trigger, session = execution, bounded authority = guardrail.**

## 4. Net conclusion — unchanged

The other three gates (vendor-only, research-preview, org-policy) still hold, so **channels remains one reference transport, never canonical.** The **vendor-neutral transport still earns** the `recommended_patterns.general` promotion under #8. The correction makes channels *more* useful (more surfaces), not canonical.

## 5. What was corrected where

- **In place (forward content):** proposal gate #3, decision rationale, CLAUDE.md doorbell bullet.
- **Retained unedited (point-in-time record):** the [1145 findings memo](2026-06-15-1145--og-strategist--og-strategist--channels-path-a-validated-doorbell-transport-findings.body.md) — this memo supersedes its gate #3 rather than rewriting history.

— og-strategist
