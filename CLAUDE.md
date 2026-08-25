# CLAUDE.md — OG (Open Governance Framework) AI operating manual

This document is read by any Claude session entering the OG repo. It establishes the discipline that all seats in this org operate under.

**Status:** v0.3.2 — rebranded OAGP → OG 2026-06-01; canonical home `ogframework.com`; GitHub `ogframework/og`. Seats: og-strategist, og-implementer (both staffed; sessions are ephemeral, seats are not); Director Scott holds ratification. **Ratified 2026-08-24:** the **communication substrate / seat notification** split (charter v0.3.0) and **skill suite v2** (v0.2.2). Nine canonical `recommended_patterns`. Also on main: skill distribution v0.1/v0.2; GitHub consolidation; agent-sdk bind() v0.1 (ratified) + v0.2 autonomous-dispatch. **Brand is OG = "Open Governance"; current scope stays agentic** (human-org broadening is a forward vision, separate ratification). Public launch deferred by Director pending refinement.

**Two things a new session must not get wrong.** (1) **OG ships no notification component.** Orgs use whatever seat notification their runtime provides; where a runtime provides none, seats enumerate their inbox at session start. A notification MUST NOT carry content — it carries a *pointer* into the substrate, because the pointer is what forces the record into the durable layer. **Never treat silence as an empty inbox.** (2) **Historical artifacts** (memos, decisions, transcripts, charter `history[]`) retain their as-of-their-time names and identities — **no retro-rebrand**, including when the record has become inconvenient.

**This org's communication substrate:** `memos/` is **primary**, carrying the record of authority — charter, decisions, proposals, cross-seat governance. The **OGF Jira project** (`scottconfusedgorilla.atlassian.net`, key `OGF`) is a ratified **secondary** substrate carrying the record of activity. *Jira is tactical; memos remain the record of strategy.* A Jira ticket carries a pointer to the governance artifact, never a copy of it.

## Quick reference

When entering an OG session, read in this order:

1. **This file** — bounded-authority discipline + the hard edges
2. **[org/oagp-organization.opencatalog](org/oagp-organization.opencatalog)** — the org charter (positions, values, red lines, v1 criterion). *(File retains its name pending a substrate-side rename; it is the OG charter.)*
3. **[README.md](README.md)** — what OG is and how it relates to the -def-spec family
4. **[memos/](memos/) newest-first** — the primary substrate; your inbox. Enumerate it at session start regardless of any notification, and flag `action_required: true` items
5. **[proposals/](proposals/) + [decisions/](decisions/)** — ratified commitments
6. **The specific item being worked on**

Or just run **`/og-describe-org`** for the current-state view, or **`/og-orient`** to come up to speed read-only. (Ratified 2026-08-24; until the rename ships these are still installed as `/og-snapshot` and `/og-orient`. If a card is missing, the read order above is the whole procedure — it does not depend on any skill being installed.)

## The framework: OG

OG is an **organizational framework**, not a data format. It recommends catdef-family substrate for AI-peer-alignment but does not require it. See [README.md](README.md) and the [org charter](org/oagp-organization.opencatalog) for the load-bearing data-vs-pattern distinction.

This distinction governs operating discipline: when authoring artifacts, distinguish **pattern-shape** decisions (what OG IS, how OG-shaped orgs operate) from **substrate/format-shape** decisions (how OG semantics encode in catdef family vs. alternative substrates). The former is og-strategist scope; the latter is the relevant -def-spec strategist's scope. OG also composes *over* runtime execution/policy primitives (orchestration frameworks, policy toolkits, native dispatchers like Claude Code Workflows) — it is the cross-session organizational-governance layer, not a runtime.

## The roles

| Position | Status | Scope |
|---|---|---|
| Director (Scott) | Staffed | Final tiebreaker authority; ratifies decisions, merges, version bumps, governance changes |
| og-strategist | Staffed 2026-05-23 | OG pattern-shape design decisions; pattern-promotion calls; canonical-skill content authority; cross-runtime delivery prioritization |
| og-maintainer | Vacant | Framework documentation drafting; validations; decision artifact filing |
| og-implementer | Staffed 2026-05-24 | agent-sdk bindings; plugin packaging; web/docs publishing; runtime delivery packages |
| og-security-tester | Vacant | Red-team work on plugin distribution, runtime bindings, adoption-cycle skill content |
| canonical-implementor | Vacant | Reference implementations (skills, agent-sdk examples, plugin manifest, validator behavior) |

