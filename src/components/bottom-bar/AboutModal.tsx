import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';

const AboutModal = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="link">About</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="modal__overlay" />
        <Dialog.Content className="modal__content">
          <Dialog.Title>About NUS Digital Twin</Dialog.Title>
          <Dialog.Description>
            NUS Digital Twin is developed by{' '}
            <a className="link" href="https://www.citysyntax.io" target="_blank" rel="noreferrer">
              City Syntax Lab
            </a>
            .
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AboutModal;
