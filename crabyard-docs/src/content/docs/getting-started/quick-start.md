---
title: Quick Start
description: Generate and run your first Crabyard app.
---

## Generate a project

Run `crabyard new` to create a new app:

```sh
crabyard new "My Desktop App"
```

The CLI will prompt you to choose:

1. **Auth provider** — GitHub, Google, or None
2. **UI framework** — shadcn/ui, DaisyUI, tesign, or Minimal

To skip prompts, pass flags directly:

```sh
crabyard new "My Desktop App" --auth github --ui shadcn --yes
```

## Run the app

```sh
cd my-desktop-app
bun run tauri dev
```

Your app opens with:

- A custom title bar with window controls
- The login screen (if you chose an auth provider)
- A settings dialog
- Auto-update checking (in production builds)

## Project structure

```
my-desktop-app/
├── src/                  # React frontend
│   ├── App.tsx
│   ├── components/
│   │   ├── DashboardView.tsx
│   │   ├── LoginView.tsx
│   │   ├── TitleBar.tsx
│   │   └── UpdateBanner.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useSettings.ts
│   │   └── useUpdater.ts
│   ├── lib/
│   │   ├── tauri.ts
│   │   ├── types.ts
│   │   └── utils.ts
│   └── store/
│       └── appStore.ts
├── src-tauri/            # Rust backend
│   ├── src/
│   │   ├── lib.rs
│   │   ├── main.rs
│   │   ├── auth/
│   │   ├── commands/
│   │   └── models/
│   ├── Cargo.toml
│   └── tauri.conf.json
├── package.json
└── vite.config.ts
```

## Build for production

```sh
bun run tauri build
```

This produces platform-specific installers in `src-tauri/target/release/bundle/`.

## Next steps

- [Configure auth providers](/guides/auth/)
- [Customize the UI](/guides/ui/)
- [Set up auto-updates](/guides/auto-updates/)
