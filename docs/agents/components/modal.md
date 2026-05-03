# Modal

Dialog overlay built on Radix Dialog. Traps focus, handles Escape, blocks scroll.

```tsx
import {
  Modal, ModalTrigger, ModalContent, ModalHeader, ModalTitle,
  ModalDescription, ModalBody, ModalFooter, ModalClose, Button
} from "@fg-abc/ui";
```

## Basic usage

```tsx
<Modal>
  <ModalTrigger asChild>
    <Button>Open modal</Button>
  </ModalTrigger>
  <ModalContent>
    <ModalHeader>
      <ModalTitle>Edit profile</ModalTitle>
      <ModalDescription>Update your name and email below.</ModalDescription>
    </ModalHeader>
    <ModalBody>
      <Input label="Name" />
    </ModalBody>
    <ModalFooter>
      <ModalClose asChild>
        <Button variant="outline">Cancel</Button>
      </ModalClose>
      <Button onClick={save}>Save</Button>
    </ModalFooter>
  </ModalContent>
</Modal>
```

## Controlled (programmatic open/close)

```tsx
const [open, setOpen] = React.useState(false);

<Modal open={open} onOpenChange={setOpen}>
  <ModalContent>…</ModalContent>
</Modal>

// Open from anywhere
<Button onClick={() => setOpen(true)}>Open</Button>
```

## Sizes
`sm` / `md` (default) / `lg` / `xl` / `full`

```tsx
<ModalContent size="lg">…</ModalContent>
```

## Confirmation modal pattern

```tsx
<Modal>
  <ModalTrigger asChild>
    <Button variant="danger">Delete account</Button>
  </ModalTrigger>
  <ModalContent size="sm">
    <ModalHeader>
      <ModalTitle>Delete account?</ModalTitle>
      <ModalDescription>This cannot be undone. All data will be permanently removed.</ModalDescription>
    </ModalHeader>
    <ModalFooter>
      <ModalClose asChild><Button variant="outline">Cancel</Button></ModalClose>
      <Button variant="danger" onClick={deleteAccount}>Delete</Button>
    </ModalFooter>
  </ModalContent>
</Modal>
```

## Structure rules
- `ModalHeader` wraps `ModalTitle` + `ModalDescription`
- `ModalBody` is for the main content (padded)
- `ModalFooter` is right-aligned, has a top border — put action buttons here
- A close (×) button is always rendered in the top-right corner of `ModalContent` automatically
