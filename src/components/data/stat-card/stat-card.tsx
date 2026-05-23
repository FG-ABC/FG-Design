"use client";
import * as React from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/data/skeleton";

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: React.ReactNode;
  delta?: number;
  deltaLabel?: string;
  icon?: React.ReactNode;
  loading?: boolean;
}

export const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ className, label, value, delta, deltaLabel, icon, loading = false, ...props }, ref) => {
    const isPositive = delta !== undefined && delta >= 0;

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-[var(--radius-lg)] border border-[var(--color-border)]",
          "bg-[var(--color-elevated)] p-5 shadow-[var(--shadow-sm)]",
          className
        )}
        {...props}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1 min-w-0">
            <p className="text-xs font-medium text-[var(--color-ink)] uppercase tracking-wide truncate">
              {label}
            </p>
            <div className="text-2xl font-semibold text-[var(--color-ink)] leading-tight">
              {loading ? <Skeleton shape="text" className="h-7 w-24" /> : value}
            </div>
            {loading ? (
              <Skeleton shape="text" className="w-20" />
            ) : delta !== undefined && (
              <div className="flex items-center gap-1">
                {isPositive ? (
                  <TrendingUp className="h-3.5 w-3.5 text-[var(--color-success)]" />
                ) : (
                  <TrendingDown className="h-3.5 w-3.5 text-[var(--color-danger)]" />
                )}
                <span
                  className={cn(
                    "text-xs font-medium",
                    isPositive ? "text-[var(--color-success)]" : "text-[var(--color-danger)]"
                  )}
                >
                  {isPositive ? "+" : ""}{delta}%
                </span>
                {deltaLabel && (
                  <span className="text-xs text-[var(--color-ink)]">{deltaLabel}</span>
                )}
              </div>
            )}
          </div>
          {icon && (
            <div className="shrink-0 p-2.5 rounded-[var(--radius-md)] bg-[var(--color-accent-50)] text-[var(--color-accent-500)]">
              {icon}
            </div>
          )}
        </div>
      </div>
    );
  }
);

StatCard.displayName = "StatCard";
