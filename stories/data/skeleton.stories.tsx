import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "@/components/data/skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Data/Skeleton",
  component: Skeleton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = { args: { className: "h-16 w-64" } };

export const CardSkeleton: Story = {
  render: () => (
    <div className="w-80 p-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] space-y-4">
      <div className="flex items-center gap-3">
        <Skeleton shape="circle" className="h-10 w-10" />
        <div className="space-y-2 flex-1">
          <Skeleton shape="text" className="w-3/4" />
          <Skeleton shape="text" className="w-1/2 h-3" />
        </div>
      </div>
      <Skeleton className="h-28 w-full" />
      <div className="space-y-2">
        <Skeleton shape="text" />
        <Skeleton shape="text" className="w-5/6" />
        <Skeleton shape="text" className="w-4/6" />
      </div>
    </div>
  ),
};
