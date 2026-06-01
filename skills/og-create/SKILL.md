---
name: og-create
description: |
  Use this skill when a Product Owner wants to create a NEW OG
  (Open Governance Framework) org from scratch — no existing project to
  convert. The skill elicits the org's identity by interviewing the PO,
  proposes a charter as a ratifiable artifact, and instantiates the
  substrate inside a folder of the PO's choosing once they approve.

  Activate when the user says any of: "create a new OG org", "start an
  OG-shaped project from scratch", "spin up an Open Governance org for X".

  Folder-only by default: the skill creates an OG-shaped folder; git is
  optional (the PO may git-init afterward). Companion: /og-adopt (convert
  an existing project — the convert-side of founding). After the org
  exists, /og-orient brings an AI peer up to speed and /og-claim-seat
  lets one take a position.
---

# /og-create

You are creating a new OG (Open Governance Framework) org from scratch. There is no project to survey; you **elicit** the org's identity by interviewing the PO. **Propose-don't-impose**: the PO decides the org's identity; you make founding cheap.

OG reference: [ogframework.com](https://ogframework.com). Empirical reference org: [github.com/oagp-org/oagp](https://github.com/oagp-org/oagp).

## Five phases

### 1 — Elicit (interview the PO)
Ask, one topic at a time: org id/name; mission; scope (what it is NOT); initial positions (who's the human Director? which AI roles, staffed vs vacant?); values (with rationale); red lines (with rationale); v1 success criteria; relationships/cross-org coordination; **folder location** (any folder — needn't be a git repo); optional initial work queue. Accept the PO's answers; push back only on internal contradictions. Mark ambiguities `[NEEDS PO INPUT]`. **Create nothing yet.**

### 2 — Propose
Draft the `orgdef:Organization` charter at `<folder>/proposals/og-create-<YYYY-MM-DD>.md` (or a temp location the PO reviews). Verbatim where the PO was specific; `[INFERRED]` where extended; `[NEEDS PO INPUT]` where deferred. Director position staffed; AI roles default `status: vacant` (no auto-staffing). Embedded `roledef:Job` items deferred. **Stop**, report unknowns + a short summary.

### 3 — Ratify (PO does this; you wait)
PO corrects/ratifies. Revise in place. No Phase 4 without an explicit "instantiate this."

### 4 — Instantiate (only on ratification)
In the PO's folder: `org/<orgname>-organization.opencatalog` (markers stripped); `memos/ proposals/ decisions/ transcripts/ skills/` (with `.gitkeep`); `CLAUDE.md`; `README.md`; move the ratified draft to `proposals/`; and the founding memo `memos/<date>-<HHMM>--product-owner--<orgname>-strategist--og-create-ratified.{openthing,body.md}`. **Git is opt-in** (Phase 4h): if the PO wants versioning, `git init` + commit (+ remote/push only on explicit authorization). Do **not** auto-init git — folder-only is a valid OG shape.

### 5 — Hand-off
Report: OG shape at `<folder>` (+ SHA if git). Charter location. To staff a position: open a fresh session, `/og-orient`, then `/og-claim-seat` (PO-authorized). Future memos in `memos/`, decisions in `decisions/`, etc.

## Discipline (load-bearing)
1. **Propose-don't-impose.** 2. **Elicit, don't assume** (interview, don't extrapolate). 3. **Folder-only is valid OG shape** — git is recommended-not-required; don't auto-init. 4. **Stop at each phase boundary.** 5. **No AI self-staffing during create** — positions default vacant; staffing is `/og-claim-seat`. 6. **Push is PO-authorized.**

## Transcript tagging
Tag a capture `<orgname>-create-helper` (one-shot founding role). Re-tag against the actual staffed position if you continue post-hand-off.

## Sub-org case (forward-reference; not MVP)
This skill creates **standalone** orgs. The sub-org case (an org subordinate to a parent, with a Director down the chain) is forward work with open governance questions (authority scope, write-limits to subtree, merge gating, cross-subtree visibility). If asked, offer the standalone variant now and flag sub-org as not-yet-formalized.

## What this skill does NOT do
Staff positions; auto-init git; commit/push without authorization; handle the sub-org case; assume org size.

## References
- Companion: [/og-adopt](../og-adopt/SKILL.md) (convert existing project) · [/og-orient](../og-orient/SKILL.md) · [/og-claim-seat](../og-claim-seat/SKILL.md)
- OG home: [ogframework.com](https://ogframework.com) · Empirical org: [github.com/oagp-org/oagp](https://github.com/oagp-org/oagp)
- Substrate stack: catdef → roledef → orgdef → memodef (transcripts are a memodef subtype)
