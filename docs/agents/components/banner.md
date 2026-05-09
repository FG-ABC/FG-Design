# Banner

Persistent inline status callout. Four semantic variants (info, success, warning, danger), optional title, body text, and an action button.

## Minimal example

```tsx
import { Banner } from "@fg-abc/ui";

<Banner variant="warning" title="Storage almost full">
  You've used 90% of your quota.
</Banner>
```

## With an action

```tsx
<Banner
  variant="warning"
  title="This slot is fully booked."
  action={{ label: "Join Waitlist", onClick: handleJoin, loading: isJoining }}
/>
```

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `variant` | `info \| success \| warning \| danger` | `info` | Controls color and icon |
| `title` | `string` | — | Bold heading line |
| `children` | `ReactNode` | — | Body text below the title |
| `action` | `BannerAction` | — | Optional button rendered on the right |

### BannerAction

| Prop | Type | Notes |
|---|---|---|
| `label` | `string` | Button label |
| `onClick` | `() => void` | Called on click |
| `loading` | `boolean` | Shows spinner in button, disables it |

## Decision rules

- Use `Banner` for persistent, inline contextual messages that live inside the page flow.
- Use `Toast` for transient feedback after an action (auto-dismisses).
- Use `Badge` for short inline labels on an item.
