# Design Tokens

All tokens are CSS custom properties defined in `src/styles/tokens.css` under `@theme`. Tailwind v4 exposes them as utility classes and arbitrary values.

## Importing styles

**Tailwind v4 project** — use the full stylesheet:
```css
@import "@fg-abc/ui/styles";
```

**Tailwind v3 project (or plain CSS)** — use the variables-only file (no Tailwind syntax):
```css
@import "@fg-abc/ui/styles/variables";
```

**Rule: never hardcode hex values or raw pixel sizes. Always reference a token.**

```tsx
// ✗ wrong
<div style={{ color: "#6558f5" }} />
<div className="text-[#6558f5]" />

// ✓ correct
<div className="text-[var(--color-accent-500)]" />
```

---

## Colors

### Neutrals (warm stone/tan palette)
| Token | Value | Use for |
|---|---|---|
| `--color-canvas` | `#fafaf9` | Page background |
| `--color-surface` | `#f5f4f2` | Subtle backgrounds, hover states |
| `--color-overlay` | `#efefed` | Deeper backgrounds, skeleton |
| `--color-border` | `#e4e3e0` | All borders, dividers |
| `--color-muted` | `#c9c7c3` | Placeholder text, disabled icons |
| `--color-subtle` | `#8f8d89` | Secondary text, icons |
| `--color-base` | `#3d3c3a` | Default body text |
| `--color-ink` | `#1a1917` | Headings, high-emphasis text |

### Accent (forest green)
| Token | Use for |
|---|---|
| `--color-accent-50` | Selected row background |
| `--color-accent-100` | Tag/badge background, avatar bg |
| `--color-accent-200` | Hover accent backgrounds |
| `--color-accent-300` | Resize handle hover |
| `--color-accent-500` | Primary buttons, focus rings, selected state |
| `--color-accent-600` | Button hover |
| `--color-accent-700` | Button active, badge text |
| `--color-accent-900` | Darkest accent |

### Semantic
| Token | Use for |
|---|---|
| `--color-success` | Positive delta, success badge text |
| `--color-success-surface` | Success badge/toast background |
| `--color-warning` | Warning badge text |
| `--color-warning-surface` | Warning badge/toast background |
| `--color-danger` | Error text, danger button text |
| `--color-danger-surface` | Error input background, danger badge bg |
| `--color-info` | Info badge text |
| `--color-info-surface` | Info badge/toast background |

---

## Border radius
| Token | Value | Use for |
|---|---|---|
| `--radius-xs` | 4px | Checkbox, resize handles |
| `--radius-sm` | 6px | Dropdown items, tags, small badges |
| `--radius-md` | 10px | Inputs, buttons, tooltips |
| `--radius-lg` | 14px | Popovers, dropdowns, cards, table wrapper |
| `--radius-xl` | 20px | Modals |
| `--radius-full` | 9999px | Badges, avatars, progress, toggle |

---

## Component sizing
| Token | Value | Use for |
|---|---|---|
| `--height-input-sm` | 30px | Small buttons, compact inputs |
| `--height-input` | 36px | Default input/button height |
| `--height-input-lg` | 44px | Large buttons |

---

## Shadows
| Token | Use for |
|---|---|
| `--shadow-xs` | Inputs, checkboxes — subtle lift |
| `--shadow-sm` | Buttons, stat cards |
| `--shadow-md` | Tooltips |
| `--shadow-lg` | Popovers, dropdowns |
| `--shadow-xl` | Modals |

---

## Motion
| Token | Value | Use for |
|---|---|---|
| `--duration-fast` | 120ms | Hover/focus transitions |
| `--duration-base` | 200ms | Button press, toggle |
| `--duration-slow` | 300ms | Sidebar collapse, modals |
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Entrances |
| `--ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | Exits, progress |

---

## Z-index scale
| Token | Value | Use for |
|---|---|---|
| `--z-dropdown` | 100 | Page-level dropdowns (not inside modals) |
| `--z-sticky` | 200 | Sticky headers |
| `--z-overlay` | 300 | Modal overlay |
| `--z-modal` | 400 | Modal content |
| `--z-popover` | 450 | Popovers, selects, autocompletes, date pickers (float above modals) |
| `--z-toast` | 500 | Toasts |
| `--z-tooltip` | 600 | Tooltips (always on top) |

---

## Typography
| Token | Use for |
|---|---|
| `--font-sans` | Inter Variable — all UI text |
| `--font-mono` | JetBrains Mono — code, numbers |
| `--text-xs` → `--text-3xl` | Font size scale |
| `--tracking-tight` | Headings |
| `--tracking-base` | Body text |
