import type { Meta, StoryObj } from "@storybook/react";
import { FormCheckbox } from "@/components/form/form-checkbox";

const meta: Meta<typeof FormCheckbox> = {
  title: "Form/FormCheckbox",
  component: FormCheckbox,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof FormCheckbox>;

export const Default: Story = {
  args: {
    label: "I agree to the terms and conditions",
  },
};

export const Checked: Story = {
  args: {
    label: "Subscribe to newsletter",
    defaultChecked: true,
  },
};

export const WithHint: Story = {
  args: {
    label: "Enable notifications",
    hint: "We'll only send important updates.",
  },
};

export const WithError: Story = {
  args: {
    label: "I agree to the terms and conditions",
    error: "You must accept the terms to continue.",
  },
};

export const Disabled: Story = {
  args: {
    label: "Option unavailable",
    disabled: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <FormCheckbox label="Default (unchecked)" />
      <FormCheckbox label="Checked" defaultChecked />
      <FormCheckbox label="With hint" hint="This is a helpful hint." />
      <FormCheckbox label="With error" error="This field is required." />
      <FormCheckbox label="Disabled" disabled />
      <FormCheckbox label="Disabled + checked" disabled defaultChecked />
    </div>
  ),
};
