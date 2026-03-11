use ratatui::layout::Rect;
use ratatui::style::Style;
use ratatui::text::{Line, Span};
use ratatui::widgets::Paragraph;

use crate::tui::theme;

pub struct MultiSelectState {
    pub items: Vec<MultiSelectItem>,
    pub cursor: usize,
    pub scroll_offset: usize,
}

pub struct MultiSelectItem {
    pub name: String,
    pub label: String,
    pub checked: bool,
}

impl MultiSelectState {
    pub fn new(items: Vec<MultiSelectItem>) -> Self {
        Self {
            items,
            cursor: 0,
            scroll_offset: 0,
        }
    }

    pub fn with_preselected(mut self, names: &[String]) -> Self {
        for item in &mut self.items {
            if names.contains(&item.name) {
                item.checked = true;
            }
        }
        self
    }

    pub fn up(&mut self) {
        if self.cursor > 0 {
            self.cursor -= 1;
            if self.cursor < self.scroll_offset {
                self.scroll_offset = self.cursor;
            }
        }
    }

    pub fn down(&mut self) {
        if self.cursor + 1 < self.items.len() {
            self.cursor += 1;
        }
    }

    pub fn toggle(&mut self) {
        self.items[self.cursor].checked = !self.items[self.cursor].checked;
    }

    pub fn selected_names(&self) -> Vec<String> {
        self.items
            .iter()
            .filter(|i| i.checked)
            .map(|i| i.name.clone())
            .collect()
    }

    pub fn selected_count(&self) -> usize {
        self.items.iter().filter(|i| i.checked).count()
    }

    pub fn render(&mut self, frame: &mut ratatui::Frame, area: Rect) {
        let visible = area.height as usize;

        if self.cursor >= self.scroll_offset + visible {
            self.scroll_offset = self.cursor + 1 - visible;
        }
        if self.cursor < self.scroll_offset {
            self.scroll_offset = self.cursor;
        }

        let end = (self.scroll_offset + visible).min(self.items.len());
        let visible_items = &self.items[self.scroll_offset..end];

        let lines: Vec<Line> = visible_items
            .iter()
            .enumerate()
            .map(|(vi, item)| {
                let i = vi + self.scroll_offset;
                let active = i == self.cursor;
                let check = if item.checked { "◉" } else { "○" };
                let indicator = if active { "› " } else { "  " };

                let check_style = if item.checked {
                    theme::accent()
                } else if active {
                    Style::default().fg(theme::MUTED)
                } else {
                    Style::default().fg(theme::DIM)
                };

                let label_style = if active {
                    theme::selected()
                } else if item.checked {
                    theme::text()
                } else {
                    Style::default().fg(theme::MUTED)
                };

                Line::from(vec![
                    Span::styled(indicator, label_style),
                    Span::styled(format!("{check} "), check_style),
                    Span::styled(&item.label, label_style),
                ])
            })
            .collect();

        frame.render_widget(Paragraph::new(lines), area);
    }
}
