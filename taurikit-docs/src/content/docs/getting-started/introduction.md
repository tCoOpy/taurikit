---
title: Introduction
description: What is TauriKit and why use it.
---

TauriKit is a CLI tool that generates production-ready [Tauri v2](https://v2.tauri.app/) desktop applications. Instead of spending days wiring up auth, settings, auto-updates, and UI components, you run one command and get a working app in seconds.

## Why TauriKit?

Starting a Tauri project from scratch means:

- Configuring OAuth flows (device flow, PKCE, token refresh)
- Setting up persistent settings with a typed store
- Integrating the Tauri updater plugin with download progress
- Building a custom title bar with window controls
- Choosing and configuring a UI framework
- Wiring all of it together with proper error handling

TauriKit does all of this for you. Every generated project compiles with zero errors, zero warnings, and is ready to develop on immediately.

## How it works

TauriKit uses a **modular overlay system**:

1. A **base template** provides the core Tauri v2 + React + TypeScript scaffold
2. An **auth overlay** adds the authentication provider you choose
3. A **UI overlay** adds the component framework you choose

The CLI copies the base, applies overlays, replaces template tokens (app name, bundle ID, etc.), installs dependencies, and initializes git.

## Stack

Every generated app includes:

| Layer | Technology |
|-------|-----------|
| Runtime | Rust + Tauri v2 |
| Frontend | React 19 + TypeScript |
| State | Zustand |
| Persistence | tauri-plugin-store |
| Bundler | Vite |
| Package manager | Bun |

## What's next

- [Install TauriKit](/getting-started/installation/)
- [Generate your first app](/getting-started/quick-start/)
