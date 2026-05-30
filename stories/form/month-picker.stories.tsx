import type { Meta, StoryObj } from "@storybook/react";
import { MonthPicker } from "@/components/form/month-picker";
import * as React from "react";

const meta: Meta<typeof MonthPicker> = {
  title: "Form/MonthPicker",
  component: MonthPicker,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [(Story) => <div className="w-64"><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof MonthPicker>;

export const Default: Story = {
  args: { label: "Month", placeholder: "Select month…" },
};

export const WithValue: Story = {
  args: { label: "Month", value: "2026-03" },
};

export const WithHint: Story = {
  args: { label: "Billing period", hint: "Used for invoice generation.", placeholder: "Select month…" },
};

export const WithError: Story = {
  args: { label: "Month", error: "A month is required.", placeholder: "Select month…" },
};

export const Disabled: Story = {
  args: { label: "Month", value: "2026-03", disabled: true },
};

export const WithMinMax: Story = {
  args: {
    label: "Month",
    hint: "Only the next 6 months.",
    min: "2026-05",
    max: "2026-11",
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState<string | null>(null);
    return (
      <div className="flex flex-col gap-3 w-64">
        <MonthPicker label="Month" value={value ?? undefined} onChange={setValue} />
        <p className="text-sm text-[var(--color-subtle)]">Value: {value ?? "none"}</p>
      </div>
    );
  },
};
