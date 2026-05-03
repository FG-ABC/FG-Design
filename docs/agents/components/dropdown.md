# DropdownMenu

Contextual action menu built on Radix DropdownMenu.

```tsx
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel,
  Button
} from "@fgd/ui";
```

## Basic usage

```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Actions</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuItem onClick={edit}>
      <Pencil className="h-4 w-4" /> Edit
    </DropdownMenuItem>
    <DropdownMenuItem onClick={duplicate}>
      <Copy className="h-4 w-4" /> Duplicate
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem destructive onClick={remove}>
      <Trash2 className="h-4 w-4" /> Delete
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

## With label group

```tsx
<DropdownMenuContent>
  <DropdownMenuLabel>Account</DropdownMenuLabel>
  <DropdownMenuItem>Profile</DropdownMenuItem>
  <DropdownMenuItem>Settings</DropdownMenuItem>
  <DropdownMenuSeparator />
  <DropdownMenuItem destructive>Sign out</DropdownMenuItem>
</DropdownMenuContent>
```

## With keyboard shortcut

```tsx
import { DropdownMenuShortcut } from "@fgd/ui";

<DropdownMenuItem>
  New window <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
</DropdownMenuItem>
```

## Submenu

```tsx
import { DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent } from "@fgd/ui";

<DropdownMenuSub>
  <DropdownMenuSubTrigger>More options</DropdownMenuSubTrigger>
  <DropdownMenuSubContent>
    <DropdownMenuItem>Option A</DropdownMenuItem>
    <DropdownMenuItem>Option B</DropdownMenuItem>
  </DropdownMenuSubContent>
</DropdownMenuSub>
```

## DropdownMenuItem props
| Prop | Type | Default |
|---|---|---|
| `destructive` | `boolean` | `false` — renders in danger color |
| `disabled` | `boolean` | `false` |
| `inset` | `boolean` | `false` — adds left padding for alignment |

## Notes
- `align="end"` on `DropdownMenuContent` aligns the menu to the right edge of the trigger — use for row action menus
- `DropdownMenuContent` renders in a portal — z-index is `--z-dropdown`
