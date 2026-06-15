# Findings — Claude Code "channels" as a doorbell transport for the inter-seat handoff

**From:** og-strategist (s:/projects/oagp-org; remote github.com/ogframework/og)
**To:** og-strategist (institutional capture)
**Date:** 2026-06-15
**Action required:** No

Live experiment run this session under Director direction. Records what we learned so the next incumbent (and the [seat-inbox-notification proposal](../proposals/seat-inbox-notification-doorbell.md)) does not have to re-derive it.

---

## 1. The problem the Director raised

> "One of the real challenges is that the handoff between seats needs a 'Please check for memos' human command."

This is the missing **doorbell** in the seat-vs-incumbent pattern. Coordination between OG seats is asynchronous via `memos/` (charter pattern #2). The substrate is the mailbox — but nothing *rings* when a memo lands. Today the human Director is the trigger ("check for memos"). The Director asked whether Claude Code **channels** could remove that human step.

## 2. What channels is (verified against the docs this session)

A channel is an **MCP server that pushes events into an *already-running* Claude Code session** so Claude reacts without being polled. Two load-bearing facts:

- *"Events only arrive while the session is open... for an always-on setup you run Claude in a background process or persistent terminal."* It **cannot start or wake a session that isn't already running.**
- *"They require Anthropic authentication through claude.ai or a Console API key, and are not available on Amazon Bedrock, Google Vertex AI, or Microsoft Foundry."* Research preview; Claude-Code-specific.

## 3. The handoff has two halves — channels solves one

| Half | What it is | Channels? |
|---|---|---|
| **Cold-start** | Receiving seat's session **doesn't exist yet**. Something must *start* it and point it at its inbox. | **No** — channels only deliver to an open session. |
| **Warm / doorbell** | Seat session **is running**; a new memo lands; the incumbent doesn't know to look. | **Yes** — this is exactly what channels is for. |

The Director **runs seats in warm standby**, so the warm/doorbell half *is* their situation. Channels is a genuine fit for that half. Cold-start remains the launcher/scheduler problem (agent-sdk v0.2 `run_seat()` + launcher track), untouched by channels.

## 4. Path A — smoke test: ENABLED and WORKING in this VS Code environment

Goal was only to answer "can we even enable this here." Result: **yes.** The working recipe, with every gotcha we hit in order:

1. **Surface matters.** Channels are a **launch flag** (`claude --channels …`). The **VS Code extension *panel* cannot pass it** (it bundles a private CLI with no flag hook; no env-var equivalent exists). You must use the **integrated terminal CLI** (`Ctrl+\``), which is fully supported and keeps IDE integration. Prereq: a standalone `claude` on PATH (confirmed: `claude --version` → **2.1.177**, ≥ the 2.1.80 floor).
2. **Org-policy gate (the big one).** First launch under the corporate `edsby` account printed: `--channels blocked by org policy (plugin:fakechat@claude-plugins-official) … Have an administrator set channelsEnabled: true in managed settings to enable`. Managed orgs block channels by default; the toggle is **admin-only** (managed settings users cannot override — itself a nice structural-bounding parallel). **Resolution chosen:** switch to a **personal Claude Max account**, which *"skips these checks entirely"* — no corporate-wide policy change made.
3. **Bun on PATH.** The official plugins (fakechat/telegram/discord/imessage) are **Bun** scripts. Installed **Bun 1.3.14**, but VS Code caches its env at launch, so even a fresh integrated terminal didn't see it until we prepended: `$env:Path = "$env:USERPROFILE\.bun\bin;$env:Path"`. The `claude` process must inherit Bun so it can spawn the plugin subprocess. (A *custom* channel needs only Node/Deno — Node 24 is present — so Path B will not need Bun.)
4. **Launch + confirm.** `claude --channels plugin:fakechat@claude-plugins-official` then printed the registration line: *"Channels (experimental) messages from plugin:fakechat@claude-plugins-official inject directly in this session,"* running as **Claude Max** with **no org block**.
5. **Round-trip.** fakechat UI loaded at `localhost:8787` (server spawned ✓), and a browser message (`ping from fakechat — reply with my current working directory`) **delivered into the session as a channel event**. The inbound push — the doorbell-relevant direction — was demonstrated. (The outbound reply-to-browser leg was not independently scroll-verified in the panel view; it is the chat-bridge half, not the doorbell half, so it is not load-bearing for OG.)

## 5. The four gates — why channels is a reference transport, NEVER the canonical doorbell

Validating it *worked* did not change the disposition; it sharpened it. Channels carries **four independent disqualifiers** from being OG's canonical mechanism:

1. **Vendor.** Anthropic-auth-only; excluded on Bedrock/Vertex/Foundry. Making it canonical violates the **no-vendor-capture red line**.
2. **Maturity.** Research preview; the docs warn the `--channels` flag syntax and protocol contract *"may change."*
3. **Surface.** Terminal-CLI sessions only — **not the extension panel** (where the Director currently runs the og-strategist / og-implementer seats as tabs).
4. **Adoption friction.** Gated behind an **org-admin managed-settings policy** for every managed (Team/Enterprise) adopter — directly at odds with OG's zero-friction-adoption value.

The vendor-neutral alternatives (filesystem watch, poll loop / scheduled tasks, an MCP inbox such as **openbraid**) carry **none** of these four gates.

## 6. The workflow implication worth carrying forward

Using channels as the doorbell means running each warm-standby seat as an **integrated-terminal `claude --channels …` session**, not an extension-panel tab. That is a real change to how the Director works today, and it is itself an argument for keeping the canonical doorbell transport-neutral (file-watch/poll impose no such switch).

## 7. Disposition (drafted; Director ratifies)

- **Pattern (strategist, drafted):** name a vendor-neutral **seat-inbox-notification ("doorbell")** semantic — a memo filed to a seat SHOULD be able to notify/trigger that seat — with transport left open. Channels = one Claude-Code reference transport under it. See [proposals/seat-inbox-notification-doorbell.md](../proposals/seat-inbox-notification-doorbell.md).
- **Real PoC (implementer, scoped):** a **Node memo-watcher custom channel** that pushes "new memo filed to <seat>" into a running seat session — the actual "no more *please check for memos*." Scoped in [memos/2026-06-15-1150](2026-06-15-1150--og-strategist--og-implementer--path-b-memo-watcher-doorbell-poc-build-scope.body.md).
- **Promotion:** held under promotion-follows-adoption (#8) until the PoC + at least one vendor-neutral transport validate the semantic.

— og-strategist
