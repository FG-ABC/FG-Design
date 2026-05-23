# @fg-abc/ui — Component Index

Pick the right component for your use case, then read its doc for the minimal working example.

All imports: `import { ComponentName } from "@fg-abc/ui"`
Styles: `import "@fg-abc/ui/styles"` once in your app entry.

---

## Picking a component

### Rendering text and headings
→ [`Display`](components/typography.md) — hero/marketing text, 3 sizes, not in document outline
→ [`Heading`](components/typography.md) — h1–h4, `level` for visual size, `as` for semantic tag
→ [`Text`](components/typography.md) — body copy, size/tone/weight/mono variants
→ [`Caption`](components/typography.md) — timestamps, metadata, helper annotations (xs)
→ [`LinkText`](components/typography.md) — inline link, external icon, asChild for router links

### User needs to trigger an action
→ [`Button`](components/button.md) — primary, outline, ghost, danger, link variants + loading state

### User needs to enter text
→ [`Input`](components/input.md) — single-line, with optional label/error/hint/adornments
→ [`Textarea`](components/textarea.md) — multi-line text, fixed height with resize handle
→ [`TextareaAuto`](components/textarea-auto.md) — grows with content, Enter always inserts a newline (never submits)
→ [`SearchBar`](components/search-bar.md) — search with debounce or button mode

### User needs to enter a number
→ [`NumberInput`](components/number-input.md) — integers or floats, with formatting
→ [`MoneyInput`](components/money-input.md) — currency, with $ prefix

### User needs to pick a date or time
→ [`DatePicker`](components/date-picker.md) — calendar popover, value is `"YYYY-MM-DD"`
→ [`DateTimePicker`](components/date-time-picker.md) — calendar + time scroll, value is `"YYYY-MM-DDTHH:mm"`

### User needs to pick from a list of options
→ [`FormSelect`](components/form-select.md) — dropdown, single value, fixed option list
→ [`Autocomplete`](components/autocomplete.md) — searchable single-select, supports async
→ [`MultiAutocomplete`](components/autocomplete.md) — searchable multi-select with tags
→ [`CreatableAutocomplete`](components/autocomplete.md) — single-select + ability to create new values
→ [`CreatableMultiAutocomplete`](components/autocomplete.md) — multi-select + creation

**Decision rule:** Use `FormSelect` when options are short and fixed. Use `Autocomplete` variants when options are long, searchable, or fetched from an API.

### User needs to toggle a boolean
→ [`Toggle`](components/toggle.md) — switch/toggle, sm or md size
→ [`Checkbox`](components/checkbox.md) — checkbox, supports indeterminate state
→ [`FormCheckbox`](components/checkbox.md) — checkbox with label/error/hint wrapper

### User needs to pick one option from a small set
→ [`FormRadio`](components/radio.md) — radio group, vertical or horizontal

### Displaying data in rows and columns
→ [`DataGrid`](components/data-grid.md) — full-featured: sort, paginate, select, row actions, inline editing, column collapse, resize, footer totals
→ [`Table`](components/table.md) — raw primitives (`Table`, `TableHead`, `TableRow`, etc.) for custom layouts

**Decision rule:** Use `DataGrid` for any real data table. Use raw `Table` primitives only when you need complete structural control.

### Displaying a metric or KPI
→ [`StatCard`](components/stat-card.md) — label + value + optional delta + icon

### Displaying a list of items
→ [`List` / `ListItem`](components/list.md) — vertical list, divided or gapped

### Displaying a loading state
→ [`Spinner`](components/spinner.md) — circular indeterminate spinner, sm/md/lg sizes
→ [`LinearProgress`](components/linear-progress.md) — horizontal indeterminate bar, use above tables during background refetch
→ [`Skeleton`](components/skeleton.md) — rect, text, or circle pulse shapes
→ `loading` prop on `Button`, `SearchBar`, `DataGrid`

**Decision rule:** Use `Spinner` when a whole area is blocked on initial load. Use `LinearProgress` when content is visible but refetching. Use `Skeleton` for shape-preserving placeholders.

### Displaying progress
→ [`Progress`](components/progress.md) — horizontal bar with a known value, accent/success/warning/danger colors
→ [`LinearProgress`](components/linear-progress.md) — indeterminate bar for unknown duration (background fetches)

### Labelling or tagging something
→ [`Badge`](components/badge.md) — pill label, semantic color variants

### Displaying a user avatar
→ [`Avatar`](components/avatar.md) — image with fallback initials, xs–xl sizes

### Overlay / dialog
→ [`Modal`](components/modal.md) — Radix dialog, sm/md/lg/xl/full sizes

### Contextual actions menu
→ [`DropdownMenu`](components/dropdown.md) — Radix dropdown, supports items, submenus, separators, checkbox and radio items

### Inline hint on hover
→ [`Tooltip`](components/tooltip.md) — wraps any element, 4 sides

### Validation feedback
→ [`ValidationList` / `ValidationItem`](components/validation-list.md) — live pass/fail rule list (password requirements, etc.)

### Persistent inline status messages
→ [`Banner`](components/banner.md) — info/success/warning/danger callout with optional title, body, and action button

### Media galleries
→ [`ImageCarousel`](components/image-carousel.md) — main image + thumbnail strip, autoplay, prev/next navigation

### Notifications
→ [`Toaster`](components/toast.md) — mount once; call `toast()` from anywhere

### Page structure
→ [`Card`](components/card.md) — white bordered box with optional header/content/footer sections
→ [`Sidebar`](components/sidebar.md) — collapsible side nav with icon-rail mode, expandable groups (`SidebarGroup`), and a mobile slide-in drawer; use `SidebarTrigger` in a top bar for mobile
→ [`Header`](components/header.md) — top bar layout primitive
→ [`Breadcrumb`](components/breadcrumb.md) — navigation trail, collapsible with `maxItems`, custom separator
→ [`Tabs`](components/tabs.md) — tabbed panels, `line` (underline) or `pill` variant

---

### Managing light/dark theme
→ [`ThemeProvider / useTheme`](components/theme.md) — wrap app once; call `useTheme()` to read or toggle

### Accessible mode (larger text, bigger tap targets)
→ [`AccessibleModeProvider / useAccessibleMode`](components/accessible-mode.md) — wrap app once; call `useAccessibleMode()` to read or toggle; CSS handles all scaling automatically

---

## Global rules

- Never hardcode hex values → [`tokens.md`](tokens.md)
- Form fields always render `label`, `error`, and `hint` via the component prop — don't build your own wrapper
- All form components are controlled/uncontrolled — pass `value` + `onChange` to control, omit both for uncontrolled
- See [`patterns.md`](patterns.md) for common compositions: form layout, table + pagination, confirmation modal
