# Crabyard

Generate production-ready Tauri v2 desktop apps with one command.

## Quick Start

**macOS / Linux:**

```sh
curl -fsSL https://crabyard.dev/setup.sh | sh
```

**Windows (PowerShell):**

```powershell
irm https://crabyard.dev/setup.ps1 | iex
```

That's it. The script installs the CLI, downloads the template, and walks you through the project wizard: app name, auth provider, UI framework, package manager, and OAuth setup.

When the wizard finishes:

```sh
cd my-app
bun run tauri dev
```

## What the wizard sets up

- **Tauri v2** + React 19 + TypeScript
- **Auth** — GitHub OAuth (Device Flow), Google OAuth (PKCE), or None
- **UI** — shadcn/ui, DaisyUI, tesign, or minimal Tailwind
- **OAuth Client ID** — enter during setup or configure later in `.env`
- **AI coding instructions** — `AGENTS.md`, `CLAUDE.md`, `.cursorrules`, and `.github/copilot-instructions.md`
- **Git repo** initialized with first commit
- **Dependencies** installed automatically

## Generated app AI files

Every generated app includes shared coding-agent guidance tailored to the selected scaffold options:

| File | Tool |
|------|------|
| `AGENTS.md` | Codex and other agent-based coding tools |
| `CLAUDE.md` | Claude Code |
| `.cursorrules` | Cursor |
| `.github/copilot-instructions.md` | GitHub Copilot |

These files document the Tauri IPC pattern, frontend/backend data flow, UI and desktop UX expectations, auth/settings/update extension points, and commands for the selected package manager.

## Repository Structure

| Directory | Description |
|-----------|-------------|
| `crabyard-cli/` | Rust CLI — project generator |
| `crabyard-api/` | Hono API — template downloads, CLI release downloads, Stripe webhooks (Railway) |
| `crabyard-web/` | Marketing site (Next.js) |
| `crabyard-docs/` | Documentation (Starlight) |
| `scaffold/` | Template source — base + auth/ui overlays |
