import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { ThemeProvider, useTheme } from "@/components/core/theme";
import { Button } from "@/components/core/button";
import { Badge } from "@/components/core/badge";
import { Text, Heading, Caption } from "@/components/core/typography";
import { Input } from "@/components/core/input";
import { Toggle } from "@/components/core/toggle";

const meta: Meta = {
  title: "Core/Theme",
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;

function ThemeToggleDemo() {
  const { resolvedTheme, setTheme, theme } = useTheme();

  return (
    <div className="flex flex-col gap-6 max-w-md p-6 rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border)]">
      <div className="flex items-center justify-between">
        <div>
          <Heading level={3}>Theme demo</Heading>
          <Caption>Current: {theme} → {resolvedTheme}</Caption>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => setTheme("light")}>Light</Button>
          <Button size="sm" variant="outline" onClick={() => setTheme("dark")}>Dark</Button>
          <Button size="sm" variant="outline" onClick={() => setTheme("system")}>System</Button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Input label="Name" placeholder="Francis Glenn" />
        <Input label="Email" placeholder="fg@oboda.ai" />
      </div>

      <div className="flex gap-2 flex-wrap">
        <Button>Primary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
      </div>

      <div className="flex gap-2 flex-wrap">
        <Badge variant="default">Default</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="danger">Danger</Badge>
        <Badge variant="info">Info</Badge>
      </div>

      <div className="flex items-center gap-3">
        <Toggle defaultChecked />
        <Text size="sm">Toggle</Text>
      </div>
    </div>
  );
}

export const Default: StoryObj = {
  name: "Theme toggle",
  render: () => (
    <ThemeProvider defaultTheme="light">
      <ThemeToggleDemo />
    </ThemeProvider>
  ),
};
