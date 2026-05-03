import * as React from "react";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  maxItems?: number;
  separator?: React.ReactNode;
}

export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, items, maxItems, separator, ...props }, ref) => {
    const sep = separator ?? <ChevronRight className="h-3.5 w-3.5" />;

    let visible = items;
    let collapsed = false;

    if (maxItems && items.length > maxItems) {
      collapsed = true;
      visible = [items[0], ...items.slice(items.length - (maxItems - 1))];
    }

    return (
      <nav
        ref={ref}
        aria-label="breadcrumb"
        className={cn("flex items-center", className)}
        {...props}
      >
        <ol className="flex items-center gap-1">
          {visible.map((item, index) => {
            const isFirst = index === 0;
            const isLast = index === visible.length - 1;
            const showCollapsedIndicator = collapsed && isFirst;

            return (
              <React.Fragment key={index}>
                {index > 0 && (
                  <li
                    role="presentation"
                    className="flex items-center text-[var(--color-muted)]"
                  >
                    {sep}
                  </li>
                )}
                {showCollapsedIndicator && index > 0 && (
                  <>
                    <li
                      role="presentation"
                      className="flex items-center text-[var(--color-muted)]"
                    >
                      {sep}
                    </li>
                    <li>
                      <span
                        aria-hidden="true"
                        className="flex items-center gap-0.5 px-1 py-0.5 rounded-[var(--radius-xs)] text-[var(--color-subtle)] hover:bg-[var(--color-overlay)] hover:text-[var(--color-base)] transition-colors duration-[var(--duration-fast)]"
                      >
                        <MoreHorizontal className="h-3.5 w-3.5" />
                      </span>
                    </li>
                  </>
                )}
                <li>
                  {isLast || !item.href ? (
                    <span
                      aria-current={isLast ? "page" : undefined}
                      className={cn(
                        "text-sm leading-none",
                        isLast
                          ? "text-[var(--color-ink)] font-medium"
                          : "text-[var(--color-subtle)]"
                      )}
                    >
                      {item.label}
                    </span>
                  ) : (
                    <a
                      href={item.href}
                      className="text-sm leading-none text-[var(--color-subtle)] hover:text-[var(--color-base)] transition-colors duration-[var(--duration-fast)] rounded-[var(--radius-xs)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-500)] focus-visible:ring-offset-1"
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              </React.Fragment>
            );
          })}
        </ol>
      </nav>
    );
  }
);

Breadcrumb.displayName = "Breadcrumb";
