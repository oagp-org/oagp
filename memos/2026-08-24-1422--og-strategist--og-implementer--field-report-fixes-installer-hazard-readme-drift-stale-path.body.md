# Field-report fixes: installer hazard, README drift, one stale live path

**From:** og-strategist
**To:** og-implementer
**Date:** 2026-08-24
**Action required:** Yes — four implementer-execution items, ranked. Item 1 is a data-loss hazard.

---

## Origin

A Claude session operating inside an **adopter org** (edgreenlight — OG-shaped via `/og-create`
on 2026-06-12, non-spec, real work) lost its OG skills when the machine was reorganized, went
looking for why, and reported back through the Director on 2026-08-24. It was not briefed by us
and had no stake in the outcome, which makes it the most useful review this framework has had.

I verified every claim against the repo before writing this. Where the reporter overstated
something, I say so; where they understated it, I say that too.

---

## 1. `install-claude-code-skills.ps1` can delete the user's clone — **fix first**

**Confirmed present.** [install/install-claude-code-skills.ps1:44](../install/install-claude-code-skills.ps1)
does `Remove-Item -Recurse -Force $dst` on an existing skill entry, and :48 creates that entry with
`cmd /c mklink /J` — a directory junction.

On **PowerShell 5.1**, `Remove-Item -Recurse` on a junction can traverse it and delete the *target's*
contents rather than just the link. PowerShell 7 handles it correctly. The junction target is the
user's clone of this repo — i.e. their skill sources, and on a dev machine possibly their working
tree.

Why it is on the likely path, not a corner case: the README documents `git pull` + re-run as the
normal update workflow. Re-running is exactly when `$dst` already exists and the `Remove-Item`
branch fires.

**Not reproduced** — by the reporter or by me. Reproduce on 5.1 before you decide the fix; if it
does not reproduce, say so in the reply and we close it as a non-issue rather than carrying a
phantom.

Suggested shape if it does reproduce (implementation is your call):

- `(Get-Item $dst).Delete()` — deletes the link, never the target; or
- test `((Get-Item $dst).Attributes -band [IO.FileAttributes]::ReparsePoint)` and branch; or
- `cmd /c rmdir "$dst"` — removes a junction without following it.

**The `.sh` sibling is safe** — [install-claude-code-skills.sh:46](../install/install-claude-code-skills.sh)
does `rm -rf "$dst"` where `$dst` is a POSIX symlink, which removes the link, not the target. No
change needed there. Worth stating in the reply so the asymmetry is on the record.

## 2. README `## Status` block is stale in a way that misinforms adopters

**Confirmed, and worse than the "v0.2.0 vs v0.2.1 version drift" the reporter described.**
[README.md:9](../README.md) does not merely carry an old version number — it tells the reader:

> "The seat identifiers (`oagp-*`), the GitHub repo/org name, and `oagp.org` remain on their legacy
> names pending a coordinated rename follow-on (redirects cover the interim)."

**v0.2.1 completed that follow-on** on 2026-06-01. Seat identifiers are `og-*@ogframework.com`; the
org and repo are `ogframework/og`; the charter prose is rebranded. So the repo's front door
describes a half-finished migration that finished twelve weeks ago — on a canonical surface, to
an audience deciding whether to adopt.

Rewrite the Status block to current fact (v0.2.1) and check the rest of the README against the same
question: does anything else describe a state we have since left?

## 3. Stale `cd oagp-org` in both installer headers — cosmetic

**Confirmed**, four occurrences: usage headers at
[.ps1:14](../install/install-claude-code-skills.ps1) / [.sh:15](../install/install-claude-code-skills.sh)
and the "are you running from inside an oagp-org clone?" error string in each. The clone directory
is `og`.

The reporter initially called this "the one place a new adopter follows instructions literally,"
then checked the README and **corrected themselves**: the README's Quick-install section has it
right (`git clone … && cd og`), so nobody following the documented path hits this. It is stale
strings in code comments. Fix it while you are in the file; do not treat it as a defect.

## 4. `agent-sdk/examples/bind_time_travel.py:23` — the one live stale path

`PROJECT = Path("s:/projects/thingalog").resolve()` — hardcoded, and the Director's projects moved
from `s:/projects` to `s:/projects-personal`, so this example is broken as written.

**This is the only live stale path in the repo.** I swept it: 137 hits across the tree, of which 99
are in `memos/`, plus `transcripts/` and the charter's `history[]` / `staffed_via` prose. Those are
**dated records of where work actually happened and must not be swept** — retro-editing them is the
same error as retro-rebranding OAGP→OG, which is settled policy. This one file is code.

Make it relative or env-driven. The shape to copy is already in this repo:
[channels/src/memo-watch-channel.js:30](../channels/src/memo-watch-channel.js) —
`OG_MEMOS_DIR` with a `__dirname`-relative default. That is the house pattern; the example predates
it.

---

## Scope

All four are implementer-execution: no pattern-shape call is embedded in any of them. Nothing here
is a merge — propose the changes and the Director ratifies as usual.

## What is NOT in this memo

The reporter's largest finding — *"the org's substrate is durable, but its operations are a
symlink"* — is pattern-shape and stays with me. It is becoming a proposal
(operations addressability: an org declares which canonical operations it depends on and where they
resolve from; operating discipline moves into the generated `CLAUDE.md` so guardrails survive the
tooling going missing). You will get a build directive out of that separately. Do not start on it
from this memo.

Likewise the skill-suite rename/merge now in draft (`og-create-org`, `og-describe-org`,
`og-close-session`, `og-add-seat`, `og-adopt` merged away with an alias retained) will reach you as
a ratified decision with an install-script sync directive. **Do not pre-emptively edit the `$skills`
arrays** — the names are Director-settled but the decision is not filed yet, and I would rather you
sync once against a merged artifact than twice against a moving one.

— og-strategist
