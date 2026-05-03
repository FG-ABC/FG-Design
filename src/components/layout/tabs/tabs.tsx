"use client";
import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const tabsListVariants = cva("flex", {
  variants: {
    variant: {
      line: [
        "border-b border-[var(--color-border)]",
        "gap-0",
      ],
      pill: [
        "bg-[var(--color-surface)] rounded-[var(--radius-md)] p-1 gap-1",
      ],
    },
  },
  defaultVariants: { variant: "line" },
});

const tabsTriggerVariants = cva(
  [
    "inline-flex items-center gap-1.5 text-sm font-medium leading-none",
    "transition-colors duration-[var(--duration-fast)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-500)] focus-visible:ring-offset-1",
    "disabled:pointer-events-none disabled:opacity-40",
  ],
  {
    variants: {
      variant: {
        line: [
          "px-3 pb-2.5 pt-0.5 -mb-px border-b-2 border-transparent",
          "text-[var(--color-subtle)] hover:text-[var(--color-base)]",
          "data-[state=active]:border-[var(--color-accent-500)] data-[state=active]:text-[var(--color-ink)]",
        ],
        pill: [
          "px-3 py-1.5 rounded-[var(--radius-sm)]",
          "text-[var(--color-subtle)] hover:text-[var(--color-base)]",
          "data-[state=active]:bg-[var(--color-elevated)] data-[state=active]:text-[var(--color-ink)] data-[state=active]:shadow-[var(--shadow-xs)]",
        ],
      },
    },
    defaultVariants: { variant: "line" },
  }
);

export interface TabItem {
  value: string;
  label: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps
  extends Omit<React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>, "children">,
    VariantProps<typeof tabsListVariants> {
  items: TabItem[];
  listClassName?: string;
}

export const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  TabsProps
>(({ className, items, variant, listClassName, ...props }, ref) => (
  <TabsPrimitive.Root ref={ref} className={cn("w-full", className)} {...props}>
    <TabsPrimitive.List className={cn(tabsListVariants({ variant }), listClassName)}>
      {items.map((item) => (
        <TabsPrimitive.Trigger
          key={item.value}
          value={item.value}
          disabled={item.disabled}
          className={tabsTriggerVariants({ variant })}
        >
          {item.label}
        </TabsPrimitive.Trigger>
      ))}
    </TabsPrimitive.List>
    {items.map((item) => (
      <TabsPrimitive.Content
        key={item.value}
        value={item.value}
        className="focus-visible:outline-none mt-4"
      >
        {item.content}
      </TabsPrimitive.Content>
    ))}
  </TabsPrimitive.Root>
));
Tabs.displayName = "Tabs";
