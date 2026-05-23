"use client";
import * as React from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ValidationItemProps extends React.HTMLAttributes<HTMLLIElement> {
  valid: boolean;
  children: React.ReactNode;
}

export const ValidationItem = React.forwardRef<HTMLLIElement, ValidationItemProps>(
  ({ valid, children, className, ...props }, ref) => (
    <li
      ref={ref}
      className={cn(
        "flex items-center gap-1.5 text-xs transition-colors duration-[var(--duration-fast)]",
        valid ? "text-[var(--color-success)]" : "text-[var(--color-ink)]",
        className
      )}
      {...props}
    >
      {valid ? (
        <Check className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      ) : (
        <X className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      )}
      <span>{children}</span>
    </li>
  )
);

ValidationItem.displayName = "ValidationItem";

export interface ValidationListProps extends React.HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode;
}

export const ValidationList = React.forwardRef<HTMLUListElement, ValidationListProps>(
  ({ children, className, ...props }, ref) => (
    <ul
      ref={ref}
      className={cn("flex flex-col gap-1", className)}
      aria-label="Validation rules"
      {...props}
    >
      {children}
    </ul>
  )
);

ValidationList.displayName = "ValidationList";
