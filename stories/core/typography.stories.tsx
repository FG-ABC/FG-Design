import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Display, Heading, Text, Caption, LinkText } from "@/components/core/typography";

const meta: Meta = {
  title: "Core/Typography",
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;

// ─── Type scale ───────────────────────────────────────────────────────────────

export const TypeScale: StoryObj = {
  name: "Type scale",
  render: () => (
    <div className="flex flex-col gap-8 max-w-2xl">
      {/* Display */}
      <div className="flex flex-col gap-4">
        <Caption tone="subtle" className="uppercase tracking-widest">Display</Caption>
        <Display size="lg">Display Large</Display>
        <Display size="md">Display Medium</Display>
        <Display size="sm">Display Small</Display>
      </div>

      {/* Headings */}
      <div className="flex flex-col gap-3">
        <Caption tone="subtle" className="uppercase tracking-widest">Headings</Caption>
        <Heading level={1}>Heading 1 — 30px</Heading>
        <Heading level={2}>Heading 2 — 24px</Heading>
        <Heading level={3}>Heading 3 — 20px</Heading>
        <Heading level={4}>Heading 4 — 18px</Heading>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-3">
        <Caption tone="subtle" className="uppercase tracking-widest">Text</Caption>
        <Text size="lg">Body Large — 18px. The quick brown fox jumps over the lazy dog.</Text>
        <Text size="base">Body Base — 15px. The quick brown fox jumps over the lazy dog.</Text>
        <Text size="sm">Body Small — 13px. The quick brown fox jumps over the lazy dog.</Text>
        <Text size="xs">Body XS — 12px. The quick brown fox jumps over the lazy dog.</Text>
      </div>

      {/* Caption */}
      <div className="flex flex-col gap-2">
        <Caption tone="subtle" className="uppercase tracking-widest">Caption</Caption>
        <Caption>Default muted — timestamps, metadata, labels</Caption>
        <Caption tone="subtle">Subtle — secondary annotations</Caption>
        <Caption tone="danger">Danger — validation messages</Caption>
        <Caption tone="success">Success — confirmation hints</Caption>
        <Caption tone="accent">Accent — highlighted annotations</Caption>
      </div>

      {/* Links */}
      <div className="flex flex-col gap-2">
        <Caption tone="subtle" className="uppercase tracking-widest">LinkText</Caption>
        <Text>
          Read the{" "}
          <LinkText href="#">documentation</LinkText>
          {" "}for more details.
        </Text>
        <Text>
          View source on{" "}
          <LinkText href="https://github.com" external>GitHub</LinkText>.
        </Text>
      </div>
    </div>
  ),
};

// ─── Display ─────────────────────────────────────────────────────────────────

export const DisplaySizes: StoryObj = {
  name: "Display — sizes",
  render: () => (
    <div className="flex flex-col gap-6">
      <Display size="lg">The future of design</Display>
      <Display size="md">The future of design</Display>
      <Display size="sm">The future of design</Display>
    </div>
  ),
};

// ─── Heading ─────────────────────────────────────────────────────────────────

export const HeadingLevels: StoryObj = {
  name: "Heading — levels",
  render: () => (
    <div className="flex flex-col gap-4">
      <Heading level={1}>Account settings</Heading>
      <Heading level={2}>Personal information</Heading>
      <Heading level={3}>Contact details</Heading>
      <Heading level={4}>Notification preferences</Heading>
    </div>
  ),
};

export const HeadingPolymorphic: StoryObj = {
  name: "Heading — semantic override (as prop)",
  render: () => (
    <div className="flex flex-col gap-2">
      <Caption tone="subtle">Visually h1, semantically h2 — for SEO/outline control</Caption>
      <Heading level={1} as="h2">Looks like h1, rendered as h2</Heading>
      <Caption tone="subtle">Visually h3, rendered as a div — for non-heading contexts</Caption>
      <Heading level={3} as="div">Section label that isn't in the outline</Heading>
    </div>
  ),
};

// ─── Text ─────────────────────────────────────────────────────────────────────

export const TextVariants: StoryObj = {
  name: "Text — color variants",
  render: () => (
    <div className="flex flex-col gap-2">
      <Text tone="ink">Ink — high emphasis, for key info</Text>
      <Text tone="default">Default — standard body copy</Text>
      <Text tone="muted">Muted — secondary, placeholder-like</Text>
      <Text tone="accent">Accent — brand emphasis</Text>
      <Text tone="success">Success — positive feedback</Text>
      <Text tone="danger">Danger — errors and warnings</Text>
    </div>
  ),
};

export const TextWeights: StoryObj = {
  name: "Text — weights",
  render: () => (
    <div className="flex flex-col gap-2">
      <Text weight="normal">Normal — body copy, descriptions</Text>
      <Text weight="medium">Medium — labels, table cells, metadata</Text>
      <Text weight="semibold">Semibold — names, titles within body text</Text>
    </div>
  ),
};

export const TextMono: StoryObj = {
  name: "Text — mono (tabular figures)",
  render: () => (
    <div className="flex flex-col gap-2">
      <Text>
        Regular: revenue grew from $84,200 to $91,450
      </Text>
      <Text mono>
        Mono: revenue grew from $84,200 to $91,450
      </Text>
      <div className="flex gap-8 mt-2">
        <div className="flex flex-col gap-1">
          <Caption tone="subtle">Proportional</Caption>
          <Text>111,111</Text>
          <Text>999,999</Text>
        </div>
        <div className="flex flex-col gap-1">
          <Caption tone="subtle">Tabular (mono)</Caption>
          <Text mono>111,111</Text>
          <Text mono>999,999</Text>
        </div>
      </div>
    </div>
  ),
};

export const TextAsSpan: StoryObj = {
  name: "Text — inline (as span)",
  render: () => (
    <Text size="base">
      You have{" "}
      <Text as="span" weight="semibold" tone="ink">3 unread messages</Text>
      {" "}in your inbox. Visit your{" "}
      <LinkText href="#">inbox</LinkText>
      {" "}to respond.
    </Text>
  ),
};

// ─── LinkText ─────────────────────────────────────────────────────────────────

export const LinkTextVariants: StoryObj = {
  name: "LinkText — variants",
  render: () => (
    <div className="flex flex-col gap-3">
      <Text>
        Internal link:{" "}
        <LinkText href="#">View full report</LinkText>
      </Text>
      <Text>
        External link:{" "}
        <LinkText href="https://example.com" external>Open in Stripe</LinkText>
      </Text>
      <Text size="sm">
        Small context:{" "}
        <LinkText href="#" size="sm">Terms of service</LinkText>
        {" "}and{" "}
        <LinkText href="#" size="sm">Privacy policy</LinkText>
      </Text>
    </div>
  ),
};

export const LinkTextAsChild: StoryObj = {
  name: "LinkText — with router link (asChild)",
  render: () => (
    <Text>
      Go to{" "}
      <LinkText asChild>
        {/* Replace with your router's <Link> in a real app */}
        <a href="/dashboard">Dashboard</a>
      </LinkText>
    </Text>
  ),
};

export const LinkTextAsChildWithSize: StoryObj = {
  name: "LinkText — asChild with size prop",
  render: () => (
    <Text size="sm">
      Read the{" "}
      <LinkText asChild size="sm">
        <a href="/docs">documentation</a>
      </LinkText>
      {" "}for details.
    </Text>
  ),
};

// ─── Composition ─────────────────────────────────────────────────────────────

export const PageHeader: StoryObj = {
  name: "Composition — page header",
  render: () => (
    <div className="flex flex-col gap-1.5">
      <Heading level={1}>Team members</Heading>
      <Text tone="muted">Manage who has access to this workspace.</Text>
    </div>
  ),
};

export const SectionHeader: StoryObj = {
  name: "Composition — section with caption",
  render: () => (
    <div className="flex flex-col gap-4 max-w-sm">
      <div className="flex flex-col gap-0.5">
        <Heading level={3}>Billing details</Heading>
        <Text size="sm" tone="muted">Your plan renews on June 1, 2026.</Text>
      </div>
      <div className="flex justify-between items-baseline">
        <Text weight="medium">Pro plan</Text>
        <Text mono weight="semibold" tone="ink">$49 / mo</Text>
      </div>
      <div className="flex justify-between items-baseline">
        <Text weight="medium">Seats</Text>
        <Text mono tone="ink">12</Text>
      </div>
      <div className="border-t border-[var(--color-border)] pt-3 flex justify-between items-baseline">
        <Text weight="semibold" tone="ink">Total</Text>
        <Text mono weight="semibold" tone="ink">$588 / yr</Text>
      </div>
      <Caption>
        Prices in USD. <LinkText href="#" size="xs">View invoice history</LinkText>.
      </Caption>
    </div>
  ),
};
