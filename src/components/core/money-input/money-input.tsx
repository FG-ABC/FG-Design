import * as React from "react";
import { Input } from "@/components/core/input";

export interface MoneyInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "type"> {
  label?: string;
  error?: string;
  hint?: string;
  value?: number | string;
  onChange?: (value: number | string) => void;
  currencySymbol?: string;
  maxDecimals?: number;
}

function formatMoney(value: number | string | undefined, maxDecimals: number): string {
  if (value === undefined || value === null || value === "") return "";

  if (typeof value === "string") {
    if (value.endsWith(".") || /\.\d*0+$/.test(value)) return value;
    return value;
  }

  return value.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: maxDecimals,
  });
}

function parseMoney(raw: string): number | string {
  const sanitized = raw.replace(/[^\d.-]/g, "");

  if (sanitized === "" || sanitized === "-" || sanitized === ".") return 0;
  if (sanitized.endsWith(".")) return sanitized;

  const num = parseFloat(sanitized);
  return isNaN(num) ? 0 : num;
}

export const MoneyInput = React.forwardRef<HTMLInputElement, MoneyInputProps>(
  (
    {
      label,
      error,
      hint,
      value,
      onChange,
      currencySymbol = "$",
      maxDecimals = 2,
      onBlur,
      onFocus,
      ...props
    },
    ref
  ) => {
    const [display, setDisplay] = React.useState(() => formatMoney(value, maxDecimals));

    React.useEffect(() => {
      if (typeof value === "number") {
        setDisplay(formatMoney(value, maxDecimals));
      }
    }, [value, maxDecimals]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      const sanitized = raw.replace(/[^\d.-]/g, "");

      const parts = sanitized.split(".");
      if (parts.length > 1 && parts[1] && parts[1].length > maxDecimals) return;

      if (raw.endsWith(".") || raw.endsWith(".0") || sanitized === "-") {
        setDisplay(raw);
        onChange?.(raw);
      } else {
        const parsed = parseMoney(raw);
        setDisplay(typeof parsed === "number" ? formatMoney(parsed, maxDecimals) : raw);
        onChange?.(parsed);
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      if (raw === "" || raw === "-" || raw === ".") {
        setDisplay("0");
        onChange?.(0);
      } else if (typeof raw === "string" && (raw.endsWith(".") || raw.endsWith(".0"))) {
        const num = parseFloat(raw);
        const final = isNaN(num) ? 0 : num;
        setDisplay(formatMoney(final, maxDecimals));
        onChange?.(final);
      }
      onBlur?.(e);
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setDisplay(e.target.value.replace(/,/g, ""));
      onFocus?.(e);
    };

    return (
      <Input
        ref={ref}
        label={label}
        error={error}
        hint={hint}
        type="text"
        inputMode="decimal"
        value={display}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        leftAdornment={<span className="text-sm">{currencySymbol}</span>}
        className="text-right"
        {...props}
      />
    );
  }
);

MoneyInput.displayName = "MoneyInput";
