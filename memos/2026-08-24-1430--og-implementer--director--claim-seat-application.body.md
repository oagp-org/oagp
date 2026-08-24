# Claim-seat application 2026-08-24: og-implementer (fresh session resuming a staffed seat)

**From:** og-implementer (s:/projects-personal/oagp-org; remote github.com/ogframework/og)
**To:** Director (Scott)
**Date:** 2026-08-24
**Action required:** Yes — explicit authorization to occupy the seat in this session.

---

## 1. What this is

A fresh session proposing to occupy the **og-implementer** seat. The seat is already
`status: staffed` (incumbent `og-implementer <og-implementer@ogframework.com>`, staffed
2026-05-24). Per **seat-vs-incumbent** the seat persists while sessions are ephemeral, so this
is a *resumption*, not a vacant-seat claim, and no charter `status`/incumbent edit is required —
the bot identity is stable across sessions. This matches the 2026-06-14 implementer precedent and
the og-strategist resumption filed earlier today. The authorization gate is honored regardless:
propose → authorize → operate. No seat work has been performed.

**On the target seat.** This session was invoked as `/og-claim-seat` with no argument, but the two
preceding commands both named the implementer (`/og-add-position implementer`, then
`og-implementer`), and there is an unactioned `action_required` memo addressed to `og-implementer`
filed eight minutes ago. I have read that as the intended seat. If it is not, decline or redirect
at the gate below.

## 2. Fit evaluation

Read the implementer position description, the charter values and red lines, CLAUDE.md's
known-work-items, the 2026-06-14 claim-seat precedent, the 2026-05-29 closeout, and the live
inbox memo. The scope — agent-sdk bindings, plugin packaging, web/docs publishing at
ogframework.com, runtime delivery packages — matches my capabilities. **Strong fit**, with one
specific point in its favour and three mismatches named rather than papered over.

**In favour, specifically:** the top-ranked inbox item (the installer junction hazard) explicitly
requires reproduction on Windows PowerShell 5.1 before a fix is chosen. This host runs
`5.1.26100.9168` and exposes it directly. The exact hazardous surface is available to me, so that
item can be settled empirically rather than carried as a phantom.

## 3. Mismatches (named, not papered over)

1. **~10-week gap.** The last implementer session was 2026-06-15. Every "do X" in `memos/` older
   than today is a point-in-time record, not a live instruction. I will verify currency with you
   before acting on anything predating today, and treat only the 2026-08-24-1422 memo as live on
   its face.
2. **No continuity claim.** I know nothing the substrate does not carry. Where the record is
   ambiguous I will surface the ambiguity rather than reconstruct it.
3. **One seat per session — I hold implementer only.** The og-strategist seat is occupied today by
   a *different* session, which authored the inbox memo I am about to act on. I do not inherit its
   authority. Pattern-shape questions arising from execution route back to that seat by memo; I do
   not resolve them. Concretely, the two items that memo deliberately withheld — the
   operations-addressability proposal and the skill-suite rename/merge — are **not** mine to start,
   and I will not pre-emptively touch the installer `$skills` arrays.

## 4. Scope I accept

- agent-sdk library: roledef→vendor AgentDefinition bindings across runtimes (cross-vendor neutral).
- Plugin packaging (Claude Code source; future cross-runtime packages).
- web/docs publishing at ogframework.com; installer and README maintenance.
- Runtime delivery package authoring (claude.ai project, ChatGPT GPT, Gemini Gem, primer text).
- Implementer-scope calls *within ratified shapes*: implementation approach, sequencing,
  architectural decisions inside a shape the strategist/Director has already fixed.

## 5. Bounds I do NOT hold

1. No merge / push / tag / release / public statement — the Director ratifies-by-merge.
2. No pattern-shape decisions — they route to og-strategist via memo.
3. No vendor or substrate advocacy — all runtimes and substrates are equal citizens.
4. No retro-editing of dated records (`memos/`, `transcripts/`, charter `history[]`/`staffed_via`) —
   settled policy, and directly load-bearing on inbox item 4.
5. Embedded `roledef:Job` specialization remains deferred per precedent.

## 6. Open execution items I would inherit

| Item | State |
|---|---|
| Field-report item 1 — `install-claude-code-skills.ps1:44` junction hazard | **Live, ranked first.** Reproduce on PS 5.1 (available here), then fix or close as non-issue |
| Field-report item 2 — `README.md:9` Status block misinforms adopters | Live; rewrite to v0.2.1 fact + audit rest of README |
| Field-report item 3 — stale `cd oagp-org` in both installer headers (4 occurrences) | Live; cosmetic, fix in passing |
| Field-report item 4 — `agent-sdk/examples/bind_time_travel.py:23` hardcoded path | Live; make relative/env-driven per the `channels/src/memo-watch-channel.js:30` house pattern |
| Vendor-neutral doorbell poll transport (memos/2026-06-15-1600) | Authorized 2026-06-15, unbuilt; **currency to confirm** before starting |
| agent-sdk v0.2 launcher + Tier-2 gate; §8 full close | Open; fresh-session structural `run_seat()` run still owed |
| roledef URL-resolution contract (memos/2026-05-25-0001) | Parked on roledef-strategist; interim fail-closed default holds |
| Site + primer rebrand; MCP at ogframework.com/mcp | Open; DNS/hosting is Director-side |
| v0.3 Claude Code plugin packaging | Scheduled last, per cross-vendor red line |

**Not mine:** operations-addressability, skill-suite rename/merge (both arrive later as ratified
decisions), adoption/launch timing, and DNS/hosting.

## 7. Record hygiene noted, not acted on

Twelve untracked memo files (including today's two) and two modified transcripts sit uncommitted,
and `.wrangler/` is unignored. That is a merge-side matter; I flag it and leave it to you.

## 8. Standing posture

Draft, propose, file, build. Reproduce before fixing. One tight action-required memo per
ratification item, and a reply to the strategist closing out the field report with what reproduced
and what did not. I do not commit, push, or merge.

Awaiting explicit authorization ("take the seat" / "yes, occupy og-implementer"). You may decline
or redirect.

— og-implementer (Claude Opus 5, 1M context; 2026-08-24 chair; s:/projects-personal/oagp-org)

---

## 9. Authorization

**Granted by the Director (Scott), 2026-08-24: _"please take the seat."_**

Seat occupied for this session. No charter edit made — the seat is already `status: staffed` under
the persistent identity, so this is a seat-vs-incumbent resumption, matching the 2026-06-14
implementer and 2026-08-24 strategist precedents. This memo stands as the institutional record of
the occupation; `action_required` flipped to `false` on authorization. Nothing committed or pushed.

First move per the stated plan: field-report **item 1** — reproduce the junction-delete on Windows
PowerShell 5.1, then fix or close it as a non-issue.
