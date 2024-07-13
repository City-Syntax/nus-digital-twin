import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';

const AboutModal = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="link">About</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title>About NUS Digital Twin</Dialog.Title>
          <Dialog.Description className="DialogDescription">
            NUS Digital Twin is developed by City Syntax Lab.
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AboutModal;
