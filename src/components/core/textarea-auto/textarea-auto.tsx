"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaAutoProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "rows"> {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  minRows?: number;
  maxRows?: number;
}

export const TextareaAuto = React.forwardRef<HTMLTextAreaElement, TextareaAutoProps>(
  ({ className, label, error, hint, required, id, minRows = 1, maxRows, onChange, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    const innerRef = React.useRef<HTMLTextAreaElement>(null);
    const resolvedRef = (ref as React.RefObject<HTMLTextAreaElement>) ?? innerRef;

    const resize = () => {
      const el = resolvedRef.current;
      if (!el) return;

      el.style.height = "auto";

      const lineHeight = parseInt(getComputedStyle(el).lineHeight, 10) || 20;
      const padding =
        parseInt(getComputedStyle(el).paddingTop, 10) +
        parseInt(getComputedStyle(el).paddingBottom, 10);

      const minHeight = lineHeight * minRows + padding;
      const maxHeight = maxRows ? lineHeight * maxRows + padding : Infinity;

      el.style.height = `${Math.min(Math.max(el.scrollHeight, minHeight), maxHeight)}px`;
      el.style.overflowY = el.scrollHeight > maxHeight ? "auto" : "hidden";
    };

    React.useLayoutEffect(() => {
      resize();
    });

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      resize();
      onChange?.(e);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter") {
        e.stopPropagation();
      }
      props.onKeyDown?.(e);
    };

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
          ref={resolvedRef}
          id={inputId}
          required={required}
          rows={minRows}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className={cn(
            "w-full rounded-[var(--radius-md)]",
            "border border-[var(--color-border)] bg-[var(--color-field)]",
            "px-3 py-2.5 text-sm text-[var(--color-ink)]",
            "placeholder:text-[var(--color-muted)]",
            "shadow-[var(--shadow-xs)]",
            "transition-[border-color,box-shadow] duration-[var(--duration-fast)]",
            "focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-[var(--color-accent-500)] focus-visible:ring-offset-0",
            "focus-visible:border-[var(--color-accent-500)]",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[var(--color-surface)]",
            "resize-none overflow-hidden leading-5",
            error && "border-[var(--color-danger)] focus-visible:ring-[var(--color-danger)]",
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

TextareaAuto.displayName = "TextareaAuto";
