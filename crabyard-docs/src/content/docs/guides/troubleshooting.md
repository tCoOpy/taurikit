---
title: Troubleshooting
description: Solutions for common Crabyard issues on Windows, macOS, and Linux.
---

## Build Errors

### `error: linker 'link.exe' not found` (Windows)

MSVC Build Tools are missing. Install them:

```powershell
winget install Microsoft.VisualStudio.2022.BuildTools
```

During installation, select the **"Desktop development with C++"** workload. Then restart your terminal.

### `webkit2gtk not found` (Linux)

Install the required system libraries for your distro:

```sh
# Ubuntu / Debian
sudo apt install pkg-config libwebkit2gtk-4.1-dev libjavascriptcoregtk-4.1-dev libgtk-3-dev libsoup-3.0-dev libssl-dev libayatana-appindicator3-dev

# Fedora
sudo dnf install pkg-config webkit2gtk4.1-devel javascriptcoregtk4.1-devel gtk3-devel libsoup3-devel openssl-devel libappindicator-gtk3-devel

# Arch
sudo pacman -S pkgconf webkit2gtk-4.1 gtk3 libsoup3 openssl libayatana-appindicator

# openSUSE
sudo zypper install pkg-config webkit2gtk3-soup2-devel gtk3-devel libsoup-devel libopenssl-devel libappindicator3-devel

# Void
sudo xbps-install -Sy pkg-config webkit2gtk-devel gtk+3-devel libsoup3-devel openssl-devel

# Alpine
sudo apk add pkgconf webkit2gtk-dev gtk+3.0-dev libsoup3-dev openssl-dev
```

### `Xcode CLT not found` (macOS)

```sh
xcode-select --install
```

This opens a system dialog. Click **Install** and wait for the download to complete (typically 2–5 minutes).

### Rust version too old

Crabyard requires Rust ≥ 1.88. Update via rustup:

```sh
rustup update stable
```

---

## Runtime Errors

### App opens but shows a blank screen

1. Right-click the window → **Inspect** → check the **Console** tab for JavaScript errors
2. Verify Vite dev server is running on `http://localhost:1420`
3. Check `tauri.conf.json` → `devUrl` matches the dev server port

### `GITHUB_CLIENT_ID is not set`

1. Copy `.env.example` to `.env` if you haven't:
   ```sh
   cp .env.example .env
   ```
2. Fill in `GITHUB_CLIENT_ID` with your GitHub OAuth App's Client ID

### OAuth Device Flow never completes

- Verify your GitHub OAuth App's **Client ID** matches `GITHUB_CLIENT_ID` in `.env`
- Make sure you're entering the user code at `https://github.com/login/device`
- Check that the GitHub OAuth App does **not** have a callback URL set (Device Flow doesn't use one)

### Port 1420 already in use

Another Vite dev server or process is using the port. Either stop it or change the port:

1. In `vite.config.ts`, change the `server.port` value
2. Update `devUrl` in `src-tauri/tauri.conf.json` to match

---

## Generation Errors

### `Auth module 'X' not found in template`

The cached template may be corrupted or outdated.

1. Delete the template cache:
   - **macOS/Linux**: `rm -rf ~/.cache/crabyard/templates/`
   - **Windows**: Delete `%APPDATA%\crabyard\templates\`
2. Re-run `crabyard new`

### `License server unreachable`

- Check your internet connection
- The API at `taurikit-api-production.up.railway.app` may be temporarily down
- If you have a cached template, generation will use the cached version automatically

### WebView2 installation hangs (Windows)

The automated WebView2 installer has a 15-minute timeout. If it fails:

1. Download manually from [Microsoft Edge WebView2](https://developer.microsoft.com/en-us/microsoft-edge/webview2/)
2. Run the installer
3. Re-run `crabyard new`

---

## Development Tips

### Hot reload not working

1. Make sure _both_ the Vite dev server and Rust backend are running (`bun run tauri dev` starts both)
2. Frontend changes hot-reload instantly; Rust changes require a recompile (automatic with `tauri dev`)

### Slow Rust compilation

First build is slow (compiling all dependencies). Subsequent builds are incremental. To speed things up:

- Use `cargo check` instead of `cargo build` for type-checking
- Install [`sccache`](https://github.com/mozilla/sccache) for a shared compilation cache
- On Linux, use `mold` linker: add to `.cargo/config.toml`:
  ```toml
  [target.x86_64-unknown-linux-gnu]
  linker = "clang"
  rustflags = ["-C", "link-arg=-fuse-ld=mold"]
  ```
