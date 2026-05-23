"use client";
import * as React from "react";
import {
  ChevronDown,
  PanelLeftClose,
  PanelLeftOpen,
  X,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Context ─────────────────────────────────────────────────────────────────

interface SidebarCtx {
  collapsed: boolean;
}

const SidebarContext = React.createContext<SidebarCtx>({ collapsed: false });

function useSidebar() {
  return React.useContext(SidebarContext);
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  width?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  (
    {
      className,
      collapsed = false,
      onCollapsedChange,
      open = false,
      onOpenChange,
      width = "240px",
      header,
      footer,
      children,
      ...props
    },
    ref,
  ) => {
    const ctx = React.useMemo<SidebarCtx>(() => ({ collapsed }), [collapsed]);

    return (
      <>
        {/* Desktop static sidebar */}
        <SidebarContext.Provider value={ctx}>
          <aside
            ref={ref}
            style={{ width: collapsed ? "56px" : width }}
            className={cn(
              "flex flex-col h-full border-r border-[var(--color-border)]",
              "bg-[var(--color-surface)]",
              "transition-all duration-[var(--duration-slow)] ease-[var(--ease-out)]",
              "overflow-hidden",
              "hidden md:flex",
              className,
            )}
            {...props}
          >
            {header && (
              <div className="shrink-0 border-b border-[var(--color-border)]">
                {header}
              </div>
            )}

            {/* Plain div avoids Radix ScrollArea's inner display:table wrapper which breaks w-full in the collapsed 56px rail */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden">
              {children}
            </div>

            {footer && (
              <div className="shrink-0 border-t border-[var(--color-border)]">
                {footer}
              </div>
            )}

            {onCollapsedChange && (
              <button
                onClick={() => onCollapsedChange(!collapsed)}
                className={cn(
                  "flex items-center justify-center h-10 w-full shrink-0",
                  "border-t border-[var(--color-border)]",
                  "text-[var(--color-subtle)] hover:text-[var(--color-base)]",
                  "hover:bg-[var(--color-overlay)]",
                  "transition-colors duration-[var(--duration-fast)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-500)]",
                )}
                aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {collapsed ? (
                  <PanelLeftOpen className="h-4 w-4" />
                ) : (
                  <PanelLeftClose className="h-4 w-4" />
                )}
              </button>
            )}
          </aside>
        </SidebarContext.Provider>

        {/* Mobile drawer */}
        {onOpenChange && (
          <>
            <div
              onClick={() => onOpenChange(false)}
              className={cn(
                "fixed inset-0 bg-[var(--color-ink)]/40 md:hidden",
                "transition-opacity duration-[var(--duration-slow)]",
                "z-[var(--z-overlay)]",
                open
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none",
              )}
              aria-hidden
            />

            <SidebarContext.Provider value={{ collapsed: false }}>
              <aside
                style={{ width }}
                className={cn(
                  "fixed top-0 left-0 h-full flex flex-col md:hidden",
                  "bg-[var(--color-surface)] border-r border-[var(--color-border)]",
                  "transition-transform duration-[var(--duration-slow)] ease-[var(--ease-out)]",
                  "z-[var(--z-modal)]",
                  open ? "translate-x-0" : "-translate-x-full",
                )}
              >
                <div className="flex items-center justify-end px-3 h-12 shrink-0 border-b border-[var(--color-border)]">
                  <button
                    onClick={() => onOpenChange(false)}
                    className={cn(
                      "flex items-center justify-center h-8 w-8 rounded-[var(--radius-md)]",
                      "text-[var(--color-subtle)] hover:text-[var(--color-base)]",
                      "hover:bg-[var(--color-overlay)]",
                      "transition-colors duration-[var(--duration-fast)]",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-500)]",
                    )}
                    aria-label="Close sidebar"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {header && (
                  <div className="shrink-0 border-b border-[var(--color-border)]">
                    {header}
                  </div>
                )}

                <div className="flex-1 overflow-y-auto overflow-x-hidden">
                  {children}
                </div>

                {footer && (
                  <div className="shrink-0 border-t border-[var(--color-border)]">
                    {footer}
                  </div>
                )}
              </aside>
            </SidebarContext.Provider>
          </>
        )}
      </>
    );
  },
);
Sidebar.displayName = "Sidebar";

// ─── SidebarTrigger ───────────────────────────────────────────────────────────

export interface SidebarTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const SidebarTrigger = React.forwardRef<
  HTMLButtonElement,
  SidebarTriggerProps
