import type { Meta, StoryObj } from "@storybook/react";
import { Toggle } from "@/components/core/toggle";

const meta: Meta<typeof Toggle> = {
  title: "Core/Toggle",
  component: Toggle,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md"] },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = { args: { label: "Enable notifications" } };

export const Checked: Story = { args: { label: "Enabled", defaultChecked: true } };

export const BothSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-6">
      <Toggle size="sm" label="Small toggle" />
      <Toggle size="md" label="Medium toggle" defaultChecked />
    </div>
  ),
};
