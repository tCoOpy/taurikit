use std::fmt;
use std::process::{Command, Stdio};

use anyhow::Result;
use colored::Colorize;
use dialoguer::Confirm;

#[derive(Clone, Copy)]
enum Status {
    Ok,
    Warning,
    Missing,
}

impl fmt::Display for Status {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Status::Ok => write!(f, "✓"),
            Status::Warning => write!(f, "!"),
            Status::Missing => write!(f, "✗"),
        }
    }
}

struct Check {
    name: &'static str,
    status: Status,
    detail: String,
}

fn has_rustup() -> bool {
    Command::new("rustup")
        .arg("--version")
        .stdout(Stdio::null())
        .stderr(Stdio::null())
        .status()
        .map(|s| s.success())
        .unwrap_or(false)
}

fn install_rustup() -> Result<()> {
    println!(
        "  {} {}",
        "→".truecolor(80, 200, 255).bold(),
        "Installing rustup…".truecolor(220, 220, 230),
    );

    #[cfg(unix)]
    {
        let ok = Command::new("sh")
            .args(["-c", "curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y"])
            .status()
            .map(|s| s.success())
            .unwrap_or(false);
        if !ok {
            anyhow::bail!("Failed to install rustup. Install manually from https://rustup.rs");
        }
        // Source cargo env so rustc/cargo are available in this session
        let home = std::env::var("HOME").unwrap_or_default();
        let cargo_bin = format!("{home}/.cargo/bin");
        if let Ok(path) = std::env::var("PATH") {
            std::env::set_var("PATH", format!("{cargo_bin}:{path}"));
        }
    }

    #[cfg(windows)]
    {
        let ok = Command::new("powershell")
            .args([
                "-NoProfile", "-Command",
                "Invoke-WebRequest -Uri https://win.rustup.rs/x86_64 -OutFile $env:TEMP\\rustup-init.exe; \
                 & $env:TEMP\\rustup-init.exe -y",
            ])
            .status()
            .map(|s| s.success())
            .unwrap_or(false);
        if !ok {
            anyhow::bail!("Failed to install rustup. Install manually from https://rustup.rs");
        }
        let userprofile = std::env::var("USERPROFILE").unwrap_or_default();
        let cargo_bin = format!("{userprofile}\\.cargo\\bin");
        if let Ok(path) = std::env::var("PATH") {
            std::env::set_var("PATH", format!("{cargo_bin};{path}"));
        }
    }

    println!(
        "  {} {}\n",
        "✓".truecolor(80, 220, 100).bold(),
        "rustup installed".truecolor(80, 220, 100),
    );
    Ok(())
}

fn rustup_update() -> Result<()> {
    println!(
        "  {} {}",
        "→".truecolor(80, 200, 255).bold(),
        "Updating Rust via rustup…".truecolor(220, 220, 230),
    );
    println!();

    let ok = Command::new("rustup")
        .arg("update")
        .status()
        .map(|s| s.success())
        .unwrap_or(false);
    println!();

    if !ok {
        anyhow::bail!("rustup update failed. Update Rust manually and try again.");
    }

    let new_v = get_version("rustc", &["--version"])
        .ok_or_else(|| anyhow::anyhow!("rustc not found after update — check your PATH"))?;

    if parse_semver(&new_v).map_or(true, |(maj, min, _)| !(maj >= 1 && min >= 88)) {
        anyhow::bail!(
            "Rust {new_v} is still below 1.88.0 after update. Check your active toolchain."
        );
    }

    println!(
        "  {} {}\n",
        "✓".truecolor(80, 220, 100).bold(),
        format!("Rust updated to {new_v}").truecolor(80, 220, 100),
    );
    Ok(())
}

