# TauriKit Monorepo — AI Coding Instructions

TauriKit is a CLI tool and template system that generates production-ready Tauri v2 desktop apps with modular auth and UI framework choices.

---

## Monorepo Structure

```
taurikit/
├── taurikit-cli/       # Rust CLI binary (clap + dialoguer + ratatui)
├── scaffold/           # Template system (base + auth overlays + UI overlays)
├── taurikit-api/       # Backend API (Hono on Railway — license validation, Stripe)
├── taurikit-web/       # Landing page (Astro + Tailwind)
├── taurikit-docs/      # Documentation site (Astro Starlight)
└── scripts/            # Maintainer scripts (sync-tesign.mjs)
```

---

## TauriKit CLI (`taurikit-cli/`)

Rust binary built with `clap` for argument parsing, `dialoguer` for interactive prompts, and `ratatui` for TUI progress display.

### Commands

| Command | Purpose | Entry |
|---------|---------|-------|
| `taurikit new [APP_NAME]` | Generate a new project (interactive wizard) | `src/generate.rs` |
| `taurikit doctor` | Check system prerequisites + auto-install | `src/doctor.rs` |
| `taurikit update-ui` | Switch or update UI framework in existing project | `src/update_ui.rs` |

### Source Files

```
taurikit-cli/src/
├── main.rs           # CLI entry, clap derive, command dispatch
├── generate.rs       # Project generation (15-step pipeline)
├── doctor.rs         # System prerequisite checks + auto-install (~800 lines)
├── overlay.rs        # Module config loading, marker application, dependency merging
├── tokens.rs         # Token replacement ({{KEY}} → value), path utilities
├── update_ui.rs      # UI framework switching in existing projects
├── license.rs        # License key validation + template download/cache
├── hooks.rs          # Post-generation: git init + npm install
└── tui/
    ├── mod.rs        # Terminal setup/teardown (crossterm alternate screen)
    ├── banner.rs     # ASCII logo + separator
    ├── ferris.rs     # Animated crab mascot
    ├── generation.rs # Step-by-step progress TUI (ratatui)
    └── theme.rs      # Color palette constants
```

### Key Dependencies (Cargo.toml)

| Crate | Purpose |
|-------|---------|
| `clap` (v4) | CLI argument parsing with derive macros |
| `dialoguer` (v0.11) | Interactive prompts (Select, Input) |
| `ratatui` (v0.29) | Terminal UI framework |
| `crossterm` (v0.28) | Terminal control (raw mode, alternate screen) |
| `reqwest` (v0.12, blocking) | HTTP client for license API |
| `flate2` / `tar` | Template archive extraction |
| `walkdir` (v2) | Recursive directory traversal |
| `serde` / `serde_json` | JSON parsing (module.json) |
| `colored` (v2) | Terminal colored output |
| `dirs` (v6) | Platform-specific home/cache dirs |
| `libc` (unix only) | TTY stdin reopening |
| `winreg` (windows only) | Windows registry access |

---

## Template Generation Pipeline (`generate.rs`)

The `taurikit new` command runs this 15-step pipeline:

1. **Prerequisite checks** — Rust ≥1.88, Linux deps, Xcode CLT, MSVC, WebView2
2. **Package manager detection** — bun > pnpm > yarn > npm (auto-installs bun)
3. **Template resolution** — `--template` flag → license key download → `~/.taurikit/templates/`
4. **Module selection** — auth: github/google/none, ui: shadcn/daisyui/tesign
5. **App metadata collection** — name, slug, bundle ID, author, version, description
6. **Copy base template** — `scaffold/base/` → output directory
7. **Apply auth overlay** — `scaffold/auth/{module}/` files copied over base
8. **Apply UI overlay** — `scaffold/ui/{module}/` files copied over base
9. **Process markers** — `// TAURIKIT:KEY` lines replaced with code from `module.json`
10. **Token replacement** — `{{APP_NAME}}`, `{{APP_SLUG}}`, etc. across all text files
11. **Merge npm dependencies** — `module.json` `npm_dev_dependencies` → `package.json`
12. **Write .env** — copy `.env.example` → `.env`, inject OAuth client ID if provided
13. **Write manifest.toml** — record selected modules + metadata
14. **Git init** — `git init` + initial commit (unless `--no-git`)
15. **Install dependencies** — `{pm} install` (unless `--no-install`)

---

## Scaffold Template System (`scaffold/`)

### Directory Layout

