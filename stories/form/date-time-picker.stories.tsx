import type { Meta, StoryObj } from "@storybook/react";
import { DateTimePicker } from "@/components/form/date-time-picker";
import * as React from "react";

const meta: Meta<typeof DateTimePicker> = {
  title: "Form/DateTimePicker",
  component: DateTimePicker,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [(Story) => <div className="w-80"><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof DateTimePicker>;

export const Default: Story = {
  args: { label: "Date & Time", placeholder: "Select date & time…" },
};

export const WithValue: Story = {
  args: { label: "Date & Time", value: "2025-03-15T14:30" },
};

export const WithHint: Story = {
  args: { label: "Date & Time", hint: "All times are in local timezone.", placeholder: "Select date & time…" },
};

export const WithError: Story = {
  args: { label: "Date & Time", error: "A date and time is required.", placeholder: "Select date & time…" },
};

export const Disabled: Story = {
  args: { label: "Date & Time", value: "2025-03-15T09:00", disabled: true },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState<string | null>(null);
    return (
      <div className="flex flex-col gap-3 w-80">
        <DateTimePicker label="Date & Time" value={value ?? undefined} onChange={setValue} />
        <p className="text-sm text-[var(--color-subtle)]">Value: {value ?? "none"}</p>
      </div>
    );
  },
};