pub fn ensure_rust_version() -> Result<()> {
    match get_version("rustc", &["--version"]) {
        Some(version) if parse_semver(&version).map_or(false, |(maj, min, _)| maj >= 1 && min >= 88) => {
            return Ok(());
        }
        Some(version) => {
            println!(
                "\n  {} {}: {}",
                "!".truecolor(255, 220, 60).bold(),
                "Rust".truecolor(255, 220, 60),
                format!("{version} — requires rustc ≥ 1.88.0").truecolor(180, 180, 190),
            );
            if !has_rustup() {
                install_rustup()?;
            }
            rustup_update()?;
        }
        None => {
            println!(
                "\n  {} {}: {}",
                "!".truecolor(255, 220, 60).bold(),
                "Rust".truecolor(255, 220, 60),
                "not found".truecolor(180, 180, 190),
            );
            if !has_rustup() {
                install_rustup()?;
            }
            rustup_update()?;
        }
    }
    Ok(())
}

pub fn run() -> Result<()> {
    println!();
    crate::tui::banner::print_inline_banner();
    crate::tui::banner::print_inline_separator();
    println!(
        "  {}",
        format!("Doctor v{}", env!("GIT_VERSION")).truecolor(255, 191, 0)
    );
    println!();

    let checks = vec![
        check_rust(),
        check_cargo(),
        check_node(),
        check_package_manager(),
        check_git(),
        check_tauri_cli(),
        #[cfg(target_os = "linux")]
        check_linux_deps(),
        #[cfg(target_os = "windows")]
        check_webview2(),
    ];

    let mut issues = 0u32;

    for c in &checks {
        match c.status {
            Status::Ok => {
                println!(
                    "  {} {}: {}",
                    "✓".truecolor(80, 220, 100).bold(),
                    c.name.truecolor(220, 220, 230),
                    c.detail.truecolor(100, 100, 120)
                );
            }
            Status::Warning => {
                println!(
                    "  {} {}: {}",
                    "!".truecolor(255, 220, 60).bold(),
                    c.name.truecolor(255, 220, 60),
                    c.detail.truecolor(180, 180, 190)
                );
            }
            Status::Missing => {
                println!(
                    "  {} {}: {}",
                    "✗".truecolor(240, 70, 70).bold(),
                    c.name.truecolor(240, 70, 70),
                    c.detail.truecolor(240, 70, 70)
                );
                issues += 1;
            }
        }
    }

    println!();
    crate::tui::banner::print_inline_separator();
    if issues == 0 {
        println!(
            "  {}",
            "🦀 All checks passed. You're ready to build!"
                .truecolor(80, 220, 100)
                .bold()
        );
    } else {
        println!(
            "  {}",
            format!(
                "{} issue{} found. Install missing dependencies before running `taurikit new`.",
                issues,
                if issues == 1 { "" } else { "s" }
            )
            .truecolor(240, 70, 70)
            .bold()
        );
    }
    crate::tui::banner::print_inline_separator();
    println!();

    Ok(())
}

fn check_rust() -> Check {
    let version = match get_version("rustc", &["--version"]) {
        Some(v) => v,
        None => {
            return Check {
                name: "Rust",
                status: Status::Missing,
                detail: "not found — install from https://rustup.rs".into(),
            };
        }
    };

    if parse_semver(&version).map_or(false, |(maj, min, _)| maj >= 1 && min >= 88) {
        return Check { name: "Rust", status: Status::Ok, detail: version };
    }

    let has_rustup = Command::new("rustup")
        .arg("--version")
        .stdout(Stdio::null())
        .stderr(Stdio::null())
        .status()
        .map(|s| s.success())
        .unwrap_or(false);

    if !has_rustup {
        return Check {
            name: "Rust",
            status: Status::Warning,
            detail: format!("{version} — requires rustc ≥ 1.88.0, install rustup from https://rustup.rs"),
        };
    }

    println!(
        "\n  {} {}: {}",
        "!".truecolor(255, 220, 60).bold(),
        "Rust".truecolor(255, 220, 60),
        format!("{version} — requires rustc ≥ 1.88.0").truecolor(180, 180, 190),
    );

    let should_update = Confirm::new()
        .with_prompt("    Run `rustup update` now?")
        .default(true)
        .interact()
        .unwrap_or(false);

    if !should_update {
        return Check {
            name: "Rust",
            status: Status::Warning,
            detail: format!("{version} — requires rustc ≥ 1.88.0, run: rustup update"),
        };
    }

    println!();
    let update_ok = Command::new("rustup")
        .arg("update")
        .status()
        .map(|s| s.success())
        .unwrap_or(false);
    println!();

    if !update_ok {
        return Check {
            name: "Rust",
            status: Status::Warning,
            detail: format!("{version} — rustup update failed, update manually"),
        };
    }

    match get_version("rustc", &["--version"]) {
        Some(new_v) if parse_semver(&new_v).map_or(false, |(maj, min, _)| maj >= 1 && min >= 88) => {
            Check { name: "Rust", status: Status::Ok, detail: format!("{new_v} (updated)") }
        }
        Some(new_v) => Check {
            name: "Rust",
            status: Status::Warning,
            detail: format!("{new_v} — still below 1.88.0, check your active toolchain"),
        },
        None => Check {
            name: "Rust",
            status: Status::Warning,
            detail: "rustc not found after update — check your PATH".into(),
        },
    }
}

