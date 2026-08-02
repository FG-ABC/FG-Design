# Card

White bordered container. The primary surface for grouping content.

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "fg-design";

// Basic
<Card>
  <p>Simple content</p>
</Card>

// With header and content (no dividers)
<Card>
  <CardHeader>
    <CardTitle>Team settings</CardTitle>
    <CardDescription>Manage your team members and permissions.</CardDescription>
  </CardHeader>
  <CardContent>
    <Input label="Team name" />
  </CardContent>
  <CardFooter className="justify-end gap-2">
    <Button variant="outline">Cancel</Button>
    <Button>Save</Button>
  </CardFooter>
</Card>

// With dividers between header, content, and footer
<Card>
  <CardHeader border>
    <CardTitle>Team settings</CardTitle>
    <CardDescription>Manage your team members and permissions.</CardDescription>
  </CardHeader>
  <CardContent>
    <Input label="Team name" />
  </CardContent>
  <CardFooter border className="justify-end gap-2">
    <Button variant="outline">Cancel</Button>
    <Button>Save</Button>
  </CardFooter>
</Card>

// No padding (for tables, images that need to bleed to edge)
<Card padding="none">
  <DataGrid columns={columns} rows={rows} rowKey={(r) => r.id} />
</Card>
```

## Padding variants

| `padding`      | Value | Use for              |
| -------------- | ----- | -------------------- |
| `none`         | 0     | Tables, images, maps |
| `sm`           | 16px  | Compact cards        |
| `md` (default) | 24px  | Standard content     |
| `lg`           | 32px  | Spacious layouts     |

## Props

### `CardHeader` / `CardFooter`

| Prop     | Type      | Default | Description                                               |
| -------- | --------- | ------- | --------------------------------------------------------- |
| `border` | `boolean` | `false` | Renders a dividing line between header/footer and content |

## Notes

- Pass `border` to `CardHeader` or `CardFooter` when you want a visible separator between sections
- Always right-align footer actions with `className="justify-end"`
- Nest `DataGrid` inside `<Card padding="none">` to get the full-bleed table-in-card look
