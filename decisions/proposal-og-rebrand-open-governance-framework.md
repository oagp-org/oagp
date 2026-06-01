# Decision: Rebrand OAGP → OG (Open Governance Framework) + og- skill prefix

**Disposition:** Accept (Director-ratified by direction 2026-06-01; merge seals it)
**Origin:** [proposals/og-rebrand-open-governance-framework.md](../proposals/og-rebrand-open-governance-framework.md)
**Decided:** 2026-06-01 by oagp-strategist on direct Director direction ("let's lock this in"), after the PO acquired `ogframework.com`.
**Authorization:** PO-led naming exploration + explicit lock-in 2026-06-01. Canonical naming/identity is the most pattern-shape call there is — delegated strategist authority; Director ratifies-by-merge.

## Disposition

Lock the rebrand: **OG — Open Governance Framework**, brand mark **OG** (= *Open Governance*), canonical domain **ogframework.com**, skill prefix **`og-`**. Current scope **stays agentic**; human-org adaptation is a forward vision out of current scope.

## Rationale

Condensed from the 2026-06-01 exploration (full trail in the proposal): the brand coheres on "OG" (typed→spoken→domain→brand); "Framework" is the category word the human adopter actually searches and reads cleanest in the AI register; "OG = Open Governance" is scope-flexible (survives the later human-org broadening without another rebrand). The strategist initially favored keeping the acronym (Protocol); the PO's HR-adopter reframe legitimately changed the optimization target (the full name serves the human who adopts; the AI peer gets precision from the substrate), and acquiring `ogframework.com` removed the practical blocker. New information, updated decision — recorded transparently.

## The load-bearing discipline

**Brand flexibility now ≠ scope change now.** Choosing "OG" *permits* a future human-organization scope but must not silently enact it. This decision changes the **name**; it does **not** touch the charter's `scope`, `mission` intent, or `red_lines` beyond the name swap. The framework remains agentic-focused until a separate human-org scope-expansion decision is ratified. The human-org adaptation is recorded here only as a **forward vision**.

## Resolutions to Open Questions

- **OQ1 (repo/org rename):** separable follow-on; redirects make it non-urgent; Director/ops sequences it. Not blocking the brand lock-in.
- **OQ2 (`pattern` working vocab):** keep lowercase "pattern" as common-noun working vocabulary (`pattern-shape`, `pattern-promotion`); `recommended_patterns` field rename is orgdef format-shape → route to orgdef-strategist only if wanted. Not now.
- **OQ3 (human-org adaptation):** future scope decision; out of scope here; recorded as forward vision.

## Build directive (sequenced; by seat)

On Director ratification (merge):

**Strategist-scope (this seat):**
1. **Skill prefix rename** `og-*` — 4 skill dirs + `name:` frontmatter + intra-skill cross-references/links + brand prose. *(Executed alongside this decision — see commit.)*
2. **Charter rebrand → v0.2.0** — name, mission, vision, homepage (`ogframework.com`), repository; OAGP→OG, Pattern→Framework; **keep `scope` agentic, keep red_lines/values**; add a `metadata` forward-vision note (human-org adaptation, out of current scope); history entry; preserve prior history entries' "OAGP" as-of-their-time. *(Next focused pass — delicate JSON; not bundled with the skill rename to keep each correct.)*
3. **README brand prose** rebrand (OG / Open Governance Framework; install + skills sections to `og-*`; `ogframework.com`).

**Implementer-scope:**
4. **Install scripts** — `$skills` arrays → `og-*`; optionally remove stale `oagp-*` junctions; header/usage rebrand.
5. **Site + primer** — `oagp.org` content → `ogframework.com`; primer rebrand; the "OG IS NOT" framing (incl. "not a software framework you import" clarification).

**Director/ops-scope:**
6. **Domain** — `ogframework.com` DNS/hosting; `oagp.org` → legacy redirect.
7. **GitHub repo/org rename** (`oagp-org`/`oagp` → `og-*`) — separable; redirects cover the interim.

## Cross-spec coordination

- orgdef-strategist — only if OQ2 pursued. None now.
- No red-line / substrate change. "Open Governance Framework" preserves substrate-agnosticism + cross-vendor neutrality.

## Notable design choices

1. **Brand = OG = Open Governance** (durable mark); "Agentic" is the current-focus descriptor, not locked into the name — future-proofs the human-org broadening.
2. **Framework over Protocol/Pattern** — serves the human adopter (the name's real audience); the AI peer relies on the substrate.
3. **Scope held** — brand broadens optionality; scope stays agentic until separately ratified. The single most important guardrail on this decision.
4. **History preserved** — forward content rebrands; past memos/decisions keep "OAGP." Same discipline as the repo-URL cleanup.
5. **Sequenced by seat** — strategist (name/charter/skills/README content), implementer (install/site), Director/ops (domain/repo) — bounded-authority respected; the charter rebrand gets its own careful pass.

## Items not incorporated

- Human-org scope expansion — forward vision only; not enacted.
- `recommended_patterns` field rename — orgdef format-shape; not taken.
- Repo/org rename — deferred follow-on.
- Keeping "OAGP" / "Pattern" / "Protocol" — superseded by this decision.

## Workflow validation

Charter version → **v0.2.0** (first minor bump beyond v0.1.x — a deliberate identity change, not a content increment). The charter rebrand lands in its own focused commit (delicate JSON; keeping it separate from the skill-prefix rename reduces error surface). The skill-prefix rename ships with/adjacent to this decision.

## Forward-reference resolution

- Charter rebrand → v0.2.0 (next strategist pass).
- README + skills → og- (this/next pass).
- Install + site + primer → implementer.
- Domain + repo/org rename → Director/ops.
- Human-org adaptation → future scope-expansion decision (separate ratification).

## References

- Proposal: [proposals/og-rebrand-open-governance-framework.md](../proposals/og-rebrand-open-governance-framework.md)
- Folds in: the `og-` skill-prefix thread (2026-06-01)
- Domain: ogframework.com (acquired 2026-06-01)
- Charter: [org/oagp-organization.opencatalog](../org/oagp-organization.opencatalog) (→ v0.2.0, next pass)
