# TauriKit

Monorepo for TauriKit — a CLI that generates production-ready Tauri v2 desktop apps.

## Quick Start (Test Key)

Generate a project using the test license key:

### 1. Build the CLI

```sh
cd taurikit-cli
cargo build --release
```

The binary is at `target/release/taurikit.exe` (Windows) or `target/release/taurikit` (macOS/Linux).

### 2. Run the wizard

```sh
export TAURIKIT_LICENSE_KEY="TK-TEST1234-ABCD5678-EF901234-56789ABC-DEADBEEF"
./taurikit-cli/target/release/taurikit new "My App"
```

Or on **Windows PowerShell**:

```powershell
$env:TAURIKIT_LICENSE_KEY = "TK-TEST1234-ABCD5678-EF901234-56789ABC-DEADBEEF"
.\taurikit-cli\target\release\taurikit.exe new "My App"
```

The wizard prompts for:

- **Auth provider** — GitHub OAuth, Google OAuth, or None
- **UI framework** — shadcn/ui or DaisyUI
- **OAuth Client ID** — enter it now or skip and set later in `.env`

Once complete, the project is ready:

```sh
cd my-app
bun tauri dev
```

### Non-interactive mode

```sh
TAURIKIT_LICENSE_KEY="TK-TEST1234-ABCD5678-EF901234-56789ABC-DEADBEEF" \
  ./taurikit-cli/target/release/taurikit new "My App" --auth github --ui shadcn --yes
```

### Using a local template (no license key needed)

```sh
./taurikit-cli/target/release/taurikit new "My App" --template ./scaffold
```

## Repository Structure

| Directory | Description |
|-----------|-------------|
| `taurikit-cli/` | Rust CLI — project generator |
| `taurikit-api/` | Hono API — license validation, template downloads (Railway) |
| `taurikit-web/` | Marketing site (Astro) |
| `taurikit-docs/` | Documentation (Starlight) |
| `scaffold/` | Template source — base + auth/ui overlays |

## Prerequisites

- [Rust](https://rustup.rs/)
- [Bun](https://bun.sh/) (or Node.js 18+)
- Platform dependencies for Tauri v2 — run `taurikit doctor` to check
