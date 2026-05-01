import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "@/components/feedback/tooltip";
import { Button } from "@/components/core/button";

const meta: Meta = {
  title: "Feedback/Tooltip",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Tooltip content="This is a helpful tooltip">
      <Button variant="outline">Hover me</Button>
    </Tooltip>
  ),
};

export const AllSides: Story = {
  render: () => (
    <div className="flex items-center gap-6 p-16">
      <Tooltip content="Top tooltip" side="top">
        <Button variant="outline" size="sm">Top</Button>
      </Tooltip>
      <Tooltip content="Bottom tooltip" side="bottom">
        <Button variant="outline" size="sm">Bottom</Button>
      </Tooltip>
      <Tooltip content="Left tooltip" side="left">
        <Button variant="outline" size="sm">Left</Button>
      </Tooltip>
      <Tooltip content="Right tooltip" side="right">
        <Button variant="outline" size="sm">Right</Button>
      </Tooltip>
    </div>
  ),
};
