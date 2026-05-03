import * as React from "react";
import * as Popover from "@radix-ui/react-popover";
import { Check, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AutocompleteOption {
  label: string;
  value: string;
}

export interface AutocompleteProps {
  label?: string;
  error?: string;
  hint?: string;
  placeholder?: string;
  options: AutocompleteOption[];
  value?: string | null;
  /** Fires when the user selects or clears an option. */
  onChange?: (value: string | null) => void;
  /** Fires as the user types. Use this to fetch options asynchronously.
   *  When provided, the component skips client-side filtering — the caller controls `options`. */
  onSearch?: (query: string) => void;
  disabled?: boolean;
  id?: string;
}

export const Autocomplete = React.forwardRef<HTMLInputElement, AutocompleteProps>(
  ({ label, error, hint, placeholder = "Search…", options, value, onChange, onSearch, disabled, id }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    const isControlled = value !== undefined && onChange !== undefined;
    const [internalValue, setInternalValue] = React.useState<string | null>(null);
    const resolvedValue = isControlled ? (value ?? null) : internalValue;

    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState("");
    const [inputText, setInputText] = React.useState(
      () => options.find((o) => o.value === resolvedValue)?.label ?? ""
    );

    const selected = options.find((o) => o.value === resolvedValue) ?? null;

    // Keep inputText in sync when controlled value changes externally
    React.useEffect(() => {
      if (isControlled && !open) {
        setInputText(selected?.label ?? "");
      }
    }, [value, open]);

    // When onSearch is provided the caller owns filtering — use options as-is.
    const filtered = onSearch || !query.trim()
      ? options
      : options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()));

    const handleSelect = (opt: AutocompleteOption) => {
      const newValue = opt.value === resolvedValue ? null : opt.value;
      if (!isControlled) setInternalValue(newValue);
      onChange?.(newValue);
      setInputText(newValue ? opt.label : "");
      setQuery("");
      setOpen(false);
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!isControlled) setInternalValue(null);
      onChange?.(null);
      setInputText("");
      setQuery("");
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const text = e.target.value;
      setInputText(text);
      setQuery(text);
      setOpen(true);
      onSearch?.(text);
    };

    // Close when focus leaves the entire component (input + popover content)
    const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
      if (!e.currentTarget.contains(e.relatedTarget as Node)) {
        setOpen(false);
        setQuery("");
        setInputText(selected?.label ?? "");
      }
    };

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-[var(--color-ink)] leading-none">
            {label}
          </label>
        )}
        <Popover.Root open={open}>
          <Popover.Anchor asChild>
            <div className="relative flex items-center" onBlur={handleBlur}>
              <input
                ref={ref}
                id={inputId}
                type="text"
                role="combobox"
                aria-expanded={open}
                autoComplete="off"
                disabled={disabled}
                placeholder={placeholder}
                value={inputText}
                onChange={handleInputChange}
                onFocus={() => setOpen(true)}
                className={cn(
                  "w-full h-[var(--height-input)] rounded-[var(--radius-md)]",
                  "border border-[var(--color-border)] bg-[var(--color-elevated)]",
                  "px-3 pr-16 text-sm text-[var(--color-ink)]",
                  "placeholder:text-[var(--color-muted)]",
                  "shadow-[var(--shadow-xs)]",
                  "transition-all duration-[var(--duration-fast)]",
                  "focus-visible:outline-none focus-visible:ring-2",
                  "focus-visible:ring-[var(--color-accent-500)] focus-visible:ring-offset-0",
                  "focus-visible:border-[var(--color-accent-500)]",
                  "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[var(--color-surface)]",
                  error && "border-[var(--color-danger)] focus-visible:ring-[var(--color-danger)]"
                )}
              />
              <div className="absolute right-2 flex items-center gap-0.5">
                {selected && !disabled && (
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={handleClear}
                    className="p-1 rounded text-[var(--color-subtle)] hover:text-[var(--color-ink)] transition-colors"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-[var(--color-subtle)] transition-transform duration-[var(--duration-fast)]",
                    open && "rotate-180"
                  )}
                />
              </div>
            </div>
          </Popover.Anchor>
          <Popover.Portal>
            <Popover.Content
              onOpenAutoFocus={(e) => e.preventDefault()}
              onInteractOutside={(e) => e.preventDefault()}
              onFocusOutside={(e) => e.preventDefault()}
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
                <ul role="listbox" className="max-h-60 overflow-y-auto">
                  {filtered.map((opt) => (
                    <li
                      key={opt.value}
                      role="option"
                      aria-selected={opt.value === resolvedValue}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleSelect(opt)}
                      className={cn(
                        "relative flex w-full cursor-default select-none items-center",
                        "rounded-[var(--radius-sm)] py-1.5 pl-8 pr-2 text-sm",
                        "text-[var(--color-base)] outline-none",
                        "hover:bg-[var(--color-surface)] hover:text-[var(--color-ink)]",
                        "transition-colors duration-[var(--duration-fast)]",
                        opt.value === resolvedValue && "text-[var(--color-ink)]"
                      )}
                    >
                      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                        {opt.value === resolvedValue && (
                          <Check className="h-4 w-4 text-[var(--color-accent-500)]" />
                        )}
                      </span>
                      {opt.label}
                    </li>
                  ))}
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

Autocomplete.displayName = "Autocomplete";
