import * as React from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

type SearchBarMode = "debounce" | "button";

export interface SearchBarProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "type"> {
  mode?: SearchBarMode;
  debounceMs?: number;
  onSearch: (value: string) => void;
  onClear?: () => void;
  loading?: boolean;
  buttonLabel?: string;
}

export const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  (
    {
      className,
      mode = "debounce",
      debounceMs = 300,
      onSearch,
      onClear,
      loading,
      buttonLabel = "Search",
      defaultValue,
      value: controlledValue,
      ...props
    },
    ref
  ) => {
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = React.useState(
      (defaultValue as string) ?? ""
    );
    const value = isControlled ? (controlledValue as string) : internalValue;

    const debounceTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      const next = e.target.value;
      if (!isControlled) setInternalValue(next);

      if (mode === "debounce") {
        if (debounceTimer.current) clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(() => onSearch(next), debounceMs);
      }
    }

    function handleSubmit(e?: React.FormEvent) {
      e?.preventDefault();
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      onSearch(value);
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
      if (e.key === "Enter" && mode === "button") handleSubmit();
    }

    function handleClear() {
      if (!isControlled) setInternalValue("");
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      onSearch("");
      onClear?.();
    }

    React.useEffect(() => () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    }, []);

    const showClear = value.length > 0;

    return (
      <form
        role="search"
        onSubmit={handleSubmit}
        className={cn("flex items-center gap-2", className)}
      >
        <div className="relative flex-1 flex items-center">
          <span className="absolute left-3 flex items-center text-[var(--color-subtle)] pointer-events-none">
            {loading ? (
              <span className="h-4 w-4 border-2 border-[var(--color-muted)] border-t-[var(--color-accent-500)] rounded-full animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
          </span>
          <input
            ref={ref}
            type="search"
            role="searchbox"
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className={cn(
              "w-full h-[var(--height-input)] rounded-[var(--radius-md)]",
              "border border-[var(--color-border)] bg-[var(--color-field)]",
              "pl-9 pr-3 text-sm text-[var(--color-ink)]",
              "placeholder:text-[var(--color-muted)]",
              "shadow-[var(--shadow-xs)]",
              "transition-all duration-[var(--duration-fast)]",
              "focus-visible:outline-none focus-visible:ring-2",
              "focus-visible:ring-[var(--color-accent-500)] focus-visible:ring-offset-0",
              "focus-visible:border-[var(--color-accent-500)]",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "[&::-webkit-search-cancel-button]:hidden",
              showClear && "pr-9"
            )}
            {...props}
          />
          {showClear && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Clear search"
              className="absolute right-3 flex items-center text-[var(--color-muted)] hover:text-[var(--color-base)] transition-colors duration-[var(--duration-fast)]"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
        {mode === "button" && (
          <button
            type="submit"
            className={cn(
              "inline-flex items-center justify-center gap-1.5",
              "h-[var(--height-input)] px-4",
              "rounded-[var(--radius-md)]",
              "bg-[var(--color-accent-500)] text-white text-sm font-medium",
              "shadow-[var(--shadow-sm)]",
              "transition-all duration-[var(--duration-base)]",
              "hover:bg-[var(--color-accent-600)]",
              "active:bg-[var(--color-accent-700)] active:scale-[0.98]",
              "focus-visible:outline-none focus-visible:ring-2",
              "focus-visible:ring-[var(--color-accent-500)] focus-visible:ring-offset-2",
              "disabled:opacity-50 disabled:pointer-events-none",
              "whitespace-nowrap shrink-0"
            )}
            disabled={loading}
          >
            {buttonLabel}
          </button>
        )}
      </form>
    );
  }
);

SearchBar.displayName = "SearchBar";
