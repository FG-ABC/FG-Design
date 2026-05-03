import { Toaster as Sonner } from "sonner";

export type ToastProps = React.ComponentProps<typeof Sonner>;

export const Toaster = (props: ToastProps) => (
  <Sonner
    theme="light"
    className="toaster group"
    toastOptions={{
      classNames: {
        toast: [
          "group toast",
          "rounded-[var(--radius-lg)] border border-[var(--color-border)]",
          "bg-[var(--color-elevated)] shadow-[var(--shadow-lg)]",
          "text-[var(--color-base)] text-sm",
          "p-4",
        ].join(" "),
        title: "font-medium text-[var(--color-ink)]",
        description: "text-[var(--color-subtle)]",
        actionButton: [
          "bg-[var(--color-accent-500)] text-white text-xs font-medium",
          "rounded-[var(--radius-sm)] px-3 py-1.5",
          "hover:bg-[var(--color-accent-600)]",
        ].join(" "),
        cancelButton: [
          "bg-[var(--color-surface)] text-[var(--color-subtle)] text-xs font-medium",
          "rounded-[var(--radius-sm)] px-3 py-1.5",
          "hover:bg-[var(--color-overlay)]",
        ].join(" "),
        success: "border-[var(--color-success)]/20 bg-[var(--color-success-surface)]",
        error: "border-[var(--color-danger)]/20 bg-[var(--color-danger-surface)]",
        warning: "border-[var(--color-warning)]/20 bg-[var(--color-warning-surface)]",
        info: "border-[var(--color-info)]/20 bg-[var(--color-info-surface)]",
      },
    }}
    {...props}
  />
);

export { toast } from "sonner";
