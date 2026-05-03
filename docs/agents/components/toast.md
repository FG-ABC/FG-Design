# Toast (Toaster)

Notification toasts via Sonner. Mount `Toaster` once; call `toast()` anywhere.

## Setup (once per app)

```tsx
import { Toaster } from "@fgd/ui";

// In your root layout or _app.tsx
<Toaster position="bottom-right" />
```

## Usage

```tsx
import { toast } from "@fgd/ui";

toast("Message saved");
toast.success("Profile updated");
toast.error("Something went wrong");
toast.warning("Your session is expiring");
toast.info("New version available");

// With action
toast("File deleted", {
  action: { label: "Undo", onClick: () => restore() },
});

// With description
toast.error("Upload failed", {
  description: "The file exceeds the 10 MB limit.",
});

// Dismiss programmatically
const id = toast.loading("Uploading…");
await upload();
toast.dismiss(id);
toast.success("Done!");
```

## Toaster props
| Prop | Type | Default |
|---|---|---|
| `position` | `top-left \| top-center \| top-right \| bottom-left \| bottom-center \| bottom-right` | — |
| `duration` | `number` (ms) | `4000` |
| `richColors` | `boolean` | `false` |

## Notes
- `toast` is re-exported directly from sonner — all sonner options are available
- The `Toaster` component applies @fgd/ui styling tokens automatically — don't style toasts manually
