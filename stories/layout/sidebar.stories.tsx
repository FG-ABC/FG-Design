import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  Sidebar,
  SidebarTrigger,
  SidebarSection,
  SidebarLabel,
  SidebarItem,
  SidebarGroup,
} from "@/components/layout/sidebar";
import {
  LayoutDashboard,
  Users,
  Settings,
  FileText,
  BarChart2,
  ShieldCheck,
  Bell,
  CreditCard,
  Folder,
  FolderOpen,
  Inbox,
  HelpCircle,
  LogOut,
  Building2,
  ChevronDown,
} from "lucide-react";

const meta: Meta = {
  title: "Layout/Sidebar",
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj;

// ─── Shared nav items ─────────────────────────────────────────────────────────

function NavContent({ active }: { active: string }) {
  return (
    <>
      <SidebarSection>
        <SidebarItem icon={<LayoutDashboard className="h-4 w-4" />} active={active === "dashboard"}>
          Dashboard
        </SidebarItem>
        <SidebarItem icon={<Inbox className="h-4 w-4" />} active={active === "inbox"}>
          Inbox
        </SidebarItem>
      </SidebarSection>

      <SidebarSection>
        <SidebarLabel>Workspace</SidebarLabel>
        <SidebarGroup icon={<Users className="h-4 w-4" />} label="Team" defaultOpen>
          <SidebarItem icon={<Users className="h-4 w-4" />} active={active === "members"}>
            Members
          </SidebarItem>
          <SidebarItem icon={<ShieldCheck className="h-4 w-4" />} active={active === "roles"}>
            Roles & Permissions
          </SidebarItem>
        </SidebarGroup>
        <SidebarGroup icon={<Folder className="h-4 w-4" />} label="Projects">
          <SidebarItem icon={<FolderOpen className="h-4 w-4" />} active={active === "all-projects"}>
            All Projects
          </SidebarItem>
          <SidebarItem icon={<FileText className="h-4 w-4" />} active={active === "reports"}>
            Reports
          </SidebarItem>
        </SidebarGroup>
        <SidebarItem icon={<BarChart2 className="h-4 w-4" />} active={active === "analytics"}>
          Analytics
        </SidebarItem>
      </SidebarSection>

      <SidebarSection>
        <SidebarLabel>Account</SidebarLabel>
        <SidebarGroup icon={<Settings className="h-4 w-4" />} label="Settings">
          <SidebarItem icon={<Bell className="h-4 w-4" />} active={active === "notifications"}>
            Notifications
          </SidebarItem>
          <SidebarItem icon={<CreditCard className="h-4 w-4" />} active={active === "billing"}>
            Billing
          </SidebarItem>
        </SidebarGroup>
        <SidebarItem icon={<HelpCircle className="h-4 w-4" />}>Help</SidebarItem>
      </SidebarSection>
    </>
  );
}

// Workspace switcher — shown in the header slot
function WorkspaceHeader({ collapsed }: { collapsed: boolean }) {
  return (
    <div className={`flex items-center gap-2.5 px-3 h-14 ${collapsed ? "justify-center" : ""}`}>
      <div className="h-7 w-7 rounded-[var(--radius-sm)] bg-[var(--color-accent-500)] flex items-center justify-center shrink-0">
        <Building2 className="h-4 w-4 text-white" />
      </div>
      {!collapsed && (
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-[var(--color-ink)] truncate">Acme Inc.</p>
          <p className="text-xs text-[var(--color-subtle)] truncate">Free plan</p>
        </div>
      )}
      {!collapsed && <ChevronDown className="h-3.5 w-3.5 text-[var(--color-subtle)] shrink-0" />}
    </div>
  );
}

// User profile — shown in the footer slot
function UserFooter({ collapsed }: { collapsed: boolean }) {
  return (
    <div className={`flex items-center gap-2.5 px-3 h-14 ${collapsed ? "justify-center" : ""}`}>
      <div className="h-7 w-7 rounded-[var(--radius-full)] bg-[var(--color-accent-100)] flex items-center justify-center shrink-0">
        <span className="text-xs font-semibold text-[var(--color-accent-700)]">FG</span>
      </div>
      {!collapsed && (
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-[var(--color-ink)] truncate">Francis Glenn</p>
          <p className="text-xs text-[var(--color-subtle)] truncate">fg@oboda.ai</p>
        </div>
      )}
      {!collapsed && (
        <button
          className="text-[var(--color-subtle)] hover:text-[var(--color-base)] transition-colors duration-[var(--duration-fast)]"
          aria-label="Sign out"
        >
          <LogOut className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

// ─── Desktop collapsible ──────────────────────────────────────────────────────

export const Desktop: Story = {
  render: () => {
    const [collapsed, setCollapsed] = React.useState(false);

    return (
      <div className="flex h-screen bg-[var(--color-canvas)]">
        <Sidebar
          collapsed={collapsed}
          onCollapsedChange={setCollapsed}
          header={<WorkspaceHeader collapsed={collapsed} />}
          footer={<UserFooter collapsed={collapsed} />}
        >
          <NavContent active="dashboard" />
        </Sidebar>
        <main className="flex-1 overflow-auto p-8">
          <p className="text-sm text-[var(--color-subtle)]">
            Use the collapse toggle at the bottom of the sidebar to switch between full and icon-rail modes.
          </p>
        </main>
      </div>
    );
  },
};

// ─── Icon rail (starts collapsed) ─────────────────────────────────────────────

export const IconRail: Story = {
  render: () => {
    const [collapsed, setCollapsed] = React.useState(true);

    return (
      <div className="flex h-screen bg-[var(--color-canvas)]">
        <Sidebar
          collapsed={collapsed}
          onCollapsedChange={setCollapsed}
          header={<WorkspaceHeader collapsed={collapsed} />}
          footer={<UserFooter collapsed={collapsed} />}
        >
          <NavContent active="dashboard" />
        </Sidebar>
        <main className="flex-1 overflow-auto p-8">
          <p className="text-sm text-[var(--color-subtle)]">Sidebar starts collapsed. Click the expand button to open.</p>
        </main>
      </div>
    );
  },
};

// ─── Mobile drawer ────────────────────────────────────────────────────────────

export const MobileDrawer: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <div className="flex flex-col h-screen bg-[var(--color-canvas)]">
        <header className="flex items-center gap-3 px-4 h-12 border-b border-[var(--color-border)] bg-[var(--color-surface)] shrink-0 md:hidden">
          <SidebarTrigger open={open} onOpenChange={setOpen} />
          <span className="text-sm font-semibold text-[var(--color-ink)]">Acme Inc.</span>
        </header>

        <Sidebar
          open={open}
          onOpenChange={setOpen}
          header={<WorkspaceHeader collapsed={false} />}
          footer={<UserFooter collapsed={false} />}
        >
          <NavContent active="dashboard" />
        </Sidebar>

        <main className="flex-1 overflow-auto p-6">
          <p className="text-sm text-[var(--color-subtle)]">Tap the burger button in the top bar to open the drawer.</p>
        </main>
      </div>
    );
  },
};

// ─── Resizable ────────────────────────────────────────────────────────────────

export const Resizable: Story = {
  render: () => {
    const [collapsed, setCollapsed] = React.useState(false);

    return (
      <div className="flex h-screen bg-[var(--color-canvas)]">
        <Sidebar
          resizable
          defaultWidth={240}
          storageKey="story-sidebar-width"
          collapsed={collapsed}
          onCollapsedChange={setCollapsed}
          header={<WorkspaceHeader collapsed={collapsed} />}
          footer={<UserFooter collapsed={collapsed} />}
        >
          <NavContent active="dashboard" />
        </Sidebar>
        <main className="flex-1 overflow-auto p-8">
          <p className="text-sm text-[var(--color-subtle)]">
            Drag the right edge of the sidebar to resize it (180px – 400px). Width is persisted to localStorage.
          </p>
        </main>
      </div>
    );
  },
};

// ─── Full layout (desktop + mobile together) ──────────────────────────────────

export const FullLayout: Story = {
  render: () => {
    const [collapsed, setCollapsed] = React.useState(false);
    const [mobileOpen, setMobileOpen] = React.useState(false);

    return (
      <div className="flex flex-col md:flex-row h-screen bg-[var(--color-canvas)]">
        <header className="flex items-center gap-3 px-4 h-12 border-b border-[var(--color-border)] bg-[var(--color-surface)] shrink-0 md:hidden">
          <SidebarTrigger open={mobileOpen} onOpenChange={setMobileOpen} />
          <span className="text-sm font-semibold text-[var(--color-ink)]">Acme Inc.</span>
        </header>

        <Sidebar
          collapsed={collapsed}
          onCollapsedChange={setCollapsed}
          open={mobileOpen}
          onOpenChange={setMobileOpen}
          header={<WorkspaceHeader collapsed={collapsed} />}
          footer={<UserFooter collapsed={collapsed} />}
        >
          <NavContent active="members" />
        </Sidebar>

        <main className="flex-1 overflow-auto p-8">
          <p className="text-sm text-[var(--color-subtle)]">
            Resize the window to see the sidebar adapt. On desktop, use the collapse toggle at the bottom.
          </p>
        </main>
      </div>
    );
  },
};
