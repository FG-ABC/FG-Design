"use client";
import * as React from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { cn } from "@/lib/utils";

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  collapsed?: boolean;
  width?: string;
}

export const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  ({ className, collapsed = false, width = "240px", children, ...props }, ref) => (
    <aside
      ref={ref}
      style={{ width: collapsed ? "56px" : width }}
      className={cn(
        "flex flex-col h-full border-r border-[var(--color-border)]",
        "bg-[var(--color-surface)]",
        "transition-all duration-[var(--duration-slow)]",
        "overflow-hidden",
        className
      )}
      {...props}
    >
      <ScrollArea.Root className="flex-1 overflow-hidden">
        <ScrollArea.Viewport className="h-full w-full">
          {children}
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          orientation="vertical"
          className="flex touch-none select-none p-0.5 transition-colors ease-out w-2 border-l border-l-transparent"
        >
          <ScrollArea.Thumb className="relative flex-1 rounded-[var(--radius-full)] bg-[var(--color-border)]" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </aside>
  )
);

Sidebar.displayName = "Sidebar";

export const SidebarSection = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("px-2 py-3", className)} {...props} />
  )
);
SidebarSection.displayName = "SidebarSection";

export const SidebarLabel = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("px-2 mb-1 text-xs font-medium text-[var(--color-subtle)] uppercase tracking-wide", className)}
      {...props}
    />
  )
);
SidebarLabel.displayName = "SidebarLabel";

export const SidebarItem = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }
>(({ className, active, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "w-full flex items-center gap-2.5 px-2 py-1.5 rounded-[var(--radius-md)]",
      "text-sm text-[var(--color-base)] font-medium",
      "transition-colors duration-[var(--duration-fast)]",
      "hover:bg-[var(--color-overlay)] focus-visible:outline-none focus-visible:ring-2",
      "focus-visible:ring-[var(--color-accent-500)]",
      active && "bg-[var(--color-elevated)] text-[var(--color-ink)] shadow-[var(--shadow-xs)]",
      className
    )}
    {...props}
  />
));
SidebarItem.displayName = "SidebarItem";
