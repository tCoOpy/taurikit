---
title: Project Structure
description: Anatomy of a generated TauriKit project.
---

## Directory layout

```
my-app/
├── src/                          # React frontend
│   ├── App.tsx                   # Root component (auth gating + routing)
│   ├── main.tsx                  # React entry point
│   ├── index.css                 # Global styles + theme variables
│   ├── vite-env.d.ts
│   ├── components/
│   │   ├── DashboardView.tsx     # Main app view after login
│   │   ├── LoginView.tsx         # Login screen (auth modules only)
│   │   ├── TitleBar.tsx          # Custom frameless title bar
│   │   ├── UpdateBanner.tsx      # Auto-update notification
│   │   └── ui/                   # UI framework components
│   ├── hooks/
│   │   ├── useAuth.ts            # Auth state and actions
│   │   ├── useSettings.ts        # Settings read/write
│   │   └── useUpdater.ts         # Auto-update check/install
│   ├── lib/
│   │   ├── tauri.ts              # Tauri command wrappers
│   │   ├── types.ts              # Shared TypeScript types
│   │   └── utils.ts              # Utility functions
│   └── store/
│       └── appStore.ts           # Zustand global store
├── src-tauri/                    # Rust backend
│   ├── Cargo.toml                # Rust dependencies
│   ├── tauri.conf.json           # Tauri configuration
│   ├── build.rs
│   ├── capabilities/
│   │   └── default.json          # Tauri permissions
│   ├── icons/                    # App icons (all sizes)
│   └── src/
│       ├── main.rs               # Entry point
│       ├── lib.rs                # Plugin registration + command setup
│       ├── error.rs              # Error types
│       ├── state.rs              # App state
│       ├── auth/                 # Auth module (Rust side)
│       │   ├── mod.rs
│       │   ├── device_flow.rs    # or loopback.rs for Google
│       │   ├── token_store.rs
│       │   └── validate.rs
│       ├── commands/             # Tauri IPC commands
│       │   ├── mod.rs
│       │   ├── auth.rs
│       │   └── settings.rs
│       └── models/               # Data structures
│           ├── mod.rs
│           ├── auth.rs
│           └── settings.rs
├── package.json
├── tsconfig.json
├── vite.config.ts
└── .env.example                  # Required environment variables
```

## Key files

### Frontend

| File | Purpose |
|------|---------|
| `App.tsx` | Root component — checks auth state, renders login or dashboard |
| `appStore.ts` | Zustand store — holds auth state, settings, UI state |
| `tauri.ts` | Typed wrappers around `invoke()` calls to Rust commands |
| `types.ts` | Shared interfaces (`AppSettings`, `User`, etc.) |

### Backend

| File | Purpose |
|------|---------|
| `lib.rs` | Registers Tauri plugins and IPC commands |
| `error.rs` | `AppError` enum with `thiserror` derives |
| `state.rs` | `AppState` struct (HTTP client, shared state) |
| `commands/auth.rs` | `login`, `logout`, `get_user` commands |
| `commands/settings.rs` | `get_settings`, `set_settings` commands |

### Configuration

| File | Purpose |
|------|---------|
| `tauri.conf.json` | App metadata, window config, bundle settings, updater config |
| `capabilities/default.json` | Tauri permission declarations |
| `.env.example` | Template for required environment variables (OAuth keys, etc.) |