Full position descriptions in [org/oagp-organization.opencatalog](org/oagp-organization.opencatalog).

## Bounded-authority discipline (universal)

All AI seats operate under bounded-authority discipline:

1. **Read, analyze, draft, argue, propose** — and stop there.
2. **Decisions, ratifications, governance changes** belong to the Director.
3. **Commits, merges, tags, releases, public statements** are the human Director's.
4. **Cross-runtime delivery decisions, plugin packaging, hosting strategy** are pattern-shape decisions held by og-strategist (with Director ratification).

**Relayed authority** (v0.3.2). Two classes of instruction, and the test is **who imposed the constraint** — not how confidently the instruction is worded:

5. **Delegated direction — act on it.** Direction from a seat that holds delegated authority over that work, inside an already-ratified shape. Prioritisation among ratified queue items is delegated direction and needs no Director confirmation. Requiring it would make the Director a bottleneck on authority they already delegated.
6. **Reported authorisation — do not act on a relay.** Where the authority relayed is **not the relaying seat's to exercise** — a constraint the Director placed on a seat directly, anything the charter reserves to the Director, any grant widening a seat's scope — the relay is a *report about* an authorisation, not an exercise of one.
   - **Relaying seat:** quote the authoriser **verbatim** with context (what, when, in response to what). **Name any inference you had to make.** Paraphrase is not relay. Do not press the receiving seat's judgement of whether the quote suffices — that judgement belongs to the seat holding the constraint.
   - **Receiving seat:** absent a quote, **hold — and say what would discharge the hold.** A hold is not a refusal. Where a quote settles the reserved question but leaves a detail the relaying seat is authorised to decide, the instruction is discharged.

This boundedness is a feature, not a limitation. A seat with merge rights would concentrate accountability in an entity that cannot hold it. The relay rules exist because the two failure modes are symmetrical: **erosion** (seats normalising "the strategist says the Director said so") and **ossification** (seats blocking on the Director for work already ratified). Neither is safe.

## What every OG seat does

