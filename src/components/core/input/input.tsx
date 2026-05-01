import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftAdornment?: React.ReactNode;
  rightAdornment?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, leftAdornment, rightAdornment, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-[var(--color-ink)] leading-none"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftAdornment && (
            <span className="absolute left-3 flex items-center text-[var(--color-subtle)]">
              {leftAdornment}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full h-[var(--height-input)] rounded-[var(--radius-md)]",
              "border border-[var(--color-border)] bg-white",
              "px-3 text-sm text-[var(--color-ink)]",
              "placeholder:text-[var(--color-muted)]",
              "shadow-[var(--shadow-xs)]",
              "transition-all duration-[var(--duration-fast)]",
              "focus-visible:outline-none focus-visible:ring-2",
              "focus-visible:ring-[var(--color-accent-500)] focus-visible:ring-offset-0",
              "focus-visible:border-[var(--color-accent-500)]",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[var(--color-surface)]",
              error && "border-[var(--color-danger)] focus-visible:ring-[var(--color-danger)]",
              leftAdornment && "pl-9",
              rightAdornment && "pr-9",
              className
            )}
            {...props}
          />
          {rightAdornment && (
            <span className="absolute right-3 flex items-center text-[var(--color-subtle)]">
              {rightAdornment}
            </span>
          )}
        </div>
        {error && (
          <p className="text-xs text-[var(--color-danger)]">{error}</p>
        )}
        {hint && !error && (
          <p className="text-xs text-[var(--color-subtle)]">{hint}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
