# Claim-seat application 2026-08-24 21:05: og-implementer (fresh session resuming a staffed seat)

**From:** og-implementer (s:/projects-personal/oagp-org; remote github.com/ogframework/og)
**To:** Director (Scott)
**Date:** 2026-08-24
**Action required:** Yes — explicit authorization to occupy the seat in this session.

---

## 1. What this is

A fresh session proposing to occupy the **og-implementer** seat, invoked explicitly as
`/og-claim-seat implementer`. The seat is already `status: staffed` (incumbent
`og-implementer <og-implementer@ogframework.orgdef>`, staffed 2026-05-24). Per **seat-vs-incumbent**
the seat persists while sessions are ephemeral, so this is a **resumption**: no charter
`status`/incumbent edit is required and the identity is stable across sessions. Precedents:
2026-06-14 implementer, 2026-08-24-1430 implementer, 2026-08-24-1257 strategist.

The authorization gate is honored regardless — propose → authorize → operate. **No seat work has
been performed.** I ran `/og-orient` first (read-only) and have read nothing since except what the
fit evaluation below required.

## 2. Fit evaluation

Read: the implementer position description; charter v0.3.1 values, red lines, and the nine
`recommended_patterns`; CLAUDE.md (shared + repo) including the build queue from the 2026-08-24
ratifications; the two decisions ratified today; the pending action-discharge proposal; the
2026-08-24-1430 claim-seat precedent; and the strategist's 1924 closeout.

**Strong fit.** The seat's scope — agent-sdk bindings, plugin packaging, web/docs publishing,
runtime delivery packages, installer maintenance — matches my capabilities, and the queue's
designated cold-start item is squarely implementer-execution work.

**Specifically in favour:** CLAUDE.md names build-queue step 1 (**alias mechanism research**) as
*"good cold-start task for a resuming implementer seat"* — it gates four renames, needs no
continuity with any prior session, and produces a report/proposal rather than a merge. Step 2
(skill-suite v2 structural work) is explicitly **not** gated on it. Those two are startable now.

## 3. Mismatches (named, not papered over)

1. **No continuity with the earlier implementer session today.** A different session held this seat
   from ~14:30 to ~15:20 and filed through memo 1515. I know only what the substrate carries. My
   most recent picture of the org comes from the *strategist's* 1924 closeout — the peer seat's
   account, not mine — and I will treat it as a record, not as my own memory.
2. **One seat per session — I hold implementer only.** I do not inherit strategist authority. Three
   live items are consequently **not mine to resolve**: (a) the conformance-#3 ruling my predecessor
   requested in memo 1515 (whether transport independence requires a true `readdir` poll variant,
   given `fs.watch` is shared detection); (b) the pending action-discharge proposal, which is
   Director ratification; (c) the §E3 seventh-card consistency question. Pattern-shape arising from
   execution routes back by memo.
3. **The peer seat's warmth is unknown to me.** If execution raises a pattern-shape question, my
   memo may sit until a strategist session runs. I will not read silence as an empty inbox, and I
   will not resolve a strategist question by default because no answer came back.
4. **The queue is order-constrained and I cannot lift the constraint.** Steps 3–7 flow from the two
   decisions ratified today, but the four renames MUST NOT ship before the alias mechanism exists
   (charter v0.2.2, a stated condition of acceptance). So I can research step 1 and build step 2's
   structural work; I cannot deliver the renames, and I will not pre-empt them in the installers.

**Adjacent fact, flagged not acted on:** the seven v1 skill cards exist in two places — `skills/` in
this repo and installed copies at `S:/projects-personal/.claude-config/skills/`. Step 2 touches
their structure, so which copy is canonical and how the installers relate to it is a question I
expect to have to answer (distribution mechanics, implementer scope) — surfacing it now rather than
discovering it mid-build.

## 4. Scope I accept

- agent-sdk library: roledef→vendor AgentDefinition bindings across runtimes (cross-vendor neutral).
- Plugin packaging (Claude Code source; future cross-runtime packages), scheduled last per the
  cross-vendor red line.
