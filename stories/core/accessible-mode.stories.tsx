import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { AccessibleModeProvider, useAccessibleMode } from "@/components/core/accessible-mode";
import { Button } from "@/components/core/button";
import { Input } from "@/components/core/input";
import { Badge } from "@/components/core/badge";

function Toggle() {
  const { accessibleMode, setAccessibleMode } = useAccessibleMode();
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setAccessibleMode(!accessibleMode)}
    >
      Accessible mode: {accessibleMode ? "ON" : "OFF"}
    </Button>
  );
}

function Demo() {
  return (
    <div className="flex flex-col gap-6 w-96">
      <Toggle />
      <Input label="Full name" placeholder="Jane Smith" hint="As it appears on your ID." />
      <Input label="Email" placeholder="jane@example.com" />
      <div className="flex gap-2 flex-wrap">
        <Button>Save changes</Button>
        <Button variant="outline">Cancel</Button>
        <Button variant="danger">Delete</Button>
      </div>
      <div className="flex gap-2">
        <Badge>Active</Badge>
        <Badge variant="success">Verified</Badge>
        <Badge variant="warning">Pending</Badge>
      </div>
    </div>
  );
}

const meta: Meta = {
  title: "Core/AccessibleMode",
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <AccessibleModeProvider>
        <Story />
      </AccessibleModeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <Demo />,
};
