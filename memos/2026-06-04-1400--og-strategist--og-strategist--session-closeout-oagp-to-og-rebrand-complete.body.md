# Session closeout 2026-06-04 — OAGP → OG rebrand complete

**From:** og-strategist (s:/projects/oagp-org; remote github.com/ogframework/og)
**To:** og-strategist (institutional capture)
**Date:** 2026-06-04
**Action required:** No

Covers the og-strategist session from 2026-05-29 (fresh `/og-onboard`, model → Opus 4.8) through 2026-06-04. All work is on main (ratified-by-merge under Director direction). The standing queue lives in [CLAUDE.md](../CLAUDE.md) "Known work items"; this captures session deltas + freshest open items. First closeout authored under the new `og-strategist@ogframework.com` identity.

---

## Landed (on main)

1. **agent-sdk v0.2 amendment** — adversarial Workflows-relevance analysis (workflow `wf_6a87be32-ee4`) → `run_seat()` composes over Claude Code Workflows as the Claude-Code dispatch backend; OG is the cross-session governance layer Workflows composes under; not redundant with bind(). [decisions/proposal-agent-sdk-v0.2-amendment-workflows-composition-and-positioning.md](../decisions/proposal-agent-sdk-v0.2-amendment-workflows-composition-and-positioning.md)
2. **agent-sdk v0.2 governance core + §8 demo** — implementer shipped `run_seat()` + three-tier structural bounded authority (commit `6628404`, 94 tests) + live WorkflowsBackend (`3644bb6`); propose-only dispatch demo validated. I ratified the **governance addendum**: launcher-per-dispatch canonical; Tier-1-only autonomous until Tier-2 is launcher-verified-package-absent. [decisions/proposal-agent-sdk-v0.2-governance-addendum-autonomous-dispatch-constraints.md](../decisions/proposal-agent-sdk-v0.2-governance-addendum-autonomous-dispatch-constraints.md)
3. **Consolidated pattern-promotion v1** (charter v0.1.9) — `recommended_patterns.general` populated with eight canonical patterns; the v0.1.0 `[DEFERRED]` placeholder retired. [decisions/proposal-consolidated-pattern-promotion-v1.md](../decisions/proposal-consolidated-pattern-promotion-v1.md)
4. **Seat-capability-manifest convention** — [decisions/proposal-seat-capability-manifest.md](../decisions/proposal-seat-capability-manifest.md); format-shape RESOLVED by roledef SCHEMA v0.3.0 `recommended_capabilities[]` (independent re-derivation of orgdef-strategist's 2026-05-17 proposal). Promotion held until first OG seats carry capabilities + bind/orient exercise them. (memos/2026-05-29-1900, 2026-05-29-2000)
5. **OAGP → OG rebrand** (the session's main arc):
   - Lock-in: [decisions/proposal-og-rebrand-open-governance-framework.md](../decisions/proposal-og-rebrand-open-governance-framework.md)
   - OG skill architecture v1 — seven `og-` skills (Genesis: adopt/create; Session: orient/claim-seat/closeout; Operations: snapshot/add-position): [decisions/proposal-og-skill-architecture-v1.md](../decisions/proposal-og-skill-architecture-v1.md)
   - Charter **v0.2.0** (masthead) + **v0.2.1** (deep prose; `id` → `ogframework`; repository URL; seat identifiers `og-strategist`/`og-implementer` @ogframework.com); CLAUDE.md full OG rewrite; README OG rewrite.
   - GitHub: org `oagp-org` → **`ogframework`** (siblings moved via redirect); repo `oagp` → **`og`** (canonical `github.com/ogframework/og`); site repo `oagp.org` → **`ogframework.com`**.
   - First commits under `og-strategist@ogframework.com` (new git/bot identity; historical commits retain `oagp-strategist@oagp.org`). Cross-spec FYI: memos/2026-06-01-1200.
6. **Site (ogframework.com)** — implementer-scope, covered at PO direction: `primer.md`/`index.md`/`llms.txt`/`index.html` rebranded OG-native (build 008); `CNAME` → ogframework.com; GitHub Pages custom domain active (status built); `og` + site repo descriptions fixed.

## In flight / Director-side

- **Site "Enforce HTTPS"** — greyed pending GitHub's Let's Encrypt cert; Director checking periodically. Cloudflare DNS correct (apex CNAME → `ogframework.github.io`, DNS-only).

## Open (next sessions; full list in CLAUDE.md)

- **CLAUDE.md hygiene** — "Site + primer rebrand" still listed *active*; it's done. One-line move to "On main" was offered, not yet applied.
- **roledef repo description** still "OpenJD" (stale) — roledef-strategist's call; flagged, not edited (cross-spec).
- **Charter filename** `org/oagp-organization.opencatalog` off-brand; renaming breaks many committed links → deliberately deferred (flagged in-doc).
- **Local dir** `s:/projects/oagp-org` cosmetic (remote is `ogframework/og`).
- **Implementer-execution:** agent-sdk v0.2 launcher + Tier-2 package-absence gate → then fresh-session structural `run_seat()` closes the full §8 demo; roledef URL-resolution contract (memos/2026-05-25-0001) gates fail-closed resolution; v0.3 plugin packaging (after MCP); MCP server at ogframework.com/mcp.
- **Strategist:** canonical-orgs library residence reply owed to orgdef-strategist (memos/2026-05-24-0900); pattern-promotion watch-list (AI-PM/synthesis-agent seat; three-tier permission composition; seat-capability-manifest promotion-on-validation).
- **Director-scoped:** public launch deferred pending refinement.

## Note for the next incumbent

The rebrand is complete in this repo's forward content + GitHub infra + the live site. The mix of `OG` (current) and `oagp-*` (historical artifacts, charter filename, local dir) is **intentional and documented** (charter v0.2.1 history entry) — not drift. Don't retro-rebrand history.

— og-strategist
