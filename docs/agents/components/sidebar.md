# Sidebar

Collapsible side navigation with icon-rail mode, expandable groups, and a mobile drawer.

## Minimal working example

```tsx
import {
  Sidebar,
  SidebarTrigger,
  SidebarSection,
  SidebarLabel,
  SidebarItem,
  SidebarGroup,
} from "fg-design";
import { LayoutDashboard, Users, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const pathname = usePathname();
const [collapsed, setCollapsed] = React.useState(false);
const [mobileOpen, setMobileOpen] = React.useState(false);

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
      {/* Navigation items: use Link directly, not <Link><SidebarItem> — see Decision rules */}
      <Link href="/dashboard">
        <SidebarItem
          icon={<LayoutDashboard className="h-4 w-4" />}
          active={pathname.startsWith("/dashboard")}
        >
          Dashboard
        </SidebarItem>
      </Link>
      <SidebarGroup
        icon={<Users className="h-4 w-4" />}
        label="Team"
        defaultOpen
      >
        <Link href="/team/members">
          <SidebarItem
            icon={<Users className="h-4 w-4" />}
            active={pathname.startsWith("/team/members")}
          >
            Members
          </SidebarItem>
        </Link>
      </SidebarGroup>
      <SidebarItem
        icon={<Settings className="h-4 w-4" />}
        onClick={handleSettings}
      >
        Settings
      </SidebarItem>
    </SidebarSection>
  </Sidebar>

  <main className="flex-1 overflow-auto p-6">{children}</main>
</div>;
```

## header / footer slots

Pass `header` and `footer` props to `<Sidebar>` for workspace switchers and user profiles. These sit outside the scroll area and receive the border treatment automatically.

```tsx
function WorkspaceHeader({ collapsed }: { collapsed: boolean }) {
  return (
    <div
      className={`flex h-14 items-center gap-2.5 px-3 ${collapsed ? "justify-center" : ""}`}
    >
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--color-accent-500)]">
        <span className="text-xs font-bold text-white">A</span>
      </div>
      {!collapsed && (
        <>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-[var(--color-ink)]">
              Acme Inc.
            </p>
            <p className="truncate text-xs text-[var(--color-subtle)]">
              Free plan
            </p>
          </div>
          <ChevronDown className="h-3.5 w-3.5 shrink-0 text-[var(--color-subtle)]" />
        </>
      )}
    </div>
  );
}

function UserFooter({ collapsed }: { collapsed: boolean }) {
  return (
    <div
      className={`flex h-14 items-center gap-2.5 px-3 ${collapsed ? "justify-center" : ""}`}
    >
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[var(--radius-full)] bg-[var(--color-accent-100)]">
        <span className="text-xs font-semibold text-[var(--color-accent-700)]">
          FG
        </span>
      </div>
      {!collapsed && (
        <>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-[var(--color-ink)]">
              Francis Glenn
            </p>
            <p className="truncate text-xs text-[var(--color-subtle)]">
              fg@oboda.ai
            </p>
          </div>
          <button
            className="text-[var(--color-subtle)] hover:text-[var(--color-ink)]"
            aria-label="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </>
      )}
    </div>
  );
}

<Sidebar
  collapsed={collapsed}
  onCollapsedChange={setCollapsed}
  header={<WorkspaceHeader collapsed={collapsed} />}
  footer={<UserFooter collapsed={collapsed} />}
>
  ...
</Sidebar>;
```

## Props — Sidebar

| Prop                | Type                   | Default   | Description                                               |
| ------------------- | ---------------------- | --------- | --------------------------------------------------------- |
| `collapsed`         | `boolean`              | `false`   | Desktop icon-rail state                                   |
| `onCollapsedChange` | `(v: boolean) => void` | —         | Renders collapse toggle button at bottom when provided    |
| `open`              | `boolean`              | `false`   | Mobile drawer open state                                  |
| `onOpenChange`      | `(v: boolean) => void` | —         | Enables the mobile drawer when provided                   |
| `width`             | `string`               | `"240px"` | Expanded width                                            |
| `header`            | `ReactNode`            | —         | Pinned above scroll area, receives border-b automatically |
| `footer`            | `ReactNode`            | —         | Pinned below scroll area, receives border-t automatically |

## Props — SidebarItem

| Prop      | Type        | Default | Description                                                                       |
| --------- | ----------- | ------- | --------------------------------------------------------------------------------- |
| `icon`    | `ReactNode` | —       | Required — only visible content in collapsed/rail mode                            |
| `active`  | `boolean`   | `false` | Applies accent-50 bg, accent-700 text, accent-500 icon, and dot indicator         |
| `tooltip` | `string`    | —       | Override tooltip text in collapsed mode (defaults to `children` if it's a string) |

## Props — SidebarGroup

| Prop          | Type        | Default  |
| ------------- | ----------- | -------- |
| `label`       | `string`    | required |
| `icon`        | `ReactNode` | —        |
| `defaultOpen` | `boolean`   | `false`  |

## Props — SidebarTrigger

| Prop           | Type                   | Default |
| -------------- | ---------------------- | ------- |
| `open`         | `boolean`              | —       |
| `onOpenChange` | `(v: boolean) => void` | —       |

## Decision rules

- **Navigation items:** wrap `SidebarItem` with `<Link>` for routing. Do NOT do `<Link><SidebarItem>` with a `<button>` inside — `<a><button>` is invalid HTML and browsers will break the layout. Instead wrap the outer `<div>` that `SidebarItem` renders, which is valid. The active dot and tooltip both work correctly this way.
- Always pass an `icon` to `SidebarItem` — it's the only thing visible in collapsed/rail mode.
- Pass both `collapsed`/`onCollapsedChange` AND `open`/`onOpenChange` together for a full responsive layout. Omit the mobile props if the sidebar is desktop-only.
- `SidebarGroup` auto-closes when the desktop sidebar collapses to icon-rail.
- Place `SidebarTrigger` in a slim top bar (≈48px) that's only shown on mobile (`md:hidden`).
- Pass `collapsed` down to `header`/`footer` slot components so they can adapt their layout for icon-rail mode.
