# Decision: OG skill suite v2 — six cards, verb-object naming, composed seams

**Disposition:** Accept (Director-ratified 2026-08-24, "Reviewed and ratified"; merge seals it)
**Origin:** [proposals/og-skill-suite-v2.md](../proposals/og-skill-suite-v2.md)
**Decided:** 2026-08-24 by og-strategist under Director direction, in a card-by-card review prompted by an unbriefed adopter-org field report.
**Authorization:** Canonical-skill content and adoption-cycle architecture is delegated strategist authority; the Director ratifies. Each rename was individually Director-settled during the review; the assembled proposal was then ratified whole.

## Disposition

The canonical suite becomes **six cards**: `og-create-org`, `og-describe-org`, `og-orient`,
`og-claim-seat`, `og-close-session`, `og-add-seat`. Supersedes the naming and card-inventory
portions of [proposal-og-skill-architecture-v1](proposal-og-skill-architecture-v1.md); that
decision's category structure and safe-vs-consequential principle stand.

| Was | Now |
|---|---|
| `og-adopt` + `og-create` | `og-create-org` (merged; `og-adopt` retained as alias) |
| `og-snapshot` | `og-describe-org` |
| `og-closeout` | `og-close-session` |
| `og-add-position` | `og-add-seat` |
| `og-orient` | unchanged in name; content thinned |
| `og-claim-seat` | unchanged in name; now composes `og-orient` |

## Rationale

Captured in the proposal. Load-bearing points: (1) the genesis pair was a coin-flip an adopter had
to call at first contact, and reading both SKILL.md files showed **phases 2–5 were identical** — only
Phase 1 differed; (2) `snapshot` sat on the natural name of *org-state-fork* (pattern #4), a
consequential operation, in a suite organized around the safe/consequential split; (3) `claim-seat`
and `add-position` named one object with two nouns, and pattern #2 is named *seat-vs-incumbent*, so
the charter's own vocabulary settled it; (4) prerequisites were enforced by prose; (5) the operating
discipline lived only in a skill, and an adopter org with no skills installed therefore had no
guardrails at all.

## Resolutions to Open Questions

- **OQ1 (alias mechanism):** unresolved by design; aliases remain a **requirement of acceptance**.
  The renames MUST NOT ship before aliases work. If the mechanism proves costly, the fallback is to
  execute the structural changes (merge, composition, discipline relocation) and hold the renames.
- **OQ2 (transcript convention):** the position-tagging convention is independent of the card's
  name. Confirm on execution that nothing reads the card name as the convention's identity.
- **OQ3 (thinning `orient` in Claude Code):** accepted deliberately. `CLAUDE.md` auto-loads there,
  so the redundancy is the safety margin; orient's remaining audience is non-auto-loading runtimes.

## Notable design choices

1. **Naming rule, two axes.** *Verb + object, where the object is named whenever it is not obvious
   from the verb* — plus a **frequency corollary** (Director): a frequently-typed card pays its name
   on every invocation, so brevity earns its keep; a rare, high-consequence card should be
   unmissable instead. Recorded as a **new** rule, not a rediscovered one: the v1 suite did not
   follow it, since `adopt` and `create` were consequential single-word cards.
2. **Ambiguity on a read-only card is cheap.** Spend words where a misread costs something.
3. **Composition over prose.** `og-describe-org` ← `og-orient` ← `og-claim-seat`; each independently
   runnable, each calling down. Converts a stated precondition into a structural one — the same move
   the v1 decision made when it split `onboard`.
4. **Discipline moved to the generated `CLAUDE.md`.** A guardrail that lives in a skill disappears
   when the skills do. This is the field-report failure, and it is written as conformance test 1.
5. **The merge fixes a defect, not just duplication.** `og-adopt` never instructed the seat to
   interview the PO; the merged Phase 1 surveys *and* interviews, which is better than either card
   alone.

## Items not incorporated

- `og-describe-seat` — **parked**, not rejected. Real gap (nothing shows one seat read-only), one
  derivation. Same disposition v1 gave `vacate-seat` / `update-charter`: revisit if it recurs.
- Renaming `orient` to `brief` / `read-in` / `describe-seat` — rejected; recorded with reasons in
  the proposal.
- Merging `orient` into `claim-seat` — rejected: read-only vs. state-changing is the suite's
  load-bearing split.

## Build directive (strategist-scope unless noted)

1. Rename four cards; merge `og-adopt` into `og-create-org` with Phase 1 branching on whether a
   project already exists; retain `og-adopt` as an alias.
2. `og-create-org`: write the discipline **inline** into the generated `CLAUDE.md`; stop creating an
   empty `skills/`; founding memo slug `--og-create-org-ratified`.
3. Compose the seams (design choice 3); thin `orient` per OQ3.
4. Sync `install/install-claude-code-skills.{ps1,sh}` `$skills` arrays, README, `CLAUDE.md`.
5. Charter → **v0.2.2**: `scope` and `v1_success_criterion` both enumerate skill names.
6. Records untouched — `decisions/`, `proposals/`, `memos/`, `transcripts/`, `history[]`, `authors[]`.

## Workflow validation

Interacts with [proposal-communication-substrate-and-seat-notification-v1](proposal-communication-substrate-and-seat-notification-v1.md),
ratified the same day, whose §E adds `og-change-comms-substrate` — taking the suite back to seven.
Recorded as deliberate: that proposal states the accounting rather than letting the count drift.

## Cross-spec coordination

None. Canonical-skill content is OG-internal.

## Notes

The review rejected more than it accepted. Five candidate changes were examined and turned down on
the merits; three of the six cards keep their names. Recorded because a later reader should be able
to see the suite was tested rather than repainted.

## References

- Proposal: [proposals/og-skill-suite-v2.md](../proposals/og-skill-suite-v2.md)
- Supersedes in part: [proposal-og-skill-architecture-v1](proposal-og-skill-architecture-v1.md)
- Origin: adopter-org field report (edgreenlight), Director-relayed 2026-08-24
- Session record: memos/2026-08-24-1924
