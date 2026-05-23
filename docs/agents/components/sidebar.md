# Sidebar

Collapsible side navigation with icon-rail mode, expandable groups, and a mobile drawer.

## Minimal working example

```tsx
import {
  Sidebar, SidebarTrigger,
  SidebarSection, SidebarLabel,
  SidebarItem, SidebarGroup,
} from "@fg-abc/ui";
import { LayoutDashboard, Users, Settings } from "lucide-react";

// Desktop: controlled collapse
const [collapsed, setCollapsed] = React.useState(false);
// Mobile: controlled drawer
const [mobileOpen, setMobileOpen] = React.useState(false);

// Full layout
<div className="flex flex-col md:flex-row h-screen">
  {/* Mobile-only top bar */}
  <header className="flex items-center gap-3 px-4 h-12 border-b border-[var(--color-border)] md:hidden">
    <SidebarTrigger open={mobileOpen} onOpenChange={setMobileOpen} />
    <span className="text-sm font-semibold">Acme Inc.</span>
  </header>

  <Sidebar
    collapsed={collapsed}
    onCollapsedChange={setCollapsed}
    open={mobileOpen}
    onOpenChange={setMobileOpen}
  >
    <SidebarSection>
      <SidebarLabel>Main</SidebarLabel>
      <SidebarItem icon={<LayoutDashboard className="h-4 w-4" />} active>
        Dashboard
      </SidebarItem>
      <SidebarGroup icon={<Users className="h-4 w-4" />} label="Team" defaultOpen>
        <SidebarItem icon={<Users className="h-4 w-4" />}>Members</SidebarItem>
      </SidebarGroup>
      <SidebarItem icon={<Settings className="h-4 w-4" />}>Settings</SidebarItem>
    </SidebarSection>
  </Sidebar>

  <main className="flex-1 overflow-auto p-6">{children}</main>
</div>
```

## Props — Sidebar
| Prop | Type | Default | Description |
|---|---|---|---|
| `collapsed` | `boolean` | `false` | Desktop icon-rail state |
| `onCollapsedChange` | `(v: boolean) => void` | — | Renders collapse toggle button at bottom when provided |
| `open` | `boolean` | `false` | Mobile drawer open state |
| `onOpenChange` | `(v: boolean) => void` | — | Enables the mobile drawer when provided |
| `width` | `string` | `"240px"` | Expanded width |

## Props — SidebarItem
| Prop | Type | Default |
|---|---|---|
| `icon` | `ReactNode` | — |
| `active` | `boolean` | `false` |

## Props — SidebarGroup
| Prop | Type | Default |
|---|---|---|
| `label` | `string` | required |
| `icon` | `ReactNode` | — |
| `defaultOpen` | `boolean` | `false` |

## Props — SidebarTrigger
| Prop | Type | Default |
|---|---|---|
| `open` | `boolean` | — |
| `onOpenChange` | `(v: boolean) => void` | — |

## Decision rules

- Always pass an `icon` to `SidebarItem` — it's the only thing visible in collapsed/rail mode.
- Pass both `collapsed`/`onCollapsedChange` AND `open`/`onOpenChange` together for a full responsive layout. Omit the mobile props if the sidebar is desktop-only.
- `SidebarGroup` auto-closes when the desktop sidebar collapses to icon-rail.
- Place `SidebarTrigger` in a slim top bar (≈48px) that's only shown on mobile (`md:hidden`).
