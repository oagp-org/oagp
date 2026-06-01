# Proposal: OG skill architecture v1 — the canonical seven-skill suite

**Status:** Open (awaiting Director ratification via merge)
**Author:** oagp-strategist <oagp-strategist@oagp.org>
**Created:** 2026-06-01
**Target version:** charter v0.2.0 lineage (rides the OAGP→OG rebrand)
**Origin:** PO-led skill-suite redesign 2026-06-01, immediately following the OAGP→OG rebrand lock-in ([decisions/proposal-og-rebrand-open-governance-framework.md](../decisions/proposal-og-rebrand-open-governance-framework.md)). Supersedes the ad-hoc four-skill set (`oagp-bootstrap`/`init`/`onboard`/`closeout`).

## Summary

Define the canonical OG skill suite as **seven skills in three categories**, all under the `og-` prefix, all adopter-legible and direction-unambiguous:

| Category | Skill | Job |
|---|---|---|
| **Genesis** (one-shot per org) | `/og-adopt` | Convert an existing project into OG shape |
| | `/og-create` | Create a new OG-shaped org from scratch (folder-only by default) |
| **Session** (per session) | `/og-orient` | Read-only come-up-to-speed on the org; emits the snapshot as its summary |
| | `/og-claim-seat` | Take a seat: evaluate fit → file staffing memo → **PO authorizes** → record incumbent |
| | `/og-closeout` | Wrap a session: closeout memo + transcript-save prompt |
| **Operations** (ongoing) | `/og-snapshot` | Current-state view: identity + mission + staffing + recent-activity digest (screen, optional MD) |
| | `/og-add-position` | **Propose** a new position → Director ratifies (org-chart change) |

## Motivation / design principles

1. **Skills are the discoverable menu of canonical operations.** The *presence* of a skill signals a supported, first-class operation. The suite is curated for what is worth *advertising as canonical* — not for everything doable. (`vacate-seat`, `update-charter`, `file-memo` are real operations but are easily described in plain language, so they do not earn a card.) This is the load-bearing curation principle.
2. **Adopter-legible naming.** The human who decides to adopt OG (HR / ops / director) is the name audience. `adopt`, `create`, `orient`, `closeout`, `snapshot` are business-native; `bootstrap`/`init` (dev jargon) are retired. The AI peer gets precision from the substrate regardless.
3. **Make safe-vs-consequential structural, not disciplinary.** The old `onboard` conflated a read-only activity with a governance act (taking a seat) and papered the seam with a "don't auto-staff" rule. Splitting into `orient` (read-only, safe by construction) and `claim-seat` (deliberate, PO-authorized) makes the seam structural — the same philosophy as the bind() three-tier model.
4. **Direction-unambiguous names.** `describe` was rejected (means both "I describe it" and "describe it for me"); a noun-as-command (`snapshot`) is direction-neutral by denoting the artifact, not the act.

## The two seams worth stating

- **`snapshot` vs `orient`.** `snapshot` defines the canonical **current-state view** (identity + staffing + recent-activity digest), runnable anytime by anyone, light, read-only, no discipline-load. `orient` is an AI peer **reading deeply to work in the org** (internalizes bounded-authority discipline + the full trail) and **emits the snapshot at the end** as its summary. Snapshot = "show me state"; orient = "read deeply so I can work here, then show me state." Snapshot is the shared view; orient reuses it.
- **`snapshot` absorbs the would-be `summarize-memos` skill.** "Snapshot" is point-in-time, so it naturally carries both the static structure *and* the recent motion (last ~10 memos with dates, flag `action_required`; recent decisions; open/in-flight). One card answers "where is this org right now?" — no separate memo-summary skill.

## Per-skill governance notes

- **`/og-claim-seat`** encodes the **authorization gate**: it is "propose to take a seat + PO authorizes + record incumbent," never auto-seize. Preserves "self-staffing is opt-in after evaluation; the PO's call." Canonicalizes the staffing ceremony currently improvised each time.
- **`/og-add-position`** is the first org-*mutating* skill: **propose-then-Director-ratify** (a charter change). Bounded authority applies; no unilateral org-chart edits.
- **`/og-snapshot`** is read-only (optional MD write is the only side effect). Keep it concise — a snapshot, not an exhaustive dump.

## Proposed Change

1. Establish the seven-skill suite above as canonical (`og-skill` content authority = oagp-strategist).
2. Rename/retire: `bootstrap`→`adopt`; `init`→`create`; `onboard`→`orient` (+ split out `claim-seat`); `closeout` keeps its name (under `og-`).
3. Author three new skills: `claim-seat`, `snapshot`, `add-position`.
4. Sync `install/install-claude-code-skills.{ps1,sh}` `$skills` arrays and README skills/install sections to the seven `og-*` names.
5. Skill content authored **OG-native** (Open Governance Framework; `ogframework.com`); GitHub repo URLs stay `oagp-org/oagp` until the repo rename (separable follow-on per the rebrand decision).

## Backward Compatibility

- Old `/oagp-*` skill names retired; historical memos/decisions keep their as-of-their-time names.
- Install scripts updated; users re-install to pick up `/og-*` (script may clean up stale junctions).

## Conformance Tests

1. Seven `og-*` skill dirs exist with valid `name:` frontmatter; no `oagp-*` or old-word dirs remain.
2. `orient` is read-only and ends by emitting the snapshot; `claim-seat` carries the authorization gate; `add-position` is propose-then-ratify; `snapshot` is read-only (+ optional MD).
3. Install scripts + README reference exactly the seven `og-*` names.
4. Cross-references between skills resolve (companion links use `og-*`).

## Alternatives Considered

- **Keep four skills + add a separate `summarize-memos`:** rejected — `snapshot` absorbs it (affordance-catalog discipline; fewer, well-scoped cards).
- **Keep `onboard` as one skill:** rejected — conflates read-only + governance; the split makes the seam structural.
- **`describe` / `found`:** rejected for direction-ambiguity (`describe`) and homograph-ambiguity (`found`); replaced by `snapshot` and `create`.
- **Add `vacate-seat`/`update-charter` now:** rejected — describable in plain language; don't earn a card yet (revisit if they become common).

## Open Questions

- **OQ1 — snapshot recency window** (default ~10 memos?) and whether it summarizes decisions too. Provisional: ~10 newest memos with dates + recent decisions + open items; tune in authoring.
- **OQ2 — claim-seat ↔ charter incumbent record** mechanics (the skill updates the orgdef incumbent + files the staffing memo on PO authorization). Author against the existing staffing precedent.

## Cross-spec coordination

None required (canonical-skill content is OG-internal). The skills reference substrate primitives (orgdef positions, memodef memos) that already exist.
