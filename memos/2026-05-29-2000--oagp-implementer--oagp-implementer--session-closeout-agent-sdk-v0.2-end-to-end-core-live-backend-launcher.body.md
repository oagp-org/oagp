# Session closeout: oagp-implementer; agent-sdk v0.2 end-to-end

**From:** oagp-implementer (s:/projects/oagp-org)
**To:** oagp-implementer (institutional capture for the seat's history)
**Date:** 2026-05-29
**Action required:** No (institutional capture)

---

## 1. Session arc

Resumed the oagp-implementer seat under PO direction (fresh `/oagp-onboard`; the v0.1.8 charter reconciliation `e4aeb04` had already folded the 2026-05-28-1000 bookkeeping). Read the strategist's [2026-05-29-1300 v0.2 consolidated build-direction](2026-05-29-1300--oagp-strategist--oagp-implementer--agent-sdk-v0.2-consolidated-build-direction.body.md). Shipped v0.2 of the agent-sdk in three ratified increments. Strategist ratifications received in-session and closed.

## 2. Shipped (committed + pushed under `oagp-implementer` authorship)

| Commit | Increment | Highlight |
|---|---|---|
| `6628404` | **v0.2 governance core** | `run_seat()` + three-tier structural bounded-authority (Tier-1 propose-only-by-construction; Tier-2 grant_director_actions + bind-event memo; Tier-3 OAGP_BOUND_AGENT env marker via `guard.py`) + fail-closed roledef resolution + `StubBackend` + 7 of 9 §6 conformance tests. **82 + 1 skipped.** |
| `3644bb6` | **live `WorkflowsBackend` + §8 propose-only demo** | `render_dispatch_workflow()` generates a Claude Code workflow that dispatches via `agentType` (carries the agent file's `tools:` bound — never inline). `select_backend("auto")` detects Claude Code. Conformance test 8 now real. Live demo dispatched a propose-only `doc-reviewer` that read the README and filed a 7-proposal review (README untouched); bind-event memo as audit trail. **94 tests.** |
| `7725558` | **launcher + Tier-2 package-absence gate** (per [2026-05-29-1800 ratification](2026-05-29-1800--oagp-strategist--oagp-implementer--demo-validated-launcher-and-tier2-gating-ratified.body.md)) | `launch_seat()` always dispatches via WorkflowsBackend (agentType) — inline barred for autonomous. `Tier2GateError` unless `verify_package_absent()` confirms `import oagp_agent_sdk` fails in the dispatch env. `SessionLauncher`: `StubSessionLauncher` default + `ClaudeCliLauncher`. Addendum §5 (a)+(b) conformance tests added. README + Status + Roadmap updated; quick-start nit fixed. **105 tests.** |

Status memos to the strategist seat: [2026-05-29-1500](2026-05-29-1500--oagp-implementer--oagp-strategist--agent-sdk-v0.2-governance-core-shipped-bind-event-subtype-question.body.md) (governance core + bind-event subtype routing question), [2026-05-29-1700](2026-05-29-1700--oagp-implementer--oagp-strategist--agent-sdk-v0.2-live-workflows-wired-demo-findings.body.md) (live backend + §8 demo + two findings), [2026-05-29-1900](2026-05-29-1900--oagp-implementer--oagp-strategist--launcher-and-tier2-gate-shipped-1800-directive-complete.body.md) (1800 directive closeout).

## 3. Decided (received this session)

- Strategist ratified bind() v0.1 (carried over from 2026-05-28-1000). Charter v0.1.6 bookkeeping folded into v0.1.8 reconciliation pre-session.
- Strategist ratified **launcher-per-dispatch as the canonical autonomous-dispatch shape** + **Tier-2 package-absence preflight as the in-band Tier-3 floor for the Workflows path** ([decisions/proposal-agent-sdk-v0.2-governance-addendum-autonomous-dispatch-constraints.md](../decisions/proposal-agent-sdk-v0.2-governance-addendum-autonomous-dispatch-constraints.md); reply at [2026-05-29-1800](2026-05-29-1800--oagp-strategist--oagp-implementer--demo-validated-launcher-and-tier2-gating-ratified.body.md)). All in-scope implementer work for this directive is shipped (commit `7725558`).

**Nothing awaits Director merge-ratification** — every push landed under `oagp-implementer` authorship with the human Director as the local git committer per the reserved bot-identity convention.

## 4. In flight

None. Each increment closed before the next started; the 1800 directive was closed by the 1900 memo before this closeout.

## 5. Open / forward queue

| Item | Owner | State |
|---|---|---|
| Fresh-session `ClaudeCliLauncher(execute=True)` run to fully close §8 | next implementer session (operational) | `build_command()` is best-effort; CLI flag surface needs tuning to the installed `claude` invocation. The governance core (tiers, gate, agentType-only) is done and tested regardless. |
| roledef URL-resolution contract | roledef-strategist | [memos/2026-05-25-0001](2026-05-25-0001--oagp-implementer--roledef-strategist--url-resolution-contract-for-canonical-roledefs.body.md) — no reply; interim fail-closed default holds. |
| memodef bind-event memo subtype | memodef-strategist | Routed by oagp-strategist at [memos/2026-05-29-1601](2026-05-29-1601--oagp-strategist--memodef-strategist--bind-event-memo-subtype-format-shape-question.body.md); awaiting. |

Pattern-promotion candidate from the v0.1.5 era still queued under oagp-strategist (consolidated decision): *"OAGP substrate is sufficient agent context"* — empirically reinforced by this session (the substrate on disk fed the bound agent without any additional context plumbing).

## 6. Side-effects worth flagging for the next incumbent

- **Session-start rule is load-bearing.** Claude Code resolves `agentType` against the registry loaded at session start. A mid-session-written agent file is not visible — `agent type 'X' not found`. This is not an obstacle; it is *the* enforcement of the structural Tier-1 toolset bound. Adopted as canonical (launcher-per-dispatch). Do not attempt to work around it.
- **Inline / same-session dispatch is barred for autonomous runs.** `launch_seat()` does not accept an inline backend. Inline silently substitutes the workflow's broad default toolset (incl. `Bash`) and breaks Tier-1. Acceptable only as clearly-labeled interactive/demo mechanics — `examples/demo-output/mechanics-demo.workflow.js` is the labeled example.
- **Tier-3 env-marker gap in the Workflows path.** `OAGP_BOUND_AGENT` cannot be injected into a workflow-spawned subagent. For that path the non-delegable floor rests on package-absence + bound toolset, both enforced by `launch_seat()` (refuses Tier-2 absent verified package-absence).
- **Tier-1 only in dev environments where the sdk is importable.** The Tier-2 gate correctly refuses in this repo (the package is on path). Tier-2 autonomous dispatch only becomes available in a deployed environment that lacks `oagp_agent_sdk` — exactly per the ratified posture.
- **CLI flag surface in `ClaudeCliLauncher.build_command()` is best-effort.** Likely needs tuning to whatever `claude` invocation is installed (the §5.1 PoC noted `claude --bg --agent <name>`; the addendum says "runs the generated workflow." Empirical work needed to settle the exact command.).
- **README quick-start fix.** Previously bound `security-tester` against a placeholder path; the demo's own bound agent flagged it. Now binds `doc-reviewer` against `examples/demo-orgdef.opencatalog` (runnable as written).

## 7. Forward queue for the next implementer session

1. Read this memo first.
2. Check whether roledef-strategist has replied to [2026-05-25-0001](2026-05-25-0001--oagp-implementer--roledef-strategist--url-resolution-contract-for-canonical-roledefs.body.md). On contract: implement agent-sdk fail-closed resolution against the ratified shape.
3. Operational §8 close: tune `ClaudeCliLauncher.build_command()` to the installed CLI; run a real fresh-session `execute=True` dispatch; capture evidence in `agent-sdk/examples/demo-output/`.
4. (Optional, low) Bind-event memo subtype: apply memodef-strategist's ratified convention once their reply lands.
5. (Optional) Anything off the inbox at the time.

— oagp-implementer (Claude Opus 4.7 1M context, 2026-05-29 chair; closeout filed end-of-session)
