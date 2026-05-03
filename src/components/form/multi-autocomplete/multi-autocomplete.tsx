"use client";
import * as React from "react";
import * as Popover from "@radix-ui/react-popover";
import { Check, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MultiAutocompleteOption {
  label: string;
  value: string;
}

export interface MultiAutocompleteProps {
  label?: string;
  error?: string;
  hint?: string;
  placeholder?: string;
  options: MultiAutocompleteOption[];
  value?: string[];
  onChange?: (value: string[]) => void;
  disabled?: boolean;
  id?: string;
  required?: boolean;
}

export const MultiAutocomplete = React.forwardRef<HTMLInputElement, MultiAutocompleteProps>(
  (
    {
      label,
      error,
      hint,
      placeholder = "Search…",
      options,
      value = [],
      onChange,
      disabled,
      id,
      required,
    },
    ref
  ) => {
    const isControlled = value !== undefined && onChange !== undefined;
    const [internalValue, setInternalValue] = React.useState<string[]>(value ?? []);
    const resolvedValue = isControlled ? value! : internalValue;

    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState("");
    // Tracks whether a mousedown started inside the popover content (portal),
    // so we can ignore the blur that fires when focus moves there.
    const mouseDownInDropdown = React.useRef(false);

    const selectedOptions = options.filter((o) => resolvedValue.includes(o.value));
    const filtered = query.trim()
      ? options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
      : options;

    const toggle = (opt: MultiAutocompleteOption) => {
      const next = resolvedValue.includes(opt.value)
        ? resolvedValue.filter((v) => v !== opt.value)
        : [...resolvedValue, opt.value];
      if (!isControlled) setInternalValue(next);
      onChange?.(next);
    };

    const removeTag = (val: string, e: React.MouseEvent) => {
      e.stopPropagation();
      const next = resolvedValue.filter((v) => v !== val);
      if (!isControlled) setInternalValue(next);
      onChange?.(next);
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const text = e.clipboardData.getData("text");
      const pasted = text
        .split(/[\r\n\t,]+/)
        .map((s) => s.trim())
        .filter(Boolean);

      const matched = pasted.reduce<string[]>((acc, raw) => {
        const opt = options.find(
          (o) => o.value === raw || o.label.toLowerCase() === raw.toLowerCase()
        );
        if (opt && !resolvedValue.includes(opt.value)) acc.push(opt.value);
        return acc;
      }, []);

      if (matched.length > 0) {
        const next = [...new Set([...resolvedValue, ...matched])];
        if (!isControlled) setInternalValue(next);
        onChange?.(next);
      }
    };

    const handleBlur = () => {
      // If mousedown started in the dropdown portal, don't close — the click is still coming.
      if (mouseDownInDropdown.current) return;
      setOpen(false);
      setQuery("");
    };

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-[var(--color-ink)] leading-none">
            {label}
            {required && <span className="ml-0.5 text-[var(--color-danger)]">*</span>}
          </label>
        )}
        <Popover.Root open={open}>
          <Popover.Anchor asChild>
            <div
              onBlur={handleBlur}
              onClick={() => {
                if (!disabled) {
                  setOpen(true);
                  (ref as React.RefObject<HTMLInputElement>)?.current?.focus();
                }
              }}
              onKeyDown={(e) => { if (e.key === "Escape") { setOpen(false); setQuery(""); } }}
              className={cn(
                "min-h-[var(--height-input)] w-full rounded-[var(--radius-md)]",
                "border border-[var(--color-border)] bg-[var(--color-elevated)]",
                "px-2 py-1.5 flex flex-wrap items-center gap-1.5",
                "shadow-[var(--shadow-xs)]",
                "transition-all duration-[var(--duration-fast)] cursor-text",
                open && "ring-2 ring-[var(--color-accent-500)] border-[var(--color-accent-500)]",
                error && "border-[var(--color-danger)]",
                error && open && "ring-[var(--color-danger)]",
                disabled && "opacity-50 cursor-not-allowed bg-[var(--color-surface)]"
              )}
            >
              {selectedOptions.map((opt) => (
                <span
                  key={opt.value}
                  className={cn(
                    "inline-flex items-center gap-1 px-2 py-0.5",
                    "rounded-[var(--radius-sm)] bg-[var(--color-accent-100)]",
                    "text-xs font-medium text-[var(--color-accent-700)]"
                  )}
                >
                  {opt.label}
                  {!disabled && (
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={(e) => removeTag(opt.value, e)}
                      className="hover:text-[var(--color-accent-900)] transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </span>
              ))}
              <div className="flex-1 flex items-center min-w-[80px]">
                <input
                  ref={ref}
                  id={inputId}
                  type="text"
                  role="combobox"
                  aria-expanded={open}
                  autoComplete="off"
                  disabled={disabled}
                  placeholder={selectedOptions.length === 0 ? placeholder : ""}
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
                  onFocus={() => setOpen(true)}
                  onPaste={handlePaste}
                  className="flex-1 min-w-0 bg-transparent text-sm text-[var(--color-ink)] placeholder:text-[var(--color-muted)] outline-none"
                />
              </div>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-[var(--color-subtle)] shrink-0 transition-transform duration-[var(--duration-fast)]",
                  open && "rotate-180"
                )}
              />
            </div>
          </Popover.Anchor>
          <Popover.Portal>
            <Popover.Content
              onOpenAutoFocus={(e) => e.preventDefault()}
              onInteractOutside={(e) => e.preventDefault()}
              onFocusOutside={(e) => e.preventDefault()}
              onMouseDown={() => { mouseDownInDropdown.current = true; }}
              onMouseUp={() => { mouseDownInDropdown.current = false; }}
              side="bottom"
              align="start"
              sideOffset={4}
              className={cn(
                "z-[var(--z-dropdown)] w-[var(--radix-popover-trigger-width)]",
                "rounded-[var(--radius-lg)] border border-[var(--color-border)]",
                "bg-[var(--color-elevated)] shadow-[var(--shadow-lg)] p-1.5",
                "data-[state=open]:animate-in data-[state=closed]:animate-out",
                "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
                "data-[side=bottom]:slide-in-from-top-2"
              )}
            >
              {filtered.length === 0 ? (
                <p className="px-2 py-3 text-sm text-center text-[var(--color-muted)]">No options found.</p>
              ) : (
                <ul role="listbox" aria-multiselectable="true" className="max-h-60 overflow-y-auto">
                  {filtered.map((opt) => {
                    const selected = resolvedValue.includes(opt.value);
                    return (
                      <li
                        key={opt.value}
                        role="option"
                        aria-selected={selected}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => toggle(opt)}
                        className={cn(
                          "relative flex w-full cursor-default select-none items-center",
                          "rounded-[var(--radius-sm)] py-1.5 pl-8 pr-2 text-sm",
                          "text-[var(--color-base)] outline-none",
                          "hover:bg-[var(--color-surface)] hover:text-[var(--color-ink)]",
                          "transition-colors duration-[var(--duration-fast)]"
                        )}
                      >
                        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                          {selected && <Check className="h-4 w-4 text-[var(--color-accent-500)]" />}
                        </span>
                        {opt.label}
                      </li>
                    );
                  })}
                </ul>
              )}
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
        {error && <p className="text-xs text-[var(--color-danger)]">{error}</p>}
        {hint && !error && <p className="text-xs text-[var(--color-subtle)]">{hint}</p>}
      </div>
    );
  }
);

MultiAutocomplete.displayName = "MultiAutocomplete";
