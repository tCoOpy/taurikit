$ErrorActionPreference = "Stop"

$ApiBase = "https://taurikit-api-production.up.railway.app"
$BinName = "taurikit.exe"
$InstallDir = if ($env:TAURIKIT_INSTALL_DIR) { $env:TAURIKIT_INSTALL_DIR } else { Join-Path $HOME ".taurikit\bin" }

function Main {
    $arch = Get-Arch
    $target = "x86_64-pc-windows-msvc"

    $version = if ($env:TAURIKIT_VERSION) { $env:TAURIKIT_VERSION } else { Get-LatestVersion }

    Write-Host "Installing taurikit $version ($target)..."

    $url = "$ApiBase/cli/download/${target}?version=$version"
    $tmpDir = Join-Path ([System.IO.Path]::GetTempPath()) ([System.IO.Path]::GetRandomFileName())
    New-Item -ItemType Directory -Path $tmpDir -Force | Out-Null

    try {
        $archive = Join-Path $tmpDir "taurikit.zip"
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
        Write-Host "Done. Run 'taurikit --help' to get started."
    }
    finally {
        Remove-Item -Path $tmpDir -Recurse -Force -ErrorAction SilentlyContinue
    }
}

function Get-Arch {
    $arch = [System.Runtime.InteropServices.RuntimeInformation]::OSArchitecture
    switch ($arch) {
        "X64"   { return "x86_64" }
        "Arm64" { return "aarch64" }
        default { throw "Unsupported architecture: $arch" }
    }
}

function Get-LatestVersion {
    $resp = Invoke-RestMethod -Uri "$ApiBase/cli/latest" -UseBasicParsing
    return $resp.version
}

function Add-ToPath {
    param([string]$Dir)

    $userPath = [Environment]::GetEnvironmentVariable("PATH", "User")
    if ($userPath -split ";" | Where-Object { $_ -eq $Dir }) {
        return
    }

    [Environment]::SetEnvironmentVariable("PATH", "$Dir;$userPath", "User")
    $env:PATH = "$Dir;$env:PATH"
    Write-Host "  Added $Dir to user PATH (restart your terminal to use 'taurikit' globally)"
}

Main
