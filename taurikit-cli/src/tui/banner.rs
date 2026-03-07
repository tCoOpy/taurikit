pub const LOGO: &str = r#"
 ████████╗ █████╗ ██╗   ██╗██████╗ ██╗██╗  ██╗██╗████████╗
 ╚══██╔══╝██╔══██╗██║   ██║██╔══██╗██║██║ ██╔╝██║╚══██╔══╝
    ██║   ███████║██║   ██║██████╔╝██║█████╔╝ ██║   ██║
    ██║   ██╔══██║██║   ██║██╔══██╗██║██╔═██╗ ██║   ██║
    ██║   ██║  ██║╚██████╔╝██║  ██║██║██║  ██╗██║   ██║
    ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚═╝   ╚═╝
"#;

use colored::Colorize;

pub fn print_inline_banner() {
    let lines = LOGO.trim_start_matches('\n').lines();
    for line in lines {
        println!("{}", line.truecolor(255, 140, 50).bold());
    }
    println!(
        "{}",
        format!(
            "  v{} — Rust Tauri Desktop App Starter",
            env!("CARGO_PKG_VERSION")
        )
        .truecolor(255, 191, 0)
    );
    println!();
}

pub fn print_inline_separator() {
    println!("{}", "─".repeat(58).truecolor(60, 60, 80));
}
