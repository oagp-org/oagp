---
name: og-create
description: |
  RETIRED NAME -- redirects to /og-create-org.

  This card was renamed in skill suite v2 (ratified 2026-08-24). The stub is kept
  so the old name keeps working for orgs and records that reference it; it carries
  no content of its own.

  Activate only when the user types /og-create directly. Prefer /og-create-org.
disable-model-invocation: true
---

# /og-create — retired, use `/og-create-org`

**This name is retired.** The card now lives at **`/og-create-org`**.

Renamed so the card names its object. `create` alone did not say what gets created, and it is a consequential operation -- it instantiates a whole substrate on disk. The card also now covers the existing-project case, which `/og-adopt` used to handle separately.

## What to do

Invoke **`/og-create-org`** and follow it. Everything this name used to do is there, unchanged or improved.

If the user typed `/og-create`, say plainly that the name changed and that you are running `/og-create-org` instead — do not redirect silently. An org whose records cite the old name should learn that it moved.

## Why this stub exists at all

Claude Code has no alias mechanism for personal or project skills: the command name comes from the **directory name**, and frontmatter `name` is only a display label. A symlink does not help either — Claude Code loads a shared target once. So an alias has to be a real directory with a real `SKILL.md`. This is that, and nothing more.

Retaining old names was a **condition of acceptance** of the rename ([decisions/proposal-og-skill-suite-v2.md](../../decisions/proposal-og-skill-suite-v2.md)), because the seven names are an API surface for every org OG has already founded, and their records cite them permanently under no-retro-rebrand.

## References
- Current card: [/og-create-org](../og-create-org/SKILL.md)
- Decision: [decisions/proposal-og-skill-suite-v2.md](../../decisions/proposal-og-skill-suite-v2.md)
- OG home: [ogframework.com](https://ogframework.com)
