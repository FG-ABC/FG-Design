import type { Meta, StoryObj } from "@storybook/react";
import { CreatableAutocomplete } from "@/components/form/creatable-autocomplete";
import * as React from "react";

const CATEGORIES = [
  { label: "Design", value: "design" },
  { label: "Engineering", value: "engineering" },
  { label: "Marketing", value: "marketing" },
  { label: "Sales", value: "sales" },
  { label: "Operations", value: "operations" },
];

const meta: Meta<typeof CreatableAutocomplete> = {
  title: "Form/CreatableAutocomplete",
  component: CreatableAutocomplete,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [(Story) => <div className="w-80"><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof CreatableAutocomplete>;

export const Default: Story = {
  args: { label: "Category", options: CATEGORIES, placeholder: "Search or create…" },
};

export const WithValue: Story = {
  args: { label: "Category", options: CATEGORIES, value: "design" },
};

export const CustomValue: Story = {
  args: { label: "Category", options: CATEGORIES, value: "My Custom Category" },
};

export const NoBaseOptions: Story = {
  args: {
    label: "Status",
    options: [],
    placeholder: "Type to create a status…",
    hint: "Type anything and press Enter to create it.",
  },
};

export const WithError: Story = {
  args: { label: "Category", options: CATEGORIES, error: "Please select or create a category." },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState<string | null>(null);
    return (
      <div className="flex flex-col gap-3 w-80">
        <CreatableAutocomplete label="Category" options={CATEGORIES} value={value} onChange={setValue} />
        <p className="text-sm text-[var(--color-subtle)]">Value: {value ?? "none"}</p>
      </div>
    );
  },
};
