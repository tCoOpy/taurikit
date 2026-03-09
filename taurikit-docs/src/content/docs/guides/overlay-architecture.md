---
title: Overlay Architecture
description: How TauriKit's modular overlay system composes auth, UI, and other modules on top of the base scaffold.
---

TauriKit generates projects using a **base + overlay** composition model. The base scaffold provides the app skeleton, and overlays add specific features (auth provider, UI framework) by merging files on top.

## How It Works

```
base/                 ← Core app (always copied first)
  + auth/{module}/    ← Auth overlay (adds/replaces files)
  + ui/{module}/      ← UI overlay (adds/replaces files)
  = your project      ← Fully assembled app
```

### Generation order

1. **Copy base template** — the minimal Tauri v2 + React scaffold
2. **Apply auth overlay** — copies auth module files on top (overwrites matching paths)
3. **Apply UI overlay** — copies UI module files on top
4. **Process markers** — replaces `// TAURIKIT:MARKER_NAME` comments with module-injected code
5. **Replace tokens** — substitutes `{{APP_NAME}}`, `{{APP_SLUG}}`, etc.
6. **Merge dependencies** — combines `npm_dev_dependencies` from `module.json` into `package.json`

## Base Template

The base scaffold at `scaffold/base/` contains:

- React 19 entry point (`main.tsx`, `App.tsx`)
- Zustand store with marker comments for auth injection
- Rust backend with `lib.rs`, `error.rs`, `state.rs`
- Tauri commands for settings (load, save, folder picker)
- Vite config, TypeScript config, `package.json`
- Custom `TitleBar` (from UI overlay)
- `UpdateBanner` for auto-updates

The base is **not standalone** — it requires an auth overlay (even `none`) and a UI overlay.

## Module Configuration

Each overlay has a `module.json` that declares:

```json
{
  "markers": {
    "TAURIKIT:MOD_AUTH": "pub mod auth;",
    "TAURIKIT:COMMANDS": "commands::auth::login,\ncommands::auth::logout,"
  },
  "npm_dev_dependencies": {
    "lucide-react": "^0.577.0"
  }
}
```

### Markers

Markers are placeholder comments in base template files:

```rust
// TAURIKIT:MOD_AUTH
```

During generation, the entire comment line is replaced with the content from `module.json`'s `markers` map. This injects auth commands into `lib.rs`, error variants into `error.rs`, state fields into `state.rs`, etc.

Markers are matched in both `//` (Rust/TypeScript) and `#` (TOML/shell) comment styles.

### Dependencies

The `npm_dev_dependencies` map is merged into the generated `package.json`'s `devDependencies`. Later overlays override earlier ones if the same package appears.

## Available Modules

### Auth

| Module | Overlay | Strategy |
|--------|---------|----------|
| `github` | `auth/github/` | GitHub Device Flow OAuth |
| `google` | `auth/google/` | Google Loopback PKCE |
| `none` | `auth/none/` | No authentication |

### UI

| Module | Overlay | Components |
|--------|---------|------------|
| `shadcn` | `ui/shadcn/` | Radix UI primitives + shadcn styling |
| `daisyui` | `ui/daisyui/` | Tailwind class-based components |
| `tesign` | `ui/tesign/` | Custom design system (@slideup/design) |

## Token System

These tokens are replaced in all non-binary files during generation:

| Token | Example Value |
|-------|---------------|
| `{{APP_NAME}}` | My Desktop App |
| `{{APP_SLUG}}` | my-desktop-app |
| `{{APP_SLUG_SNAKE}}` | my_desktop_app |
| `{{APP_BUNDLE_ID}}` | com.example.mydesktopapp |
| `{{APP_VERSION}}` | 0.1.0 |
| `{{APP_DESCRIPTION}}` | A desktop application |
| `{{APP_AUTHOR}}` | Your Name |
| `{{PACKAGE_MANAGER}}` | bun |
| `{{PM_RUN}}` | bun run |
| `{{PM_TAURI_DEV}}` | bunx tauri dev |
| `{{TAURIKIT_VERSION}}` | 1.3.2 |
| `{{GENERATED_AT}}` | 1741500000 |

**Important**: Do not use `{{TOKEN}}` syntax inside `.tsx`/`.jsx` files — curly braces conflict with JSX expressions. Use `VITE_` environment variables instead.

## Manifest

Each generated project includes `manifest.toml`, which records:

- Template version
- Selected modules (auth, UI, package manager)
- Project metadata (name, slug, bundle ID)

The `taurikit update-ui` command reads this manifest to determine the current UI framework and apply updates.
