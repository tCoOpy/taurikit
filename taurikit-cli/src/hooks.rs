use std::path::Path;
use std::process::{Command, Stdio};

use anyhow::{Context, Result};

/// Initialize a git repository in `dir` and create an initial commit.
pub fn git_init(dir: &Path) -> Result<()> {
    run_cmd("git", &["init"], dir, "git init")?;
    run_cmd("git", &["add", "-A"], dir, "git add")?;
    run_cmd(
        "git",
        &["commit", "-m", "chore: initial TauriKit scaffold"],
        dir,
        "git commit",
    )?;
    Ok(())
}

/// Install frontend dependencies using the best available package manager.
pub fn install_deps(dir: &Path) -> Result<()> {
    let pm = detect_package_manager();
    run_cmd(pm, &["install"], dir, &format!("{pm} install"))
}

/// Detect the preferred package manager (bun > pnpm > yarn > npm).
fn detect_package_manager() -> &'static str {
    for pm in &["bun", "pnpm", "yarn", "npm"] {
        if command_exists(pm) {
            return pm;
        }
    }
    "npm" // fallback — always present with Node.js
}

/// Returns true if the given command is available in PATH.
fn command_exists(cmd: &str) -> bool {
    Command::new(cmd)
        .arg("--version")
        .stdout(Stdio::null())
        .stderr(Stdio::null())
        .status()
        .map(|s| s.success())
        .unwrap_or(false)
}

fn run_cmd(program: &str, args: &[&str], dir: &Path, label: &str) -> Result<()> {
    let status = Command::new(program)
        .args(args)
        .current_dir(dir)
        .status()
        .with_context(|| format!("Failed to run `{label}` — is `{program}` installed?"))?;

    if !status.success() {
        anyhow::bail!("`{label}` exited with status {status}");
    }
    Ok(())
}
