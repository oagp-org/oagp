---
name: og-add-position
description: |
  RETIRED NAME -- redirects to /og-add-seat.

  This card was renamed in skill suite v2 (ratified 2026-08-24). The stub is kept
  so the old name keeps working for orgs and records that reference it; it carries
  no content of its own.

  Activate only when the user types /og-add-position directly. Prefer /og-add-seat.
disable-model-invocation: true
---

# /og-add-position — retired, use `/og-add-seat`

**This name is retired.** The card now lives at **`/og-add-seat`**.

Renamed for vocabulary consistency. Charter pattern #2 is named *seat-vs-incumbent*, so the framework's own pattern vocabulary settled the noun. Formal substrate references remain `orgdef:Position`; the skill surface speaks the colloquial noun the org actually uses.

## What to do

Invoke **`/og-add-seat`** and follow it. Everything this name used to do is there, unchanged or improved.

If the user typed `/og-add-position`, say plainly that the name changed and that you are running `/og-add-seat` instead — do not redirect silently. An org whose records cite the old name should learn that it moved.

## Why this stub exists at all

Claude Code has no alias mechanism for personal or project skills: the command name comes from the **directory name**, and frontmatter `name` is only a display label. A symlink does not help either — Claude Code loads a shared target once. So an alias has to be a real directory with a real `SKILL.md`. This is that, and nothing more.

Retaining old names was a **condition of acceptance** of the rename ([decisions/proposal-og-skill-suite-v2.md](../../decisions/proposal-og-skill-suite-v2.md)), because the seven names are an API surface for every org OG has already founded, and their records cite them permanently under no-retro-rebrand.

## References
- Current card: [/og-add-seat](../og-add-seat/SKILL.md)
- Decision: [decisions/proposal-og-skill-suite-v2.md](../../decisions/proposal-og-skill-suite-v2.md)
- OG home: [ogframework.com](https://ogframework.com)
