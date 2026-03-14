---
title: Installation
description: Install Crabyard and its prerequisites.
---

## Prerequisites

Crabyard generates Tauri v2 apps, so you need the Tauri development toolchain installed:

- **Rust** 1.88+ — [rustup.rs](https://rustup.rs/)
- **Bun** 1.1+ — [bun.sh](https://bun.sh/)
- **Git** — [git-scm.com](https://git-scm.com/)

### Platform-specific

**Windows:** WebView2 (included in Windows 10 1803+ and Windows 11)

**Linux:**
```sh
# Ubuntu / Debian
sudo apt install libwebkit2gtk-4.1-dev libjavascriptcoregtk-4.1-dev libgtk-3-dev libsoup-3.0-dev libssl-dev libayatana-appindicator3-dev

# Fedora
sudo dnf install webkit2gtk4.1-devel javascriptcoregtk4.1-devel gtk3-devel libsoup3-devel openssl-devel libappindicator-gtk3-devel

# Arch
sudo pacman -S webkit2gtk-4.1 gtk3 libsoup3 openssl libayatana-appindicator
```

**macOS:** Xcode Command Line Tools
```sh
xcode-select --install
```

## Install Crabyard

**macOS / Linux:**

```sh
curl -fsSL https://crabyard.dev/install.sh | sh
```

**Windows (PowerShell):**

```powershell
irm https://crabyard.dev/install.ps1 | iex
```

**From source:**

```sh
cargo install --path .
```

## Verify installation

```sh
crabyard doctor
```

This checks all prerequisites: Rust, Cargo, Bun, Git, Tauri CLI, and platform-specific dependencies.

## License key

Purchase a license at [crabyard.dev](https://crabyard.dev) and set your key:

```sh
export CRABYARD_LICENSE_KEY=TK-...
```

Or pass it directly when generating:

```sh
crabyard new "My App" --license-key TK-...
```
