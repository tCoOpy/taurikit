---
title: Settings System
description: Persistent app settings with typed state management.
---

Every generated Crabyard app includes a settings system backed by [tauri-plugin-store](https://v2.tauri.app/plugin/store/) and [Zustand](https://zustand.docs.pmnd.rs/).

## Architecture

```
useSettings() hook
  ↓ reads/writes
Zustand store (appStore.ts)
  ↓ persists via
tauri-plugin-store (src-tauri)
  ↓ saves to
JSON file on disk
```

## Usage in components

```tsx
import { useSettings } from "@/hooks/useSettings";

function MyComponent() {
  const { settings, updateSettings, pickFolder } = useSettings();

  return (
    <div>
      <p>Workspace: {settings.workspaceRoot}</p>
      <button onClick={pickFolder}>Change folder</button>
      <button onClick={() => updateSettings({ theme: "light" })}>
        Light theme
      </button>
    </div>
  );
}
```

## Available methods

| Method | Description |
|--------|-------------|
| `settings` | Current settings object |
| `settingsLoading` | `true` while settings are being loaded |
| `loadSettings()` | Reload settings from disk |
| `updateSettings(partial)` | Merge partial settings and persist |
| `pickFolder()` | Open a native folder picker, save selection |

## Adding new settings

1. Add the field to `AppSettings` in `src/lib/types.ts`:

```ts
export interface AppSettings {
  workspaceRoot: string;
  theme: string;
  myNewSetting: boolean; // add here
}
```

2. Add a default in the Rust settings model (`src-tauri/src/models/settings.rs`)

3. Use it via `useSettings()`:

```tsx
const { settings, updateSettings } = useSettings();
await updateSettings({ myNewSetting: true });
```

Settings are saved to a JSON file in the app's data directory (platform-specific, managed by Tauri).
