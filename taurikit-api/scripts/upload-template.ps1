param(
    [Parameter(Mandatory)][string]$ScaffoldDir,
    [string]$Version = "0.1.0"
)

$Tarball = "taurikit-${Version}.tar.gz"
$TempFile = Join-Path $env:TEMP $Tarball
$ApiUrl = $env:API_URL
$AdminKey = $env:ADMIN_KEY

if (-not $ApiUrl) { throw "Set API_URL env var (e.g. https://api.taurikit.dev)" }
if (-not $AdminKey) { throw "Set ADMIN_KEY env var" }

Write-Host "Packaging scaffold from ${ScaffoldDir}..."

tar czf $TempFile `
    -C $ScaffoldDir `
    --exclude='.git' `
    --exclude='node_modules' `
    --exclude='target' `
    --exclude='.claude' `
    --exclude='MEMORY.md' `
    base auth ui manifest.toml

Write-Host "Uploading to API as v${Version}..."
Invoke-RestMethod `
    -Method Post `
    -Uri "${ApiUrl}/template/upload?version=${Version}" `
    -Headers @{ "X-Admin-Key" = $AdminKey; "Content-Type" = "application/gzip" } `
    -InFile $TempFile

Write-Host "Done - template v${Version} uploaded."
Remove-Item $TempFile
