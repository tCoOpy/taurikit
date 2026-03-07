# TauriKit

Generate production-ready Tauri v2 desktop apps with one command.

## Quick Start

**macOS / Linux:**

```sh
curl -fsSL https://taurikit-web-production.up.railway.app/setup.sh | TAURIKIT_LICENSE_KEY="TK-TEST1234-ABCD5678-EF901234-56789ABC-DEADBEEF" sh
```

**Windows (PowerShell):**

```powershell
$env:TAURIKIT_LICENSE_KEY = "TK-TEST1234-ABCD5678-EF901234-56789ABC-DEADBEEF"; irm https://taurikit-web-production.up.railway.app/setup.ps1 | iex
```

That's it. The script installs the CLI, downloads the template, and walks you through the project wizard — app name, auth provider, UI framework, and OAuth setup.

When the wizard finishes:

```sh
cd my-app
bun tauri dev
```

## What the wizard sets up

- **Tauri v2** + React 19 + TypeScript
- **Auth** — GitHub OAuth (Device Flow), Google OAuth (PKCE), or None
- **UI** — shadcn/ui or DaisyUI
- **OAuth Client ID** — enter during setup or configure later in `.env`
- **Git repo** initialized with first commit
- **Dependencies** installed automatically

## Repository Structure

| Directory | Description |
|-----------|-------------|
| `taurikit-cli/` | Rust CLI — project generator |
| `taurikit-api/` | Hono API — license validation, template downloads (Railway) |
| `taurikit-web/` | Marketing site (Astro) |
| `taurikit-docs/` | Documentation (Starlight) |
| `scaffold/` | Template source — base + auth/ui overlays |
