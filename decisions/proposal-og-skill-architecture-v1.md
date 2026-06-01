# Decision: OG skill architecture v1 — the canonical seven-skill suite

**Disposition:** Accept (Director-ratified by direction 2026-06-01 "Yes! Proceed"; merge seals it)
**Origin:** [proposals/og-skill-architecture-v1.md](../proposals/og-skill-architecture-v1.md)
**Decided:** 2026-06-01 by oagp-strategist on direct Director direction, in the skill-suite redesign immediately following the OAGP→OG rebrand lock-in.
**Authorization:** PO-led redesign + explicit "proceed." Canonical-skill content + adoption-cycle architecture is delegated strategist authority; Director ratifies-by-merge.

## Disposition

Lock the seven-skill OG suite — **adopt, create, orient, claim-seat, closeout, snapshot, add-position** — in three categories (Genesis / Session / Operations), under the `og-` prefix, authored OG-native.

## Rationale

Captured in the proposal; the load-bearing points: (1) **skills are the discoverable menu of canonical operations** — curate for advertise-worthiness, not exhaustiveness; (2) **adopter-legible naming** (the human adopter is the name audience); (3) **make safe-vs-consequential structural** — split `onboard` into `orient` (read-only) + `claim-seat` (PO-authorized); (4) **direction-unambiguous names** — `snapshot` (noun-as-command) over `describe`, `create` over `found`. `snapshot` absorbs the would-be memo-summary skill and is point-in-time by nature, carrying both static structure and recent activity.

## Resolutions to Open Questions

- **OQ1 (snapshot window):** ~10 newest memos with dates + flag `action_required`; recent decisions; open/in-flight items. Keep it concise — a snapshot, not a dump.
- **OQ2 (claim-seat mechanics):** on PO authorization, file the staffing memo and record the incumbent in the orgdef — per the existing staffing precedent (the strategist + implementer seat-staffing events).

## Build directive (this decision's execution; strategist-scope unless noted)

1. **Rename/retire:** `og-bootstrap`→`og-adopt`; `og-init`→`og-create`; `og-onboard`→`og-orient`; `og-closeout` keeps its name. (Dirs already `og-`-prefixed from the in-flight rename; this completes the word changes.)
2. **Author three new skills:** `og-claim-seat`, `og-snapshot`, `og-add-position`.
3. **Rewrite the four renamed skills OG-native** (Open Governance Framework; `ogframework.com`); `orient` sheds the staffing content (→ `claim-seat`) and ends by emitting the snapshot.
4. **Sync** `install/install-claude-code-skills.{ps1,sh}` `$skills` arrays + README skills/install sections to the seven `og-*` names.
5. **GitHub repo URLs** stay `oagp-org/oagp` until the repo rename (separable follow-on per the rebrand decision).

**Sequenced separately (not this decision's commit):** charter rebrand → v0.2.0 (OAGP→OG; its own careful pass); site/primer rebrand (implementer); domain DNS + repo/org rename (Director/ops).

## Cross-spec coordination

None. Canonical-skill content is OG-internal.

## Notable design choices

1. **Affordance-catalog principle** recorded as canonical: the skill suite is the menu of advertise-worthy operations; `vacate`/`update`/`file-memo` are describable in plain language and don't earn a card.
2. **orient/snapshot seam:** snapshot defines the current-state view; orient reuses/emits it. DRY + distinct.
3. **Structural safe-vs-consequential split** (orient vs claim-seat) mirrors the bind() three-tier philosophy.
4. **Two-word names only where a single word is ambiguous** (`claim-seat`, `add-position`); the rest single-word.
5. **OG-native authoring now** so the suite reads uniformly; repo URLs lag until the repo rename, by design.

## Items not incorporated

- Separate `summarize-memos` skill — absorbed by `snapshot`.
- `vacate-seat` / `update-charter` — describable; no card yet (revisit if common).
- `describe` / `found` names — superseded.
- Charter rebrand, site, repo rename — sequenced separately.

## Workflow validation

Rides the OAGP→OG rebrand (charter → v0.2.0 in its own pass). This decision + the skill build land together; the charter rebrand follows as its own careful commit. Historical artifacts keep their as-of-their-time skill names.

## Forward-reference resolution

- Skill build (rename 4 + author 3 + install + README) → this decision's execution.
- Charter rebrand → v0.2.0 (next pass).
- Site/primer, domain, repo/org rename → implementer / Director-ops.

## References

- Proposal: [proposals/og-skill-architecture-v1.md](../proposals/og-skill-architecture-v1.md)
- Rebrand lock-in: [decisions/proposal-og-rebrand-open-governance-framework.md](proposal-og-rebrand-open-governance-framework.md)
- Supersedes the skill-naming portions of: proposal-oagp-adoption-cycle-canonical-promotion, proposal-oagp-closeout-canonical-promotion, proposal-oagp-init-canonical-promotion (the skills themselves remain canonical; only names/structure change).
