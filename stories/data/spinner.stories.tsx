import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "@/components/data/spinner";

const meta: Meta<typeof Spinner> = {
  title: "Data/Spinner",
  component: Spinner,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    label: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {};

export const WithLabel: Story = { args: { label: "Loading…" } };

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-8 p-8">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
};
