---
title: CLI Commands
description: Complete reference for all TauriKit CLI commands and flags.
---

## `taurikit new`

Generate a new Tauri v2 desktop app.

```sh
taurikit new [APP_NAME] [OPTIONS]
```

### Arguments

| Argument | Description |
|----------|-------------|
| `APP_NAME` | Display name for the app (e.g. `"My Desktop App"`). If omitted, prompted interactively. |

### Options

| Flag | Description | Default |
|------|-------------|---------|
| `--auth <MODULE>` | Auth provider: `github`, `google`, or `none` | Interactive prompt |
| `--ui <FRAMEWORK>` | UI framework: `shadcn` or `daisyui` | Interactive prompt |
| `--slug <SLUG>` | App slug (derived from name if omitted) | Auto-derived |
| `--bundle-id <ID>` | Bundle identifier (derived from slug if omitted) | Auto-derived |
| `--app-version <VER>` | Initial version | `0.1.0` |
| `--author <NAME>` | Author name | Empty |
| `--description <DESC>` | Short description | Empty |
| `--template <DIR>` | Path to a local template directory | API download |
| `--output <DIR>` | Output directory | `./<app-slug>` |
| `--license-key <KEY>` | License key for template download | `$TAURIKIT_LICENSE_KEY` |
| `--yes` / `-y` | Accept all defaults without prompting | `false` |
| `--no-git` | Skip `git init` and initial commit | `false` |
| `--no-install` | Skip dependency installation (`bun install`) | `false` |

### Environment variables

| Variable | Description |
|----------|-------------|
| `TAURIKIT_LICENSE_KEY` | License key (alternative to `--license-key`) |
| `TAURIKIT_TEMPLATE` | Local template path (alternative to `--template`) |

### Examples

```sh
# Fully interactive
taurikit new

# Named, interactive module selection
taurikit new "My App"

# Fully non-interactive
taurikit new "My App" --auth github --ui shadcn --yes

# Using a local template
taurikit new "My App" --template ./my-scaffold --yes --no-install
```

---

## `taurikit doctor`

Check system prerequisites for Tauri development.

```sh
taurikit doctor
```

Verifies the following are installed and meet minimum versions:

| Check | Minimum |
|-------|---------|
| Rust | 1.80 |
| Cargo | (any) |
| Bun | 1.1 |
| Git | (any) |
| Tauri CLI | (any, optional) |
| WebView2 | Windows only |
| webkit2gtk / gtk3 / libsoup3 | Linux only |

Outputs a pass/fail summary with version numbers and actionable fix instructions for any failures.
