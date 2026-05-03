"use client";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Display ─────────────────────────────────────────────────────────────────

export interface DisplayProps extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: React.ElementType;
  size?: "sm" | "md" | "lg";
}

export const Display = React.forwardRef<HTMLParagraphElement, DisplayProps>(
  ({ as: Tag = "p", size = "md", className, ...props }, ref) => (
    <Tag
      ref={ref}
      className={cn(
        "font-semibold text-[var(--color-ink)] leading-[1.1] tracking-[var(--tracking-tight)]",
        size === "sm" && "text-[2rem]",
        size === "md" && "text-[2.75rem]",
        size === "lg" && "text-[3.5rem]",
        className
      )}
      {...props}
    />
  )
);
Display.displayName = "Display";

// ─── Heading ─────────────────────────────────────────────────────────────────

const headingVariants = cva(
  "font-semibold text-[var(--color-ink)] leading-[var(--leading-tight)] tracking-[var(--tracking-tight)]",
  {
    variants: {
      level: {
        1: "text-[var(--text-3xl)]",
        2: "text-[var(--text-2xl)]",
        3: "text-[var(--text-xl)]",
        4: "text-[var(--text-lg)]",
      },
    },
    defaultVariants: { level: 1 },
  }
);

const HEADING_TAGS: Record<1 | 2 | 3 | 4, React.ElementType> = {
  1: "h1", 2: "h2", 3: "h3", 4: "h4",
};

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  level?: 1 | 2 | 3 | 4;
  as?: React.ElementType;
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ level = 1, as, className, ...props }, ref) => {
    const Tag = as ?? HEADING_TAGS[level];
    return (
      <Tag
        ref={ref}
        className={cn(headingVariants({ level }), className)}
        {...props}
      />
    );
  }
);
Heading.displayName = "Heading";

// ─── Text ─────────────────────────────────────────────────────────────────────
// `tone` instead of `color` to avoid collision with HTMLAttributes.color

export type TextTone = "default" | "muted" | "ink" | "danger" | "success" | "accent";

const textVariants = cva(
  "leading-[var(--leading-normal)] tracking-[var(--tracking-base)]",
  {
    variants: {
      size: {
        xs:   "text-[var(--text-xs)]",
        sm:   "text-[var(--text-sm)]",
        base: "text-[var(--text-base)]",
        lg:   "text-[var(--text-lg)]",
      },
      tone: {
        default: "text-[var(--color-base)]",
        muted:   "text-[var(--color-subtle)]",
        ink:     "text-[var(--color-ink)]",
        danger:  "text-[var(--color-danger)]",
        success: "text-[var(--color-success)]",
        accent:  "text-[var(--color-accent-500)]",
      } satisfies Record<TextTone, string>,
      weight: {
        normal:   "font-normal",
        medium:   "font-medium",
        semibold: "font-semibold",
      },
      mono: {
        true:  "font-mono tracking-[var(--tracking-wide)] tabular-nums",
        false: "",
      },
    },
    defaultVariants: {
      size:   "base",
      tone:   "default",
      weight: "normal",
      mono:   false,
    },
  }
);

export interface TextProps
  extends Omit<React.HTMLAttributes<HTMLParagraphElement>, "color"> {
  as?: React.ElementType;
  size?: "xs" | "sm" | "base" | "lg";
  tone?: TextTone;
  weight?: "normal" | "medium" | "semibold";
  mono?: boolean;
}

export const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ as: Tag = "p", size, tone, weight, mono, className, ...props }, ref) => (
    <Tag
      ref={ref}
      className={cn(textVariants({ size, tone, weight, mono }), className)}
      {...props}
    />
  )
);
Text.displayName = "Text";

// ─── Caption ─────────────────────────────────────────────────────────────────

export type CaptionTone = "muted" | "subtle" | "danger" | "success" | "accent";

export interface CaptionProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color"> {
  as?: React.ElementType;
  tone?: CaptionTone;
}

export const Caption = React.forwardRef<HTMLSpanElement, CaptionProps>(
  ({ as: Tag = "span", tone = "muted", className, ...props }, ref) => (
    <Tag
      ref={ref}
      className={cn(
        "text-[var(--text-xs)] leading-[var(--leading-snug)] tracking-[var(--tracking-base)]",
        tone === "muted"   && "text-[var(--color-muted)]",
        tone === "subtle"  && "text-[var(--color-subtle)]",
        tone === "danger"  && "text-[var(--color-danger)]",
        tone === "success" && "text-[var(--color-success)]",
        tone === "accent"  && "text-[var(--color-accent-500)]",
        className
      )}
      {...props}
    />
  )
);
Caption.displayName = "Caption";

// ─── LinkText ─────────────────────────────────────────────────────────────────

export interface LinkTextProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean;
  external?: boolean;
  size?: "xs" | "sm" | "base" | "lg";
}

export const LinkText = React.forwardRef<HTMLAnchorElement, LinkTextProps>(
  ({ asChild = false, external = false, size = "base", className, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "a";
    const externalProps = external
      ? { target: "_blank" as const, rel: "noopener noreferrer" }
      : {};

    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center gap-0.5",
          "font-medium text-[var(--color-accent-500)]",
          "underline underline-offset-2 decoration-[var(--color-accent-300)]",
          "hover:text-[var(--color-accent-600)] hover:decoration-[var(--color-accent-500)]",
          "transition-colors duration-[var(--duration-fast)]",
          "focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-[var(--color-accent-500)] focus-visible:ring-offset-1 rounded-[var(--radius-xs)]",
          size === "xs"   && "text-[var(--text-xs)]",
          size === "sm"   && "text-[var(--text-sm)]",
          size === "base" && "text-[var(--text-base)]",
          size === "lg"   && "text-[var(--text-lg)]",
          className
        )}
        {...externalProps}
        {...props}
      >
        {children}
        {external && <ExternalLink className="h-3 w-3 shrink-0 opacity-70" />}
      </Comp>
    );
  }
);
LinkText.displayName = "LinkText";
