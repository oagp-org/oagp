#!/usr/bin/env bash
#
# install-claude-code-skills.sh
#
# Installs the canonical OG (Open Governance Framework) skills
# (/og-create-org, /og-orient, /og-claim-seat, /og-describe-org,
# /og-close-session, /og-add-seat, /og-change-comms-substrate),
# into the current user's Claude Code
# skills directory via symlinks pointing at this clone of the OG repo.
#
# After install, `git pull` in this repo keeps your skills current --
# the symlink tracks the working tree.
#
# Usage:
#   git clone https://github.com/ogframework/og.git
#   cd og
#   ./install/install-claude-code-skills.sh
#
# Then restart Claude Code; the skills become discoverable.

set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
repo_root="$(cd "$script_dir/.." && pwd)"
skills_source="$repo_root/skills"
skills_dest="$HOME/.claude/skills"

if [ ! -d "$skills_source" ]; then
    echo "Error: source skills directory not found at $skills_source -- are you running from inside an og clone?" >&2
    exit 1
fi

mkdir -p "$skills_dest"

# The seven canonical OG cards.
skills=(
    "og-create-org" "og-orient" "og-claim-seat" "og-describe-org"
    "og-close-session" "og-add-seat" "og-change-comms-substrate"
)
for skill in "${skills[@]}"; do
    src="$skills_source/$skill"
    dst="$skills_dest/$skill"

    if [ ! -d "$src" ]; then
        echo "Warning: skill source not found: $src -- skipping." >&2
        continue
    fi

    if [ -e "$dst" ] || [ -L "$dst" ]; then
        echo "Removing existing: $dst"
        rm -rf "$dst"
    fi

    echo "Creating symlink: $dst -> $src"
    ln -s "$src" "$dst"
done

echo ""
echo "Done. Restart Claude Code; skills become discoverable."
echo "Installed: ${skills[*]}"
