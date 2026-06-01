# install-claude-code-skills.ps1
#
# Installs the canonical OG (Open Governance Framework) skills
# (/og-adopt, /og-create, /og-orient, /og-claim-seat, /og-closeout,
# /og-snapshot, /og-add-position) into the current user's Claude Code
# skills directory via Windows filesystem junctions pointing at this
# clone of the OG repo.
#
# After install, `git pull` in this repo keeps your skills current --
# the junction tracks the working tree.
#
# Usage:
#   git clone https://github.com/oagp-org/oagp.git
#   cd oagp-org
#   .\install\install-claude-code-skills.ps1
#
# Then restart Claude Code; the skills become discoverable.

$ErrorActionPreference = "Stop"

$repoRoot     = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$skillsSource = Join-Path $repoRoot     "skills"
$skillsDest   = Join-Path $env:USERPROFILE ".claude\skills"

if (-not (Test-Path $skillsSource)) {
    Write-Error "Source skills directory not found at $skillsSource -- are you running from inside an oagp-org clone?"
    exit 1
}

New-Item -ItemType Directory -Force -Path $skillsDest | Out-Null

$skills = @("og-adopt", "og-create", "og-orient", "og-claim-seat", "og-closeout", "og-snapshot", "og-add-position")
foreach ($skill in $skills) {
    $src = Join-Path $skillsSource $skill
    $dst = Join-Path $skillsDest   $skill

    if (-not (Test-Path $src)) {
        Write-Warning "Skill source not found: $src -- skipping."
        continue
    }

    if (Test-Path $dst) {
        Write-Host "Removing existing: $dst"
        Remove-Item -Recurse -Force $dst
    }

    Write-Host "Creating junction: $dst -> $src"
    cmd /c mklink /J "$dst" "$src" | Out-Null
}

Write-Host ""
Write-Host "Done. Restart Claude Code; skills become discoverable."
Write-Host "Installed: $($skills -join ', ')"
