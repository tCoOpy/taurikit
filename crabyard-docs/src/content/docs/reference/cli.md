---
title: CLI Commands
description: Complete reference for all Crabyard CLI commands and flags.
---

## `crabyard new`

Generate a new Tauri v2 desktop app.

```sh
crabyard new [APP_NAME] [OPTIONS]
```

### Arguments

| Argument | Description |
|----------|-------------|
| `APP_NAME` | Display name for the app (e.g. `"My Desktop App"`). If omitted, prompted interactively. |

### Options

| Flag | Description | Default |
|------|-------------|---------|
| `--auth <MODULE>` | Auth provider: `github`, `google`, or `none` | Interactive prompt |
| `--ui <FRAMEWORK>` | UI framework: `shadcn`, `daisyui`, `tesign`, or `minimal` | Interactive prompt |
| `--slug <SLUG>` | App slug (derived from name if omitted) | Auto-derived |
| `--bundle-id <ID>` | Bundle identifier (derived from slug if omitted) | Auto-derived |
| `--app-version <VER>` | Initial version | `0.1.0` |
| `--author <NAME>` | Author name | Empty |
| `--description <DESC>` | Short description | Empty |
| `--template <DIR>` | Path to a local template directory | API download |
| `--output <DIR>` | Output directory | `./<app-slug>` |
| `--license-key <KEY>` | License key for template download | `$CRABYARD_LICENSE_KEY` |
| `--yes` / `-y` | Accept all defaults without prompting | `false` |
| `--no-git` | Skip `git init` and initial commit | `false` |
| `--no-install` | Skip dependency installation (`bun install`) | `false` |
| `--pm <PM>` | Package manager: `bun`, `pnpm`, `yarn`, or `npm` | Auto-detected |
| `--extras <FEATURE,...>` | Comma-separated extras to include (e.g. `notifications,clipboard`) | None |

### Environment variables

| Variable | Description |
|----------|-------------|
| `CRABYARD_LICENSE_KEY` | License key (alternative to `--license-key`) |
| `CRABYARD_TEMPLATE` | Local template path (alternative to `--template`) |

### Examples

```sh
# Fully interactive
crabyard new

# Named, interactive module selection
crabyard new "My App"

# Fully non-interactive
crabyard new "My App" --auth github --ui shadcn --yes

# Using a local template
crabyard new "My App" --template ./my-scaffold --yes --no-install
```

---

## `crabyard doctor`

Check system prerequisites for Tauri development.

```sh
crabyard doctor
```

Verifies the following are installed and meet minimum versions:

| Check | Minimum |
|-------|---------|
| Rust | 1.88 |
| Cargo | (any) |
| Bun | 1.1 |
| Git | (any) |
| Tauri CLI | (any, optional) |
| WebView2 | Windows only |
| webkit2gtk / javascriptcoregtk / gtk3 / libsoup3 | Linux only |

Outputs a pass/fail summary with version numbers and actionable fix instructions for any failures.

---

## `crabyard update-ui`

Update or switch the UI framework in an existing project.

```sh
crabyard update-ui [OPTIONS]
```

### Options

| Flag | Description | Default |
|------|-------------|---------|
| `--switch <FRAMEWORK>` | Switch to a different UI framework: `shadcn`, `daisyui`, `tesign`, or `minimal` | Current framework |
| `--template <DIR>` | Path to the template directory | API download |
| `--license-key <KEY>` | License key for template download | `$CRABYARD_LICENSE_KEY` |
| `--force` | Overwrite locally modified files without prompting | `false` |
| `--dry-run` | Show what would change without modifying files | `false` |
| `--rollback` | Rollback to the previously used UI framework | `false` |

### Examples

```sh
# Switch from shadcn to daisyui
crabyard update-ui --switch daisyui

# Preview changes without applying
crabyard update-ui --switch minimal --dry-run

# Rollback to the previous UI
crabyard update-ui --rollback
```

---

## `crabyard add`

Add a Tauri plugin or feature to an existing project. Automatically wires up npm dependencies, Cargo dependencies, Tauri plugin registration, and capabilities.

```sh
crabyard add <FEATURE> [OPTIONS]
```

### Arguments

| Argument | Description |
|----------|-------------|
| `FEATURE` | Feature to add. Use `list` to see all available features. |

### Options

| Flag | Description | Default |
|------|-------------|---------|
| `--project <DIR>` / `-p` | Path to the project directory | Current directory |
| `--dry-run` | Show what would change without modifying files | `false` |

### Available features

