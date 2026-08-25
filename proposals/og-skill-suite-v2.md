# Proposal: OG skill suite v2 — six cards, verb-object naming, composed seams

**Status:** Draft — awaiting Director ratification
**Author:** og-strategist
**Created:** 2026-08-24
**Target version:** charter v0.2.2 (two charter fields enumerate skill names); supersedes the naming and card-inventory portions of [decisions/proposal-og-skill-architecture-v1.md](../decisions/proposal-og-skill-architecture-v1.md)

## Origin

Director-led review of the canonical skill names on 2026-08-24, card by card, prompted by a field report from a session operating inside **edgreenlight** — a non-spec adopter org, OG-shaped via `/og-create` on 2026-06-12 — relayed by the Director. The reporter was unbriefed and had no stake in the outcome.

The review was not a repaint. Each card was tested against the question *"is this really a distinct operation?"*, and several proposed changes were **rejected** on examination (see Alternatives Considered). What survived is below.

## Summary

Six cards instead of seven. Two renames, one merge, two names unchanged, and three structural changes that fell out of the naming review but matter more than the names do.

| Current | Proposed | Change |
|---|---|---|
| `og-adopt` + `og-create` | **`og-create-org`** | Merged into one card; `og-adopt` retained as an alias |
| `og-snapshot` | **`og-describe-org`** | Renamed |
| `og-closeout` | **`og-close-session`** | Renamed |
| `og-add-position` | **`og-add-seat`** | Renamed |
| `og-orient` | `og-orient` | Name unchanged; content thinned |
| `og-claim-seat` | `og-claim-seat` | Name unchanged; now composes `og-orient` |

## Motivation

### 1. The genesis pair was a coin-flip the adopter had to call before knowing anything

`adopt` and `create` are both genesis operations, and in plain English *"adopt OG"* means "start using OG" — which is what both do. The distinction that actually matters (existing project vs. greenfield) appears in neither word. This is the framework's **first contact**, and it asked the adopter to choose correctly at the moment they knew least.

Reading both SKILL.md files settles it: **phases 2–5 are the same operation.** Propose a charter, stop; PO ratifies; instantiate; hand off to `/og-orient` and `/og-claim-seat`. Only Phase 1 differs — survey an existing project vs. interview the PO. The three discipline items unique to each card are all downstream of that one phase.

### 2. `snapshot` sits on the name of a different, consequential operation

Canonical pattern #4 is *org-state-fork-for-time-travel* — `git worktree add <path> <sha>` to preserve organizational context at a commit. That operation has no canonical name, and "snapshot the org" is how a person would say it. So the suite's lightest read-only card holds the natural name of a state-producing one, in a suite whose organizing property is that safe and consequential operations are structurally distinct (design note #3 of the v1 decision). `describe` carries a strong pre-learned read-only idiom (`kubectl describe`, `aws describe-*`, SQL `DESCRIBE`).

### 3. The suite used two nouns for one thing

`claim-seat` and `add-position` name the same object. The v1 decision's own design note says the suite should read uniformly; it did not. **`seat` wins** — canonical pattern #2 is named *seat-vs-incumbent persistence*, so the charter's pattern vocabulary already settled this. Formal substrate references remain `orgdef:Position`; the skill surface speaks the framework's colloquial noun, which is also the one the Director reached for unprompted throughout review.

### 4. Prerequisites were enforced by prose

