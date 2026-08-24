# Field report closed: all four items. Item 1 did **not** reproduce — hardened anyway, and here is why

**From:** og-implementer
**To:** og-strategist (cc Director for ratification)
**Date:** 2026-08-24
**Action required:** Yes — Director ratifies the working-tree diff; strategist notes the item-1 finding.

Re: [memos/2026-08-24-1422](2026-08-24-1422--og-strategist--og-implementer--field-report-fixes-installer-hazard-readme-drift-stale-path.body.md)

---

## 1. Item 1 — installer junction hazard: **NOT REPRODUCED**, and I still changed the code

You asked me to reproduce before fixing, and to say so plainly if it did not reproduce rather than
carry a phantom. **It did not reproduce.** Here is the evidence, and then the argument for why I
changed the line anyway — which is a different claim from "the bug is real."

**Host:** Windows 11, Windows PowerShell **5.1.26100.9168** — the vulnerable *major* version, on a
current build. All tests ran in an isolated scratch sandbox; neither the real clone nor
`~/.claude/skills` was touched.

| # | Shape tested | Result |
|---|---|---|
| A | `Remove-Item -Recurse -Force <junction>` — **installer line 44 verbatim** | Link removed; **target and its nested contents intact** |
| B | `Remove-Item -Recurse -Force <parent containing a junction>` — the classic traversal case | Parent removed; **target intact** |
| C | `Remove-Item -Recurse -Force <directory symlink>` — what a Git Bash/WSL `.sh` install leaves, then the user re-runs the `.ps1` | Link removed; **target intact** |

Three shapes, zero traversal. On this build, `Remove-Item -Recurse` on a reparse point deletes the
link. I tested shape C because it is a real mixed-mode path nobody had named — a user who installs
with the `.sh` and later re-runs the `.ps1` — and it is safe too.

**So the report's mechanism is not observable here.** I want that on the record as plainly as the
original claim was put.

**Why I hardened it regardless.** "Not reproduced on 5.1.26100" is not "safe on 5.1." The traversal
behaviour was a genuine historical defect in older Windows PowerShell builds, and I cannot test
5.1.14393 (Windows 10 1607-era) from here. That leaves the installer's safety **conditional on
which build the adopter happens to run** — an adopter I cannot survey, executing a script whose
documented update path is exactly the branch in question. The change is six lines, has no
behavioural cost, and converts a build-dependent outcome into an invariant:

```powershell
$existing = Get-Item -LiteralPath $dst -Force
if ($existing.Attributes -band [IO.FileAttributes]::ReparsePoint) {
    Write-Host "Removing existing link: $dst"
    $existing.Delete()          # removes the link; cannot traverse, by construction
} else {
    Write-Host "Removing existing directory: $dst"
    Remove-Item -LiteralPath $dst -Recurse -Force
}
```

Framing matters for the record: this is **not** a bug fix. It is removing a dependency on the
adopter's patch level. If you would rather carry it as an open question than as a silent change,
say so and I will split it back out.

**Verification of the change**, both branches plus end-to-end:

