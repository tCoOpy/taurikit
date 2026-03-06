---
title: Custom Title Bar
description: Frameless window with a custom-built title bar and native window controls.
---

Every generated app uses a frameless window (`"decorations": false` in `tauri.conf.json`) with a custom React title bar that includes:

- Drag region for moving the window
- App title display
- Minimize / maximize / close buttons that call native Tauri window APIs

## How it works

The `TitleBar` component uses `@tauri-apps/api/window` to control the current window:

```tsx
import { getCurrentWindow } from "@tauri-apps/api/window";

const appWindow = getCurrentWindow();

await appWindow.minimize();
await appWindow.toggleMaximize();
await appWindow.close();
```

The drag region is set via the `data-tauri-drag-region` attribute, which tells Tauri to treat that element as the window's title bar for drag purposes.

## Customization

The title bar is in `src/components/TitleBar.tsx`. Common modifications:

### Change the title

The title is passed as a prop or reads from the app config.

### Add navigation or controls

Add buttons, menus, or breadcrumbs to the title bar — it's a standard React component.

### Styling

The title bar uses Tailwind classes. The default theme uses a dark zinc background to match the rest of the UI.

### Disabling the custom title bar

To use the native OS title bar instead:

1. Set `"decorations": true` in `src-tauri/tauri.conf.json`
2. Remove the `<TitleBar />` component from your layout
