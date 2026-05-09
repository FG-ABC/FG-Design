"use client";
import * as React from "react";
import * as Popover from "@radix-ui/react-popover";
import { CalendarDays, ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function startDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function toDateString(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function parseDate(value: string): Date | null {
  if (!value) return null;
  const d = new Date(value + "T00:00:00");
  return isNaN(d.getTime()) ? null : d;
}

function formatDisplay(value: string): string {
  const d = parseDate(value);
  if (!d) return "";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export interface DatePickerProps {
  label?: string;
  error?: string;
  hint?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string | null) => void;
  disabled?: boolean;
  min?: string;
  max?: string;
  id?: string;
  required?: boolean;
}

export const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  ({ label, error, hint, placeholder = "Select date…", value, onChange, disabled, min, max, id, required }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    const isControlled = value !== undefined && onChange !== undefined;
    const [internalValue, setInternalValue] = React.useState<string | null>(null);
    const resolvedValue = isControlled ? (value ?? null) : internalValue;

    const parsed = resolvedValue ? parseDate(resolvedValue) : null;
    const today = new Date();

    const [open, setOpen] = React.useState(false);
    const [viewYear, setViewYear] = React.useState(parsed?.getFullYear() ?? today.getFullYear());
    const [viewMonth, setViewMonth] = React.useState(parsed?.getMonth() ?? today.getMonth());

    React.useEffect(() => {
      if (parsed) {
        setViewYear(parsed.getFullYear());
        setViewMonth(parsed.getMonth());
      }
    }, [resolvedValue]);

    const select = (dateStr: string) => {
      const newVal = dateStr === resolvedValue ? null : dateStr;
      if (!isControlled) setInternalValue(newVal);
      onChange?.(newVal);
      setOpen(false);
    };

    const clear = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!isControlled) setInternalValue(null);
      onChange?.(null);
    };

    const prevMonth = () => {
      if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
      else setViewMonth(m => m - 1);
    };

    const nextMonth = () => {
      if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
      else setViewMonth(m => m + 1);
    };

    const total = daysInMonth(viewYear, viewMonth);
    const startDay = startDayOfMonth(viewYear, viewMonth);
    const cells: (number | null)[] = [
      ...Array(startDay).fill(null),
      ...Array.from({ length: total }, (_, i) => i + 1),
    ];
    while (cells.length % 7 !== 0) cells.push(null);

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-[var(--color-ink)] leading-none">
            {label}
            {required && <span className="ml-0.5 text-[var(--color-danger)]">*</span>}
          </label>
        )}
        <Popover.Root open={open} onOpenChange={disabled ? undefined : setOpen}>
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
                !resolvedValue && "text-[var(--color-muted)]"
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
                "z-[var(--z-popover)] w-72",
                "rounded-[var(--radius-lg)] border border-[var(--color-border)]",
                "bg-[var(--color-elevated)] shadow-[var(--shadow-lg)] p-3",
                "data-[state=open]:animate-in data-[state=closed]:animate-out",
                "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
                "data-[side=bottom]:slide-in-from-top-2"
              )}
            >
              {/* Month navigation */}
              <div className="flex items-center justify-between mb-3">
                <button
                  type="button"
                  onClick={prevMonth}
                  className={cn(
                    "p-1.5 rounded-[var(--radius-sm)] text-[var(--color-subtle)]",
                    "hover:bg-[var(--color-surface)] hover:text-[var(--color-ink)]",
                    "transition-colors duration-[var(--duration-fast)]"
                  )}
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="text-sm font-semibold text-[var(--color-ink)]">
                  {MONTHS[viewMonth]} {viewYear}
                </span>
                <button
                  type="button"
                  onClick={nextMonth}
                  className={cn(
                    "p-1.5 rounded-[var(--radius-sm)] text-[var(--color-subtle)]",
                    "hover:bg-[var(--color-surface)] hover:text-[var(--color-ink)]",
                    "transition-colors duration-[var(--duration-fast)]"
                  )}
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* Day-of-week headers */}
              <div className="grid grid-cols-7 mb-1">
                {DAYS.map((d) => (
                  <div key={d} className="text-center text-xs font-medium text-[var(--color-muted)] py-1">
                    {d}
                  </div>
                ))}
              </div>

              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-y-0.5">
                {cells.map((day, i) => {
                  if (!day) return <div key={`empty-${i}`} />;
                  const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                  const isSelected = dateStr === resolvedValue;
                  const isToday = dateStr === toDateString(today);
                  const isDisabled =
                    (min ? dateStr < min : false) ||
                    (max ? dateStr > max : false);

                  return (
                    <button
                      key={dateStr}
                      type="button"
                      disabled={isDisabled}
                      onClick={() => select(dateStr)}
                      className={cn(
                        "h-8 w-full flex items-center justify-center rounded-[var(--radius-sm)]",
                        "text-sm transition-colors duration-[var(--duration-fast)]",
                        "disabled:opacity-30 disabled:cursor-not-allowed",
                        isSelected
                          ? "bg-[var(--color-accent-500)] text-white font-medium"
                          : [
                              "text-[var(--color-base)] hover:bg-[var(--color-surface)]",
                              isToday && "font-semibold text-[var(--color-accent-500)]",
                            ]
                      )}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
        {error && <p className="text-xs text-[var(--color-danger)]">{error}</p>}
        {hint && !error && <p className="text-xs text-[var(--color-subtle)]">{hint}</p>}
      </div>
    );
  }
);

DatePicker.displayName = "DatePicker";
