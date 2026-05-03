# Sidebar

Collapsible side navigation.

```tsx
import { Sidebar, SidebarSection, SidebarLabel, SidebarItem } from "@fg-abc/ui";
import { LayoutDashboard, Users, Settings } from "lucide-react";

const [collapsed, setCollapsed] = React.useState(false);

<Sidebar collapsed={collapsed}>
  <SidebarSection>
    <SidebarLabel>Main</SidebarLabel>
    <SidebarItem active onClick={() => navigate("/")}>
      <LayoutDashboard className="h-4 w-4 shrink-0" />
      {!collapsed && "Dashboard"}
    </SidebarItem>
    <SidebarItem onClick={() => navigate("/users")}>
      <Users className="h-4 w-4 shrink-0" />
      {!collapsed && "Users"}
    </SidebarItem>
  </SidebarSection>

  <SidebarSection>
    <SidebarLabel>{!collapsed && "System"}</SidebarLabel>
    <SidebarItem onClick={() => navigate("/settings")}>
      <Settings className="h-4 w-4 shrink-0" />
      {!collapsed && "Settings"}
    </SidebarItem>
  </SidebarSection>
</Sidebar>
```

## Full layout pattern

```tsx
<div className="flex h-screen">
  <Sidebar collapsed={collapsed}>
    {/* nav items */}
  </Sidebar>
  <main className="flex-1 overflow-auto p-6">
    {children}
  </main>
</div>
```

## Props — Sidebar
| Prop | Type | Default |
|---|---|---|
| `collapsed` | `boolean` | `false` |
| `width` | `string` | `240px` |

## Notes
- Collapsed width is `56px` — enough to show icons
- Hide labels conditionally with `{!collapsed && "Label text"}`
- `SidebarItem` is a `<button>` — use `asChild` pattern or wrap in router `<Link>` if your framework prefers it:
  ```tsx
  <SidebarItem asChild>
    <Link href="/dashboard"><LayoutDashboard className="h-4 w-4" /> Dashboard</Link>
  </SidebarItem>
  ```
- `SidebarSection` handles internal scrolling via Radix ScrollArea
