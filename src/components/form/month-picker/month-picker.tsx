"use client";
import * as React from "react";
import * as Popover from "@radix-ui/react-popover";
import { CalendarDays, ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const MONTHS_FULL = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function formatDisplay(value: string): string {
  const [year, month] = value.split("-");
  if (!year || !month) return "";
  const m = parseInt(month, 10) - 1;
  if (m < 0 || m > 11) return "";
  return `${MONTHS_FULL[m]} ${year}`;
}

export interface MonthPickerProps {
  label?: string;
  error?: string;
  hint?: string;
  placeholder?: string;
  /** `"YYYY-MM"` */
  value?: string;
  onChange?: (value: string | null) => void;
  disabled?: boolean;
  /** `"YYYY-MM"` — months before this are disabled */
  min?: string;
  /** `"YYYY-MM"` — months after this are disabled */
  max?: string;
  id?: string;
  required?: boolean;
  modal?: boolean;
}

export const MonthPicker = React.forwardRef<HTMLButtonElement, MonthPickerProps>(
  ({ label, error, hint, placeholder = "Select month…", value, onChange, disabled, min, max, id, required, modal = false }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    const isControlled = value !== undefined && onChange !== undefined;
    const [internalValue, setInternalValue] = React.useState<string | null>(null);
    const resolvedValue = isControlled ? (value ?? null) : internalValue;

    const today = new Date();
    const parsedYear = resolvedValue ? parseInt(resolvedValue.split("-")[0], 10) : NaN;
    const [viewYear, setViewYear] = React.useState(isNaN(parsedYear) ? today.getFullYear() : parsedYear);
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
      if (resolvedValue) {
        const y = parseInt(resolvedValue.split("-")[0], 10);
        if (!isNaN(y)) setViewYear(y);
      }
    }, [resolvedValue]);

    const select = (monthStr: string) => {
      const newVal = monthStr === resolvedValue ? null : monthStr;
      if (!isControlled) setInternalValue(newVal);
      onChange?.(newVal);
      setOpen(false);
    };

    const clear = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!isControlled) setInternalValue(null);
      onChange?.(null);
    };

    const thisMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-[var(--color-ink)] leading-none">
            {label}
            {required && <span className="ml-0.5 text-[var(--color-danger)]">*</span>}
          </label>
        )}
        <Popover.Root open={open} onOpenChange={disabled ? undefined : setOpen} modal={modal}>
          <Popover.Trigger asChild>
            <button
              ref={ref}
              id={inputId}
              type="button"
              disabled={disabled}
              aria-label={resolvedValue ? formatDisplay(resolvedValue) : placeholder}
              className={cn(
                "w-full h-[var(--height-input)] rounded-[var(--radius-md)]",
                "border border-[var(--color-border)] bg-[var(--color-elevated)]",
                "px-3 text-sm text-left",
                "shadow-[var(--shadow-xs)]",
                "transition-all duration-[var(--duration-fast)]",
                "focus-visible:outline-none focus-visible:ring-2",
                "focus-visible:ring-[var(--color-accent-500)] focus-visible:ring-offset-0",
                "focus-visible:border-[var(--color-accent-500)]",
                "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[var(--color-surface)]",
                error && "border-[var(--color-danger)] focus-visible:ring-[var(--color-danger)]",
                !resolvedValue && "text-[var(--color-ink)]"
              )}
            >
              <span className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-[var(--color-subtle)] shrink-0" />
                  <span>{resolvedValue ? formatDisplay(resolvedValue) : placeholder}</span>
                </span>
                {resolvedValue && !disabled && (
                  <span
                    role="button"
                    tabIndex={-1}
                    onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); clear(e as unknown as React.MouseEvent); }}
                    className="p-0.5 rounded text-[var(--color-subtle)] hover:text-[var(--color-ink)] transition-colors"
                  >
                    <X className="h-3.5 w-3.5" />
                  </span>
                )}
              </span>
            </button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content
              side="bottom"
              align="start"
              sideOffset={4}
              className={cn(
                "z-[var(--z-popover)] w-64",
                "rounded-[var(--radius-lg)] border border-[var(--color-border)]",
                "bg-[var(--color-elevated)] shadow-[var(--shadow-lg)] p-3",
                "data-[state=open]:animate-in data-[state=closed]:animate-out",
                "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
                "data-[side=bottom]:slide-in-from-top-2"
              )}
            >
              {/* Year navigation */}
              <div className="flex items-center justify-between mb-3">
                <button
                  type="button"
                  onClick={() => setViewYear(y => y - 1)}
                  className={cn(
                    "p-1.5 rounded-[var(--radius-sm)] text-[var(--color-subtle)]",
                    "hover:bg-[var(--color-surface)] hover:text-[var(--color-ink)]",
                    "transition-colors duration-[var(--duration-fast)]"
                  )}
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="text-sm font-semibold text-[var(--color-ink)]">{viewYear}</span>
                <button
                  type="button"
                  onClick={() => setViewYear(y => y + 1)}
                  className={cn(
                    "p-1.5 rounded-[var(--radius-sm)] text-[var(--color-subtle)]",
                    "hover:bg-[var(--color-surface)] hover:text-[var(--color-ink)]",
                    "transition-colors duration-[var(--duration-fast)]"
                  )}
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* Month grid */}
              <div className="grid grid-cols-3 gap-1">
                {MONTHS.map((name, i) => {
                  const monthStr = `${viewYear}-${String(i + 1).padStart(2, "0")}`;
                  const isSelected = monthStr === resolvedValue;
                  const isThisMonth = monthStr === thisMonth;
                  const isDisabled =
                    (min ? monthStr < min : false) ||
                    (max ? monthStr > max : false);

                  return (
                    <button
                      key={monthStr}
                      type="button"
                      disabled={isDisabled}
                      onClick={() => select(monthStr)}
                      className={cn(
                        "h-9 w-full flex items-center justify-center rounded-[var(--radius-sm)]",
                        "text-sm transition-colors duration-[var(--duration-fast)]",
                        "disabled:opacity-30 disabled:cursor-not-allowed",
                        isSelected
                          ? "bg-[var(--color-accent-500)] text-white font-medium"
                          : [
                              "text-[var(--color-base)] hover:bg-[var(--color-surface)]",
                              isThisMonth && "font-semibold text-[var(--color-accent-500)]",
                            ]
                      )}
                    >
                      {name}
                    </button>
                  );
                })}
              </div>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
        {error && <p className="text-xs text-[var(--color-danger)]">{error}</p>}
        {hint && !error && <p className="text-xs text-[var(--color-ink)]">{hint}</p>}
      </div>
    );
  }
);

MonthPicker.displayName = "MonthPicker";
