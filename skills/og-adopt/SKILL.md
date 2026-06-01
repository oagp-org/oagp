---
name: og-adopt
description: |
  Use this skill when a Product Owner wants to convert an EXISTING
  project into OG (Open Governance Framework) shape — surveying the
  project, proposing an org charter as a ratifiable artifact, and
  instantiating the substrate (charter, CLAUDE.md, memos/, proposals/,
  decisions/, transcripts/, skills/) once the PO approves.

  Activate when the user says any of: "make this OG-shaped", "adopt OG",
  "add OG governance to this project", "convert this to Open Governance",
  or asks about OG adoption for an existing codebase.

  Companion: /og-create (new org from scratch — the create-side of
  founding). /og-adopt is the convert-existing-project side. After an
  org exists, /og-orient brings an AI peer up to speed and /og-claim-seat
  lets one take a position.
---

# /og-adopt

You are converting an existing project into OG (Open Governance Framework) shape. Operate with **propose-don't-impose** discipline: the human Product Owner is the only one who can decide the org's identity. Your job is to make adoption cheap, not to make the decision.

OG reference: [ogframework.com](https://ogframework.com). Empirical reference org: [github.com/ogframework/og](https://github.com/ogframework/og).

## Five phases

### 1 — Survey (read-only)
Read README, docs, CLAUDE.md, recent commits/PRs, package config, any existing `org/`/`memos/`. Form a working model: mission, scope, implicit positions (who works on this and how), implicit values + red lines (from CI rules, review patterns, enforced invariants), and what "shipped" means. **Create nothing yet.**

### 2 — Propose
Draft an `orgdef:Organization` charter at `proposals/og-adopt-<YYYY-MM-DD>.md`. Mark every section `[HIGH CONFIDENCE]` / `[INFERRED]` / `[NEEDS PO INPUT]`. Propose positions with staffed/vacant status but **do not auto-staff anyone**. Propose values + red lines defensively (PO can cut). Include a "What I couldn't determine" list. Then **stop** and report: where the draft is, the key unknowns, a 3–5 bullet summary of what you observed.

### 3 — Ratify (PO does this; you wait)
The PO corrects, amends, ratifies. Revise the proposal in place. Do **not** proceed without an explicit "instantiate this."

### 4 — Instantiate (only on ratification)
Create: `org/<orgname>-organization.opencatalog` (ratified charter, confidence markers stripped); substrate folders `memos/ proposals/ decisions/ transcripts/` (with `.gitkeep`); `CLAUDE.md` (augment if it exists — do not overwrite); and the founding memo at `memos/<date>-<HHMM>--product-owner--<orgname>-strategist--og-adopt-ratified.{openthing,body.md}` (documents what was proposed/ratified + points future participants at `/og-orient`). Git is optional — a folder is valid OG shape; if the PO wants versioning, `git init` + commit, and **push only with explicit PO authorization**.

### 5 — Hand-off
Report: OG shape instantiated (+ commit SHA if git). To bring an AI peer up to speed: `/og-orient`. To staff a position: `/og-claim-seat` (PO-authorized). Charter is at `org/<orgname>-organization.opencatalog`.

## Discipline (load-bearing)
1. **Propose-don't-impose** — never instantiate or commit without explicit PO ratification.
2. **Humility about inference** — Phase 1 produces inferences; mark them.
3. **Preserve, don't overwrite** — augment existing CLAUDE.md / respect existing OG shape.
4. **Stop at each phase boundary** — report and wait; never bundle phases.
5. **No auto-staffing** — positions get a status, not an incumbent. Staffing is `/og-claim-seat`, PO's call.
6. **Push is PO-authorized.**
7. **Test on a fork before live** when validating this skill against a real repo.

## Transcript tagging
If the session is captured as a transcript, tag it `<orgname>-adopt-helper` (a one-shot founding role, not a permanent seat). After hand-off, re-tag against the actual staffed position if you continue.

## What this skill does NOT do
Staff positions; commit/push without authorization; police the project's content; migrate data (only organizational shape); assume project size.

## References
- Companion: [/og-create](../og-create/SKILL.md) (new org from scratch) · [/og-orient](../og-orient/SKILL.md) · [/og-claim-seat](../og-claim-seat/SKILL.md)
- OG home: [ogframework.com](https://ogframework.com) · Empirical org: [github.com/ogframework/og](https://github.com/ogframework/og)
- Substrate stack: catdef → roledef → orgdef → memodef (transcripts are a memodef subtype)
