import type { Meta, StoryObj } from "@storybook/react";
import { Modal, ModalTrigger, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalBody, ModalFooter } from "@/components/feedback/modal";
import { Button } from "@/components/core/button";

const meta: Meta = {
  title: "Feedback/Modal",
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button>Open modal</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Delete workspace</ModalTitle>
          <ModalDescription>
            This action cannot be undone. All data in this workspace will be permanently deleted.
          </ModalDescription>
        </ModalHeader>
        <ModalBody>
          <p className="text-sm text-[var(--color-base)]">
            Type <strong>delete</strong> to confirm.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline">Cancel</Button>
          <Button variant="danger">Delete workspace</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};
