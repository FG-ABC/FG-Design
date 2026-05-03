import * as React from "react";
import { Checkbox } from "@/components/core/checkbox";
import type { CheckboxProps } from "@/components/core/checkbox";

export interface FormCheckboxProps extends Omit<CheckboxProps, "label"> {
  label?: string;
  error?: string;
  hint?: string;
}

export const FormCheckbox = React.forwardRef<
  React.ElementRef<typeof Checkbox>,
  FormCheckboxProps
>(({ label, error, hint, ...props }, ref) => (
  <div className="flex flex-col gap-1.5">
    <Checkbox ref={ref} label={label} {...props} />
    {error && <p className="text-xs text-[var(--color-danger)] pl-6">{error}</p>}
    {hint && !error && <p className="text-xs text-[var(--color-subtle)] pl-6">{hint}</p>}
  </div>
));

FormCheckbox.displayName = "FormCheckbox";
