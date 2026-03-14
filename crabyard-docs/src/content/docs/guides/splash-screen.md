---
title: Splash Screen
description: Show a loading screen while your app initializes.
---

Crabyard includes a built-in splash screen that displays instantly while your React app loads. Once the frontend finishes loading, the splash screen closes and the main window appears.

## How it works

1. The app starts with the main window hidden (`"visible": false`)
2. A small splash window shows immediately with a spinner animation
3. When the React app finishes loading (`PageLoadEvent::Finished`), the Rust backend shows the main window and closes the splash

No frontend code or configuration is needed — it works automatically.

## Customizing

Edit `src-tauri/splash.html` to change the splash screen content, colors, or animation. The default uses a dark background with a CSS spinner and your app name.

### Disabling the splash screen

To remove the splash screen:

1. Delete the `splash` window entry from `src-tauri/tauri.conf.json`
2. Set `"visible": true` on the main window
3. Remove the `on_page_load` handler from `src-tauri/src/lib.rs`
4. Delete `src-tauri/splash.html`
