import type { Meta, StoryObj } from "@storybook/react";
import { Autocomplete } from "@/components/form/autocomplete";
import * as React from "react";

const FRUITS = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
  { label: "Dragonfruit", value: "dragonfruit" },
  { label: "Elderberry", value: "elderberry" },
  { label: "Fig", value: "fig" },
  { label: "Grape", value: "grape" },
  { label: "Honeydew", value: "honeydew" },
];

const meta: Meta<typeof Autocomplete> = {
  title: "Form/Autocomplete",
  component: Autocomplete,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [(Story) => <div className="w-80"><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Autocomplete>;

export const Default: Story = {
  args: { label: "Fruit", options: FRUITS, placeholder: "Search fruits…" },
};

export const WithValue: Story = {
  args: { label: "Fruit", options: FRUITS, value: "cherry" },
};

export const WithHint: Story = {
  args: {
    label: "Fruit",
    options: FRUITS,
    hint: "Pick your favourite.",
    placeholder: "Search fruits…",
  },
};

export const WithError: Story = {
  args: { label: "Fruit", options: FRUITS, error: "Please select a fruit.", placeholder: "Search fruits…" },
};

export const Disabled: Story = {
  args: { label: "Fruit", options: FRUITS, value: "apple", disabled: true },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState<string | null>(null);
    return (
      <div className="flex flex-col gap-3 w-80">
        <Autocomplete label="Fruit" options={FRUITS} value={value} onChange={setValue} />
        <p className="text-sm text-[var(--color-subtle)]">Selected: {value ?? "none"}</p>
      </div>
    );
  },
};
