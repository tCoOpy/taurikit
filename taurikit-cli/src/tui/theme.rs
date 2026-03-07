use ratatui::style::{Color, Modifier, Style};

pub const ORANGE: Color = Color::Rgb(255, 140, 50);
pub const AMBER: Color = Color::Rgb(255, 191, 0);
pub const _RUST: Color = Color::Rgb(183, 65, 14);
pub const CYAN: Color = Color::Rgb(80, 200, 255);
pub const GREEN: Color = Color::Rgb(80, 220, 100);
pub const RED: Color = Color::Rgb(240, 70, 70);
pub const _YELLOW: Color = Color::Rgb(255, 220, 60);
pub const DIM: Color = Color::Rgb(100, 100, 120);
pub const TEXT: Color = Color::Rgb(220, 220, 230);
pub const BG: Color = Color::Rgb(20, 20, 30);

pub fn title() -> Style {
    Style::default().fg(ORANGE).add_modifier(Modifier::BOLD)
}

pub fn subtitle() -> Style {
    Style::default().fg(AMBER)
}

pub fn success() -> Style {
    Style::default().fg(GREEN).add_modifier(Modifier::BOLD)
}

pub fn running() -> Style {
    Style::default().fg(CYAN).add_modifier(Modifier::BOLD)
}

pub fn pending() -> Style {
    Style::default().fg(DIM)
}

pub fn error() -> Style {
    Style::default().fg(RED).add_modifier(Modifier::BOLD)
}

pub fn progress_filled() -> Style {
    Style::default().fg(ORANGE)
}

pub fn text() -> Style {
    Style::default().fg(TEXT)
}

pub fn border() -> Style {
    Style::default().fg(Color::Rgb(60, 60, 80))
}

pub fn border_highlight() -> Style {
    Style::default().fg(ORANGE)
}
