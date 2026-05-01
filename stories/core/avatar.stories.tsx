import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "@/components/core/avatar";

const meta: Meta<typeof Avatar> = {
  title: "Core/Avatar",
  component: Avatar,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const WithFallback: Story = {
  args: { alt: "Francis Glenn", size: "md" },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-end gap-3 p-6">
      <Avatar alt="Francis Glenn" size="xs" />
      <Avatar alt="Francis Glenn" size="sm" />
      <Avatar alt="Francis Glenn" size="md" />
      <Avatar alt="Francis Glenn" size="lg" />
      <Avatar alt="Francis Glenn" size="xl" />
    </div>
  ),
};
