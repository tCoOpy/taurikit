---
title: Auth Providers
description: Configure GitHub, Google, or no authentication in your Crabyard app.
---

Crabyard supports three auth modules. You choose one during project generation with `--auth <module>`.

## GitHub (Device Flow)

The GitHub module uses the [Device Authorization Flow](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#device-flow) — users see a code, open a browser to enter it, and the app polls for a token. No redirect server needed.

### Setup

1. Create a GitHub OAuth App at [github.com/settings/developers](https://github.com/settings/developers)
2. Copy the **Client ID**
3. Add it to your `.env` file:

```txt
GITHUB_CLIENT_ID=your_client_id_here
```

### How it works

- `device_flow.rs` — starts the device flow, polls for an access token
- `token_store.rs` — persists tokens via tauri-plugin-store
- `validate.rs` — validates tokens on app startup, refreshes if expired
- `useAuth.ts` — React hook exposing `login()`, `logout()`, `user`, `loading`

### Scopes

The default scope is `read:user`. Modify the scope in `src-tauri/src/commands/auth.rs`.

## Google (PKCE Loopback)

The Google module uses [PKCE with a loopback redirect](https://developers.google.com/identity/protocols/oauth2/native-app) — the app opens a browser for consent, spins up a local HTTP server to receive the redirect, and exchanges the code for tokens.

### Setup

1. Create credentials in the [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Add `http://127.0.0.1` as an authorized redirect URI
3. Add credentials to your `.env` file:

```txt
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
```

### How it works

- `loopback.rs` — starts a local HTTP server, opens the browser, handles the redirect
- `token_store.rs` — persists tokens via tauri-plugin-store
- `validate.rs` — validates tokens on app startup
- `useAuth.ts` — React hook exposing `login()`, `logout()`, `user`, `loading`

## None

The `none` module skips authentication entirely. The app opens directly to the dashboard with no login screen. Useful for apps that don't require user identity.

The generated `App.tsx` renders `<DashboardView />` directly instead of gating on auth state.
