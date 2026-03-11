use ratatui::layout::Rect;
use ratatui::style::Style;
use ratatui::text::{Line, Span};
use ratatui::widgets::Paragraph;

use crate::tui::theme;

pub struct SelectState {
    pub items: Vec<SelectItem>,
    pub cursor: usize,
}

pub struct SelectItem {
    pub label: String,
    pub description: String,
}

impl SelectState {
    pub fn new(items: Vec<SelectItem>) -> Self {
        Self { items, cursor: 0 }
    }

    pub fn up(&mut self) {
        if self.cursor > 0 {
            self.cursor -= 1;
        }
    }

    pub fn down(&mut self) {
        if self.cursor + 1 < self.items.len() {
            self.cursor += 1;
        }
    }

    pub fn selected_label(&self) -> &str {
        &self.items[self.cursor].label
    }

    pub fn render(&self, frame: &mut ratatui::Frame, area: Rect) {
        let lines: Vec<Line> = self
            .items
            .iter()
            .enumerate()
            .map(|(i, item)| {
                let active = i == self.cursor;
                let indicator = if active { "› " } else { "  " };
                let label_style = if active {
                    theme::selected()
                } else {
                    theme::text()
                };
                let desc_style = if active {
                    Style::default().fg(theme::MUTED)
                } else {
                    Style::default().fg(theme::DIM)
                };
                Line::from(vec![
                    Span::styled(indicator, label_style),
                    Span::styled(&item.label, label_style),
                    Span::styled(format!("  {}", item.description), desc_style),
                ])
            })
            .collect();

        frame.render_widget(Paragraph::new(lines), area);
    }
}
