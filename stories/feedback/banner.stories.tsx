import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Banner } from "@/components/feedback/banner";

const meta: Meta<typeof Banner> = {
  title: "Feedback/Banner",
  component: Banner,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [(Story) => <div className="w-[480px]"><Story /></div>],
  argTypes: {
    variant: { control: "select", options: ["info", "success", "warning", "danger"] },
  },
};

export default meta;
type Story = StoryObj<typeof Banner>;

export const Info: Story = {
  args: { variant: "info", title: "Heads up", children: "This action will affect all members." },
};

export const Success: Story = {
  args: { variant: "success", title: "Changes saved", children: "Your profile has been updated." },
};

export const Warning: Story = {
  args: { variant: "warning", title: "Slot fully booked", children: "Join the waitlist to be notified when a spot opens." },
};

export const Danger: Story = {
  args: { variant: "danger", title: "Something went wrong", children: "We could not process your request. Please try again." },
};

export const WithAction: Story = {
  args: {
    variant: "warning",
    title: "This slot is fully booked.",
    action: { label: "Join Waitlist", onClick: () => {} },
  },
};

export const WithLoadingAction: Story = {
  args: {
    variant: "warning",
    title: "This slot is fully booked.",
    action: { label: "Join Waitlist", onClick: () => {}, loading: true },
  },
};

export const TitleOnly: Story = {
  args: { variant: "success", title: "You're #3 on the waitlist." },
};

export const AllVariants: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Banner variant="info" title="Info">Informational message.</Banner>
      <Banner variant="success" title="Success">Operation completed.</Banner>
      <Banner variant="warning" title="Warning">Something needs attention.</Banner>
      <Banner variant="danger" title="Error">Something went wrong.</Banner>
    </div>
  ),
};

export const WaitlistFlow: StoryObj = {
  render: () => {
    const [state, setS] = React.useState<"idle" | "loading" | "joined">("idle");

    const handleJoin = () => {
      setS("loading");
      setTimeout(() => setS("joined"), 1500);
    };

    if (state === "joined") {
      return <Banner variant="success" title="You're #4 on the waitlist." />;
    }

    return (
      <Banner
        variant="warning"
        title="This slot is fully booked."
        action={{ label: "Join Waitlist", onClick: handleJoin, loading: state === "loading" }}
      />
    );
  },
};