```
scaffold/
├── base/               # Core template (foundation for ALL projects)
│   ├── src/             # React frontend with TAURIKIT markers
│   ├── src-tauri/       # Rust backend with TAURIKIT markers
│   └── package.json     # Dependencies ({{TOKEN}} placeholders)
│
├── auth/                # Auth strategy overlays
│   ├── github/          # GitHub Device Flow OAuth
│   │   ├── module.json  # Markers + npm deps
│   │   ├── src/         # React components (LoginView, DashboardView, useAuth)
│   │   └── src-tauri/   # Rust (device_flow.rs, token_store.rs, validate.rs)
│   ├── google/          # Google PKCE Loopback OAuth
│   │   ├── module.json
│   │   ├── src/
│   │   └── src-tauri/   # Rust (loopback.rs, PKCE)
│   └── none/            # No authentication
│       ├── module.json  # Empty markers
│       └── src/
│
├── ui/                  # UI framework overlays
│   ├── shadcn/          # shadcn/ui (Radix + Tailwind)
│   │   ├── module.json  # npm deps: radix-ui, shadcn, cva, tw-animate-css
│   │   └── src/         # TitleBar.tsx + index.css (shadcn theme)
│   ├── daisyui/         # DaisyUI
│   │   ├── module.json  # npm deps: daisyui
│   │   └── src/         # TitleBar.tsx + index.css (daisyui plugin)
│   └── tesign/          # tesign design system
│       ├── module.json  # npm deps: @slideup/design, @heroicons/react
│       └── src/         # TitleBar.tsx + index.css (tesign theme)
│
└── manifest.toml        # Module definitions + token docs
```

### Token System (`tokens.rs`)

Tokens are `{{KEY}}` placeholders in template files that get replaced with user-provided values:

| Token | Example Value | Source |
|-------|--------------|--------|
| `{{APP_NAME}}` | My Desktop App | User input |
| `{{APP_SLUG}}` | my-desktop-app | Derived (kebab-case) |
| `{{APP_SLUG_SNAKE}}` | my_desktop_app | Derived (snake_case) |
| `{{APP_BUNDLE_ID}}` | com.example.mydesktopapp | Derived or user input |
| `{{APP_VERSION}}` | 0.1.0 | User input |
| `{{APP_DESCRIPTION}}` | A desktop app | User input |
| `{{APP_AUTHOR}}` | John | User input |
| `{{AUTH_MODULE}}` | github | Selected module |
| `{{UI_MODULE}}` | shadcn | Selected module |
| `{{PACKAGE_MANAGER}}` | bun | Detected/selected PM |
| `{{PM_RUN}}` | bun | PM run prefix |
| `{{PM_TAURI_DEV}}` | bun tauri dev | PM dev command |
| `{{TAURIKIT_VERSION}}` | 1.3.0 | Build-time version |
| `{{GENERATED_AT}}` | 1741500000 | Unix timestamp |

**Important:** `{{TOKEN}}` must NOT appear in `.tsx`/`.jsx` files — curly braces conflict with JSX syntax. Use `VITE_APP_NAME` env var for app name in React components.

Token replacement skips binary files (images, lockfiles) — see `is_binary_path()` in `tokens.rs`.

### Marker System (`overlay.rs`)

Markers are placeholder lines in base template files that get replaced with code from module.json:

```rust
// In base/src-tauri/src/lib.rs:
// TAURIKIT:MOD_AUTH      ← replaced with "mod auth;" or removed
// TAURIKIT:COMMANDS      ← replaced with command registrations

// In base/src/lib/types.ts:
// TAURIKIT:AUTH_TYPES    ← replaced with TypeScript interfaces
```

Each auth module's `module.json` defines marker values:
```json
{
  "markers": {
    "TAURIKIT:MOD_AUTH": "mod auth;",
    "TAURIKIT:COMMANDS": "commands::auth::login,\n..."
  },
  "npm_dev_dependencies": {
    "lucide-react": "^0.577.0"
  }
}
```

When `auth/none` is selected, its `module.json` has empty markers — the marker lines are simply removed.

### Module Config (`overlay.rs`)

`ModuleConfig` from `module.json`:
- `markers`: `HashMap<String, String>` — code to inject at marker lines
- `npm_dev_dependencies`: `HashMap<String, String>` — packages to merge into `package.json`

The `merge_package_deps()` function adds dependencies from both auth + UI modules into the generated `package.json`.

---

## How to Add a New Auth Module