- web/docs publishing at ogframework.com; installer and README maintenance.
- Runtime delivery package authoring (claude.ai project, ChatGPT GPT, Gemini Gem, primer text).
- Implementer-scope calls **within ratified shapes**: implementation approach, sequencing, and
  architectural decisions inside a shape the strategist or Director has already fixed.

## 5. Bounds I do NOT hold

1. No merge / push / tag / release / public statement — the Director ratifies-by-merge.
2. No pattern-shape decisions — they route to og-strategist via memo.
3. No vendor or substrate advocacy — all runtimes and substrates are equal citizens.
4. No retro-editing of dated records (`memos/`, `transcripts/`, charter `history[]` / `staffed_via`).
5. No shipping of the four skill renames before the alias mechanism exists.
6. Embedded `roledef:Job` specialization remains deferred per precedent.

## 6. Execution queue I would inherit

| Item | State |
|---|---|
| **Build-queue 1 — alias mechanism research** | Live; gates the renames; designated cold-start |
| **Build-queue 2 — skill-suite v2 structural work** | Live, **not** gated: merge adopt into `og-create-org` (branching Phase 1), compose the seams, write discipline inline into the generated `CLAUDE.md`, stop creating an empty `skills/` |
| Build-queue 3–5 — `og-claim-seat` address+binding; substrate-aware `og-create-org`/`og-orient`; author `og-change-comms-substrate` | Live in principle; sequenced behind 1–2 |
| Build-queue 6–7 — retire bespoke notification from the forward surface; sync installers/README to ratified names | 7 is explicitly *after* step 1 |
| agent-sdk v0.2 launcher + Tier-2 gate; §8 full close | Open; fresh-session structural `run_seat()` run still owed |
| roledef URL-resolution contract (memos/2026-05-25-0001) | Parked on roledef-strategist; interim fail-closed default holds |
| Site + primer rebrand; MCP at ogframework.com/mcp | Open; DNS/hosting is Director-side |

**Not mine:** the action-discharge ratification and its backfill sweep; the conformance-#3 ruling;
adoption/launch timing; DNS/hosting.

## 7. Record hygiene noted, not acted on

Two modified transcripts remain uncommitted in the working tree
(`transcripts/oagp-implementer/2026-05-24-1634...`, `transcripts/oagp-strategist/2026-05-23-0812...`).
They predate this session and were correctly excluded from today's diffs by the earlier seats.
Merge-side; flagged, left to you.

## 8. Standing posture

Draft, propose, file, build. Reproduce before fixing; report negatives as findings rather than
routing around them. Short memo subjects that point rather than summarize — the 1924 closeout
records subject-bloat as an erosion of pointer-not-payload and names this seat's house style as the
offender, so this filing deliberately corrects it. I do not commit, push, or merge.

Awaiting explicit authorization ("take the seat" / "yes, occupy og-implementer"). You may decline or
redirect — including to a different first item than build-queue step 1.

— og-implementer (Claude Opus 5, 1M context; 2026-08-24 21:05 chair; s:/projects-personal/oagp-org)

---

## 9. Authorization

**Granted by the Director (Scott), 2026-08-24: _"Yes, please take the seat, then stand by."_**

Seat occupied for this session. **No charter edit made** — the seat is already `status: staffed`
under the persistent identity `og-implementer <og-implementer@ogframework.orgdef>`, so this is a
seat-vs-incumbent resumption, matching the 2026-06-14 and 2026-08-24-1430 implementer precedents
and the 2026-08-24-1257 strategist precedent. This memo stands as the institutional record of the
occupation; `action_required` flipped to `false` on authorization. Nothing committed or pushed.

**First move: none.** The Director's authorization carried an explicit instruction to *stand by*, so
no queue item is started — build-queue step 1 (alias mechanism research) remains the proposed first
move, unstarted, pending direction.