| Feature | Description |
|---------|-------------|
| `notifications` | System notifications via tauri-plugin-notification |
| `clipboard` | Clipboard read/write via tauri-plugin-clipboard-manager |
| `global-shortcut` | Global keyboard shortcuts via tauri-plugin-global-shortcut |
| `autostart` | Launch at system startup via tauri-plugin-autostart |
| `log` | Structured logging via tauri-plugin-log |
| `sql` | SQLite database via tauri-plugin-sql |
| `fs` | Filesystem access via tauri-plugin-fs |
| `shell` | Execute shell commands via tauri-plugin-shell |
| `http` | HTTP client via tauri-plugin-http |
| `deep-link` | Custom URL protocol handler via tauri-plugin-deep-link |
| `tray` | System tray icon with context menu |
| `updater` | Auto-updater via tauri-plugin-updater |
| `store` | Persistent key-value store via tauri-plugin-store |
| `cmdk` | Command palette component (Ctrl/Cmd+K) |
| `i18n` | Internationalization with react-i18next |
| `multi-window` | Multi-window support with WebviewWindow API |
| `tanstack-query` | Data fetching and caching with TanStack Query |
| `framer-motion` | Animations and transitions with Motion |
| `react-hook-form` | Form management with React Hook Form + Zod |
| `zod` | Runtime schema validation with Zod |
| `tanstack-router` | Type-safe routing with TanStack Router |
| `date-fns` | Modern date utility library |
| `sentry` | Error tracking and crash reporting with Sentry |
| `window-state` | Persist and restore window size/position |

### Examples

```sh
# List available features
crabyard add list

# Add notifications plugin
crabyard add notifications

# Preview adding SQL support
crabyard add sql --dry-run
```

---

## `crabyard eject`

Remove Crabyard metadata from a generated project, leaving a clean standalone Tauri app. Deletes `manifest.toml` and strips any remaining `CRABYARD:` markers from source files.

```sh
crabyard eject [OPTIONS]
```

### Options

| Flag | Description | Default |
|------|-------------|---------|
| `--project <DIR>` / `-p` | Path to the project directory | Current directory |
| `--dry-run` | Show what would change without modifying files | `false` |

### Examples

```sh
# Eject the current project
crabyard eject

# Preview what would be removed
crabyard eject --dry-run
```

---

## `crabyard preview`

Preview the file tree that would be generated for a given auth and UI combination, without creating any files.

```sh
crabyard preview [OPTIONS]
```

### Options

| Flag | Description | Default |
|------|-------------|---------|
| `--auth <MODULE>` | Auth module: `github`, `google`, or `none` | `none` |
| `--ui <FRAMEWORK>` | UI framework: `shadcn`, `daisyui`, `tesign`, or `minimal` | `shadcn` |
| `--template <DIR>` | Path to the template directory | Auto-detect |
| `--license-key <KEY>` | License key for template download | `$CRABYARD_LICENSE_KEY` |

### Examples

```sh
# Preview default scaffolding (none auth + shadcn)
crabyard preview

# Preview with GitHub auth and DaisyUI
crabyard preview --auth github --ui daisyui
```

---

## `crabyard upgrade`

Check for and apply template updates to an existing project. Compares your project files against the latest template version and shows what has changed.

```sh
crabyard upgrade [OPTIONS]
```

### Options

| Flag | Description | Default |
|------|-------------|--------|
| `--template <DIR>` | Path to the template directory | Auto-detect |
| `--license-key <KEY>` | License key for template download | `$CRABYARD_LICENSE_KEY` |
| `--force` | Overwrite locally modified files without prompting | `false` |
| `--dry-run` | Show what would change without modifying files | `false` |

### Examples

```sh
# Check for template updates
crabyard upgrade --dry-run

# Apply template updates
crabyard upgrade --force
```

---

## `crabyard plugins`

Browse the catalog of official Tauri v2 plugins with descriptions and install hints.

```sh
crabyard plugins [FILTER]
```

### Arguments

| Argument | Description |
|----------|-------------|
| `FILTER` | Optional keyword to filter the list (e.g. `storage`, `window`) |

### Examples

```sh
# List all plugins
crabyard plugins

# Filter by keyword
crabyard plugins window
```

---

## `crabyard init`

Initialize Crabyard in an existing Tauri v2 project. Detects the current project name and bundle identifier from `tauri.conf.json` and writes a `manifest.toml` so that `crabyard update-ui`, `crabyard add`, and `crabyard upgrade` can be used.

```sh
crabyard init [OPTIONS]
```

### Options

| Flag | Description | Default |
|------|-------------|---------|
| `--project <DIR>` / `-p` | Path to the project directory | Current directory |

### Examples

```sh
# Initialize in current directory
crabyard init

# Initialize a specific project
crabyard init -p ../my-tauri-app
```

---

## `crabyard completions`

Generate shell completion scripts for `crabyard` commands.

```sh
crabyard completions <SHELL>
```

### Arguments

| Argument | Description |
|----------|-------------|
| `SHELL` | Shell to generate completions for: `bash`, `zsh`, `fish`, `powershell`, or `elvish` |

### Examples

```sh
# Bash
crabyard completions bash >> ~/.bashrc

# Zsh
crabyard completions zsh >> ~/.zshrc

# Fish
crabyard completions fish > ~/.config/fish/completions/crabyard.fish

# PowerShell
crabyard completions powershell >> $PROFILE
```

---

## Configuration file

Crabyard reads `~/.crabyardrc` (TOML format) for default preferences. CLI flags and environment variables always take priority over config file values.

```toml
[defaults]
pm = "bun"
auth = "github"
ui = "shadcn"
author = "Your Name"
license_key = "tk_..."
```
