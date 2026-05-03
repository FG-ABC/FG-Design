"use client";
import * as React from "react";
import { Input } from "@/components/core/input";

export type NumberInputMode = "POSITIVE_INTEGERS" | "INTEGERS" | "FLOATS";

export interface NumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "type"> {
  label?: string;
  error?: string;
  hint?: string;
  value?: number | string;
  onChange?: (value: number | string) => void;
  mode?: NumberInputMode;
  maxDecimals?: number;
  required?: boolean;
}

function formatNumber(value: number | string | undefined, mode: NumberInputMode, maxDecimals: number): string {
  if (value === undefined || value === null || value === "") return "";

  if (typeof value === "string") return value;

  if (mode === "FLOATS") {
    return value.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: maxDecimals,
    });
  }

  return value.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

function allowedCharsPattern(mode: NumberInputMode): RegExp {
  if (mode === "FLOATS") return /[^\d.-]/g;
  if (mode === "INTEGERS") return /[^\d-]/g;
  return /[^\d]/g;
}

function parseNumber(raw: string, mode: NumberInputMode): number | string {
  const sanitized = raw.replace(allowedCharsPattern(mode), "");

  if (sanitized === "" || sanitized === "-" || sanitized === ".") return 0;
  if (mode === "FLOATS" && sanitized.endsWith(".")) return sanitized;

  const num = mode === "FLOATS" ? parseFloat(sanitized) : parseInt(sanitized, 10);
  return isNaN(num) ? 0 : num;
}

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      label,
      error,
      hint,
      value,
      onChange,
      mode = "INTEGERS",
      maxDecimals = 2,
      onBlur,
      onFocus,
      required,
      ...props
    },
    ref
  ) => {
    const [display, setDisplay] = React.useState(() => formatNumber(value, mode, maxDecimals));

    React.useEffect(() => {
      if (typeof value === "number") {
        setDisplay(formatNumber(value, mode, maxDecimals));
      }
    }, [value, mode, maxDecimals]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      const sanitized = raw.replace(allowedCharsPattern(mode), "");

      if (mode === "FLOATS") {
        const parts = sanitized.split(".");
        if (parts.length > 1 && parts[1] && parts[1].length > maxDecimals) return;

        if (raw.endsWith(".") || raw.endsWith(".0") || sanitized === "-") {
          setDisplay(raw);
          onChange?.(raw);
          return;
        }
      }

      if (mode === "INTEGERS" && sanitized === "-") {
        setDisplay("-");
        onChange?.("-");
        return;
      }

      const parsed = parseNumber(raw, mode);
      setDisplay(typeof parsed === "number" ? formatNumber(parsed, mode, maxDecimals) : raw);
      onChange?.(parsed);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      if (raw === "" || raw === "-" || raw === ".") {
        setDisplay("0");
        onChange?.(0);
      } else if (mode === "FLOATS" && (raw.endsWith(".") || raw.endsWith(".0"))) {
        const num = parseFloat(raw);
        const final = isNaN(num) ? 0 : num;
        setDisplay(formatNumber(final, mode, maxDecimals));
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
        required={required}
        type="text"
        inputMode={mode === "FLOATS" ? "decimal" : "numeric"}
        value={display}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        className="text-right"
        {...props}
      />
    );
  }
);

NumberInput.displayName = "NumberInput";