>(({ className, open, onOpenChange, onClick, ...props }, ref) => (
  <button
    ref={ref}
    onClick={(e) => {
      onOpenChange?.(!open);
      onClick?.(e);
    }}
    className={cn(
      "flex items-center justify-center h-9 w-9 rounded-[var(--radius-md)]",
      "text-[var(--color-subtle)] hover:text-[var(--color-base)]",
      "hover:bg-[var(--color-overlay)]",
      "transition-colors duration-[var(--duration-fast)]",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-500)]",
      className,
    )}
    aria-label={open ? "Close sidebar" : "Open sidebar"}
    {...props}
  >
    <Menu className="h-5 w-5" />
  </button>
));
SidebarTrigger.displayName = "SidebarTrigger";

// ─── SidebarSection ───────────────────────────────────────────────────────────

export const SidebarSection = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { collapsed } = useSidebar();
  return (
    <div
      ref={ref}
      className={cn(collapsed ? "px-0 py-3" : "px-2 py-3", className)}
      {...props}
    />
  );
});
SidebarSection.displayName = "SidebarSection";

// ─── SidebarLabel ─────────────────────────────────────────────────────────────

export const SidebarLabel = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { collapsed } = useSidebar();
  return (
    <p
      ref={ref}
      className={cn(
        "px-2 mb-1 text-xs font-medium text-[var(--color-ink)] uppercase tracking-wide",
        "overflow-hidden whitespace-nowrap transition-all duration-[var(--duration-fast)]",
        collapsed ? "opacity-0 h-0 mb-0" : "opacity-100",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
});
SidebarLabel.displayName = "SidebarLabel";

// ─── SidebarItem ──────────────────────────────────────────────────────────────

export interface SidebarItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  icon?: React.ReactNode;
}

export const SidebarItem = React.forwardRef<
  HTMLButtonElement,
  SidebarItemProps
>(({ className, active, icon, children, ...props }, ref) => {
  const { collapsed } = useSidebar();
  return (
    <button
      ref={ref}
      className={cn(
        "flex items-center py-1.5 rounded-[var(--radius-md)]",
        "text-sm text-[var(--color-base)] font-medium",
        "transition-colors duration-[var(--duration-fast)]",
        "hover:bg-[var(--color-overlay)] focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-[var(--color-accent-500)]",
        collapsed ? "w-full justify-center px-0 gap-0" : "w-full px-2 gap-2.5",
        active &&
          "bg-[var(--color-elevated)] text-[var(--color-ink)] shadow-[var(--shadow-xs)]",
        className,
      )}
      {...props}
    >
      {icon && (
        <span className="h-4 w-4 shrink-0 flex items-center justify-center">
          {icon}
        </span>
      )}
      {!collapsed && children && <span className="truncate">{children}</span>}
    </button>
  );
});
SidebarItem.displayName = "SidebarItem";

// ─── SidebarGroup ─────────────────────────────────────────────────────────────

export interface SidebarGroupProps {
  icon?: React.ReactNode;
  label: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const SidebarGroup = React.forwardRef<HTMLDivElement, SidebarGroupProps>(
  ({ icon, label, defaultOpen = false, children, className }, ref) => {
    const { collapsed } = useSidebar();
    const [open, setOpen] = React.useState(defaultOpen);

    const prevCollapsed = React.useRef(collapsed);
    React.useEffect(() => {
      if (collapsed && !prevCollapsed.current) setOpen(false);
      prevCollapsed.current = collapsed;
    }, [collapsed]);

    return (
      <div ref={ref} className={cn("w-full", className)}>
        <button
          onClick={() => !collapsed && setOpen((o) => !o)}
          className={cn(
            "flex items-center py-1.5 rounded-[var(--radius-md)]",
            "text-sm text-[var(--color-base)] font-medium",
            "transition-colors duration-[var(--duration-fast)]",
            "hover:bg-[var(--color-overlay)] focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-[var(--color-accent-500)]",
            collapsed
              ? "w-full justify-center px-0 gap-0 cursor-default"
              : "w-full px-2 gap-2.5",
          )}
          aria-expanded={open}
          aria-label={label}
        >
          {icon && (
            <span className="h-4 w-4 shrink-0 flex items-center justify-center">
              {icon}
            </span>
          )}
          {!collapsed && (
            <>
              <span className="flex-1 truncate text-left">{label}</span>
              <span
                className="h-4 w-4 shrink-0 flex items-center justify-center text-[var(--color-subtle)] transition-transform duration-[var(--duration-fast)]"
                style={{ transform: open ? "rotate(0deg)" : "rotate(-90deg)" }}
              >
                <ChevronDown className="h-3.5 w-3.5" />
              </span>
            </>
          )}
        </button>

        {!collapsed && (
          <div
            className={cn(
              "overflow-hidden transition-all duration-[var(--duration-slow)] ease-[var(--ease-out)]",
              open ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
            )}
          >
            <div className="pl-3 mt-0.5 border-l border-[var(--color-border)] ml-3.5">
              {children}
            </div>
          </div>
        )}
      </div>
    );
  },
);
SidebarGroup.displayName = "SidebarGroup";
