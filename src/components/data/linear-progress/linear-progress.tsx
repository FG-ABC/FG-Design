"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

export interface LinearProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  visible?: boolean;
}

export const LinearProgress = React.forwardRef<HTMLDivElement, LinearProgressProps>(
  ({ className, visible = true, ...props }, ref) => {
    if (!visible) return null;

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-label="Loading"
        aria-valuetext="indeterminate"
        className={cn(
          "relative h-0.5 w-full overflow-hidden bg-[var(--color-overlay)]",
          className
        )}
        {...props}
      >
        <div className="absolute inset-y-0 left-0 w-1/2 animate-[linear-progress_1.4s_ease-in-out_infinite] bg-[var(--color-accent-500)]" />
      </div>
    );
  }
);

LinearProgress.displayName = "LinearProgress";
