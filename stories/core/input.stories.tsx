import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "@/components/core/input";
import { Mail, Search } from "lucide-react";

const meta: Meta<typeof Input> = {
  title: "Core/Input",
  component: Input,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [(Story) => <div className="w-80"><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: { placeholder: "Enter your email…" },
};

export const WithLabel: Story = {
  args: { label: "Email address", placeholder: "you@example.com" },
};

export const WithHint: Story = {
  args: { label: "Username", placeholder: "fglenn", hint: "Used for your public profile URL." },
};

export const WithError: Story = {
  args: { label: "Email", placeholder: "you@example.com", error: "Please enter a valid email address." },
};

export const WithAdornments: Story = {
  args: {
    label: "Search",
    placeholder: "Search anything…",
    leftAdornment: <Search className="h-4 w-4" />,
  },
};

export const WithRightAdornment: Story = {
  args: {
    label: "Email",
    placeholder: "you@example.com",
    leftAdornment: <Mail className="h-4 w-4" />,
  },
};
