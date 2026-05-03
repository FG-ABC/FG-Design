import type { Meta, StoryObj } from "@storybook/react";
import { CreatableMultiAutocomplete } from "@/components/form/creatable-multi-autocomplete";
import * as React from "react";

const TAGS = [
  { label: "Design", value: "design" },
  { label: "Engineering", value: "engineering" },
  { label: "Marketing", value: "marketing" },
  { label: "Sales", value: "sales" },
  { label: "Operations", value: "operations" },
];

const meta: Meta<typeof CreatableMultiAutocomplete> = {
  title: "Form/CreatableMultiAutocomplete",
  component: CreatableMultiAutocomplete,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [(Story) => <div className="w-80"><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof CreatableMultiAutocomplete>;

export const Default: Story = {
  args: { label: "Tags", options: TAGS, placeholder: "Search or create tags…" },
};

export const WithValue: Story = {
  args: { label: "Tags", options: TAGS, value: ["design", "My Custom Tag"] },
};

export const NoBaseOptions: Story = {
  args: {
    label: "Labels",
    options: [],
    placeholder: "Type to create labels…",
    hint: "Press Enter or click to add a new label.",
  },
};

export const WithError: Story = {
  args: { label: "Tags", options: TAGS, value: [], error: "At least one tag is required." },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState<string[]>(["design"]);
    return (
      <div className="flex flex-col gap-3 w-80">
        <CreatableMultiAutocomplete
          label="Tags"
          options={TAGS}
          value={value}
          onChange={setValue}
          hint="Type a new tag and press Enter to create it."
        />
        <p className="text-sm text-[var(--color-subtle)]">Values: {value.join(", ") || "none"}</p>
      </div>
    );
  },
};
