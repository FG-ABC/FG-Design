"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  resize?: "none" | "vertical" | "horizontal" | "both";
  required?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, resize = "vertical", id, required, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-[var(--color-ink)] leading-none"
          >
            {label}
            {required && <span className="ml-0.5 text-[var(--color-danger)]">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          required={required}
          className={cn(
            "w-full min-h-24 rounded-[var(--radius-md)]",
            "border border-[var(--color-border)] bg-[var(--color-field)]",
            "px-3 py-2.5 text-sm text-[var(--color-ink)]",
            "placeholder:text-[var(--color-muted)]",
            "shadow-[var(--shadow-xs)]",
            "transition-all duration-[var(--duration-fast)]",
            "focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-[var(--color-accent-500)] focus-visible:ring-offset-0",
            "focus-visible:border-[var(--color-accent-500)]",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[var(--color-surface)]",
            error && "border-[var(--color-danger)] focus-visible:ring-[var(--color-danger)]",
            resize === "none" && "resize-none",
            resize === "vertical" && "resize-y",
            resize === "horizontal" && "resize-x",
            resize === "both" && "resize",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-[var(--color-danger)]">{error}</p>}
        {hint && !error && <p className="text-xs text-[var(--color-subtle)]">{hint}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
