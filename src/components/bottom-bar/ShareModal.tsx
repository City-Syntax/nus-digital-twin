import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { toastMessage } from '../../store';

const ShareModal = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="link">Share</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="modal__overlay" />
        <Dialog.Content className="modal__content">
          <Dialog.Title>Share NUS Digital Twin</Dialog.Title>
          <Dialog.Description className="sr-only">Share NUS Digital Twin</Dialog.Description>
          <div className="input-group">
            <input disabled className="input input--full" type="text" defaultValue="www.nus-digital-twin.com" />
            <button
              onClick={() => {
                toastMessage.set({ msg: 'Copied to clipboard', type: 'default' });
                navigator.clipboard.writeText('www.nus-digital-twin.com');
              }}
            >
              Copy
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ShareModal;
