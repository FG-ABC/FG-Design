import type { Meta, StoryObj } from "@storybook/react";
import { StatCard } from "@/components/data/stat-card";
import { Users } from "lucide-react";

const meta: Meta<typeof StatCard> = {
  title: "Data/StatCard",
  component: StatCard,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [(Story) => <div className="w-72"><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof StatCard>;

export const Default: Story = {
  args: { label: "Total users", value: "12,482" },
};

export const WithDelta: Story = {
  args: { label: "Monthly revenue", value: "$48,392", delta: 12.4, deltaLabel: "vs last month" },
};

export const WithIcon: Story = {
  args: {
    label: "Active users",
    value: "3,841",
    delta: 8.1,
    deltaLabel: "this week",
    icon: <Users className="h-5 w-5" />,
  },
};

export const Negative: Story = {
  args: { label: "Churn rate", value: "2.3%", delta: -0.4, deltaLabel: "vs last month" },
};
