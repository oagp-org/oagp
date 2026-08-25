# OG — Open Governance Framework

**The canonical home for OG — the organizational framework that treats AI peers as first-class participants with bounded authority, ratification cycles, role-binding, audit trails, and adoption-cycle primitives.**

OG is an **organizational framework**, not a data format. It is conceptually separable from any specific data substrate; the catdef family (catdef → roledef → orgdef → memodef → transcriptdef) is the **recommended canonical substrate** because it is AI-peer-aware, not because OG requires it. OG-on-protobuf, OG-on-XML, OG-on-RDF are all coherent compositions.

OG = *Open Governance*. The brand deliberately doesn't hard-code "Agentic": the framework is **currently focused on agentic (AI-inclusive) organizations**, and broadening to human organizations is a forward vision (separate ratification, not current scope).

> **Status:** charter v0.3.2 — rebranded from OAGP to **OG (Open Governance Framework)** 2026-06-01; canonical home `ogframework.com`; repo [github.com/ogframework/og](https://github.com/ogframework/og). Both AI seats staffed. **Skill suite v2** built 2026-08-25: seven cards, substrate-aware, seams composed. **Communication substrate / seat notification** split ratified — OG ships no notification component; orgs use what their runtime provides, and a seat enumerates its inbox at session start regardless. Nine canonical `recommended_patterns`. Historical artifacts keep their as-of-their-time `oagp-*` names by policy — dated records, not live naming. See [decisions/](decisions/), [proposals/](proposals/), [memos/](memos/). Director: [Scott Edsby](mailto:scott@confusedgorilla.com).

## What's in this repo

```
og/  (GitHub repo: github.com/ogframework/og)
├── README.md                       ← this file
├── LICENSE                         ← MIT
├── CLAUDE.md                       ← AI operating manual
├── org/
│   └── oagp-organization.opencatalog   ← org charter (charter `id` is `ogframework`; the filename is a dated artifact name)
├── memos/                          ← inter-position memos
├── proposals/                      ← draft proposals
├── decisions/                      ← ratified strategist decisions
├── transcripts/                    ← per-seat reasoning records
├── skills/                         ← canonical OG cards (og-create-org, og-orient, og-claim-seat, og-describe-org, og-close-session, og-add-seat, og-change-comms-substrate)
├── install/                        ← cross-runtime install scripts
├── agent-sdk/                      ← agent-runtime bindings (roledefs → AgentDefinitions)
├── channels/                       ← seat-inbox-notification ("doorbell") PoC: transport-neutral core + adapter
├── plugin/                         ← Claude Code plugin packaging (and future cross-runtime packages)
├── web/                            ← ogframework.com site source
└── docs/                           ← canonical framework documentation
```

## Relationship to the -def-spec family

OG sits at the **framework layer**, above the **data-format layer** held by the -def specs:

| Layer | What | Specs |
|---|---|---|
| **Framework** | What an OG-shaped org IS | OG (this repo) |
| **Data format** | How OG-shaped state is encoded | catdef, roledef, orgdef, memodef, transcriptdef |

OG recommends catdef-family substrate for AI-peer-alignment, but does not require it. See the [org charter](org/oagp-organization.opencatalog) `values.substrate-agnosticism` and `red_lines` "No substrate capture" for the load-bearing data-vs-pattern distinction. (OG also composes *over* runtime execution/policy primitives — orchestration frameworks, policy toolkits, native dispatchers like Claude Code Workflows — rather than competing with them; it is the cross-session organizational-governance layer.)

## Canonical skills

Seven `og-` cards in three categories. The suite is the discoverable menu of canonical operations — its presence advertises what OG supports. Names follow one rule: **verb + object, where the object is named whenever it isn't obvious from the verb.**

**Genesis (one-shot per org):**
- **`/og-create-org`** — bring a project into OG shape, existing or brand new. Phase 1 branches on whether a project already exists; everything after is identical → [skills/og-create-org/SKILL.md](skills/og-create-org/SKILL.md)

**Session (per session):**
- **`/og-orient`** — read-only come-up-to-speed; ends by emitting the current-state view → [skills/og-orient/SKILL.md](skills/og-orient/SKILL.md)
- **`/og-claim-seat`** — take a position (PO-authorized staffing act); composes `/og-orient` → [skills/og-claim-seat/SKILL.md](skills/og-claim-seat/SKILL.md)
- **`/og-close-session`** — wrap a session: closeout memo, discharge what you completed, transcript-save prompt → [skills/og-close-session/SKILL.md](skills/og-close-session/SKILL.md)

**Operations (ongoing):**
- **`/og-describe-org`** — current-state view: identity + staffing + open items (screen, optional MD) → [skills/og-describe-org/SKILL.md](skills/og-describe-org/SKILL.md)
- **`/og-add-seat`** — propose a new seat (Director-ratified org-chart change) → [skills/og-add-seat/SKILL.md](skills/og-add-seat/SKILL.md)
- **`/og-change-comms-substrate`** — change where inter-seat communication is recorded. Rare, charter-altering, deliberately unmissable → [skills/og-change-comms-substrate/SKILL.md](skills/og-change-comms-substrate/SKILL.md)

**The cards compose:** `/og-describe-org` ← `/og-orient` ← `/og-claim-seat`. Each is independently runnable; each calls down rather than restating. The read-only half of a pair exists so the consequential half can rest on it.

Skill suite v2 ratified 2026-08-24 ([decisions/proposal-og-skill-suite-v2.md](decisions/proposal-og-skill-suite-v2.md)), superseding the v1 architecture ([decisions/proposal-og-skill-architecture-v1.md](decisions/proposal-og-skill-architecture-v1.md)). When canonical web hosting at [ogframework.com](https://ogframework.com) is live, canonical content also serves there.

## Quick install (Claude Code)

To make the seven `og-` skills discoverable in Claude Code on a new machine:

**Windows (PowerShell):**
```powershell
git clone https://github.com/ogframework/og.git
cd og
.\install\install-claude-code-skills.ps1
```

**macOS / Linux (Bash):**
```bash
git clone https://github.com/ogframework/og.git
cd og
./install/install-claude-code-skills.sh
```

The install script creates a junction (Windows) or symlink (Unix) from `~/.claude/skills/og-{create-org,orient,claim-seat,describe-org,close-session,add-seat,change-comms-substrate}` into this clone's `skills/` directory. Restart Claude Code; the cards become discoverable. **Re-run it after a card is renamed** — a rename breaks the existing link.

To update later: `git pull` in this clone — the junction/symlink tracks the working tree, so updates land without re-installing.

For non-Claude-Code runtimes (claude.ai web, ChatGPT, Gemini, Perplexity), a substrate-neutral primer at `ogframework.com/primer.md` is the cross-runtime entry point (per the v0.2 distribution decision).

## Governance

Bounded AI authority + human Director ratification. AI seats read/draft/propose; the human Director ratifies, merges, and makes public statements. No AI seat holds merge rights. Director: [Scott Edsby](mailto:scott@confusedgorilla.com).

## License

MIT. See [LICENSE](LICENSE).
