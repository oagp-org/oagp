# OG — Open Governance Framework

**The canonical home for OG — the organizational framework that treats AI peers as first-class participants with bounded authority, ratification cycles, role-binding, audit trails, and adoption-cycle primitives.**

OG is an **organizational framework**, not a data format. It is conceptually separable from any specific data substrate; the catdef family (catdef → roledef → orgdef → memodef → transcriptdef) is the **recommended canonical substrate** because it is AI-peer-aware, not because OG requires it. OG-on-protobuf, OG-on-XML, OG-on-RDF are all coherent compositions.

OG = *Open Governance*. The brand deliberately doesn't hard-code "Agentic": the framework is **currently focused on agentic (AI-inclusive) organizations**, and broadening to human organizations is a forward vision (separate ratification, not current scope).

> **Status:** v0.2.0 — rebranded from OAGP (Open Agentic Governance Pattern) to **OG (Open Governance Framework)** on 2026-06-01; canonical home `ogframework.com`. oagp-strategist + oagp-implementer seats staffed; seven canonical `og-` skills; agent-sdk bind() v0.1 ratified + v0.2 autonomous-dispatch built and demoed. The seat identifiers (`oagp-*`), the GitHub repo/org name, and `oagp.org` remain on their legacy names pending a coordinated rename follow-on (redirects cover the interim). See [decisions/](decisions/), [proposals/](proposals/), [memos/](memos/). Director: [Scott Edsby](mailto:scott@confusedgorilla.com).

## What's in this repo

```
oagp-org/  (GitHub repo; rename to an og-* name is a deferred follow-on)
├── README.md                       ← this file
├── LICENSE                         ← MIT
├── CLAUDE.md                       ← AI operating manual
├── org/
│   └── oagp-organization.opencatalog   ← org charter (id retained pending repo rename)
├── memos/                          ← inter-position memos
├── proposals/                      ← draft proposals
├── decisions/                      ← ratified strategist decisions
├── transcripts/                    ← per-seat reasoning records
├── skills/                         ← canonical OG skills (og-adopt, og-create, og-orient, og-claim-seat, og-closeout, og-snapshot, og-add-position)
├── install/                        ← cross-runtime install scripts
├── agent-sdk/                      ← agent-runtime bindings (roledefs → AgentDefinitions)
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

Seven `og-` skills in three categories. The suite is the discoverable menu of canonical operations — its presence advertises what OG supports.

**Genesis (one-shot per org):**
- **`/og-adopt`** — convert an existing project into OG shape → [skills/og-adopt/SKILL.md](skills/og-adopt/SKILL.md)
- **`/og-create`** — create a new OG-shaped org from scratch (folder-only by default, git optional) → [skills/og-create/SKILL.md](skills/og-create/SKILL.md)

**Session (per session):**
- **`/og-orient`** — read-only come-up-to-speed on the org; emits the snapshot → [skills/og-orient/SKILL.md](skills/og-orient/SKILL.md)
- **`/og-claim-seat`** — take a position (PO-authorized staffing act) → [skills/og-claim-seat/SKILL.md](skills/og-claim-seat/SKILL.md)
- **`/og-closeout`** — wrap a session: closeout memo + transcript-save prompt → [skills/og-closeout/SKILL.md](skills/og-closeout/SKILL.md)

**Operations (ongoing):**
- **`/og-snapshot`** — current-state view: identity + staffing + recent-activity digest (screen, optional MD) → [skills/og-snapshot/SKILL.md](skills/og-snapshot/SKILL.md)
- **`/og-add-position`** — propose a new position (Director-ratified org-chart change) → [skills/og-add-position/SKILL.md](skills/og-add-position/SKILL.md)

Skill architecture ratified 2026-06-01 ([decisions/proposal-og-skill-architecture-v1.md](decisions/proposal-og-skill-architecture-v1.md)); rebrand from the prior `oagp-*` adoption/session set ([decisions/proposal-og-rebrand-open-governance-framework.md](decisions/proposal-og-rebrand-open-governance-framework.md)). When canonical web hosting at [ogframework.com](https://ogframework.com) is live, canonical content also serves there.

## Quick install (Claude Code)

To make the seven `og-` skills discoverable in Claude Code on a new machine:

**Windows (PowerShell):**
```powershell
git clone https://github.com/oagp-org/oagp.git
cd oagp
.\install\install-claude-code-skills.ps1
```

**macOS / Linux (Bash):**
```bash
git clone https://github.com/oagp-org/oagp.git
cd oagp
./install/install-claude-code-skills.sh
```

The install script creates a junction (Windows) or symlink (Unix) from `~/.claude/skills/og-{adopt,create,orient,claim-seat,closeout,snapshot,add-position}` into this clone's `skills/` directory. Restart Claude Code; the skills become discoverable.

To update later: `git pull` in this clone — the junction/symlink tracks the working tree, so updates land without re-installing.

For non-Claude-Code runtimes (claude.ai web, ChatGPT, Gemini, Perplexity), a substrate-neutral primer at `ogframework.com/primer.md` is the cross-runtime entry point (per the v0.2 distribution decision).

## Governance

Bounded AI authority + human Director ratification. AI seats read/draft/propose; the human Director ratifies, merges, and makes public statements. No AI seat holds merge rights. Director: [Scott Edsby](mailto:scott@confusedgorilla.com).

## License

MIT. See [LICENSE](LICENSE).
