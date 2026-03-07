mod doctor;
mod generate;
mod hooks;
mod license;
mod overlay;
mod tokens;
mod tui;

use std::path::PathBuf;

use clap::{Parser, Subcommand};

/// TauriKit — generate a production-ready Rust Tauri desktop app from a template.
#[derive(Parser)]
#[command(name = "taurikit", version, about)]
struct Cli {
    #[command(subcommand)]
    command: Commands,
}

#[derive(Subcommand)]
enum Commands {
    /// Check system prerequisites for TauriKit development
    Doctor,

    /// Create a new TauriKit project (interactive by default)
    New {
        /// App display name, e.g. "My Desktop App"
        app_name: Option<String>,

        /// App slug override (derived from app-name if omitted)
        #[arg(long, value_name = "SLUG")]
        slug: Option<String>,

        /// Bundle identifier (derived from slug if omitted)
        #[arg(long, value_name = "ID")]
        bundle_id: Option<String>,

        /// Initial version
        #[arg(long, default_value = "0.1.0")]
        app_version: Option<String>,

        /// Author name
        #[arg(long, default_value = "")]
        author: Option<String>,

        /// Short description
        #[arg(long, default_value = "")]
        description: Option<String>,

        /// Auth module: github, google, or none
        #[arg(long, value_name = "MODULE")]
        auth: Option<String>,

        /// UI framework: shadcn or daisyui
        #[arg(long, value_name = "FRAMEWORK")]
        ui: Option<String>,

        /// Path to the template directory
        /// [env: TAURIKIT_TEMPLATE]
        #[arg(long, env = "TAURIKIT_TEMPLATE", value_name = "DIR")]
        template: Option<PathBuf>,

        /// Output directory (defaults to ./<app-slug>)
        #[arg(long, short, value_name = "DIR")]
        output: Option<PathBuf>,

        /// Accept all defaults without prompting
        #[arg(long, short = 'y')]
        yes: bool,

        /// Skip `git init` and initial commit
        #[arg(long)]
        no_git: bool,

        /// Skip dependency installation
        #[arg(long)]
        no_install: bool,

        /// License key for template download
        /// [env: TAURIKIT_LICENSE_KEY]
        #[arg(long, env = "TAURIKIT_LICENSE_KEY", value_name = "KEY")]
        license_key: Option<String>,
    },
}

fn main() -> anyhow::Result<()> {
    let cli = Cli::parse();

    match cli.command {
        Commands::Doctor => {
            doctor::run()?;
        }
        Commands::New {
            app_name,
            slug,
            bundle_id,
            app_version,
            author,
            description,
            auth,
            ui,
            template,
            output,
            yes,
            no_git,
            no_install,
            license_key,
        } => {
            generate::run(generate::Config {
                app_name,
                slug,
                bundle_id,
                app_version,
                author,
                description,
                auth,
                ui,
                template,
                output,
                yes,
                no_git,
                no_install,
                license_key,
            })?;
        }
    }

    Ok(())
}
