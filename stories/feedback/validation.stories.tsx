import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { ValidationList, ValidationItem } from "@/components/feedback/validation";
import { Input } from "@/components/core/input";

const meta: Meta = {
  title: "Feedback/ValidationList",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;

export const AllPassing: StoryObj = {
  render: () => (
    <ValidationList>
      <ValidationItem valid={true}>At least 8 characters</ValidationItem>
      <ValidationItem valid={true}>One uppercase letter</ValidationItem>
      <ValidationItem valid={true}>One number</ValidationItem>
    </ValidationList>
  ),
};

export const AllFailing: StoryObj = {
  render: () => (
    <ValidationList>
      <ValidationItem valid={false}>At least 8 characters</ValidationItem>
      <ValidationItem valid={false}>One uppercase letter</ValidationItem>
      <ValidationItem valid={false}>One number</ValidationItem>
    </ValidationList>
  ),
};

export const LiveExample: StoryObj = {
  render: () => {
    const [password, setPassword] = React.useState("");
    return (
      <div className="flex flex-col gap-3 w-72">
        <Input
          label="Password"
          type="password"
          placeholder="Enter password…"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <ValidationList>
          <ValidationItem valid={password.length >= 8}>At least 8 characters</ValidationItem>
          <ValidationItem valid={/[A-Z]/.test(password)}>One uppercase letter</ValidationItem>
          <ValidationItem valid={/[0-9]/.test(password)}>One number</ValidationItem>
        </ValidationList>
      </div>
    );
  },
};
