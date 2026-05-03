import type { Meta, StoryObj } from "@storybook/react";
import { NumberInput } from "@/components/core/number-input";
import * as React from "react";

const meta: Meta<typeof NumberInput> = {
  title: "Form/NumberInput",
  component: NumberInput,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [(Story) => <div className="w-80"><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof NumberInput>;

export const Integers: Story = {
  args: { label: "Quantity", mode: "INTEGERS", placeholder: "0" },
};

export const PositiveIntegers: Story = {
  args: { label: "Stock count", mode: "POSITIVE_INTEGERS", placeholder: "0", value: 1000 },
};

export const Floats: Story = {
  args: { label: "Weight (kg)", mode: "FLOATS", placeholder: "0.00", value: 12.5 },
};

export const FloatsHighPrecision: Story = {
  args: { label: "Latitude", mode: "FLOATS", maxDecimals: 6, value: 14.599512 },
};

export const WithError: Story = {
  args: { label: "Units", mode: "POSITIVE_INTEGERS", error: "Must be at least 1.", value: 0 },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <NumberInput label="Integers" mode="INTEGERS" value={-42} />
      <NumberInput label="Positive integers" mode="POSITIVE_INTEGERS" value={1000000} />
      <NumberInput label="Floats" mode="FLOATS" value={3.14159} maxDecimals={5} />
      <NumberInput label="With error" mode="POSITIVE_INTEGERS" error="Required" />
    </div>
  ),
};