- vs. a junction whose target is non-empty → link gone, target intact.
- vs. a **real** directory (a user's own hand-made folder at that name) → recursive delete still
  happens, so pre-existing behaviour is preserved.
- **End-to-end:** patched installer run twice against a 7-skill fake repo and a fake `$USERPROFILE`
  — the second run *is* the `git pull` + re-run path. **14/14 source files survived**; junctions
  resolve through to source.

**The `.sh` sibling is safe and unchanged**, as you said. `rm -rf` on a POSIX symlink removes the
link, not the target. Its guard (`[ -e "$dst" ] || [ -L "$dst" ]`) also correctly handles a
*broken* symlink, which the `.ps1`'s bare `Test-Path` does not — worth recording as a second, minor
asymmetry in the `.sh`'s favour. Not changed here; it is cosmetic (a broken link at that path means
the previous install's source is already gone).

## 2. Item 2 — README Status block: rewritten, plus two more stale spots you did not name

Confirmed exactly as you described — the block told adopters the rename was "pending" twelve weeks
after v0.2.1 completed it. Rewritten to current fact: v0.2.1, follow-on **completed**, `og-*`
identifiers, `ogframework/og`, `ogframework.com`. I added an explicit line that historical
artifacts keep their `oagp-*` names *by policy*, so the next reader does not file this as drift a
third time.

You asked me to audit the rest of the README against the same question. Three more findings:

- **line 14** — `oagp-org/  (GitHub repo; rename to an og-* name is a deferred follow-on)`. Same
  stale claim, in the repo-tree diagram. → `og/  (GitHub repo: github.com/ogframework/og)`.
- **line 19** — the charter was annotated "id retained pending repo rename". The **id was renamed**
  to `ogframework` in v0.2.1; it is the *filename* that is retained. The note had it backwards. →
  now states the id is `ogframework` and the filename is a dated artifact name.
- **the tree omits `channels/`**, which has been on main since 2026-06-15. Added. Same defect class
  as the Status block — the front door describing a repo we have since moved past.

## 3. Item 3 — stale `cd oagp-org`: fixed in passing, both files

Four occurrences as you counted (usage header + error string in each of `.ps1` and `.sh`) → `og`.
Treated as stale strings, not a defect, per your framing and the reporter's own correction.

## 4. Item 4 — `bind_time_travel.py`: env-driven, house pattern followed

`PROJECT = Path("s:/projects/thingalog")` and its two sibling constants now resolve via
`OG_EXAMPLE_WORKTREE` / `OG_EXAMPLE_PROJECT` / `OG_EXAMPLE_WORKSPACE`, with `__file__`-relative
in-repo defaults — the `channels/src/memo-watch-channel.js:30` shape. I did all three constants,
not just line 23: the other two were equally unrunnable, and fixing the class is the same edit.

**Verified:** module imports cleanly; defaults resolve inside the repo; env override takes
precedence; no files created on import (`main()` stays behind `if __name__ == "__main__"`).
**agent-sdk suite: 105 passed.**

Defaults land under `<repo>/.scratch/`, so I added `.scratch/` to `.gitignore` — the one gitignore
line my own change implies.

**The 137-hit sweep: I did not touch it.** Post-change, the only remaining `s:/projects` or
`s:/scratch` strings in live code are two docstring *provenance* notes ("Adapted from the prototype
driver at …") at `bind_time_travel.py:3` and `oagp_agent_sdk/__init__.py:9`. Those are dated records
of where the code came from — same class as `memos/` and charter `history[]` — and I left them.
Flagging them so a future sweep does not mistake them for stragglers.

## 5. Scope held

Nothing here required a pattern-shape call, so none was made. I did **not** touch the installer
`$skills` arrays, and I did not start on operations-addressability — both are waiting on your
ratified artifacts, per your instruction. Nothing committed, pushed, or merged.

One judgment call is yours rather than mine, and I have flagged it rather than buried it: the
item-1 code change ships on a *precautionary* rationale, not a reproduced defect (§1).

## 6. Diff for ratification

| File | Change |
|---|---|
| `install/install-claude-code-skills.ps1` | Item 1 hardened delete (+ comment); item 3 strings |
| `install/install-claude-code-skills.sh` | Item 3 strings only — deletion logic already safe |
| `README.md` | Item 2: Status block rewritten; lines 14/19 corrected; `channels/` added to tree |
| `agent-sdk/examples/bind_time_travel.py` | Item 4: three constants env-driven with in-repo defaults |
| `.gitignore` | `.scratch/` (implied by item 4's defaults) |

Unrelated, still open from my claim-seat memo §7: twelve untracked memo files, two modified
transcripts, and `.wrangler/` unignored. Adding `.wrangler/` to `.gitignore` would be a one-liner
whenever the Director wants it; I left it out to keep this diff to the field report.

— og-implementer (Claude Opus 5, 1M context; 2026-08-24 chair; s:/projects-personal/oagp-org)
