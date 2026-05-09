"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Info, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/components/core/button";

const bannerVariants = cva(
  "flex items-start gap-3 rounded-[var(--radius-md)] border px-4 py-3",
  {
    variants: {
      variant: {
        info:    "bg-[var(--color-info-surface)]    border-[var(--color-info)]/20    text-[var(--color-info)]",
        success: "bg-[var(--color-success-surface)] border-[var(--color-success)]/20 text-[var(--color-success)]",
        warning: "bg-[var(--color-warning-surface)] border-[var(--color-warning)]/20 text-[var(--color-warning)]",
        danger:  "bg-[var(--color-danger-surface)]  border-[var(--color-danger)]/20  text-[var(--color-danger)]",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
);

const ICONS = {
  info:    Info,
  success: CheckCircle,
  warning: AlertTriangle,
  danger:  XCircle,
} as const;

export interface BannerAction {
  label: string;
  onClick: () => void;
  loading?: boolean;
}

export interface BannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerVariants> {
  title?: string;
  action?: BannerAction;
}

export const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  ({ variant = "info", title, children, action, className, ...props }, ref) => {
    const Icon = ICONS[variant ?? "info"];

    return (
      <div
        ref={ref}
        role="status"
        className={cn(bannerVariants({ variant }), className)}
        {...props}
      >
        <Icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          {title && (
            <span className="text-sm font-medium leading-snug">{title}</span>
          )}
          {children && (
            <span className="text-sm leading-snug opacity-90">{children}</span>
          )}
        </div>
        {action && (
          <Button
            size="sm"
            variant="outline"
            onClick={action.onClick}
            loading={action.loading}
            className="shrink-0 self-center"
          >
            {action.label}
          </Button>
        )}
      </div>
    );
  }
);

Banner.displayName = "Banner";
