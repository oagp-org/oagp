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
#   git clone https://github.com/ogframework/og.git
#   cd og
#   .\install\install-claude-code-skills.ps1
#
# Then restart Claude Code; the skills become discoverable.

$ErrorActionPreference = "Stop"

$repoRoot     = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$skillsSource = Join-Path $repoRoot     "skills"
$skillsDest   = Join-Path $env:USERPROFILE ".claude\skills"

if (-not (Test-Path $skillsSource)) {
    Write-Error "Source skills directory not found at $skillsSource -- are you running from inside an og clone?"
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
        # $dst is normally the junction that a previous run created below. Delete the LINK, never
        # what it points at: Remove-Item -Recurse on a reparse point has historically traversed it
        # on some Windows PowerShell 5.1 builds, which would delete the user's clone of this repo
        # -- i.e. their skill sources. Branching on the ReparsePoint attribute removes that
        # build-dependent behaviour by construction, so the outcome no longer varies by host.
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