pub(crate) fn parse_semver(s: &str) -> Option<(u32, u32, u32)> {
    let version_part = s.split_whitespace().find(|w| w.contains('.'))?;
    let mut parts = version_part.split('.');
    let major = parts.next()?.parse().ok()?;
    let minor = parts.next()?.parse().ok()?;
    let patch = parts.next().and_then(|p| p.split('-').next()?.parse().ok()).unwrap_or(0);
    Some((major, minor, patch))
}

fn check_cargo() -> Check {
    match get_version("cargo", &["--version"]) {
        Some(v) => Check {
            name: "Cargo",
            status: Status::Ok,
            detail: v,
        },
        None => Check {
            name: "Cargo",
            status: Status::Missing,
            detail: "not found — install Rust from https://rustup.rs".into(),
        },
    }
}

fn check_node() -> Check {
    match get_version("node", &["--version"]) {
        Some(v) => Check {
            name: "Node.js",
            status: Status::Ok,
            detail: v,
        },
        None => Check {
            name: "Node.js",
            status: Status::Missing,
            detail: "not found — install from https://nodejs.org".into(),
        },
    }
}

fn check_package_manager() -> Check {
    for (name, label) in &[
        ("bun", "Bun"),
        ("pnpm", "pnpm"),
        ("yarn", "Yarn"),
        ("npm", "npm"),
    ] {
        if let Some(v) = get_version(name, &["--version"]) {
            return Check {
                name: "Package manager",
                status: Status::Ok,
                detail: format!("{label} {v}"),
            };
        }
    }
    Check {
        name: "Package manager",
        status: Status::Missing,
        detail: "none found (bun/pnpm/yarn/npm) — install Node.js or Bun".into(),
    }
}

fn check_git() -> Check {
    match get_version("git", &["--version"]) {
        Some(v) => Check {
            name: "Git",
            status: Status::Ok,
            detail: v,
        },
        None => Check {
            name: "Git",
            status: Status::Warning,
            detail: "not found — optional, needed for `git init` during project creation".into(),
        },
    }
}

fn check_tauri_cli() -> Check {
    if let Some(v) = get_version("cargo-tauri", &["--version"]) {
        return Check {
            name: "Tauri CLI",
            status: Status::Ok,
            detail: v,
        };
    }
    if let Some(v) = get_version("cargo", &["tauri", "--version"]) {
        return Check {
            name: "Tauri CLI",
            status: Status::Ok,
            detail: v,
        };
    }
    Check {
        name: "Tauri CLI",
        status: Status::Warning,
        detail: "not found — install with: cargo install tauri-cli --locked".into(),
    }
}

#[cfg(target_os = "linux")]
const LINUX_LIBS: &[&str] = &[
    "libwebkit2gtk-4.1",
    "javascriptcoregtk-4.1",
    "libgtk-3",
    "libsoup-3.0",
];

