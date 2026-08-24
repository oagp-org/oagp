# Claim-seat application 2026-06-14: og-implementer (fresh session resuming a staffed seat)

**From:** og-implementer (s:/projects/oagp-org; remote github.com/ogframework/og)
**To:** Director (Scott)
**Date:** 2026-06-14
**Action required:** Yes — explicit authorization to occupy the seat in this session.

---

## 1. What this is

A fresh session proposing to occupy the **og-implementer** seat. The seat is already
`status: staffed` (incumbent `og-implementer <og-implementer@ogframework.com>`, staffed
2026-05-24). Per the **seat-vs-incumbent** pattern the seat persists while sessions are
ephemeral, so this is a *resumption*, not a vacant-seat claim. No charter `status`/incumbent
edit is required — the bot identity is stable across sessions. I am honoring the authorization
gate regardless: propose → authorize → operate.

## 2. Fit evaluation

Read the implementer position description, the seat-vs-incumbent value, the red lines, and the
two most-recent closeouts. The scope — agent-sdk bindings, plugin packaging, web/docs publishing
(ogframework.com), runtime delivery packages — matches my capabilities. Strong fit.

## 3. Scope I accept

- agent-sdk library: roledef→vendor AgentDefinition bindings across runtimes (cross-vendor neutral).
- Plugin packaging (Claude Code source; future cross-runtime packages).
- web/docs publishing at ogframework.com.
- Runtime delivery package authoring (claude.ai project, ChatGPT GPT, Gemini Gem, primer text).
- Implementer-scope calls within ratified shapes: implementation language, framework choice,
  sprint sequencing, architectural decisions inside ratified shapes.

## 4. Bounds I do NOT hold (bounded-authority discipline)

1. No merge / push / tag / release — the Director ratifies-by-merge.
2. No pattern-shape decisions — API/skill/plugin-shape ratifications route to the og-strategist
   seat via memo.
3. No vendor or substrate advocacy — all runtimes and substrates are equal citizens.
4. Embedded `roledef:Job` specialization remains deferred per precedent.

## 5. Open execution items I would inherit (from closeouts + CLAUDE.md)

| Item | State |
|---|---|
| agent-sdk v0.2 §8 full close | operational fresh-session `ClaudeCliLauncher(execute=True)` run still owed |
| roledef URL-resolution contract (memos/2026-05-25-0001) | parked on roledef-strategist; interim fail-closed default holds |
| v0.3 Claude Code plugin packaging | scheduled last per cross-vendor red line |
| MCP server at ogframework.com/mcp | not yet stood up |
| Site "Enforce HTTPS" | Director-side (GitHub Let's Encrypt cert) |

## 6. Standing posture

Draft, propose, file, build. One tight action-required memo per ratification item. Cross-spec
coordination filed from this seat (or in the sibling repo's `memos/` when the artifact is for
that spec's strategist). I do not commit, push, or merge.

Awaiting explicit authorization ("take the seat" / "yes, occupy og-implementer"). You may decline
or redirect.

— og-implementer (Claude Opus 4.8 1M context, 2026-06-14 chair, s:/projects/oagp-org)
