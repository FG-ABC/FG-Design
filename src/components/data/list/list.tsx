"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  divided?: boolean;
  gap?: "none" | "xs" | "sm" | "md";
  emptyState?: React.ReactNode;
}

export const List = React.forwardRef<HTMLUListElement, ListProps>(
  ({ className, divided, gap = "sm", children, emptyState, ...props }, ref) => {
    const hasChildren = React.Children.count(children) > 0;

    if (!hasChildren && emptyState) {
      return (
        <div className="flex flex-col items-center justify-center py-8 text-[var(--color-ink)]">
          {emptyState}
        </div>
      );
    }

    return (
      <ul
        ref={ref}
        className={cn(
          "w-full list-none",
          !divided && gap === "none" && "gap-0",
          !divided && gap === "xs" && "flex flex-col gap-1",
          !divided && gap === "sm" && "flex flex-col gap-2",
          !divided && gap === "md" && "flex flex-col gap-4",
          divided && "divide-y divide-[var(--color-border)]",
          className
        )}
        {...props}
      >
        {children}
      </ul>
    );
  }
);
List.displayName = "List";

export const ListItem = React.forwardRef<HTMLLIElement, React.LiHTMLAttributes<HTMLLIElement>>(
  ({ className, ...props }, ref) => (
    <li
      ref={ref}
      className={cn("flex items-center gap-3 py-2", className)}
      {...props}
    />
  )
);
ListItem.displayName = "ListItem";
