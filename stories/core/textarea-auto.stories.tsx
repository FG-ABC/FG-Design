import type { Meta, StoryObj } from "@storybook/react";
import { TextareaAuto } from "@/components/core/textarea-auto";

const meta: Meta<typeof TextareaAuto> = {
  title: "Core/TextareaAuto",
  component: TextareaAuto,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    minRows: { control: "number" },
    maxRows: { control: "number" },
  },
};

export default meta;
type Story = StoryObj<typeof TextareaAuto>;

export const Default: Story = {
  args: {
    label: "Message",
    placeholder: "Type something…",
  },
};

export const WithHint: Story = {
  args: {
    label: "Bio",
    placeholder: "Tell us about yourself",
    hint: "Press Enter for a new line. Grows as you type.",
  },
};

export const WithError: Story = {
  args: {
    label: "Notes",
    placeholder: "Add notes…",
    defaultValue: "Some content",
    error: "This field is required.",
  },
};

export const MaxRows: Story = {
  args: {
    label: "Capped at 5 lines",
    placeholder: "Type a lot of text to see the max…",
    maxRows: 5,
  },
};

export const Disabled: Story = {
  args: {
    label: "Read-only note",
    defaultValue: "This content cannot be edited.",
    disabled: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-md">
      <TextareaAuto label="Default" placeholder="Grows as you type" />
      <TextareaAuto
        label="With hint"
        placeholder="With hint text"
        hint="Expands with content, no resize handle."
      />
      <TextareaAuto
        label="With error"
        defaultValue="Invalid input"
        error="This field cannot be empty."
      />
      <TextareaAuto label="Disabled" defaultValue="Cannot edit this." disabled />
      <TextareaAuto label="Max 4 rows" placeholder="Scrolls after 4 lines" maxRows={4} />
    </div>
  ),
};
