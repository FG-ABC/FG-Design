# Typography

Five components covering the full text hierarchy. All use Inter Variable with design tokens — never hardcode sizes or colors.

```tsx
import { Display, Heading, Text, Caption, LinkText } from "@fgd/ui";
```

---

## Display

Hero/marketing text. Not in the document outline — purely visual scale.

```tsx
<Display size="lg">The future of design</Display>
<Display size="md">The future of design</Display>
<Display size="sm">The future of design</Display>
```

| `size` | Font size |
|---|---|
| `sm` | 2rem / 32px |
| `md` (default) | 2.75rem / 44px |
| `lg` | 3.5rem / 56px |

`as` prop overrides the rendered tag (default `p`).

---

## Heading

Document headings h1–h4. `level` controls visual size; `as` controls the DOM tag independently.

```tsx
<Heading level={1}>Account settings</Heading>
<Heading level={2}>Personal information</Heading>
<Heading level={3}>Contact details</Heading>
<Heading level={4}>Notification preferences</Heading>

// SEO/outline override — visually h1, semantically h2
<Heading level={1} as="h2">Page title</Heading>
```

| `level` | Size token | px |
|---|---|---|
| 1 (default) | `--text-3xl` | 30px |
| 2 | `--text-2xl` | 24px |
| 3 | `--text-xl` | 20px |
| 4 | `--text-lg` | 18px |

---

## Text

Body copy. Covers size, tone, weight, and mono (tabular figures).

```tsx
// Size
<Text size="lg">Large body</Text>
<Text size="base">Default body</Text>  {/* default */}
<Text size="sm">Small body</Text>
<Text size="xs">Extra small</Text>

// Tone (color)
<Text tone="ink">High emphasis</Text>
<Text tone="default">Standard body</Text>  {/* default */}
<Text tone="muted">Secondary</Text>
<Text tone="accent">Brand color</Text>
<Text tone="success">Positive</Text>
<Text tone="danger">Error/warning</Text>

// Weight
<Text weight="normal">Normal</Text>   {/* default */}
<Text weight="medium">Medium</Text>
<Text weight="semibold">Semibold</Text>

// Mono — tabular figures, JetBrains Mono
<Text mono>$84,200.00</Text>

// Inline span (use as="span" inside other Text)
<Text>
  You have <Text as="span" weight="semibold" tone="ink">3 unread</Text> messages.
</Text>

// Rendered as any tag
<Text as="li">List item</Text>
<Text as="label">Form label</Text>
```

**Note:** `color` prop is not available — use `tone` to avoid clash with the HTML `color` attribute.

---

## Caption

Smallest text level. Use for timestamps, metadata, table annotations, and helper text that lives outside form fields.

```tsx
<Caption>Last updated 2 hours ago</Caption>
<Caption tone="subtle">Secondary annotation</Caption>
<Caption tone="danger">Validation error</Caption>
<Caption tone="success">Saved successfully</Caption>
<Caption tone="accent">New</Caption>
```

Renders as `<span>` by default — safe inside block and inline contexts. Override with `as`.

| `tone` | Color token |
|---|---|
| `muted` (default) | `--color-muted` |
| `subtle` | `--color-subtle` |
| `danger` | `--color-danger` |
| `success` | `--color-success` |
| `accent` | `--color-accent-500` |

---

## LinkText

Inline link. Always reads as interactive: accent color + underline. External links auto-append an icon.

```tsx
// Internal
<LinkText href="/reports">View report</LinkText>

// External — adds ↗ icon, sets target=_blank rel=noopener
<LinkText href="https://stripe.com" external>Open in Stripe</LinkText>

// Size matches surrounding text
<Text size="sm">
  Read our <LinkText href="/terms" size="sm">terms</LinkText>.
</Text>

// With router link (asChild pattern)
<LinkText asChild>
  <Link href="/dashboard">Dashboard</Link>
</LinkText>
```

| `size` | Default |
|---|---|
| `xs` / `sm` / `base` / `lg` | `base` |

---

## Composition patterns

```tsx
// Page header
<div className="flex flex-col gap-1.5">
  <Heading level={1}>Team members</Heading>
  <Text tone="muted">Manage who has access to this workspace.</Text>
</div>

// Section with metadata
<div className="flex items-baseline justify-between">
  <Text weight="medium">Invoice #1042</Text>
  <Caption tone="subtle">Issued Jan 15, 2026</Caption>
</div>

// Number in a table cell (use mono for column alignment)
<Text mono weight="semibold" tone="ink">$12,400.00</Text>

// Inline emphasis
<Text>
  Your plan renews on{" "}
  <Text as="span" weight="semibold" tone="ink">June 1, 2026</Text>.
  {" "}<LinkText href="/billing" size="base">Manage billing</LinkText>
</Text>
```
