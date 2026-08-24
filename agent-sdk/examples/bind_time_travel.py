"""Time-travel binding example.

Adapted from the prototype driver at s:/scratch/oagp-agent-prototype/bind_time_travel.py.

This example shows the canonical time-travel pattern:
  1. Materialize a prior org state via `git worktree add <path> <SHA>`.
  2. bind() against the worktree's orgdef.
  3. Write the subagent file into the CURRENT project's .claude/agents/
     so the open agent view panel discovers it.
  4. The agent's prompt names the worktree by absolute path, so cwd
     at dispatch time is irrelevant.

Paths resolve from OG_EXAMPLE_* environment variables, with in-repo
defaults so the example runs from a fresh clone without editing.
"""

import os
from pathlib import Path

from oagp_agent_sdk import bind

# Path resolution follows the house pattern (see channels/src/memo-watch-channel.js):
# an explicit environment override wins; otherwise fall back to a location derived
# from this file, so the example runs from a fresh clone with no editing.
#
#   OG_EXAMPLE_WORKTREE  -- read-only checkout of the prior org state
#   OG_EXAMPLE_PROJECT   -- project whose .claude/agents/ receives the subagent file
#   OG_EXAMPLE_WORKSPACE -- writable directory for the engagement's findings
#
# The defaults point inside this repo so nothing outside it is touched; set the
# environment variables to aim the example at a real target.

_REPO_ROOT = Path(__file__).resolve().parents[2]
_SCRATCH = _REPO_ROOT / ".scratch" / "bind-time-travel-example"


def _path_from_env(var: str, default: Path) -> Path:
    """Resolve *var* from the environment, falling back to *default*."""
    return Path(os.environ.get(var) or default).resolve()


WORKTREE = _path_from_env("OG_EXAMPLE_WORKTREE", _SCRATCH / "worktree")
PROJECT = _path_from_env("OG_EXAMPLE_PROJECT", _REPO_ROOT)
WORKSPACE = _path_from_env("OG_EXAMPLE_WORKSPACE", _SCRATCH / "engagement")


INITIAL_PROMPT = f"""# Engagement — Signup process source-code review

**Target:** thingalog (the catalog engine), specifically the signup pipeline.
**Target source path:** `{WORKTREE}` (read-only checkout; do not modify).
**Engagement workspace:** `{WORKSPACE}` — write all findings here.

## Scope (in)
- POST /api/auth/signup
- POST /api/auth/login
- POST /api/auth/signout
- GET  /api/auth/me
- POST /api/catalogs (first-catalog / owner-id flow)
- Email verification, password reset, account deletion if present
- Free-tier limits and rate limiting on the auth endpoints

## Scope (out)
- Anything outside the signup pipeline (no general renderer/UI review).
- Dynamic testing — Phase 1 static only.
- Authoring fixes — describe the bug, do not write the patch.

## Deliverable
Single markdown file `findings.md` in the engagement workspace, following
your output_contract schema.

Begin by reading the target's CLAUDE.md, then the auth section of server.py.
Proceed per your roledef's phase_1_static_review workflow.
"""


def main() -> None:
    WORKSPACE.mkdir(parents=True, exist_ok=True)

    result = bind(
        orgdef_path=WORKTREE / "org" / "thingalog-organization.opencatalog",
        position_id="security-tester",
        agents_root=PROJECT / ".claude" / "agents",
        context_tag="tt-2026-05-16",
        initial_prompt=INITIAL_PROMPT,
        tools=["Read", "Write", "Glob", "Grep", "Bash"],
        model="inherit",
        permission_mode="acceptEdits",
        color="red",
        extra_context=(
            f"You are time-travelled to the org state as of "
            f"2026-05-16. Treat the org state at {WORKTREE} as "
            f"authoritative; ignore any out-of-tree context you might "
            f"otherwise have. Engagement workspace is at {WORKSPACE} "
            f"(outside the target's version control)."
        ),
    )

    print("Bound agent file written:")
    print(f"  {result.agent_file}")
    print()
    print(f"  agent name : {result.agent_name}")
    print(f"  position   : {result.position_name} ({result.position_status})")
    print(f"  org        : {result.org_name}")
    print(f"  roledef    : {result.roledef_id} v{result.roledef_version} ({result.roledef_source})")
    print()
    print("Dispatch via the agent view panel by typing into 'New session':")
    print(f"  {result.dispatch_hint}")


if __name__ == "__main__":
    main()
