import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup } from "@/components/core/radio-group";

const meta: Meta<typeof RadioGroup> = {
  title: "Core/RadioGroup",
  component: RadioGroup,
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
type Story = StoryObj<typeof RadioGroup>;

const baseOptions = [
  { label: "Free", value: "free" },
  { label: "Pro", value: "pro" },
  { label: "Enterprise", value: "enterprise" },
];

export const Default: Story = {
  args: {
    options: baseOptions,
    defaultValue: "free",
  },
};

export const Horizontal: Story = {
  args: {
    options: baseOptions,
    defaultValue: "pro",
    orientation: "horizontal",
  },
};

export const WithDescriptions: Story = {
  args: {
    options: [
      { label: "Free", value: "free", description: "Up to 3 projects, 1 seat" },
      { label: "Pro", value: "pro", description: "Unlimited projects, 10 seats" },
      { label: "Enterprise", value: "enterprise", description: "Custom limits, SSO, audit logs" },
    ],
    defaultValue: "pro",
  },
};

export const WithDisabledOption: Story = {
  args: {
    options: [
      { label: "Free", value: "free" },
      { label: "Pro", value: "pro" },
      { label: "Enterprise", value: "enterprise", disabled: true, description: "Contact sales" },
    ],
    defaultValue: "pro",
  },
};

export const FullyDisabled: Story = {
  args: {
    options: baseOptions,
    defaultValue: "free",
    disabled: true,
  },
};
