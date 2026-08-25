---
name: og-snapshot
description: |
  RETIRED NAME -- redirects to /og-describe-org.

  This card was renamed in skill suite v2 (ratified 2026-08-24). The stub is kept
  so the old name keeps working for orgs and records that reference it; it carries
  no content of its own.

  Activate only when the user types /og-snapshot directly. Prefer /og-describe-org.
disable-model-invocation: true
---

# /og-snapshot — retired, use `/og-describe-org`

**This name is retired.** The card now lives at **`/og-describe-org`**.

`snapshot` sat on the natural name of a different and consequential operation -- org-state-fork (charter pattern #4, `git worktree add <path> <sha>`) -- inside a suite organised around keeping safe and consequential operations distinct. `describe` carries the pre-learned read-only idiom.

## What to do

Invoke **`/og-describe-org`** and follow it. Everything this name used to do is there, unchanged or improved.

If the user typed `/og-snapshot`, say plainly that the name changed and that you are running `/og-describe-org` instead — do not redirect silently. An org whose records cite the old name should learn that it moved.

## Why this stub exists at all

Claude Code has no alias mechanism for personal or project skills: the command name comes from the **directory name**, and frontmatter `name` is only a display label. A symlink does not help either — Claude Code loads a shared target once. So an alias has to be a real directory with a real `SKILL.md`. This is that, and nothing more.

Retaining old names was a **condition of acceptance** of the rename ([decisions/proposal-og-skill-suite-v2.md](../../decisions/proposal-og-skill-suite-v2.md)), because the seven names are an API surface for every org OG has already founded, and their records cite them permanently under no-retro-rebrand.

## References
- Current card: [/og-describe-org](../og-describe-org/SKILL.md)
- Decision: [decisions/proposal-og-skill-suite-v2.md](../../decisions/proposal-og-skill-suite-v2.md)
- OG home: [ogframework.com](https://ogframework.com)
