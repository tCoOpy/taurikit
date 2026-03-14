$ErrorActionPreference = "Stop"

# Usage:
#   irm https://crabyard.dev/setup.ps1 | iex
#   After install: crabyard new --license-key TK-xxxx
#
# Or with license key in environment:
#   $env:CRABYARD_LICENSE_KEY = "TK-xxxx"; irm https://crabyard.dev/setup.ps1 | iex

$ApiBase = "https://crabyard-api-production.up.railway.app"
$BinName = "crabyard.exe"
$InstallDir = if ($env:CRABYARD_INSTALL_DIR) { $env:CRABYARD_INSTALL_DIR } else { Join-Path $HOME ".crabyard\bin" }

function Main {
    $existing = Get-Command "crabyard" -ErrorAction SilentlyContinue
    if ($existing) {
        $latestVersion = Get-LatestVersion
        $currentVersion = Get-InstalledVersion $existing.Source
        if ($currentVersion -and $currentVersion -ne $latestVersion) {
            Write-Host "Updating crabyard $currentVersion -> $latestVersion..."
            Install-Cli
        } else {
            Write-Host "crabyard $currentVersion is up to date."
        }
    } else {
        Install-Cli
    }

    Write-Host "`nStarting project wizard...`n"

    Ensure-Bun

    $exe = Join-Path $InstallDir $BinName
    $wizardArgs = @("new")

    if ($env:CRABYARD_LICENSE_KEY) {
        $wizardArgs += "--license-key"
        $wizardArgs += $env:CRABYARD_LICENSE_KEY
    }

    & $exe @wizardArgs
}

function Install-Cli {
    $target = "x86_64-pc-windows-msvc"
    $version = if ($env:CRABYARD_VERSION) { $env:CRABYARD_VERSION } else { Get-LatestVersion }

    Write-Host "Installing crabyard $version ($target)..."

    $url = "$ApiBase/cli/download/${target}?version=$version"
    $tmpDir = Join-Path ([System.IO.Path]::GetTempPath()) ([System.IO.Path]::GetRandomFileName())
    New-Item -ItemType Directory -Path $tmpDir -Force | Out-Null

    try {
        $archive = Join-Path $tmpDir "crabyard.zip"
        Write-Host "  Downloading $url"
        Invoke-WebRequest -Uri $url -OutFile $archive -UseBasicParsing

        Expand-Archive -Path $archive -DestinationPath $tmpDir -Force

        if (-not (Test-Path $InstallDir)) {
            New-Item -ItemType Directory -Path $InstallDir -Force | Out-Null
        }

        $src = Join-Path $tmpDir $BinName
        $dst = Join-Path $InstallDir $BinName
        Move-Item -Path $src -Destination $dst -Force

        Write-Host "  Installed to $dst"
        Add-ToPath $InstallDir
    }
    finally {
        Remove-Item -Path $tmpDir -Recurse -Force -ErrorAction SilentlyContinue
    }
}

function Get-LatestVersion {
    $resp = Invoke-RestMethod -Uri "$ApiBase/cli/latest" -UseBasicParsing
    return $resp.version
}

function Get-InstalledVersion {
    param([string]$ExePath)
    try {
        $output = & $ExePath --version 2>$null
        if ($output -match '(\d+\.\d+\.\d+)') {
            return $Matches[1]
        }
    } catch {}
    return $null
}

function Add-ToPath {
    param([string]$Dir)

    $userPath = [Environment]::GetEnvironmentVariable("PATH", "User")
    if ($userPath -split ";" | Where-Object { $_ -eq $Dir }) {
        return
    }

    [Environment]::SetEnvironmentVariable("PATH", "$Dir;$userPath", "User")
    $env:PATH = "$Dir;$env:PATH"
    Write-Host "  Added $Dir to user PATH"
}

function Ensure-Bun {
    if (Get-Command "bun" -ErrorAction SilentlyContinue) {
        return
    }
    Write-Host "Installing bun..."
    irm bun.sh/install.ps1 | iex
    $bunDir = Join-Path $HOME ".bun\bin"
    $env:PATH = "$bunDir;$env:PATH"
}

Main
