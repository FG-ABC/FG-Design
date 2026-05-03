# ThemeProvider / useTheme

Manages light/dark/system theme. Sets `data-theme` on `<html>`, persists to `localStorage`, and listens to `prefers-color-scheme` when set to `"system"`.

## Minimal example

```tsx
// app entry
import { ThemeProvider } from "@fg-abc/ui";

export function App() {
  return (
    <ThemeProvider defaultTheme="system">
      {/* rest of app */}
    </ThemeProvider>
  );
}

// anywhere in the tree
import { useTheme } from "@fg-abc/ui";

function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  return (
    <button onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
      {resolvedTheme === "dark" ? "Light mode" : "Dark mode"}
    </button>
  );
}
```

## Props — ThemeProvider

| Prop | Type | Default | Description |
|---|---|---|---|
| `defaultTheme` | `"light" \| "dark" \| "system"` | `"system"` | Initial theme if nothing in localStorage |
| `storageKey` | `string` | `"fgd-ui-theme"` | localStorage key |
| `children` | `ReactNode` | — | Required |

## useTheme return value

| Field | Type | Description |
|---|---|---|
| `theme` | `"light" \| "dark" \| "system"` | The stored preference |
| `resolvedTheme` | `"light" \| "dark"` | Actual applied theme (system resolved) |
| `setTheme` | `(theme: Theme) => void` | Update preference + localStorage |

## Notes

- Mount `ThemeProvider` once at the app root, outside any router.
- `useTheme` throws if called outside `ThemeProvider`.
- Dark mode tokens are defined in `tokens.css` under `[data-theme="dark"]` — no component-level changes needed.
