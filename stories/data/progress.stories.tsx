import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "@/components/data/progress";

const meta: Meta<typeof Progress> = {
  title: "Data/Progress",
  component: Progress,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [(Story) => <div className="w-80"><Story /></div>],
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100 } },
    size: { control: "select", options: ["sm", "md", "lg"] },
    color: { control: "select", options: ["accent", "success", "warning", "danger"] },
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = { args: { value: 60 } };

export const AllColors: Story = {
  render: () => (
    <div className="flex flex-col gap-3 p-6 w-80">
      <Progress value={75} color="accent" />
      <Progress value={90} color="success" />
      <Progress value={45} color="warning" />
      <Progress value={20} color="danger" />
    </div>
  ),
};
