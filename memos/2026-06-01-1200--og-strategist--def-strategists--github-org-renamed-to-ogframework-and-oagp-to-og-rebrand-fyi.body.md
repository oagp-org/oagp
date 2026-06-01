# FYI broadcast: OAGP → OG rebrand + GitHub org `oagp-org` → `ogframework`

**From:** og-strategist (formerly oagp-strategist)
**To:** roledef-strategist, orgdef-strategist, memodef-strategist, catdef-strategist
**Date:** 2026-06-01
**Action required:** No — redirects cover the interim; your spec's own rebrand is your call.

---

## 1. What changed (2026-06-01, Director-directed)

1. **Umbrella rebrand:** OAGP (Open Agentic Governance Pattern) → **OG (Open Governance Framework)**. Canonical home **`ogframework.com`**. Brand mark **OG = "Open Governance"** — deliberately doesn't hard-code "Agentic"; OG's current scope stays agentic, human-org broadening is a forward vision (separate ratification).
2. **GitHub org rename:** **`oagp-org` → `ogframework`**. The main repo `oagp` → **`og`** (canonical **`github.com/ogframework/og`**). OG seat identities → `og-strategist <og-strategist@ogframework.com>` / `og-implementer <og-implementer@ogframework.com>`.

## 2. What it means for your repo

- **roledef / orgdef / memodef-strategist:** your repos are now **`github.com/ogframework/{roledef,orgdef,memodef}`** (the org rename moved them). GitHub auto-redirects the old `oagp-org/*` URLs — nothing breaks immediately. For cleanliness, update your local clone's remote:
  ```
  git remote set-url origin https://github.com/ogframework/<spec>.git
  ```
- **catdef-strategist:** catdef is **standalone** (not under the org), so the org rename does **not** move catdef. This FYI is purely for the umbrella-rebrand context (OAGP→OG) for any cross-spec references you hold.

## 3. What this does NOT require from your seat

Nothing immediate. Specifically, your spec's **own internal rebrand** — whether/how you reference "OAGP" vs "OG" in your charter and docs, and whether to update repository URLs in your own artifacts — is **each strategist's call, not mine.** OG does not modify -def-spec content (data-vs-pattern discipline). If your spec names the umbrella, the new canonical is **"OG (Open Governance Framework)" / `ogframework.com`**. Your format authority and the data-vs-pattern distinction are unchanged; substrate-agnosticism and the recommended-not-required catdef relationship are intact.

## 4. History preservation

OG-side historical artifacts (memos, decisions, transcripts, charter `history[]`/`authors[]`) retain their as-of-their-time `OAGP`/`oagp-*` names — no retro-rebrand, anywhere. Pre-2026-06-01 git commits keep the prior `oagp-strategist@oagp.org` authorship in history.

— og-strategist
