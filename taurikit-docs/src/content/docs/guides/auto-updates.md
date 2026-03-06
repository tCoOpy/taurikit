---
title: Auto-Updates
description: Built-in auto-update system with download progress and one-click install.
---

Every generated TauriKit app includes [tauri-plugin-updater](https://v2.tauri.app/plugin/updater/) pre-configured with a floating update banner.

## How it works

1. On app launch, `useUpdater()` calls `check()` against the configured update endpoint
2. If a newer version is found, `UpdateBanner` appears in the bottom-right corner
3. User clicks **"Update now"** → the update downloads with a progress bar
4. After download, the app relaunches with the new version

## Configuration

The update endpoint is configured in `src-tauri/tauri.conf.json`:

```json
{
  "plugins": {
    "updater": {
      "endpoints": [
        "https://github.com/YOUR_ORG/YOUR_REPO/releases/latest/download/latest.json"
      ],
      "pubkey": "YOUR_PUBLIC_KEY"
    }
  }
}
```

### Generate signing keys

Tauri requires update bundles to be signed:

```sh
bunx tauri signer generate -w ~/.tauri/myapp.key
```

This creates a keypair. Set the environment variable for builds:

```sh
export TAURI_SIGNING_PRIVATE_KEY=$(cat ~/.tauri/myapp.key)
export TAURI_SIGNING_PRIVATE_KEY_PASSWORD=""
```

Put the **public key** in `tauri.conf.json` under `plugins.updater.pubkey`.

### Update artifacts

The `createUpdaterArtifacts` option is set to `"v1Compatible"` in `tauri.conf.json`. When you run `bun run tauri build`, Tauri generates a `latest.json` file alongside the installer. Upload both to your GitHub Release.

## Components

### `useUpdater()` hook

```ts
const {
  available,     // boolean — update found
  version,       // string | null — new version number
  body,          // string | null — release notes
  downloading,   // boolean — download in progress
  progress,      // number — download percentage (0-100)
  error,         // string | null — error message
  checkForUpdate, // () => Promise<void>
  installUpdate,  // () => Promise<void>
  dismiss,        // () => void — hide the banner
} = useUpdater();
```

### `<UpdateBanner />`

A floating notification that appears when an update is available. Shows:

- Version number
- "Update now" / "Later" buttons
- Download progress bar during installation

The banner is rendered in `App.tsx` and positioned fixed at the bottom-right corner.

## GitHub Releases workflow

A typical CI setup for auto-updates:

1. Tag a release: `git tag v1.0.1 && git push origin v1.0.1`
2. CI builds the app with `bun run tauri build`
3. CI uploads the installer + `latest.json` to a GitHub Release
4. Running apps check the endpoint and pick up the new version

## Disabling auto-updates

Remove the `<UpdateBanner />` component from `App.tsx` and remove the `updater` section from `tauri.conf.json`.
