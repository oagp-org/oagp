# install-claude-code-skills.ps1
#
# Installs the canonical OG (Open Governance Framework) skills
# (/og-create-org, /og-orient, /og-claim-seat, /og-describe-org,
# /og-close-session, /og-add-seat, /og-change-comms-substrate),
# into the current user's Claude Code
# skills directory via Windows filesystem junctions pointing at this
# clone of the OG repo.
#
# After install, `git pull` in this repo keeps your skills current --
# the junction tracks the working tree.
#
# Usage:
#   git clone https://github.com/ogframework/og.git
#   cd og
#   .\install\install-claude-code-skills.ps1
#
# Then restart Claude Code; the skills become discoverable.

$ErrorActionPreference = "Stop"

$repoRoot     = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$skillsSource = Join-Path $repoRoot     "skills"

# Honour CLAUDE_CONFIG_DIR. Claude Code reads skills from there when it is set, and a user
# who relocates their config is exactly the user for whom a hardcoded ~/.claude would fail
# SILENTLY: the install reports success, the links are correct, and Claude Code never looks
# at them. Found the hard way on 2026-08-25.
$configDir  = if ($env:CLAUDE_CONFIG_DIR) { $env:CLAUDE_CONFIG_DIR } else { Join-Path $env:USERPROFILE ".claude" }
$skillsDest = Join-Path $configDir "skills"
Write-Host "Installing into: $skillsDest"
if ($env:CLAUDE_CONFIG_DIR) { Write-Host "  (from CLAUDE_CONFIG_DIR)" }

if (-not (Test-Path $skillsSource)) {
    Write-Error "Source skills directory not found at $skillsSource -- are you running from inside an og clone?"
    exit 1
}

New-Item -ItemType Directory -Force -Path $skillsDest | Out-Null

# The seven canonical OG cards.
$skills = @(
    "og-create-org", "og-orient", "og-claim-seat", "og-describe-org",
    "og-close-session", "og-add-seat", "og-change-comms-substrate"
)
# Clear out og-* entries that are no longer canonical. A rename leaves the old link behind
# pointing at a directory that no longer exists, and a dangling link is worse than a missing
# one: it looks installed. Without this, every rename accumulates debris forever.
Get-ChildItem -Path $skillsDest -Filter "og-*" -Force -ErrorAction SilentlyContinue |
    Where-Object { $skills -notcontains $_.Name } |
    ForEach-Object {
        Write-Host "Removing retired: $($_.Name)"
        if ($_.Attributes -band [IO.FileAttributes]::ReparsePoint) { $_.Delete() }
        else { Remove-Item -LiteralPath $_.FullName -Recurse -Force }
    }

foreach ($skill in $skills) {
    $src = Join-Path $skillsSource $skill
    $dst = Join-Path $skillsDest   $skill

    if (-not (Test-Path $src)) {
        Write-Warning "Skill source not found: $src -- skipping."
        continue
    }

    if (Test-Path $dst) {
        # $dst is normally the junction a previous run created below, and the operation we mean is
        # "remove the link". Recursion is not part of that meaning -- a link is not a tree. So
        # branch on the ReparsePoint attribute and delete the link itself; only a real directory
        # gets a recursive delete. The code then says what it means.
        #
        # A secondary benefit: this also removes a build-dependent outcome. Remove-Item -Recurse
        # on a reparse point was reported to traverse it on older Windows PowerShell 5.1 builds,
        # which would delete the junction's target -- the user's clone of this repo, i.e. their
        # skill sources. That was NOT reproduced here on 5.1.26100.9168 (tested three ways: this
        # line against a junction, a recursive delete of a parent containing one, and against a
        # directory symlink). The branch stands on the intent argument above, not on that report.
        $existing = Get-Item -LiteralPath $dst -Force
        if ($existing.Attributes -band [IO.FileAttributes]::ReparsePoint) {
            Write-Host "Removing existing link: $dst"
            $existing.Delete()
        } else {
            Write-Host "Removing existing directory: $dst"
            Remove-Item -LiteralPath $dst -Recurse -Force
        }
    }

    Write-Host "Creating junction: $dst -> $src"
    cmd /c mklink /J "$dst" "$src" | Out-Null
}

Write-Host ""
Write-Host "Done. Restart Claude Code; skills become discoverable."
Write-Host "Installed: $($skills -join ', ')"
