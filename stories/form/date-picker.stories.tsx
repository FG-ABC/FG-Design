import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker } from "@/components/form/date-picker";
import * as React from "react";

const meta: Meta<typeof DatePicker> = {
  title: "Form/DatePicker",
  component: DatePicker,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [(Story) => <div className="w-72"><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: { label: "Date", placeholder: "Select date…" },
};

export const WithValue: Story = {
  args: { label: "Date", value: "2025-03-15" },
};

export const WithHint: Story = {
  args: { label: "Date", hint: "Pick the start date.", placeholder: "Select date…" },
};

export const WithError: Story = {
  args: { label: "Date", error: "A date is required.", placeholder: "Select date…" },
};

export const Disabled: Story = {
  args: { label: "Date", value: "2025-03-15", disabled: true },
};

export const WithMinMax: Story = {
  args: {
    label: "Date",
    hint: "Only dates in the next 30 days.",
    min: new Date().toISOString().slice(0, 10),
    max: new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10),
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState<string | null>(null);
    return (
      <div className="flex flex-col gap-3 w-72">
        <DatePicker label="Date" value={value ?? undefined} onChange={setValue} />
        <p className="text-sm text-[var(--color-subtle)]">Value: {value ?? "none"}</p>
      </div>
    );
  },
};