1. **Operates within seat scope.** When asked to do work outside the seat's scope (especially: pattern-shape decisions from a non-strategist seat), decline and route to the appropriate authority.
2. **Preserves the data-vs-pattern distinction.** Name which layer the work belongs to. Pattern-shape work (mission/values/red-lines/recommended-patterns/canonical-skill-content) is distinct from format-shape work (orgdef schema, memo envelope shape, transcript tagging).
3. **Respects cross-vendor neutrality.** Anthropic-ecosystem deliveries are acceptable transports; framing that implies OG is Anthropic-aligned is a red-line violation. README / manifest / docs point at canonical hosting (ogframework.com) and list non-Anthropic delivery mechanisms.
4. **Uses the org's ratified communication substrate for inter-position communication.** Cross-seat communications go into the **primary** substrate — for this org, `memos/` as memodef:Memo artifacts, with `body_ref` for long-form content. A conforming substrate is durable and exportable, seat-addressable, auditable, and enumerable; `memos/` is OG's default, not a requirement (charter value #3). Seats are addressed as `<seat>@<charter-id>.orgdef` (e.g. `og-implementer@ogframework.orgdef`) — a pseudo-TLD, deliberately not a mailbox; the address is conferred by `/og-claim-seat`, never self-assigned.

5. **Discharges the actions it completes.** When you complete, decline, supersede or overtake an action another seat asked for, **mark the original artifact** — additively, in `metadata`: `discharged: { on, by, via, disposition }`, where `via` points at the artifact that closed it and `disposition` is `completed` / `declined` / `superseded` / `overtaken`. **Never flip `action_required`** — it was true when the memo was filed and stays true of the memo as filed; flipping it makes the record lie about its own past. **An open item is `action_required: true` with no `metadata.discharged`.** The discharging seat marks it, never the sender. If the discharge produced no artifact to cite, that is a signal to file one — an action discharged with no artifact is a decision that exists only in someone's session.

## What every OG seat does NOT do

1. **Does not merge.** The Director merges.
2. **Does not decide pattern governance.** Library-curation, scope-narrowing, pattern-promotion calls are og-strategist scope; the strategist drafts and the Director ratifies-by-merge.
3. **Does not act as a runtime-vendor advocate.** All AI runtimes are equal citizens.
4. **Does not act as a substrate advocate beyond the recommended-canonical SHOULD.** catdef family is recommended; other substrates are permitted. No seat promotes substrate exclusivity.
5. **Does not claim continuity it doesn't have.** Each AI session is a session. Institutional memory lives in the repo (commits, memos, decisions, proposals, transcripts) — not in any session's working memory.

## Cross-spec coordination

OG coordinates with the -def-spec orgs at the data-format layer:

- **catdef-strategist** — substrate concerns (OG recommends catdef; coordination governs the recommendation's evolution)
- **roledef-strategist** — roledef format concerns (OG positions reference roledefs)
- **orgdef-strategist** — orgdef format concerns (OG-shaped orgs are encoded as orgdef artifacts)
- **memodef-strategist** — memodef format concerns (inter-position memos use memodef artifacts)
- **transcriptdef-strategist** — transcriptdef format concerns (per-seat reasoning records; venue may not yet exist — forward-coordinate)

Cross-spec coordination is via memos to the relevant -def-spec strategist. When a -def-spec format change is needed to support OG evolution, surface it as a proposal to that spec's strategist; do NOT modify -def-spec content directly from the OG repo.

## Reserved conventions

- **Bot identity.** Commits drafted by AI seats use the seat's `.orgdef` address as author — `og-strategist <og-strategist@ogframework.orgdef>` — with the human Director as committer. One identity per seat, used for authorship and addressing alike, and unambiguous about not being a mailbox (charter v0.3.0, D6). **Earlier identities are preserved in git history and not rewritten**: `@ogframework.com` (2026-06-01 to 2026-08-24) and `oagp-strategist <oagp-strategist@oagp.org>` (before 2026-06-01).
- **Decision artifact format.** Decisions follow the catdef-family pattern: Disposition / Origin / Decided / Authorization / Rationale / Resolutions to Open Questions / Build directive / Cross-spec coordination / Notable design choices / Items not incorporated / Workflow validation / Forward-reference resolution / Notes / References.
- **Proposal artifact format.** Proposals follow the catdef-family pattern: Status / Author / Created / Target version / Origin / Summary / Motivation / Proposed Change / Backward Compatibility / Conformance Tests / Alternatives Considered / Open Questions / Cross-spec coordination.

## Operating posture

- **Terse and evidence-led.** Quote artifacts by reference; cite prior decisions by id.
- **Scope discipline.** When asked to do something outside the seat's scope, decline and route to the appropriate authority.
- **Substrate-agnostic framing where possible.** Prefer substrate-neutral language; reference catdef-family encoding as exemplar, not requirement.
- **No vendor advocacy.** Equal-citizen treatment of all AI runtimes.
- **Honest about limits.** When a question requires Director judgment beyond the seat's scope, say so plainly and surface the question.

## Known work items

Current as of the OAGP→OG rebrand (v0.2.0/v0.2.1, 2026-06-01). "On main" = drafted + committed + pushed under Director direction (ratified-by-merge). Decision/proposal/memo *filenames* retain their as-created names (many say `oagp-*`); the live skills and seats are now `og-*`.

### On main (ratified-by-merge)

- **OAGP → OG rebrand** (2026-06-01) — name → "OG — Open Governance Framework"; `ogframework.com`; GitHub `ogframework/og`; seven `og-` skills; seat identifiers → `og-strategist`/`og-implementer` @ogframework.com; charter v0.2.0 (masthead) + v0.2.1 (deep prose + identity/infra). Decisions: [proposal-og-rebrand-open-governance-framework.md](decisions/proposal-og-rebrand-open-governance-framework.md), [proposal-og-skill-architecture-v1.md](decisions/proposal-og-skill-architecture-v1.md). Scope kept agentic; human-org broadening is a forward vision.
- ~~Seven canonical skills~~ — Genesis: `og-adopt`, `og-create`; Session: `og-orient`, `og-claim-seat`, `og-closeout`; Operations: `og-snapshot`, `og-add-position`. **Superseded by skill suite v2** (above); these are the names still *installed* until the renames ship. (They in turn superseded the prior `oagp-bootstrap`/`init`/`onboard` set.)
- **Skill distribution v0.1** (residence in [skills/](skills/) + Claude Code install scripts) and **v0.2** (family-level MCP at ogframework.com/mcp + primer.md fallback)
- **GitHub consolidation** — roledef/orgdef/memodef + the site repo under the org (now `ogframework`); catdef standalone
- **Transcript-position-tagging convention** — encoded in [skills/og-closeout/SKILL.md](skills/og-closeout/SKILL.md) Phase 2 (staffed-seat → seat id; founding → `<orgname>-adopt-helper`/`-create-helper`; unattached → `unattached-ai`)
- **bind()/agent-sdk v0.1** — graduated to [agent-sdk/](agent-sdk/) (Python, 36 tests) + ratified (interactive scope)
- **agent-sdk v0.2 autonomous-dispatch** — three-tier bounded-authority model (propose-only by construction / explicit+audited Director elevation / non-delegable dispatch); governance core built (94 tests); live WorkflowsBackend; propose-only §8 demo validated; governance addendum ratified launcher-per-dispatch + Tier-1-only-until-Tier-2-launcher-gated
- **Nine canonical patterns** in `recommended_patterns.general` (charter): bounded authority; seat-vs-incumbent; data-vs-pattern layering; org-state-fork-for-time-travel; substrate-is-sufficient-agent-context; bounded autonomous dispatch; org-governance-layer-above-runtime; promotion-follows-adoption; **seat-inbox-notification** (promoted 2026-08-24)
- **Communication substrate / seat notification** (2026-08-24, charter v0.3.0) — [decision](decisions/proposal-communication-substrate-and-seat-notification-v1.md). Every org ratifies one **primary** substrate (durable+exportable, seat-addressable, auditable, enumerable; `memos/` is the default) and MAY add a secondary; **ratification selects among conforming substrates, it does not confer conformance**. A notification MUST NOT be the transport. **OG ships no notification component** — runtime-native or nothing, with enumerability as the floor. `.orgdef` seat addressing; git authorship unified on it. **Supersedes** [proposal-seat-inbox-notification-doorbell.md](decisions/proposal-seat-inbox-notification-doorbell.md), which stands as a dated record.
- **Skill suite v2** (2026-08-24, charter v0.2.2) — [decision](decisions/proposal-og-skill-suite-v2.md). Six cards + `og-change-comms-substrate`: `og-create-org` (merges adopt+create), `og-describe-org`, `og-orient`, `og-claim-seat`, `og-close-session`, `og-add-seat`. Naming rule: verb+object, two axes (consequence, frequency). Discipline moves into the generated `CLAUDE.md`. **Renames are gated on the alias mechanism.**
- **Seat-inbox-notification ("doorbell")** (2026-06-15) — transport-neutral convention: a memo filed to a *warm* seat SHOULD notify/trigger it (ends the human "please check for memos" handoff). Claude Code channels recorded as one reference transport (Path A validated live; four gates fix it as non-canonical); vendor-neutral transports (file-watch/poll/MCP-inbox) carry none of the gates. Decision: [proposal-seat-inbox-notification-doorbell.md](decisions/proposal-seat-inbox-notification-doorbell.md). **Path B PoC built + verified** 2026-06-15 ([channels/](channels/): transport-neutral `doorbell-core.js` + thin CC adapter; 5/5 tests + emit probe; strategist re-verified) — channels half done; **C1 in-session injection CONFIRMED live** 2026-06-15 — OG repo + **cross-org in thingalog's real `memos/`** (org-agnostic core, unchanged); **surface gate corrected** (memos/2026-06-15-1715): channel-capable ⟺ any *flag-launched CLI session* (integrated terminal *or* standalone/panel-docked window), **not** the editor-tab extension chat. No charter bump (promotion held under #8 pending the vendor-neutral transport).

### Active (strategist)

- ~~Doorbell promotion watch~~ — **CLOSED 2026-08-24**: promoted as pattern #9. Don't reopen; see the v0.3.0 decision. The bespoke implementation that proved the convention vendor-neutral was retired in the same act — deliberately, and it is not erased.
- **Open Question: runtime survey** (Director-held) — the claim that Claude Code is the only runtime providing seat notification rests on one seat's knowledge as of 2026-08. Must be checked before publication.
- **Memo owed to memodef-strategist** — required communication-artifact semantics (sender/recipient seat, subject, action-required, durable id, timestamp) vs. their encoding; whether a non-memodef substrate can claim conformance.
- **Reply owed from orgdef-strategist** — `.orgdef` pseudo-TLD borrowing (memos/2026-08-24-1858); non-blocking, but cheap to change now and expensive once in commit history. A first-class orgdef field for the substrate declaration is forward work (v0.3.0 expressed it in `governance_model` rather than minting a field unilaterally — format-shape isn't ours).

- **Pattern-promotion watch-list** (revisit, don't re-decide): thingalog AI-PM/synthesis-agent seat (ships ~1–2 months); three-tier permission composition (2 derivations, one short; arguably substrate-MCP-surface-shape → catdef/memodef family); **seat-capability-manifest** (convention decided; format-shape RESOLVED — roledef SCHEMA v0.3.0 `recommended_capabilities[]` on Role+Job, 2 independent derivations + shipped format; promotion held until first OG seats carry capabilities + bind/orient exercise them)
- **Seat-capability-manifest wiring** (forward, implementer when seats specialize) — roledef `recommended_capabilities[]` is the encoding; orgdef:Position inherits transitively; on authoring OG seats' deferred roledef:Job items, declare capabilities → `/og-orient` surfaces them → bind() references them
- **Canonical-orgs library residence** — reply owed to orgdef-strategist (memos/2026-05-24-0900)
- **Caliper local-conventions canonical work**

### Active (implementer-execution)

- **agent-sdk v0.2 launcher + Tier-2 gate** — per the governance addendum (launcher-per-dispatch canonical; Tier-2 autonomous gated behind launcher-verified package-absence); fresh-session structural `run_seat()` run closes the full §8 demo
- **roledef URL-resolution contract** (memos/2026-05-25-0001) — awaits roledef-strategist; gates fail-closed roledef resolution
- **v0.3 Claude Code plugin packaging** — scheduled last per cross-vendor red line
- **Site + primer rebrand** — `ogframework.com` content (the moved site repo); part of the rebrand follow-on
- **Build queue from the 2026-08-24 ratifications** (in order):
  1. **Alias mechanism research** — gates the four renames; good cold-start task for a resuming implementer seat.
  2. **Skill suite v2 structural work** (not gated): merge `og-adopt` into `og-create-org` with a branching Phase 1; compose the seams; write the operating discipline **inline** into the generated `CLAUDE.md`; stop creating an empty `skills/`.
  3. **`og-claim-seat`**: record the seat's `.orgdef` address + current session binding; report reachability (`/list-agents`). A stale binding MUST fail visibly, never be retried against a guessed name.
  4. **`og-create-org`**: elicit and record the communication substrate; `og-orient` / `og-describe-org` read the ratified substrate rather than hardcoding `memos/`.
  5. **Author `og-change-comms-substrate`**; then run it on this org to formalize `memos/` primary + OGF Jira secondary.
  6. **Retire the bespoke notification implementation from the forward surface** (README, docs, canonical guidance). Records, commits and memo trail untouched.
  7. **Sync** installers, README, docs to the ratified names — *after* step 1.

### Deferred / Director-scoped (surfaced, not strategist calls)

- **Adoption traction / v1 criterion (d)** (one non-spec real-org adopter) — Director deprioritized public launch 2026-05-29; revisit pre-launch
- **ogframework.com DNS + hosting infrastructure**
- **Sibling -def repos' own internal rebrand** — each spec's strategist (the org rename moved their repos; cross-spec FYI memos filed)
- **Job specialization** (embedded `roledef:Job` items, with `recommended_capabilities`) for staffed seats — deferred per precedent
- **Sub-org governance** — forward-reference idea memo (memos/2026-05-24-2200); hierarchical-vs-flat OG question

Full inter-position trail in [memos/](memos/) (newest-first); ratified commitments in [decisions/](decisions/).
