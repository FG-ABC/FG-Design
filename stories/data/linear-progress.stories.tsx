import type { Meta, StoryObj } from "@storybook/react";
import { LinearProgress } from "@/components/data/linear-progress";

const meta: Meta<typeof LinearProgress> = {
  title: "Data/LinearProgress",
  component: LinearProgress,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [(Story) => <div className="w-96"><Story /></div>],
  argTypes: {
    visible: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof LinearProgress>;

export const Default: Story = { args: { visible: true } };

export const Hidden: Story = { args: { visible: false } };
