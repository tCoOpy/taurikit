---
title: Configuration
description: Reference for tauri.conf.json and template tokens.
---

## tauri.conf.json

The main Tauri configuration file. Key sections:

### App metadata

```json
{
  "productName": "My App",
  "version": "0.1.0",
  "identifier": "com.myorg.myapp"
}
```

### Window settings

```json
{
  "app": {
    "windows": [{
      "title": "My App",
      "width": 1100,
      "height": 700,
      "minWidth": 800,
      "minHeight": 500,
      "decorations": false
    }]
  }
}
```

Set `"decorations": true` to use the native OS title bar instead of the custom one.

### Updater

```json
{
  "plugins": {
    "updater": {
      "endpoints": [
        "https://github.com/ORG/REPO/releases/latest/download/latest.json"
      ],
      "pubkey": "dW50cnVzdGVkIGNvbW1lbnQ..."
    }
  }
}
```

See the [Auto-Updates guide](/guides/auto-updates/) for key generation.

### Bundle

```json
{
  "bundle": {
    "active": true,
    "targets": "all",
    "createUpdaterArtifacts": "v1Compatible"
  }
}
```

`"targets": "all"` builds all installer formats for the current platform.

---

## Template tokens

During project generation, Crabyard replaces these tokens across all files:

| Token | Description | Example |
|-------|-------------|---------|
| `{{APP_NAME}}` | Display name | `My Desktop App` |
| `{{APP_SLUG}}` | Kebab-case slug | `my-desktop-app` |
| `{{APP_SLUG_SNAKE}}` | Snake_case slug | `my_desktop_app` |
| `{{APP_BUNDLE_ID}}` | Bundle identifier | `com.myorg.my-desktop-app` |
| `{{APP_VERSION}}` | Initial version | `0.1.0` |
| `{{APP_DESCRIPTION}}` | Short description | `A desktop utility` |
| `{{APP_AUTHOR}}` | Author name | `Jane Doe` |
| `{{GENERATED_AT}}` | Generation timestamp | `2025-01-15T10:30:00Z` |
| `{{CRABYARD_VERSION}}` | CLI version used | `1.0.0` |
| `{{AUTH_MODULE}}` | Selected auth module | `github` |
| `{{UI_MODULE}}` | Selected UI framework | `shadcn` |

---

## Capabilities (permissions)

Tauri v2 uses a capability-based permission system. The default capability file at `src-tauri/capabilities/default.json` grants:

| Permission | Purpose |
|------------|---------|
| `core:default` | Basic Tauri APIs |
| `opener:default` | Open URLs in the default browser |
| `dialog:default` | Native file/folder dialogs |
| `store:default` | Persistent key-value storage |
| `updater:default` | Check and install app updates |
| `process:default` | Relaunch the app after update |

Add or remove permissions as needed for your app. See the [Tauri permissions docs](https://v2.tauri.app/security/permissions/) for the full list.
