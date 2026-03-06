param(
    [Parameter(Mandatory)][string]$ScaffoldDir,
    [string]$Version = "0.1.0"
)

$Tarball = "taurikit-${Version}.tar.gz"
$R2Key = "templates/${Version}.tar.gz"
$TempFile = Join-Path $env:TEMP $Tarball

Write-Host "Packaging scaffold from ${ScaffoldDir}..."

tar czf $TempFile `
    -C $ScaffoldDir `
    --exclude='.git' `
    --exclude='node_modules' `
    --exclude='target' `
    --exclude='.claude' `
    --exclude='MEMORY.md' `
    base auth ui manifest.toml

Write-Host "Uploading to R2 as ${R2Key}..."
wrangler r2 object put "taurikit-templates/${R2Key}" --file=$TempFile

Write-Host "Done - template v${Version} uploaded."
Remove-Item $TempFile