1. Create `scaffold/auth/myauth/`
2. Create `scaffold/auth/myauth/module.json` with markers and npm deps
3. Add React components: `src/App.tsx`, `src/components/LoginView.tsx`, `src/hooks/useAuth.ts`
4. Add Rust backend: `src-tauri/src/auth/`, `src-tauri/src/commands/auth.rs`, `src-tauri/src/models/auth.rs`
5. Register in `scaffold/manifest.toml`:
   ```toml
   [modules.auth.options.myauth]
   label = "My Auth Provider"
   overlay = "auth/myauth"
   ```
6. Add to `AUTH_OPTIONS` in `taurikit-cli/src/generate.rs`

### Marker keys to implement (must match base template marker comments):

| Marker | Purpose |
|--------|---------|
| `TAURIKIT:MOD_AUTH` | `mod auth;` declaration in `lib.rs` |
| `TAURIKIT:COMMANDS` | Command registrations in `generate_handler![]` |
| `TAURIKIT:MOD_AUTH_CMD` | `pub mod auth;` in `commands/mod.rs` |
| `TAURIKIT:MOD_AUTH_MODEL` | `pub mod auth;` in `models/mod.rs` |
| `TAURIKIT:AUTH_ERRORS` | Error variants for `AppError` enum |
| `TAURIKIT:AUTH_STATE` | Fields for `AppState` struct |
| `TAURIKIT:AUTH_STATE_DEFAULTS` | Default values for `AppState` fields |
| `TAURIKIT:AUTH_TYPES` | TypeScript interfaces in `types.ts` |
| `TAURIKIT:AUTH_IMPORTS` | TypeScript imports in `tauri.ts` |
| `TAURIKIT:AUTH_COMMANDS` | TypeScript invoke wrappers in `tauri.ts` |
| `TAURIKIT:STORE_AUTH_*` | Zustand store state/setters/defaults |

---

## How to Add a New UI Module

1. Create `scaffold/ui/myui/`
2. Create `scaffold/ui/myui/module.json` with npm deps (usually no markers needed for UI)
3. Add `src/index.css` with Tailwind theme
4. Add `src/components/TitleBar.tsx` styled for the UI framework
5. Register in `scaffold/manifest.toml`:
   ```toml
   [modules.ui.options.myui]
   label = "My UI Framework"
   overlay = "ui/myui"
   ```
6. Add to `UI_OPTIONS` in `taurikit-cli/src/generate.rs`

---

## How to Add a New CLI Flag

In `taurikit-cli/src/main.rs`, add to the `Commands::New` enum:

```rust
#[arg(long, value_name = "VALUE")]
my_flag: Option<String>,
```

Then pass it through `Config` in the match arm and handle it in `generate.rs`.

---

## How to Add a New Doctor Check

In `taurikit-cli/src/doctor.rs`:

1. Add a new `ensure_*()` function following the existing pattern
2. Call it from `generate.rs` in the prerequisite section
3. Use `print_ok()`, `print_warn()`, `print_fail()` for status output
4. Platform-gate with `#[cfg(target_os = "...")]` if OS-specific

---

## Cross-Platform Considerations

### CLI (`doctor.rs`)

| Check | Windows | macOS | Linux |
|-------|---------|-------|-------|
| Rust | rustup (PowerShell) | rustup (curl) | rustup (curl) |
| Build tools | MSVC via vswhere/winget | Xcode CLT | webkit2gtk via apt/dnf/pacman |
| WebView | WebView2 (registry check) | Built-in (WebKit) | webkit2gtk-4.1 |
| Bun | PowerShell install | curl install | curl install |

### Stdin TTY Fix (`generate.rs`)

When the CLI is invoked via `curl | sh`, stdin is a pipe, not a TTY. The `ensure_stdin_tty()` function reopens `/dev/tty` on Unix to allow interactive prompts. Windows doesn't need this fix.

### Package Manager Commands

| PM | Dev command | Run prefix |
|----|------------|------------|
| bun | `bun tauri dev` | `bun` |
| pnpm | `pnpm tauri dev` | `pnpm` |
| yarn | `yarn tauri dev` | `yarn` |
| npm | `npx tauri dev` | `npm run` |

### Build Artifacts

`tauri.conf.json` uses `"targets": "all"` which builds for the current OS only. Cross-compilation requires CI (see `.github/workflows/`).

---

## tesign Sync System

The `scripts/sync-tesign.mjs` script synchronizes components between the standalone `tesign` library (`@slideup/design`) and the taurikit overlay at `scaffold/ui/tesign/`.

### Sync State

`scaffold/ui/tesign/.sync-state.json` tracks:
- Component file paths
- SHA256 content hashes
- Sync mode: `adapted` (styling differences), `manual` (completely different API), `theme` (CSS variables)

