import type { Meta, StoryObj } from "@storybook/react";
import { MoneyInput } from "@/components/core/money-input";
import * as React from "react";

const meta: Meta<typeof MoneyInput> = {
  title: "Form/MoneyInput",
  component: MoneyInput,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [(Story) => <div className="w-80"><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof MoneyInput>;

export const Default: Story = {
  args: { label: "Amount", placeholder: "0.00" },
};

export const WithValue: Story = {
  args: { label: "Price", value: 1234567.89, currencySymbol: "$" },
};

export const PhilippinePeso: Story = {
  args: { label: "Amount", value: 99500, currencySymbol: "₱", maxDecimals: 2 },
};

export const Euro: Story = {
  args: { label: "Amount", value: 2500.5, currencySymbol: "€" },
};

export const WithError: Story = {
  args: { label: "Budget", value: 0, error: "Amount must be greater than zero.", currencySymbol: "$" },
};

export const WithHint: Story = {
  args: { label: "Bid price", hint: "Enter the maximum you're willing to pay.", currencySymbol: "$" },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <MoneyInput label="USD" value={1234.56} currencySymbol="$" />
      <MoneyInput label="PHP" value={99500} currencySymbol="₱" />
      <MoneyInput label="No decimals" value={5000} currencySymbol="$" maxDecimals={0} />
      <MoneyInput label="With error" value={0} currencySymbol="$" error="Required" />
    </div>
  ),
};
