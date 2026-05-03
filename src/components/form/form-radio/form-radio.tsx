"use client";
import * as React from "react";
import { RadioGroup } from "@/components/core/radio-group";
import type { RadioGroupOption } from "@/components/core/radio-group";

export interface FormRadioProps {
  label?: string;
  error?: string;
  hint?: string;
  options: RadioGroupOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
  id?: string;
  required?: boolean;
}

export const FormRadio = React.forwardRef<HTMLDivElement, FormRadioProps>(
  ({ label, error, hint, options, value, onValueChange, disabled, orientation, id, required }, ref) => {
    const groupId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div ref={ref} className="flex flex-col gap-1.5">
        {label && (
          <span
            id={`${groupId}-label`}
            className="text-sm font-medium text-[var(--color-ink)] leading-none"
          >
            {label}
            {required && <span className="ml-0.5 text-[var(--color-danger)]">*</span>}
          </span>
        )}
        <RadioGroup
          aria-labelledby={label ? `${groupId}-label` : undefined}
          options={options}
          value={value}
          onValueChange={onValueChange}
          disabled={disabled}
          orientation={orientation}
        />
        {error && <p className="text-xs text-[var(--color-danger)]">{error}</p>}
        {hint && !error && <p className="text-xs text-[var(--color-subtle)]">{hint}</p>}
      </div>
    );
  }
);

FormRadio.displayName = "FormRadio";
