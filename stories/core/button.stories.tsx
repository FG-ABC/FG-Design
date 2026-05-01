import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/core/button";
import { Mail, Plus } from "lucide-react";

const meta: Meta<typeof Button> = {
  title: "Core/Button",
  component: Button,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "ghost", "outline", "danger", "link"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "icon"],
    },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { children: "Get started", variant: "primary", size: "md" },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3 p-6">
      <Button variant="primary">Primary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3 p-6">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="icon" aria-label="Add"><Plus className="h-4 w-4" /></Button>
    </div>
  ),
};

export const WithIcon: Story = {
  args: { children: "Send email", variant: "primary" },
  render: (args) => (
    <Button {...args}>
      <Mail className="h-4 w-4" />
      {args.children}
    </Button>
  ),
};

export const Loading: Story = {
  args: { children: "Saving…", variant: "primary", loading: true },
};
