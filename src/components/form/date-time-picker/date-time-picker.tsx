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

/** Value format: "YYYY-MM-DDTHH:mm" (no seconds, local time) */
function parseDateTime(value: string): { date: string; hour: number; minute: number } | null {
  if (!value) return null;
  const match = value.match(/^(\d{4}-\d{2}-\d{2})T(\d{2}):(\d{2})/);
  if (!match) return null;
  return { date: match[1], hour: parseInt(match[2], 10), minute: parseInt(match[3], 10) };
}

function buildValue(date: string, hour: number, minute: number) {
  return `${date}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

function formatDisplay(value: string): string {
  const parsed = parseDateTime(value);
  if (!parsed) return "";
  const d = new Date(`${parsed.date}T${String(parsed.hour).padStart(2, "0")}:${String(parsed.minute).padStart(2, "0")}:00`);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) +
    " " + d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MINUTES = Array.from({ length: 60 }, (_, i) => i);

export interface DateTimePickerProps {
  label?: string;
  error?: string;
  hint?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string | null) => void;
  disabled?: boolean;
  id?: string;
}

export const DateTimePicker = React.forwardRef<HTMLButtonElement, DateTimePickerProps>(
  ({ label, error, hint, placeholder = "Select date & time…", value, onChange, disabled, id }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    const isControlled = value !== undefined && onChange !== undefined;
    const [internalValue, setInternalValue] = React.useState<string | null>(null);
    const resolvedValue = isControlled ? (value ?? null) : internalValue;

    const parsed = resolvedValue ? parseDateTime(resolvedValue) : null;
    const today = new Date();

    const [open, setOpen] = React.useState(false);
    const [viewYear, setViewYear] = React.useState(parsed ? parseInt(parsed.date.slice(0, 4)) : today.getFullYear());
    const [viewMonth, setViewMonth] = React.useState(parsed ? parseInt(parsed.date.slice(5, 7)) - 1 : today.getMonth());

    const [selectedDate, setSelectedDate] = React.useState<string | null>(parsed?.date ?? null);
    const [hour, setHour] = React.useState(parsed?.hour ?? 9);
    const [minute, setMinute] = React.useState(parsed?.minute ?? 0);

    const hourRef = React.useRef<HTMLDivElement>(null);
    const minuteRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      if (parsed) {
        setSelectedDate(parsed.date);
        setHour(parsed.hour);
        setMinute(parsed.minute);
        setViewYear(parseInt(parsed.date.slice(0, 4)));
        setViewMonth(parseInt(parsed.date.slice(5, 7)) - 1);
      }
    }, [resolvedValue]);

    // Scroll selected time item into view when popover opens
    React.useEffect(() => {
      if (!open) return;
      const scrollToSelected = (ref: React.RefObject<HTMLDivElement | null>, index: number) => {
        if (!ref.current) return;
        const item = ref.current.children[index] as HTMLElement | undefined;
        item?.scrollIntoView({ block: "center" });
      };
      setTimeout(() => {
        scrollToSelected(hourRef, hour);
        scrollToSelected(minuteRef, minute);
      }, 50);
    }, [open]);

    const commit = (date: string, h: number, m: number) => {
      const newVal = buildValue(date, h, m);
      if (!isControlled) setInternalValue(newVal);
      onChange?.(newVal);
    };

    const handleDateSelect = (dateStr: string) => {
      const newDate = dateStr === selectedDate ? null : dateStr;
      setSelectedDate(newDate);
      if (newDate) commit(newDate, hour, minute);
      else {
        if (!isControlled) setInternalValue(null);
        onChange?.(null);
      }
    };

    const handleHour = (h: number) => {
      setHour(h);
      if (selectedDate) commit(selectedDate, h, minute);
    };

    const handleMinute = (m: number) => {
      setMinute(m);
      if (selectedDate) commit(selectedDate, hour, m);
    };

    const clear = (e: React.MouseEvent) => {
      e.stopPropagation();
      setSelectedDate(null);
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
          </label>
        )}
        <Popover.Root open={open} onOpenChange={disabled ? undefined : setOpen} modal={false}>
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
                "z-[var(--z-popover)]",
                "rounded-[var(--radius-lg)] border border-[var(--color-border)]",
                "bg-[var(--color-elevated)] shadow-[var(--shadow-lg)]",
                "data-[state=open]:animate-in data-[state=closed]:animate-out",
                "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
                "data-[side=bottom]:slide-in-from-top-2",
                "flex"
              )}
            >
              {/* Calendar */}
              <div className="p-3 w-64">
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
                <div className="grid grid-cols-7 mb-1">
                  {DAYS.map((d) => (
                    <div key={d} className="text-center text-xs font-medium text-[var(--color-muted)] py-1">
                      {d}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-y-0.5">
                  {cells.map((day, i) => {
                    if (!day) return <div key={`empty-${i}`} />;
                    const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                    const isSelected = dateStr === selectedDate;
                    const isToday = dateStr === toDateString(today);

                    return (
                      <button
                        key={dateStr}
                        type="button"
                        onClick={() => handleDateSelect(dateStr)}
                        className={cn(
                          "h-8 w-full flex items-center justify-center rounded-[var(--radius-sm)]",
                          "text-sm transition-colors duration-[var(--duration-fast)]",
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
              </div>

              {/* Divider */}
              <div className="w-px bg-[var(--color-border)] my-3" />

              {/* Time pickers */}
              <div className="flex gap-0 py-3">
                {/* Hours */}
                <div
                  ref={hourRef}
                  className="w-16 h-56 overflow-y-auto scroll-smooth px-1 scrollbar-none"
                  style={{ scrollbarWidth: "none" }}
                >
                  {HOURS.map((h) => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => handleHour(h)}
                      className={cn(
                        "w-full h-8 flex items-center justify-center rounded-[var(--radius-sm)]",
                        "text-sm transition-colors duration-[var(--duration-fast)]",
                        h === hour
                          ? "bg-[var(--color-accent-500)] text-white font-medium"
                          : "text-[var(--color-base)] hover:bg-[var(--color-surface)]"
                      )}
                    >
                      {String(h).padStart(2, "0")}
                    </button>
                  ))}
                </div>

                {/* Colon separator */}
                <div className="flex items-center px-0.5">
                  <span className="text-sm text-[var(--color-muted)] select-none">:</span>
                </div>

                {/* Minutes */}
                <div
                  ref={minuteRef}
                  className="w-16 h-56 overflow-y-auto scroll-smooth px-1 scrollbar-none"
                  style={{ scrollbarWidth: "none" }}
                >
                  {MINUTES.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => handleMinute(m)}
                      className={cn(
                        "w-full h-8 flex items-center justify-center rounded-[var(--radius-sm)]",
                        "text-sm transition-colors duration-[var(--duration-fast)]",
                        m === minute
                          ? "bg-[var(--color-accent-500)] text-white font-medium"
                          : "text-[var(--color-base)] hover:bg-[var(--color-surface)]"
                      )}
                    >
                      {String(m).padStart(2, "0")}
                    </button>
                  ))}
                </div>
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

DateTimePicker.displayName = "DateTimePicker";
