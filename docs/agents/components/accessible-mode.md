# AccessibleModeProvider / useAccessibleMode

Manages an accessible mode for users who benefit from larger text, taller inputs, and more generous spacing — particularly older users. Sets `data-accessible-mode` on `<html>`, persists to `localStorage`.

## Minimal example

```tsx
// app entry
import { AccessibleModeProvider } from "fg-design";

export function App() {
  return <AccessibleModeProvider>{/* rest of app */}</AccessibleModeProvider>;
}

// anywhere in the tree
import { useAccessibleMode } from "fg-design";

function AccessibleModeToggle() {
  const { accessibleMode, setAccessibleMode } = useAccessibleMode();
  return (
    <button onClick={() => setAccessibleMode(!accessibleMode)}>
      {accessibleMode ? "Standard view" : "Accessible view"}
    </button>
  );
}
```

## Props — AccessibleModeProvider

| Prop           | Type        | Default                    | Description                              |
| -------------- | ----------- | -------------------------- | ---------------------------------------- |
| `defaultValue` | `boolean`   | `false`                    | Initial value if nothing in localStorage |
| `storageKey`   | `string`    | `"fgd-ui-accessible-mode"` | localStorage key                         |
| `children`     | `ReactNode` | —                          | Required                                 |

## useAccessibleMode return value

| Field               | Type                       | Description                       |
| ------------------- | -------------------------- | --------------------------------- |
| `accessibleMode`    | `boolean`                  | Whether accessible mode is active |
| `setAccessibleMode` | `(value: boolean) => void` | Toggle + persists to localStorage |

## How it works

When `accessibleMode` is `true`, `data-accessible-mode="true"` is set on `<html>`. This triggers CSS token overrides in `tokens.css` that:

- Increase `font-size` on `html` to `1.25rem` — scales **all** rem-based values globally, including Tailwind utilities (`text-sm`, spacing, etc.)
- Override `--height-input`, `--height-input-sm`, `--height-input-lg` for taller tap targets
- Slightly increase border radii (`--radius-*`) for chunkier feel
- Scale all `--text-*` token values up proportionally

No per-component changes are needed — the CSS cascade handles everything.

## Notes

- Mount `AccessibleModeProvider` once at the app root, outside any router.
- `useAccessibleMode` throws if called outside `AccessibleModeProvider`.
- The library owns _what changes_ visually. The app owns the toggle UI and where/how the preference is surfaced (settings page, onboarding, etc.).
- Compose with `ThemeProvider` — the two are independent and can be nested in either order.

```tsx
<ThemeProvider defaultTheme="system">
  <AccessibleModeProvider>
    <App />
  </AccessibleModeProvider>
</ThemeProvider>
```
