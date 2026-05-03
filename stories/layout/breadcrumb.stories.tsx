import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Slash } from "lucide-react";

const meta: Meta<typeof Breadcrumb> = {
  title: "Layout/Breadcrumb",
  component: Breadcrumb,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

const items = [
  { label: "Home", href: "/" },
  { label: "Settings", href: "/settings" },
  { label: "Team" },
];

export const Default: Story = {
  args: { items },
};

export const DeepPath: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Projects", href: "/projects" },
      { label: "Design System", href: "/projects/design-system" },
      { label: "Components", href: "/projects/design-system/components" },
      { label: "Breadcrumb" },
    ],
  },
};

export const WithMaxItems: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Projects", href: "/projects" },
      { label: "Design System", href: "/projects/design-system" },
      { label: "Components", href: "/projects/design-system/components" },
      { label: "Breadcrumb" },
    ],
    maxItems: 3,
  },
};

export const CustomSeparator: Story = {
  args: {
    items,
    separator: <Slash className="h-3 w-3 text-[var(--color-muted)]" />,
  },
};

export const NoLinks: Story = {
  args: {
    items: [
      { label: "Home" },
      { label: "Settings" },
      { label: "Profile" },
    ],
  },
};
