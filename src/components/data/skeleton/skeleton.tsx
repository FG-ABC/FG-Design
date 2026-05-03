"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const skeletonVariants = cva(
  "animate-pulse bg-[var(--color-overlay)]",
  {
    variants: {
      shape: {
        rect: "rounded-[var(--radius-md)]",
        text: "rounded-[var(--radius-sm)] h-4",
        circle: "rounded-[var(--radius-full)]",
      },
    },
    defaultVariants: {
      shape: "rect",
    },
  }
);

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, shape, ...props }, ref) => (
    <div ref={ref} className={cn(skeletonVariants({ shape }), className)} {...props} />
  )
);

Skeleton.displayName = "Skeleton";
