import type { Meta, StoryObj, Decorator } from "@storybook/react";
import React from "react";
import { Tabs } from "@/components/layout/tabs";
import { BarChart2, Settings, Users } from "lucide-react";

const withBackground: Decorator = (Story) => (
  <div className="bg-[var(--color-canvas)] min-h-16 p-4 rounded-[var(--radius-md)]">
    <Story />
  </div>
);

const meta: Meta<typeof Tabs> = {
  title: "Layout/Tabs",
  component: Tabs,
  parameters: { layout: "padded" },
  decorators: [withBackground],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const items = [
  { value: "overview", label: "Overview", content: <p className="pt-4 text-sm text-[var(--color-subtle)]">Overview panel content.</p> },
  { value: "activity", label: "Activity", content: <p className="pt-4 text-sm text-[var(--color-subtle)]">Activity panel content.</p> },
  { value: "settings", label: "Settings", content: <p className="pt-4 text-sm text-[var(--color-subtle)]">Settings panel content.</p> },
];

export const Default: Story = {
  args: { items, defaultValue: "overview" },
};

export const Pill: Story = {
  args: { items, variant: "pill", defaultValue: "overview" },
};

export const Box: Story = {
  args: { items, variant: "box", defaultValue: "overview" },
};

export const WithIcons: Story = {
  args: {
    defaultValue: "overview",
    items: [
      {
        value: "overview",
        label: <><BarChart2 className="h-3.5 w-3.5" />Overview</>,
        content: <p className="pt-4 text-sm text-[var(--color-subtle)]">Overview panel content.</p>,
      },
      {
        value: "members",
        label: <><Users className="h-3.5 w-3.5" />Members</>,
        content: <p className="pt-4 text-sm text-[var(--color-subtle)]">Members panel content.</p>,
      },
      {
        value: "settings",
        label: <><Settings className="h-3.5 w-3.5" />Settings</>,
        content: <p className="pt-4 text-sm text-[var(--color-subtle)]">Settings panel content.</p>,
      },
    ],
  },
};

export const WithDisabled: Story = {
  args: {
    defaultValue: "overview",
    items: [
      { value: "overview", label: "Overview", content: <p className="pt-4 text-sm text-[var(--color-subtle)]">Overview panel content.</p> },
      { value: "activity", label: "Activity", content: <p className="pt-4 text-sm text-[var(--color-subtle)]">Activity panel content.</p> },
      { value: "billing", label: "Billing", content: <p className="pt-4 text-sm text-[var(--color-subtle)]">Billing panel content.</p>, disabled: true },
    ],
  },
};

export const PillWithIcons: Story = {
  args: {
    variant: "pill",
    defaultValue: "overview",
    items: [
      {
        value: "overview",
        label: <><BarChart2 className="h-3.5 w-3.5" />Overview</>,
        content: <p className="pt-4 text-sm text-[var(--color-subtle)]">Overview panel content.</p>,
      },
      {
        value: "members",
        label: <><Users className="h-3.5 w-3.5" />Members</>,
        content: <p className="pt-4 text-sm text-[var(--color-subtle)]">Members panel content.</p>,
      },
      {
        value: "settings",
        label: <><Settings className="h-3.5 w-3.5" />Settings</>,
        content: <p className="pt-4 text-sm text-[var(--color-subtle)]">Settings panel content.</p>,
      },
    ],
  },
};
