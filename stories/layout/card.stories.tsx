import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/layout/card";
import { Button } from "@/components/core/button";

const meta: Meta<typeof Card> = {
  title: "Layout/Card",
  component: Card,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [(Story) => <div className="w-96"><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Simple: Story = {
  args: { children: "Card content goes here." },
};

export const WithSections: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Account settings</CardTitle>
        <CardDescription>Manage your account preferences and security.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-[var(--color-base)]">Update your profile details below.</p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="outline" size="sm">Cancel</Button>
        <Button size="sm">Save changes</Button>
      </CardFooter>
    </Card>
  ),
};
