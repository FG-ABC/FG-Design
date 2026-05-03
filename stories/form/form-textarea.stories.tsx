import type { Meta, StoryObj } from "@storybook/react";
import { FormTextarea } from "@/components/form/form-textarea";

const meta: Meta<typeof FormTextarea> = {
  title: "Form/FormTextarea",
  component: FormTextarea,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FormTextarea>;

export const Default: Story = {
  args: {
    label: "Message",
    placeholder: "Type your message…",
  },
};

export const WithHint: Story = {
  args: {
    label: "Notes",
    placeholder: "Add any additional notes…",
    hint: "Internal use only — not visible to the client.",
    rows: 4,
  },
};

export const WithError: Story = {
  args: {
    label: "Description",
    defaultValue: "",
    error: "Description is required.",
  },
};

export const Disabled: Story = {
  args: {
    label: "Summary",
    defaultValue: "This has been auto-generated and cannot be edited.",
    disabled: true,
  },
};