### Component Mapping

| Overlay Component | tesign Source | Sync Mode |
|-------------------|--------------|-----------|
| button.tsx | button.tsx | adapted |
| input.tsx | input.tsx | adapted |
| card.tsx | card.tsx | adapted |
| badge.tsx | badge.tsx | adapted |
| separator.tsx | separator.tsx | adapted |
| switch.tsx | toggle.tsx | adapted (renamed) |
| dialog.tsx | modal.tsx | manual |
| dropdown-menu.tsx | dropdown.tsx | manual |
| index.css | globals.css | theme |
| tooltip.tsx | — | overlay-only |
| avatar.tsx | — | overlay-only |
| scroll-area.tsx | — | overlay-only |

### Sync Commands (maintainer)

```bash
node scripts/sync-tesign.mjs --tesign ../tesign          # detect changes
node scripts/sync-tesign.mjs --tesign ../tesign --diff    # show diffs
node scripts/sync-tesign.mjs --tesign ../tesign --update  # mark as synced
```

### End-User Design Component CLI

Users can add components from the tesign registry:

```bash
npx @slideup/design add [component-name]   # add a component
npx @slideup/design list                    # list all available
npx @slideup/design diff                    # check for updates
npx @slideup/design init                    # initialize config
```

---

## License & Template Distribution

### License Validation (`license.rs`)

1. POST license key to `https://taurikit-api-production.up.railway.app/license/validate`
2. If valid: download template tarball from returned `download_url`
3. Extract to `~/.cache/taurikit/templates/{version}/`
4. Cache is reused on subsequent runs

### Template Resolution Order

1. `--template` flag (local path)
2. `TAURIKIT_TEMPLATE` env var
3. `--license-key` / `TAURIKIT_LICENSE_KEY` → API download
4. `~/.taurikit/templates/` fallback

---

## CI/CD Workflows (`.github/workflows/`)

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `release-cli.yml` | `v*` tag push | Build CLI for 5 targets, create GitHub Release |
| `test-generated-app.yml` | Manual dispatch | Generate + build + launch test app on Win/Mac/Linux |
| `package-template.yml` | Push to main | Package scaffold tarball |
| `deploy-api.yml` | Push to main | Deploy API (Railway auto-deploy) |

### CLI Release Targets

| Target | OS | Arch | Archive |
|--------|----|------|---------|
| `x86_64-unknown-linux-gnu` | Linux | x86_64 | `.tar.gz` |
| `aarch64-unknown-linux-gnu` | Linux | ARM64 | `.tar.gz` |
| `x86_64-apple-darwin` | macOS | Intel | `.tar.gz` |
| `aarch64-apple-darwin` | macOS | Apple Silicon | `.tar.gz` |
| `x86_64-pc-windows-msvc` | Windows | x86_64 | `.zip` |

---

## Version & Release

```bash
# Build CLI locally
cargo build --release

# Tag a release (triggers CI)
git tag v1.2.6
git push origin v1.2.6

# Build version comes from git tag (build.rs extracts GIT_VERSION)
```

---

## API (`taurikit-api/`)

Hono web framework on Railway. Endpoints:

| Method | Path | Purpose |
|--------|------|---------|
| POST | `/license/validate` | Validate license key |
| GET | `/template/:version` | Download template tarball (Bearer auth) |
| POST | `/stripe/checkout` | Create Stripe checkout session |
| POST | `/stripe/webhook` | Handle Stripe `checkout.session.completed` |
| GET | `/stripe/session/:id` | Get license key for a Stripe session |

---

## Code Conventions

- **Rust**: Edition 2024, minimum Rust 1.88. `anyhow` for CLI errors. `thiserror` in scaffold.
- **Token placeholders**: Double curly braces `{{KEY}}`. Never invent new token names without adding them to `tokens.rs`.
- **Markers**: Lines containing `// TAURIKIT:NAME` or `# TAURIKIT:NAME`. Defined in module.json, applied by `overlay.rs`.
- **Binary detection**: `is_binary_path()` in `tokens.rs` — `.png`, `.ico`, `.lock`, etc. are copied without token replacement.
- **Skip paths**: `node_modules`, `target`, `.git`, `dist`, `.cache`, `.claude` — never copied to output.
- **Module config**: Each overlay has a `module.json` at its root. Contains `markers` and `npm_dev_dependencies`.
- **Manifest**: `manifest.toml` at scaffold root defines all available modules and their labels/paths.
