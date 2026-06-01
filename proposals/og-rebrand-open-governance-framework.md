# Proposal: Rebrand OAGP → OG (Open Governance Framework) + og- skill prefix

**Status:** Open (awaiting Director ratification via merge)
**Author:** oagp-strategist <oagp-strategist@oagp.org>
**Created:** 2026-06-01
**Target version:** charter v0.2.0 (major identity change)
**Origin:** PO-led naming exploration 2026-06-01, two threads: (1) shorten the skill prefix `oagp-` → `og-` (easier to type/remember; "OG" wordplay); (2) dissatisfaction with "Pattern" as the P in OAGP. Exploration traversed Platform / Language / System / Paradigm / Layer / Policy / Procedure / Standard / Definition / Framework / Model, then converged — via the reframe "what would an HR person looking for a standard to encode their org chart search for?" — on **Framework**, then on branding the whole thing **OG** with `ogframework.com` (acquired 2026-06-01).

## Summary

Rebrand the project from **OAGP — Open Agentic Governance Pattern** to **OG — Open Governance Framework**, canonical-hosted at **ogframework.com**, with the canonical skill prefix `oagp-` → `og-`. Brand mark is **OG** (read as *Open Governance*); the current full descriptor remains agentic-focused ("Open Agentic Governance Framework" / "agentic-first"). The framework's **current scope stays agentic** — the human-organization adaptation the brand enables is recorded as an explicitly out-of-current-scope **forward vision**, requiring its own future ratification.

## Motivation

1. **Brand coherence on "OG."** Typed (`og-` skills) → spoken ("OG") → domain (`ogframework.com`) → brand ("OG Framework") all cohere. The PO's insight: making people *type* `og` makes them *say* "OG."
2. **"Framework" is the adopter's category word.** The decision-maker who adopts OG (HR / ops / director / compliance — the charter's "secondary reader," and the actual buyer) searches for a *governance framework* (cf. COBIT, NIST CSF, three-lines-of-defense), not a "pattern" or "protocol." The full name's primary job is first-impression framing for that human; the AI peer gets precision from the substrate regardless.
3. **"Framework" reads cleaner than the alternatives in the AI register.** "Model" collides with ML-model; "Pattern" reads as a dev design-pattern; "Protocol" reads as IT/networking; "Platform"/"System" import product/runtime baggage that contradicts the layer-above-runtime identity; "Language"/"Definition" collide with the substrate (-def) layer; "Policy" collides with runtime policy-enforcement (the AGT layer OG sits above). "Governance framework" is unambiguous and is the search term.
4. **"OG" is a scope-flexible brand.** Read as *Open Governance*, the mark never hard-codes "Agentic." When the framework later broadens to human organizations, "Agentic" drops from the descriptor and the brand does not move — a name that survives its own scope expansion.

## Proposed Change

1. **Name:** OAGP — Open Agentic Governance Pattern → **OG — Open Governance Framework.** Brand mark **OG** = *Open Governance*; "Agentic" is the current-focus descriptor, not part of the durable mark.
2. **Skill prefix:** `/oagp-{bootstrap,init,onboard,closeout}` → `/og-{bootstrap,init,onboard,closeout}` (folds in the first naming thread).
3. **Canonical domain:** **ogframework.com** (acquired). `oagp.org` → legacy redirect.
4. **Acronym:** "OAGP" retired in forward content; the brand is "OG." Historical artifacts keep "OAGP" as-of-their-time (no retro-rebrand).
5. **Scope discipline (load-bearing):** current scope **stays agentic**. The human-organization adaptation is recorded as a **forward vision**, explicitly out of current scope; broadening requires a separate future scope decision. Red lines and values unchanged.

## Backward Compatibility

- Historical memos/decisions retain "OAGP" / `/oagp-*` as written (audit integrity).
- `oagp.org` and the `oagp-org`/`oagp` GitHub names keep working via redirect; the repo/org rename is a separable follow-on (non-urgent; GitHub redirects, as proven by the prior transfer).
- Existing `/oagp-*` skill installs keep working until re-installed; the updated install scripts create `/og-*` (and may clean up the old junctions).

## Conformance / migration checklist

1. Charter rebranded (OAGP→OG; Pattern→Framework; name/mission/vision/homepage/repository), scope kept agentic, red lines intact, version → v0.2.0.
2. Four skills renamed `og-*` (dirs + `name:` frontmatter + intra-skill cross-references + brand prose).
3. Install scripts reference `og-*`; README brand + install + skills sections rebranded.
4. Primer + oagp.org→ogframework.com site rebranded (implementer / site repo).
5. Historical artifacts unchanged; forward content uses OG.
6. Human-org adaptation present only as a forward-vision note, not in scope/mission/red_lines.

## Alternatives Considered

- **Keep "Pattern" (OAGP):** accurate, zero churn — but reads academic/passive and undersells an operational framework; doesn't serve the adopter's vocabulary.
- **Protocol / Standard (OAGP / OAGS):** strong open-spec-family words; serve the AI-peer/dev register but not the human adopter; "Standard" doubly dead (`oags` taken + strands `oagp.org`).
- **Platform / System / Language / Paradigm / Policy / Procedure / Definition / Model / Layer:** each carries a specific disqualifier (product/runtime baggage; substrate or runtime-policy collision; dryness; ML-model collision; infrastructural tone). Documented in the 2026-06-01 exploration.
- **OAGF (Open Agentic Governance Framework), keep the acronym:** viable, but branding on "OG" is more coherent with the `og-` skills and is scope-flexible (doesn't hard-code "Agentic").

## Open Questions

- **OQ1 — GitHub repo/org rename** (`oagp-org`/`oagp` → `og-*`). Separable follow-on; redirects make it non-urgent. Director/ops call.
- **OQ2 — internal "pattern" working vocabulary** (`pattern-shape`, `pattern-promotion`, `recommended_patterns`). Lowercase "pattern" as a common noun can stay; `recommended_patterns` is an orgdef **field name = format-shape** → route to orgdef-strategist only if a rename is wanted. Not blocking.
- **OQ3 — human-org adaptation** — future scope-expansion decision; out of scope here.

## Cross-spec coordination

- **orgdef-strategist** — only if OQ2 (`recommended_patterns` field rename) is pursued. Not now.
- No red-line or substrate change; "Open Governance Framework" preserves substrate-agnosticism + cross-vendor neutrality (an open framework, not a product).
