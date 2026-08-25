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
# Honour CLAUDE_CONFIG_DIR. Claude Code reads skills from there when it is set, and a user
# who relocates their config is exactly the user for whom a hardcoded ~/.claude would fail
# SILENTLY: the install reports success, the links are correct, and Claude Code never looks
# at them. Found the hard way on 2026-08-25.
config_dir="${CLAUDE_CONFIG_DIR:-$HOME/.claude}"
skills_dest="$config_dir/skills"
echo "Installing into: $skills_dest"
[ -n "${CLAUDE_CONFIG_DIR:-}" ] && echo "  (from CLAUDE_CONFIG_DIR)"

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
# Clear out og-* entries that are no longer canonical. A rename leaves the old link behind
# pointing at a directory that no longer exists, and a dangling link is worse than a missing
# one: it looks installed. Without this, every rename accumulates debris forever.
shopt -s nullglob
for existing in "$skills_dest"/og-*; do
    name="$(basename "$existing")"
    keep=0
    for s in "${skills[@]}"; do [ "$s" = "$name" ] && keep=1; done
    if [ "$keep" -eq 0 ]; then
        echo "Removing retired: $name"
        rm -rf "$existing"
    fi
done
shopt -u nullglob

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
