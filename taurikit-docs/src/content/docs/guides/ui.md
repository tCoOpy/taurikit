---
title: UI Frameworks
description: Choose between shadcn/ui, DaisyUI, Tesign, or Minimal for your app's component library.
---

TauriKit supports four UI frameworks. You choose one during project generation with `--ui <framework>`, or switch later with `taurikit update-ui --switch <framework>`.

All themes include these shared components out of the box:

- `ErrorBoundary` — catches render errors with a fallback UI
- `OnboardingTour` — multi-step first-launch welcome dialog
- `SidebarLayout` — collapsible sidebar navigation
- `Skeleton` — animated loading placeholder
- `Spinner` — CSS-only loading spinner
- `StatusBar` — bottom bar for status items and quick actions

And these shared hooks:

- `useAuth` — authentication state management
- `useKeyboardShortcut` — declarative keyboard shortcut binding
- `useSettings` — app settings with Tauri backend persistence
- `useTheme` — dark/light theme toggle (CSS class or data-theme)

## shadcn/ui

[shadcn/ui](https://ui.shadcn.com/) provides accessible, composable React components built on Radix UI primitives and styled with Tailwind CSS.

### What's included

The generated app ships with these pre-configured shadcn/ui components:

- `Avatar` — user profile images
- `Badge` — status indicators
- `Button` — primary actions
- `Card` — content containers
- `Dialog` — modal dialogs (used for settings)
- `DropdownMenu` — context menus
- `Input` — text fields
- `ScrollArea` — scrollable containers
- `Separator` — visual dividers
- `Switch` — toggle controls
- `Tooltip` — hover hints

### Adding more components

```sh
bunx shadcn@latest add [component-name]
```

Components are generated into `src/components/ui/`.

### Customization

Theming is controlled via CSS variables in `src/index.css`. The default theme uses a dark zinc palette.

## DaisyUI

[DaisyUI](https://daisyui.com/) adds semantic component classes to Tailwind CSS — no extra JavaScript, just utility classes.

### What's included

DaisyUI is configured as a Tailwind plugin with the `dark` theme. Components like buttons, cards, inputs, modals, and toggles use DaisyUI class names (`btn`, `card`, `input`, `modal`, `toggle`).

### Adding components

No installation required — all [DaisyUI components](https://daisyui.com/components/) are available via class names:

```tsx
<button className="btn btn-primary">Click me</button>
```

### Theming

Change the theme in `tailwind.config.js`:

```js
daisyui: {
  themes: ["dark", "light", "cyberpunk"],
}
```

## tesign

[tesign](https://github.com/tCoOpy/tesign) (`@slideup/design`) is a custom component library with a shadcn-compatible API. It includes components adapted for desktop apps with built-in theming.

### What's included

The overlay ships with adapted components: Button, Card, Input, Badge, Separator, Switch (Toggle), and TitleBar. These match the shadcn API surface so the rest of the scaffold works without changes.

### Adding more components

```sh
npx @slideup/design add [component-name]
npx @slideup/design list          # see all available
npx @slideup/design diff          # check for updates
```

### Theming

tesign uses Tailwind CSS v4 with OKLCH color variables in `src/index.css`, similar to the shadcn theme system.

## Minimal

Minimal is a zero-dependency theme using only Tailwind CSS utilities — no Radix, no DaisyUI plugin, no external component library.

### What's included

All core components (Button, Card, Dialog, Input, Badge, Switch, etc.) are implemented with pure Tailwind classes. The only runtime dependency is `lucide-react` for icons.

### When to use it

Choose Minimal when you want:
- Full control over styling with no opinionated abstractions
- Smallest possible bundle with no component library overhead
- A clean starting point for building your own design system