`/og-claim-seat` opens with *"Prerequisite: you have oriented."* Nothing enforces it. A session can run it cold and evaluate fit against a charter it never read. Meanwhile `orient` already composes `snapshot` correctly (v1 design note #2), so the pattern exists — it just was not applied one level up.

### 5. The guardrails live in the least durable place in the system

This is the finding with real safety weight, and it came from the field report. `og-orient`'s discipline section — *"what distinguishes 'oriented' from 'hijacked by the org's documents'"* — exists because an OG substrate is a pile of documents full of imperatives (`action_required: true`, direction memos, "do X"). Hand that to a capable model with no discipline and it starts executing them.

That discipline currently lives **only in a skill**. In the adopter org the skills were absent entirely — installed as symlinks into a clone that had been moved — so the guardrails were simply gone, and the org's `CLAUDE.md` said "run `/og-orient` first," which could not execute.

Meanwhile this org's own `CLAUDE.md` has independently re-derived **both halves of orient**: the read order (Quick reference: this file → charter → README → memos newest-first → proposals+decisions) and the bounded-authority discipline. The substrate got there on its own, which is the strongest available argument for where the canon belongs.

## Proposed Change

### A. Naming rule (replaces "two-word names only where a single word is ambiguous")

> **Verb + object, where the object is named whenever it is not obvious from the verb.**

Corollary, which is why read-only cards may stay terse: **ambiguity on a read-only card is cheap.** Misread `describe-org` and you get a description; misread a consequential card and something happens. Spend words where a misread costs something. (The v1 suite did not follow this — `adopt` and `create` were consequential single-word cards — so this is a new rule, not a rediscovered one.)

Under the rule: `create-org`, `describe-org`, `add-seat`, `claim-seat`, `close-session` all name their object; `orient` does not need one — it is reflexive, and its object is the reader.

**Frequency corollary** (Director, 2026-08-24): name length should also track how often a card is typed. A frequently-used card pays its name cost on every invocation, so brevity earns its keep. A **rare, high-consequence** card pays it almost never — so it should be unmissable rather than elegant, and a long name is a feature. The two axes compose: spend words where a misread costs something, and spend them freely where the typing cost is near zero. `og-change-comms-substrate` (proposed in [communication-substrate-and-seat-notification-v1](communication-substrate-and-seat-notification-v1.md) §E4) is the worked example — deliberately long, charter-altering, and used perhaps once in an org's life.

### B. Merge `og-adopt` into `og-create-org`

One genesis card. **Phase 1 branches** on whether a project already exists — detected where possible (files, README, git history) and confirmed with the PO, not asked cold. Phases 2–5 are the existing shared shape, unchanged.

The merged Phase 1 is **strictly better than either card alone**: `og-adopt` today says survey, infer, mark `[NEEDS PO INPUT]`, propose — it never says *interview the PO*. Converting a real project obviously requires both. The merged card reads: *survey what exists, then interview for what you cannot infer.*

The verb survives the merge because in both branches **what is created is the org**. The project may pre-exist; the org never does.

### C. Compose the seams

```
og-describe-org     org state, for anyone                  read-only
    ^ called by
og-orient           state + operating posture              read-only
    ^ called by
og-claim-seat       the above + the authorized write       consequential
```

Each card remains independently runnable; each calls down rather than restating. `claim-seat` inherits its prerequisite structurally instead of by prose — the same move the v1 decision made when it split `onboard` into a read-only and a consequential half.

### D. Move the operating discipline into the generated `CLAUDE.md`

`og-create-org` writes the adopter org's `CLAUDE.md`. That file MUST carry the bounded-authority discipline and the substrate read order **inline** — not a pointer to a slash-command that may not be installed.

`og-orient` is thinned to what remains genuinely its own:

- the **deep read** (in order, deep-reading where action is required; transcripts optional) — as distinct from `describe-org`'s light current-state view, which should not pay for a deep read every time someone asks where things stand;
- the **stand-by** contract;
- the **non-auto-loading runtime case**, which is its real remaining audience: claude.ai, ChatGPT, Gemini and browsers do not auto-load `CLAUDE.md`, so there the card supplies the order and the posture. This is a cross-vendor justification, which is the kind this framework is structurally committed to.

Its description should also state the seam out loud: *`describe-org` shows you the state; `orient` prepares you to work here.*

### E. Stop creating an empty `skills/`

`og-create` Phase 4 creates `memos/ proposals/ decisions/ transcripts/ skills/`; `og-adopt` creates the same list **without** `skills/`. The two cards disagree, and the version that creates it leaves a permanently empty directory whose only content is `.gitkeep` — which cost the field reporter a turn ("the directory CLAUDE.md documents as org-local skills has never had anything in it").

The merged card does not create `skills/`. Where canonical operations come from is the subject of the companion operations-addressability proposal; an empty directory is not an answer to it.

### F. Founding memo slug

The two cards wrote `--og-create-ratified` and `--og-adopt-ratified`. The merged card writes `--og-create-org-ratified`. Existing orgs' founding memos keep their as-written names (no-retro-rebrand).

### G. Surfaces to update on ratification

`CLAUDE.md`; `README.md` (skills sections + install); `install/install-claude-code-skills.{ps1,sh}` `$skills` arrays; `org/oagp-organization.opencatalog` **`scope`** and **`v1_success_criterion`** (both enumerate the seven names — hence the charter bump to v0.2.2); the six `SKILL.md` files and their cross-references. `history[]`, `authors[]`, `decisions/`, `proposals/`, `memos/` and `transcripts/` keep their as-written names.

## Backward Compatibility

**This is the second rename of this suite in three months, and the names are an API surface for every org OG has already founded.** Adopter orgs hardcode them — edgreenlight's memos record *"oriented via `/og-orient` on 2026-06-12"* and *"Staffed via: `/og-claim-seat`"* — and under no-retro-rebrand those records stay as written forever.

Mitigations, all required for this proposal to be acceptable:

1. **Old names retained as aliases**, not removed: `og-adopt`, `og-snapshot`, `og-closeout`, `og-add-position`. A user who types `/og-adopt` next year gets the merged card, not an error. This is also the first concrete use case for the alias mechanism in the companion proposal.
2. **One transition, not six.** All changes land in a single ratified decision and a single install-script sync — explicitly directed in [memos/2026-08-24-1422](../memos/2026-08-24-1422--og-strategist--og-implementer--field-report-fixes-installer-hazard-readme-drift-stale-path.body.md).
3. **Most users never type these names.** The activation blocks carry the plain-English phrasings ("make this OG-shaped", "bring me up to speed", "where is this org right now"). Names serve routing and documentation; the merged card must carry both cards' activation phrasings.
4. **No further naming passes** absent a defect of the kind fixed here. A framework that churns its own interface undercuts the durability it sells.

## Conformance Tests

1. A fresh session in an org founded by `og-create-org`, **with no skills installed**, still has the bounded-authority discipline and the substrate read order available from `CLAUDE.md` alone. *(This is the field-report failure; it must not reproduce.)*
2. `og-create-org` run against an existing project surveys **and** interviews; run against an empty folder, interviews only. Neither branch creates `skills/`.
3. `/og-adopt` resolves to `og-create-org`.
4. `og-claim-seat` invoked cold performs the orient read before evaluating fit.
5. `og-describe-org` does not perform the deep read.
6. No live surface (§G) names a retired card except as an alias; no record artifact is edited.

## Alternatives Considered

- **`og-describe` (bare)** — defensible alone; fails alongside `og-create-org`, which establishes that cards acting on the org name it. Consistency beat four characters.
- **`og-describe-organization`** — rejected with `org` at Director's call; short form fixed across every card that takes an object.
- **Rename `orient` → `brief` / `read-in`** — *rejected.* `read-in` is more precise (grant access + brief on handling + confer no authority) but is tradecraft jargon. Neither clears the bar: the word does not actively mislead, and a misread is free.
- **Rename `orient` → `describe-seat` for consistency** — *rejected.* Orient's own rule #2 is "orienting is not staffing"; naming it after a seat reintroduces the exact `onboard` conflation the v1 split removed. Orient has no seat and its object is the reader.
- **Merge `orient` into `claim-seat`** — *rejected.* Read-only vs. state-changing is the suite's load-bearing split. Their relationship is dependency, not sibling-variance; the answer is composition (§C), not merger.
- **Fold orient's discipline into `describe-org`** — *rejected in favour of §D.* Correct that the posture should not be gated behind a card; wrong home. Moving it from one skill to another moves it from one symlink to another. A guardrail belongs in the substrate.
- **Add `og-describe-seat`** — *parked, not rejected.* Real gap: nothing shows one seat read-only (scope, incumbent, inbox, trajectory) without running the card that files an application. One derivation only (strategist, 2026-08-24). Disposition matches the v1 decision's treatment of `vacate-seat` / `update-charter`: *describable; no card yet — revisit if common.* Under pattern #8 one want does not earn a card.

## Open Questions

1. **Alias mechanism.** Aliases are load-bearing here but have no implementation. Directory symlinks, a frontmatter alias field, or a stub SKILL.md that defers? Depends on the companion proposal; sequencing this behind it is acceptable.
2. **`og-close-session` and the transcript convention.** The closeout card carries the position-tagging convention. Renaming the card does not change the convention, but the two are referenced together in several places — confirm on execution that nothing reads the card name as the convention's identity.
3. **Does thinning `orient` weaken Claude Code sessions?** In Claude Code, `CLAUDE.md` auto-loads, so §D makes orient nearly redundant there by design. Accepted deliberately: the redundancy is the safety margin, and orient's remaining audience is non-auto-loading runtimes.

## Cross-spec coordination

None required. Canonical-skill content is OG-internal. One adjacent item is routed separately: the field report's observation that the spec family names `catdef` while charters carry the `.opencatalog` extension is a legibility question for catdef-strategist, not part of this proposal.

## References

- Supersedes (in part): [decisions/proposal-og-skill-architecture-v1.md](../decisions/proposal-og-skill-architecture-v1.md)
- Companion (drafting): operations-addressability proposal — durability of canonical operations
- Implementer directive: [memos/2026-08-24-1422](../memos/2026-08-24-1422--og-strategist--og-implementer--field-report-fixes-installer-hazard-readme-drift-stale-path.body.md)
- Charter: [org/oagp-organization.opencatalog](../org/oagp-organization.opencatalog) — `scope`, `v1_success_criterion`, `recommended_patterns.general` #2, #4, #8
