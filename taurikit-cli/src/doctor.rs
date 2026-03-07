use std::fmt;
use std::process::{Command, Stdio};

use anyhow::Result;
use colored::Colorize;

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
    match get_version("rustc", &["--version"]) {
        Some(v) => Check {
            name: "Rust",
            status: Status::Ok,
            detail: v,
        },
        None => Check {
            name: "Rust",
            status: Status::Missing,
            detail: "not found — install from https://rustup.rs".into(),
        },
    }
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
fn check_linux_deps() -> Check {
    let libs = [
        "libwebkit2gtk-4.1",
        "libgtk-3",
        "libsoup-3.0",
    ];
    let mut missing = Vec::new();
    for lib in &libs {
        let ok = Command::new("pkg-config")
            .args(["--exists", lib])
            .stdout(Stdio::null())
            .stderr(Stdio::null())
            .status()
            .map(|s| s.success())
            .unwrap_or(false);
        if !ok {
            missing.push(*lib);
        }
    }
    if missing.is_empty() {
        Check {
            name: "Linux deps",
            status: Status::Ok,
            detail: "webkit2gtk, gtk3, libsoup3 found".into(),
        }
    } else {
        Check {
            name: "Linux deps",
            status: Status::Missing,
            detail: format!(
                "missing: {} — see https://v2.tauri.app/start/prerequisites/#linux",
                missing.join(", ")
            ),
        }
    }
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

fn get_version(cmd: &str, args: &[&str]) -> Option<String> {
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
