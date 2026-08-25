---
name: og-adopt
description: |
  RETIRED NAME -- redirects to /og-create-org.

  This card was renamed in skill suite v2 (ratified 2026-08-24). The stub is kept
  so the old name keeps working for orgs and records that reference it; it carries
  no content of its own.

  Activate only when the user types /og-adopt directly. Prefer /og-create-org.
disable-model-invocation: true
---

# /og-adopt — retired, use `/og-create-org`

**This name is retired.** The card now lives at **`/og-create-org`**.

Converting an existing project into OG shape is now one half of a single genesis card. `/og-create-org` branches on whether a project already exists: if it does, it surveys it AND interviews the PO for what it cannot infer -- which is more than `/og-adopt` did, since that card never instructed the seat to interview at all.

## What to do

Invoke **`/og-create-org`** and follow it. Everything this name used to do is there, unchanged or improved.

If the user typed `/og-adopt`, say plainly that the name changed and that you are running `/og-create-org` instead — do not redirect silently. An org whose records cite the old name should learn that it moved.

## Why this stub exists at all

Claude Code has no alias mechanism for personal or project skills: the command name comes from the **directory name**, and frontmatter `name` is only a display label. A symlink does not help either — Claude Code loads a shared target once. So an alias has to be a real directory with a real `SKILL.md`. This is that, and nothing more.

Retaining old names was a **condition of acceptance** of the rename ([decisions/proposal-og-skill-suite-v2.md](../../decisions/proposal-og-skill-suite-v2.md)), because the seven names are an API surface for every org OG has already founded, and their records cite them permanently under no-retro-rebrand.

## References
- Current card: [/og-create-org](../og-create-org/SKILL.md)
- Decision: [decisions/proposal-og-skill-suite-v2.md](../../decisions/proposal-og-skill-suite-v2.md)
- OG home: [ogframework.com](https://ogframework.com)
