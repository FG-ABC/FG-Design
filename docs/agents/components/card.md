# Card

White bordered container. The primary surface for grouping content.

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@fg-abc/ui";

// Basic
<Card>
  <p>Simple content</p>
</Card>

// With header and content
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

// No padding (for tables, images that need to bleed to edge)
<Card padding="none">
  <DataGrid columns={columns} rows={rows} rowKey={(r) => r.id} />
</Card>
```

## Padding variants
| `padding` | Value | Use for |
|---|---|---|
| `none` | 0 | Tables, images, maps |
| `sm` | 16px | Compact cards |
| `md` (default) | 24px | Standard content |
| `lg` | 32px | Spacious layouts |

## Notes
- `CardHeader` has a bottom border — use it when the card has a clear header/body split
- `CardFooter` has a top border — always right-align actions with `className="justify-end"`
- Nest `DataGrid` inside `<Card padding="none">` to get the full-bleed table-in-card look
