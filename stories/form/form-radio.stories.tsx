import type { Meta, StoryObj } from "@storybook/react";
import { FormRadio } from "@/components/form/form-radio";

const meta: Meta<typeof FormRadio> = {
  title: "Form/FormRadio",
  component: FormRadio,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["vertical", "horizontal"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormRadio>;

const options = [
  { label: "Monthly", value: "monthly" },
  { label: "Yearly", value: "yearly", description: "Save 20%" },
  { label: "Lifetime", value: "lifetime", description: "One-time payment" },
];

export const Default: Story = {
  args: {
    label: "Billing cycle",
    options,
    value: "monthly",
  },
};

export const WithHint: Story = {
  args: {
    label: "Billing cycle",
    hint: "You can change this at any time.",
    options,
    value: "monthly",
  },
};

export const WithError: Story = {
  args: {
    label: "Billing cycle",
    error: "Please select a billing cycle.",
    options,
  },
};

export const Horizontal: Story = {
  args: {
    label: "Size",
    options: [
      { label: "Small", value: "sm" },
      { label: "Medium", value: "md" },
      { label: "Large", value: "lg" },
    ],
    value: "md",
    orientation: "horizontal",
  },
};
