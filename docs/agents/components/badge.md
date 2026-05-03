# Badge

Pill label for status, tags, and counts.

```tsx
import { Badge } from "@fg-abc/ui";

<Badge>Default</Badge>
<Badge variant="accent">New</Badge>
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="danger">Inactive</Badge>
<Badge variant="info">Draft</Badge>
<Badge variant="outline">Tag</Badge>
```

## With icon

```tsx
import { CheckCircle } from "lucide-react";
<Badge variant="success"><CheckCircle className="h-3 w-3" /> Verified</Badge>
```

## Variants
| `variant` | Use for |
|---|---|
| `default` | Neutral labels, tags |
| `accent` | Feature highlights, "New" |
| `success` | Active, completed, verified |
| `warning` | Pending, review needed |
| `danger` | Inactive, error, rejected |
| `info` | Draft, informational |
| `outline` | Subtle secondary tags |

## Notes
- `Badge` is a `<span>` — it renders inline
- In `DataGrid` cell renderers, wrap in `<div className="flex justify-center">` to center it in a column
- Never use raw hex for badge colors — always use a semantic variant