#[cfg(target_os = "linux")]
fn has_cmd(cmd: &str) -> bool {
    Command::new("which")
        .arg(cmd)
        .stdout(Stdio::null())
        .stderr(Stdio::null())
        .status()
        .map(|s| s.success())
        .unwrap_or(false)
}

#[cfg(target_os = "linux")]
fn find_missing_linux_libs() -> Vec<&'static str> {
    if !has_cmd("pkg-config") {
        return LINUX_LIBS.to_vec();
    }
    LINUX_LIBS
        .iter()
        .copied()
        .filter(|lib| {
            !Command::new("pkg-config")
                .args(["--exists", lib])
                .stdout(Stdio::null())
                .stderr(Stdio::null())
                .status()
                .map(|s| s.success())
                .unwrap_or(false)
        })
        .collect()
}

#[cfg(target_os = "linux")]
enum Distro {
    Debian,
    Fedora,
    Arch,
    Unknown,
}

#[cfg(target_os = "linux")]
fn detect_distro() -> Distro {
    if has_cmd("apt-get") {
        Distro::Debian
    } else if has_cmd("dnf") {
        Distro::Fedora
    } else if has_cmd("pacman") {
        Distro::Arch
    } else {
        Distro::Unknown
    }
}

#[cfg(target_os = "linux")]
fn linux_install_cmd(distro: &Distro) -> Option<(&'static str, &'static [&'static str])> {
    match distro {
        Distro::Debian => Some(("apt-get", &[
            "install", "-y",
            "pkg-config",
            "libwebkit2gtk-4.1-dev",
            "libjavascriptcoregtk-4.1-dev",
            "libgtk-3-dev",
            "libsoup-3.0-dev",
            "libssl-dev",
            "libayatana-appindicator3-dev",
        ])),
        Distro::Fedora => Some(("dnf", &[
            "install", "-y",
            "pkg-config",
            "webkit2gtk4.1-devel",
            "javascriptcoregtk4.1-devel",
            "gtk3-devel",
            "libsoup3-devel",
            "openssl-devel",
            "libappindicator-gtk3-devel",
        ])),
        Distro::Arch => Some(("pacman", &[
            "-S", "--needed", "--noconfirm",
            "pkgconf",
            "webkit2gtk-4.1",
            "gtk3",
            "libsoup3",
            "openssl",
            "libayatana-appindicator",
        ])),
        Distro::Unknown => None,
    }
}

#[cfg(target_os = "linux")]
fn linux_install_hint(distro: &Distro) -> String {
    match distro {
        Distro::Debian => "sudo apt install libwebkit2gtk-4.1-dev libjavascriptcoregtk-4.1-dev libgtk-3-dev libsoup-3.0-dev libssl-dev libayatana-appindicator3-dev".into(),
        Distro::Fedora => "sudo dnf install webkit2gtk4.1-devel javascriptcoregtk4.1-devel gtk3-devel libsoup3-devel openssl-devel libappindicator-gtk3-devel".into(),
        Distro::Arch => "sudo pacman -S webkit2gtk-4.1 gtk3 libsoup3 openssl libayatana-appindicator".into(),
        Distro::Unknown => "see https://v2.tauri.app/start/prerequisites/#linux".into(),
    }
}

#[cfg(target_os = "linux")]
fn check_linux_deps() -> Check {
    let missing = find_missing_linux_libs();
    if missing.is_empty() {
        Check {
            name: "Linux deps",
            status: Status::Ok,
            detail: "webkit2gtk, javascriptcoregtk, gtk3, libsoup3 found".into(),
        }
    } else {
        let distro = detect_distro();
        Check {
            name: "Linux deps",
            status: Status::Missing,
            detail: format!(
                "missing: {} — {}",
                missing.join(", "),
                linux_install_hint(&distro)
            ),
        }
    }
}

#[cfg(target_os = "linux")]
fn install_linux_deps() -> Result<()> {
    let distro = detect_distro();
    let (pm, args) = match linux_install_cmd(&distro) {
        Some(cmd) => cmd,
        None => anyhow::bail!(
            "Could not detect your package manager. Install the Tauri system libraries manually:\n  \
             see https://v2.tauri.app/start/prerequisites/#linux"
        ),
    };

    println!(
        "  {} {}",
        "→".truecolor(80, 200, 255).bold(),
        "Installing system libraries via sudo…".truecolor(220, 220, 230),
    );
    println!();

    let ok = Command::new("sudo")
        .arg(pm)
        .args(args)
        .status()
        .map(|s| s.success())
        .unwrap_or(false);

    println!();

    if !ok {
        anyhow::bail!(
            "Package installation failed. Install manually:\n  {}",
            linux_install_hint(&distro)
        );
    }

    let still_missing = find_missing_linux_libs();
    if !still_missing.is_empty() {
        anyhow::bail!(
            "Still missing after install: {}. Install manually:\n  {}",
            still_missing.join(", "),
            linux_install_hint(&distro)
        );
    }

    println!(
        "  {} {}\n",
        "✓".truecolor(80, 220, 100).bold(),
        "System libraries installed".truecolor(80, 220, 100),
    );
    Ok(())
}

#[cfg(target_os = "linux")]
pub fn ensure_linux_deps() -> Result<()> {
    let missing = find_missing_linux_libs();
    if missing.is_empty() {
        return Ok(());
    }

    let distro = detect_distro();

    println!(
        "\n  {} {}: {}",
        "!".truecolor(255, 220, 60).bold(),
        "Linux deps".truecolor(255, 220, 60),
        format!("missing: {}", missing.join(", ")).truecolor(180, 180, 190),
    );

    if linux_install_cmd(&distro).is_none() {
        println!(
            "\n  {} {}\n",
            "→".truecolor(80, 200, 255).bold(),
            "see https://v2.tauri.app/start/prerequisites/#linux".truecolor(220, 220, 230),
        );
        anyhow::bail!(
            "Could not detect your package manager. Install the missing libraries manually, then run `taurikit new` again."
        );
    }

    let should_install = Confirm::new()
        .with_prompt("    Install system libraries now? (requires sudo)")
        .default(true)
        .interact()
        .unwrap_or(false);

    if !should_install {
        println!(
            "\n  {} {}\n",
            "→".truecolor(80, 200, 255).bold(),
            linux_install_hint(&distro).truecolor(220, 220, 230),
        );
        anyhow::bail!(
            "Install the missing system libraries listed above, then run `taurikit new` again."
        );
    }

    println!();
    install_linux_deps()
}

#[cfg(not(target_os = "linux"))]
pub fn ensure_linux_deps() -> Result<()> {
    Ok(())
}

#[cfg(target_os = "windows")]
fn check_webview2() -> Check {
    let key = r"SOFTWARE\WOW6432Node\Microsoft\EdgeUpdate\Clients\{F3017226-FE2A-4295-8BDF-00C3A9A7E4C5}";
    let found = winreg::RegKey::predef(winreg::enums::HKEY_LOCAL_MACHINE)
        .open_subkey(key)
        .is_ok();
    if found {
        Check {
            name: "WebView2",
            status: Status::Ok,
            detail: "installed".into(),
        }
    } else {
        Check {
            name: "WebView2",
            status: Status::Missing,
            detail: "not found — download from https://developer.microsoft.com/en-us/microsoft-edge/webview2/".into(),
        }
    }
}

pub(crate) fn get_version(cmd: &str, args: &[&str]) -> Option<String> {
    Command::new(cmd)
        .args(args)
        .stdout(Stdio::piped())
        .stderr(Stdio::null())
        .output()
        .ok()
        .filter(|o| o.status.success())
        .and_then(|o| String::from_utf8(o.stdout).ok())
        .map(|s| s.trim().to_string())
}
