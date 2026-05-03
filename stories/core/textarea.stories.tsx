import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "@/components/core/textarea";

const meta: Meta<typeof Textarea> = {
  title: "Core/Textarea",
  component: Textarea,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  argTypes: {
    resize: {
      control: "select",
      options: ["none", "vertical", "horizontal", "both"],
    },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    label: "Description",
    placeholder: "Write something…",
  },
};

export const WithHint: Story = {
  args: {
    label: "Bio",
    placeholder: "Tell us about yourself",
    hint: "Keep it under 160 characters.",
    rows: 3,
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

export const NoResize: Story = {
  args: {
    label: "Fixed height",
    placeholder: "Cannot be resized",
    resize: "none",
    rows: 4,
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
      <Textarea label="Default" placeholder="Default textarea" />
      <Textarea
        label="With hint"
        placeholder="With hint text"
        hint="Up to 500 characters allowed."
      />
      <Textarea
        label="With error"
        defaultValue="Invalid input"
        error="This field cannot be empty."
      />
      <Textarea label="Disabled" defaultValue="Cannot edit this." disabled />
    </div>
  ),
};
