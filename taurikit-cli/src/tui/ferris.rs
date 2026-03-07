use ratatui::style::Color;

pub const ART: &str = r#"
⠀⠀⣠⠤⠖⠒⠦⢤⡀⠀⠀⠀⠀⠀⠀⢀⠤⠴⠒⠢⠤⣀⠀⠀
⠀⣼⠁⠀⠀⡠⢖⡉⠁⠀⠀⠀⠀⠀⠀⠈⢙⡲⣄⠀⠀⠈⣇⠀
⠀⣟⣄⠀⠐⠓⢋⡇⠀⠀⠀⠀⠀⠀⠀⠀⢹⡙⠚⠀⠀⡠⣻⠀
⠀⠈⡶⢭⣒⡺⠟⣀⣰⣿⠦⠤⠤⢼⣿⣆⡈⠻⢖⣒⡭⡾⠁⠀
⠀⠀⠱⡘⢄⡰⠊⠁⠀⠀⠀⠀⠀⠀⠀⠀⠈⠑⣄⡰⣃⠇⠀⠀
⠀⣀⠤⠬⢽⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⡯⠥⠤⡀⠀
⠰⠕⢋⡭⠿⡟⢄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡠⣻⠯⢭⡙⠺⠆
⠀⢰⡳⠊⡩⠛⣦⡉⠒⠤⠤⠄⠤⠤⠤⠒⢉⣔⠛⢍⠓⣝⡄⠀
⠀⠈⠁⡼⡴⠉⠀⠈⠓⠲⠤⠤⠤⠤⠖⠚⠁⠈⠉⣎⣧⠈⠁⠀
⠀⠀⠀⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠁⠀⠀⠀
"#;

const WAVE_PALETTE: [Color; 6] = [
    Color::Rgb(255, 140, 50),  // orange
    Color::Rgb(255, 170, 60),
    Color::Rgb(255, 200, 80),
    Color::Rgb(255, 170, 60),
    Color::Rgb(255, 140, 50),
    Color::Rgb(230, 120, 40),
];

const CELEBRATE_PALETTE: [Color; 6] = [
    Color::Rgb(80, 220, 100),  // green
    Color::Rgb(80, 200, 255),  // cyan
    Color::Rgb(255, 140, 50),  // orange
    Color::Rgb(255, 220, 60),  // yellow
    Color::Rgb(80, 220, 100),
    Color::Rgb(80, 200, 255),
];

pub fn line_color(line_idx: usize, tick: usize, celebrating: bool) -> Color {
    let palette = if celebrating { &CELEBRATE_PALETTE } else { &WAVE_PALETTE };
    let offset = tick / 2;
    palette[(line_idx + offset) % palette.len()]
}

pub fn bob_offset(tick: usize, celebrating: bool) -> u16 {
    if celebrating {
        return 0;
    }
    match (tick / 4) % 4 {
        0 | 2 => 0,
        1 => 1,
        _ => 0,
    }
}
