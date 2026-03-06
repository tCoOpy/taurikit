# TauriKit CLI

A generator that creates production-ready Rust Tauri v2 desktop apps from a modular template system.

## Install

**macOS / Linux:**

```sh
curl -fsSL https://taurikit.dev/install.sh | sh
```

**Windows (PowerShell):**

```powershell
irm https://taurikit.dev/install.ps1 | iex
```

**From source:**

```sh
cargo install --path .
```

## Usage

### Generate a new project

```sh
# Interactive — prompts for all options
taurikit new

# With app name
taurikit new "My Desktop App"

# Fully non-interactive
taurikit new "My App" --auth github --ui shadcn --yes
```

### Options

| Flag | Description | Default |
|------|-------------|---------|
| `--auth <MODULE>` | Auth provider: `github`, `google`, or `none` | Interactive |
| `--ui <FRAMEWORK>` | UI framework: `shadcn` or `daisyui` | Interactive |
| `--template <DIR>` | Path to local template directory | API download |
| `--license-key <KEY>` | License key (or `TAURIKIT_LICENSE_KEY` env) | — |
| `--output <DIR>` | Output directory | `./<app-slug>` |
| `--yes` / `-y` | Accept all defaults | `false` |
| `--no-git` | Skip `git init` | `false` |
| `--no-install` | Skip dependency installation | `false` |

### Check prerequisites

```sh
taurikit doctor
```

Verifies: Rust, Cargo, Node.js, package manager, Git, Tauri CLI, and platform-specific dependencies (WebView2 on Windows, webkit2gtk/gtk3/libsoup3 on Linux).

## Template System

TauriKit uses a modular overlay system:

```
scaffold/
  base/           # Core Tauri v2 + React + TypeScript template
  auth/github/    # GitHub OAuth Device Flow
  auth/google/    # Google OAuth (PKCE loopback)
  auth/none/      # No authentication
  ui/shadcn/      # shadcn/ui components
  ui/daisyui/     # DaisyUI components
  manifest.toml   # Module definitions
```

The generator copies the base template, applies the selected auth and UI overlays, replaces tokens (`{{APP_NAME}}`, `{{APP_SLUG}}`, etc.), and runs post-generation hooks (dependency install, git init).

## License Key

Purchase a license at [taurikit.dev](https://taurikit.dev) to download templates from the API. Set your key:

```sh
export TAURIKIT_LICENSE_KEY=TK-...
```

Or pass it directly:

```sh
taurikit new "My App" --license-key TK-...
```

## Development

```sh
# Build
cargo build

# Run locally with a local template
TAURIKIT_TEMPLATE=../scaffold cargo run -- new "Test App" --yes --no-git --no-install

# Run tests
cargo test
```

## Release

Push a version tag to trigger the release workflow:

```sh
git tag v0.2.0
git push origin v0.2.0
```

Builds binaries for Linux (x86_64, aarch64), macOS (x86_64, aarch64), and Windows (x86_64), then creates a GitHub Release.

## License

Proprietary. See [taurikit.dev](https://taurikit.dev) for licensing details.
