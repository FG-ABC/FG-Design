import type { Meta, StoryObj } from "@storybook/react";
import { Toaster, toast } from "@/components/feedback/toast";
import { Button } from "@/components/core/button";

const meta: Meta = {
  title: "Feedback/Toast",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster position="bottom-right" />
      </>
    ),
  ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Button variant="outline" onClick={() => toast("Changes saved")}>
      Show toast
    </Button>
  ),
};

export const Success: Story = {
  render: () => (
    <Button onClick={() => toast.success("File uploaded successfully")}>
      Success
    </Button>
  ),
};

export const Error: Story = {
  render: () => (
    <Button variant="danger" onClick={() => toast.error("Something went wrong")}>
      Error
    </Button>
  ),
};

export const Warning: Story = {
  render: () => (
    <Button variant="outline" onClick={() => toast.warning("Low disk space — 2 GB remaining")}>
      Warning
    </Button>
  ),
};

export const Info: Story = {
  render: () => (
    <Button variant="outline" onClick={() => toast.info("A new version is available")}>
      Info
    </Button>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <Button onClick={() => toast.success("File uploaded", { description: "report-q4.pdf · 2.4 MB" })}>
      With description
    </Button>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Button
      onClick={() =>
        toast("Row deleted", {
          description: "This can be undone within 5 seconds.",
          action: { label: "Undo", onClick: () => toast.success("Restored") },
        })
      }
    >
      With action
    </Button>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" onClick={() => toast("Default message")}>Default</Button>
      <Button onClick={() => toast.success("Success!")}>Success</Button>
      <Button variant="danger" onClick={() => toast.error("Error!")}>Error</Button>
      <Button variant="outline" onClick={() => toast.warning("Warning!")}>Warning</Button>
      <Button variant="outline" onClick={() => toast.info("Info!")}>Info</Button>
    </div>
  ),
};
