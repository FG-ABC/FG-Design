import * as React from "react";
import * as Popover from "@radix-ui/react-popover";
import { Check, ChevronDown, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CreatableMultiAutocompleteOption {
  label: string;
  value: string;
}

export interface CreatableMultiAutocompleteProps {
  label?: string;
  error?: string;
  hint?: string;
  placeholder?: string;
  options?: CreatableMultiAutocompleteOption[];
  value?: string[];
  onChange?: (value: string[]) => void;
  disabled?: boolean;
  id?: string;
}

export const CreatableMultiAutocomplete = React.forwardRef<HTMLInputElement, CreatableMultiAutocompleteProps>(
  (
    {
      label,
      error,
      hint,
      placeholder = "Type to search or create…",
      options = [],
      value,
      onChange,
      disabled,
      id,
    },
    ref
  ) => {
    const isControlled = value !== undefined && onChange !== undefined;
    const [internalValue, setInternalValue] = React.useState<string[]>(value ?? []);
    const resolvedValue = isControlled ? value! : internalValue;

    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState("");
    const mouseDownInDropdown = React.useRef(false);

    const isDuplicate = (raw: string) =>
      resolvedValue.some((v) => v.toLowerCase().trim() === raw.toLowerCase().trim());

    const filtered = query.trim()
      ? options.filter(
          (o) =>
            o.label.toLowerCase().includes(query.toLowerCase()) &&
            !resolvedValue.includes(o.value)
        )
      : options.filter((o) => !resolvedValue.includes(o.value));

    const canCreate =
      query.trim() !== "" &&
      !isDuplicate(query.trim()) &&
      !options.some((o) => o.label.toLowerCase() === query.toLowerCase());

    const showDropdown = open && (filtered.length > 0 || canCreate);

    const commit = (next: string[]) => {
      if (!isControlled) setInternalValue(next);
      onChange?.(next);
    };

    const addValue = (val: string) => {
      if (!isDuplicate(val)) commit([...new Set([...resolvedValue, val])]);
    };

    const selectOption = (opt: CreatableMultiAutocompleteOption) => {
      addValue(opt.value);
      setQuery("");
    };

    const createNew = () => {
      const trimmed = query.trim();
      if (trimmed && !isDuplicate(trimmed)) {
        addValue(trimmed);
        setQuery("");
        setOpen(false);
      }
    };

    const removeTag = (val: string, e: React.MouseEvent) => {
      e.stopPropagation();
      commit(resolvedValue.filter((v) => v !== val));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (canCreate) createNew();
        else if (filtered.length > 0) selectOption(filtered[0]);
      }
      if (e.key === "Escape") {
        e.preventDefault();
        setQuery("");
        setOpen(false);
      }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const text = e.clipboardData.getData("text");
      const pasted = text
        .split(/[\r\n\t,]+/)
        .map((s) => s.trim())
        .filter(Boolean);

      const unique = pasted.filter((v) => !isDuplicate(v));
      if (unique.length > 0) commit([...new Set([...resolvedValue, ...unique])]);
    };

    const handleBlur = () => {
      if (mouseDownInDropdown.current) return;
      setOpen(false);
      setQuery("");
    };

    const labelForValue = (val: string) =>
      options.find((o) => o.value === val)?.label ?? val;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-[var(--color-ink)] leading-none">
            {label}
          </label>
        )}
        <Popover.Root open={showDropdown}>
          <Popover.Anchor asChild>
            <div
              onBlur={handleBlur}
              onClick={() => {
                if (!disabled) {
                  setOpen(true);
                  (ref as React.RefObject<HTMLInputElement>)?.current?.focus();
                }
              }}
              className={cn(
                "min-h-[var(--height-input)] w-full rounded-[var(--radius-md)]",
                "border border-[var(--color-border)] bg-[var(--color-elevated)]",
                "px-2 py-1.5 flex flex-wrap items-center gap-1.5",
                "shadow-[var(--shadow-xs)] cursor-text",
                "transition-all duration-[var(--duration-fast)]",
                open && "ring-2 ring-[var(--color-accent-500)] border-[var(--color-accent-500)]",
                error && "border-[var(--color-danger)]",
                error && open && "ring-[var(--color-danger)]",
                disabled && "opacity-50 cursor-not-allowed bg-[var(--color-surface)]"
              )}
            >
              {resolvedValue.map((val) => (
                <span
                  key={val}
                  className={cn(
                    "inline-flex items-center gap-1 px-2 py-0.5",
                    "rounded-[var(--radius-sm)] bg-[var(--color-accent-100)]",
                    "text-xs font-medium text-[var(--color-accent-700)]"
                  )}
                >
                  {labelForValue(val)}
                  {!disabled && (
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={(e) => removeTag(val, e)}
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
                  aria-expanded={showDropdown}
                  autoComplete="off"
                  disabled={disabled}
                  placeholder={resolvedValue.length === 0 ? placeholder : ""}
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
                  onFocus={() => setOpen(true)}
                  onKeyDown={handleKeyDown}
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
              <ul role="listbox" aria-multiselectable="true" className="max-h-60 overflow-y-auto">
                {filtered.map((opt) => (
                  <li
                    key={opt.value}
                    role="option"
                    aria-selected={resolvedValue.includes(opt.value)}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => selectOption(opt)}
                    className={cn(
                      "relative flex w-full cursor-default select-none items-center",
                      "rounded-[var(--radius-sm)] py-1.5 pl-8 pr-2 text-sm",
                      "text-[var(--color-base)] outline-none",
                      "hover:bg-[var(--color-surface)] hover:text-[var(--color-ink)]",
                      "transition-colors duration-[var(--duration-fast)]"
                    )}
                  >
                    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                      {resolvedValue.includes(opt.value) && (
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
                    onClick={createNew}
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

CreatableMultiAutocomplete.displayName = "CreatableMultiAutocomplete";
