import type { Meta, StoryObj } from "@storybook/react";
import { FormSelect } from "@/components/form/form-select";
import * as React from "react";

const COUNTRIES = [
  { label: "Philippines", value: "ph" },
  { label: "United States", value: "us" },
  { label: "Japan", value: "jp" },
  { label: "Germany", value: "de" },
  { label: "Brazil", value: "br" },
];

const meta: Meta<typeof FormSelect> = {
  title: "Form/FormSelect",
  component: FormSelect,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [(Story) => <div className="w-80"><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof FormSelect>;

export const Default: Story = {
  args: { label: "Country", options: COUNTRIES, placeholder: "Select a country…" },
};

export const WithValue: Story = {
  args: { label: "Country", options: COUNTRIES, value: "ph" },
};

export const WithHint: Story = {
  args: {
    label: "Country",
    options: COUNTRIES,
    hint: "Used to determine your local tax rate.",
    placeholder: "Select a country…",
  },
};

export const WithError: Story = {
  args: {
    label: "Country",
    options: COUNTRIES,
    error: "Please select a country.",
    placeholder: "Select a country…",
  },
};

export const Disabled: Story = {
  args: { label: "Country", options: COUNTRIES, value: "jp", disabled: true },
};
