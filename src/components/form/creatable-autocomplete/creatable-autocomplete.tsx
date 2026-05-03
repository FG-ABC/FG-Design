import * as React from "react";
import * as Popover from "@radix-ui/react-popover";
import { Check, ChevronDown, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CreatableAutocompleteOption {
  label: string;
  value: string;
}

export interface CreatableAutocompleteProps {
  label?: string;
  error?: string;
  hint?: string;
  placeholder?: string;
  options?: CreatableAutocompleteOption[];
  value?: string | null;
  onChange?: (value: string | null) => void;
  disabled?: boolean;
  id?: string;
  required?: boolean;
}

export const CreatableAutocomplete = React.forwardRef<HTMLInputElement, CreatableAutocompleteProps>(
  (
    {
      label,
      error,
      hint,
      placeholder = "Search or create…",
      options = [],
      value,
      onChange,
      disabled,
      id,
      required,
    },
    ref
  ) => {
    const isControlled = value !== undefined && onChange !== undefined;
    const [internalValue, setInternalValue] = React.useState<string | null>(value ?? null);
    const resolvedValue = isControlled ? value! : internalValue;

    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState("");
    const [inputText, setInputText] = React.useState(
      () => options.find((o) => o.value === resolvedValue)?.label ?? (resolvedValue ?? "")
    );
    const mouseDownInDropdown = React.useRef(false);

    const selected = options.find((o) => o.value === resolvedValue) ?? null;

    React.useEffect(() => {
      if (isControlled && !open) {
        setInputText(selected?.label ?? (resolvedValue ?? ""));
      }
    }, [value, open]);

    const filtered = query.trim()
      ? options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
      : options;

    const canCreate =
      query.trim() !== "" &&
      resolvedValue?.toLowerCase().trim() !== query.toLowerCase().trim() &&
      !options.some((o) => o.label.toLowerCase() === query.toLowerCase().trim());

    const commit = (val: string | null, label: string) => {
      if (!isControlled) setInternalValue(val);
      onChange?.(val);
      setInputText(label);
      setQuery("");
      setOpen(false);
    };

    const handleSelect = (opt: CreatableAutocompleteOption) => {
      commit(opt.value === resolvedValue ? null : opt.value, opt.value === resolvedValue ? "" : opt.label);
    };

    const handleCreate = () => {
      const trimmed = query.trim();
      if (trimmed) commit(trimmed, trimmed);
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      commit(null, "");
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const text = e.target.value;
      setInputText(text);
      setQuery(text);
      setOpen(true);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (filtered.length > 0) handleSelect(filtered[0]);
        else if (canCreate) handleCreate();
      }
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        setQuery("");
        setInputText(selected?.label ?? (resolvedValue ?? ""));
      }
    };

    const handleBlur = () => {
      if (mouseDownInDropdown.current) return;
      setOpen(false);
      setQuery("");
      setInputText(selected?.label ?? (resolvedValue ?? ""));
    };

    const showDropdown = open && (filtered.length > 0 || canCreate);

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-[var(--color-ink)] leading-none">
            {label}
            {required && <span className="ml-0.5 text-[var(--color-danger)]">*</span>}
          </label>
        )}
        <Popover.Root open={showDropdown}>
          <Popover.Anchor asChild>
            <div className="relative flex items-center" onBlur={handleBlur}>
              <input
                ref={ref}
                id={inputId}
                type="text"
                role="combobox"
                aria-expanded={showDropdown}
                autoComplete="off"
                disabled={disabled}
                placeholder={placeholder}
                value={inputText}
                onChange={handleInputChange}
                onFocus={() => setOpen(true)}
                onKeyDown={handleKeyDown}
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
                {resolvedValue && !disabled && (
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
                {canCreate && (
                  <li
                    role="option"
                    aria-selected={false}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={handleCreate}
                    className={cn(
                      "relative flex w-full cursor-default select-none items-center gap-2",
                      "rounded-[var(--radius-sm)] py-1.5 pl-8 pr-2 text-sm",
                      "text-[var(--color-accent-600)] outline-none",
                      "hover:bg-[var(--color-accent-50)] hover:text-[var(--color-accent-700)]",
                      "transition-colors duration-[var(--duration-fast)]"
                    )}
                  >
                    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                      <Plus className="h-3.5 w-3.5" />
                    </span>
                    Create <span className="font-medium">"{query.trim()}"</span>
                  </li>
                )}
              </ul>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
        {error && <p className="text-xs text-[var(--color-danger)]">{error}</p>}
        {hint && !error && <p className="text-xs text-[var(--color-subtle)]">{hint}</p>}
      </div>
    );
  }
);

CreatableAutocomplete.displayName = "CreatableSelect";
