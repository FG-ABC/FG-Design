import type { Meta, StoryObj } from "@storybook/react";
import { MultiAutocomplete } from "@/components/form/multi-autocomplete";
import * as React from "react";

const SKILLS = [
  { label: "TypeScript", value: "typescript" },
  { label: "React", value: "react" },
  { label: "Node.js", value: "nodejs" },
  { label: "PostgreSQL", value: "postgres" },
  { label: "GraphQL", value: "graphql" },
  { label: "Docker", value: "docker" },
  { label: "Kubernetes", value: "kubernetes" },
  { label: "Rust", value: "rust" },
];

const meta: Meta<typeof MultiAutocomplete> = {
  title: "Form/MultiAutocomplete",
  component: MultiAutocomplete,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [(Story) => <div className="w-80"><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof MultiAutocomplete>;

export const Default: Story = {
  args: { label: "Skills", options: SKILLS, placeholder: "Search skills…" },
};

export const WithValue: Story = {
  args: { label: "Skills", options: SKILLS, value: ["typescript", "react", "nodejs"] },
};

export const WithError: Story = {
  args: {
    label: "Skills",
    options: SKILLS,
    value: [],
    error: "Select at least one skill.",
    placeholder: "Search skills…",
  },
};

export const WithHint: Story = {
  args: {
    label: "Skills",
    options: SKILLS,
    hint: "Select all that apply. You can paste a comma-separated list.",
    placeholder: "Search skills…",
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState<string[]>(["react"]);
    return (
      <div className="flex flex-col gap-3 w-80">
        <MultiAutocomplete label="Skills" options={SKILLS} value={value} onChange={setValue} />
        <p className="text-sm text-[var(--color-subtle)]">Selected: {value.join(", ") || "none"}</p>
      </div>
    );
  },
};
