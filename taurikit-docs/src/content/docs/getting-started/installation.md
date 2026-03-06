---
title: Installation
description: Install TauriKit and its prerequisites.
---

## Prerequisites

TauriKit generates Tauri v2 apps, so you need the Tauri development toolchain installed:

- **Rust** 1.80+ — [rustup.rs](https://rustup.rs/)
- **Bun** 1.1+ — [bun.sh](https://bun.sh/)
- **Git** — [git-scm.com](https://git-scm.com/)

### Platform-specific

**Windows:** WebView2 (included in Windows 10 1803+ and Windows 11)

**Linux:**
```sh
# Ubuntu / Debian
sudo apt install libwebkit2gtk-4.1-dev libgtk-3-dev libsoup-3.0-dev
```

**macOS:** Xcode Command Line Tools
```sh
xcode-select --install
```

## Install TauriKit

**macOS / Linux:**

```sh
curl -fsSL https://taurikit.dev/install.sh | sh
```

**Windows (PowerShell):**

```powershell
irm https://taurikit.dev/install.ps1 | iex
```

**From source:**

```sh
cargo install --path .
```

## Verify installation

```sh
taurikit doctor
```

This checks all prerequisites: Rust, Cargo, Bun, Git, Tauri CLI, and platform-specific dependencies.

## License key

Purchase a license at [taurikit.dev](https://taurikit.dev) and set your key:

```sh
export TAURIKIT_LICENSE_KEY=TK-...
```

Or pass it directly when generating:

```sh
taurikit new "My App" --license-key TK-...
```
