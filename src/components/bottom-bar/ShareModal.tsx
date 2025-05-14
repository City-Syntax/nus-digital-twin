import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import Icons from '../Icons';

const ShareModal = () => {
  const SHARE_TEXT = 'View NUS Digital Twin at https://www.nus-digital-twin.com';
  const [isCopied, setIsCopied] = useState(false);
  return (
    <Dialog.Root
      onOpenChange={(open) => {
        if (open) {
          setIsCopied(false);
        }
      }}
    >
      <Dialog.Trigger asChild>
        <button className="link">Share</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="modal__overlay" />
        <Dialog.Content className="modal__content">
          <Dialog.Title>Share NUS Digital Twin</Dialog.Title>
          <Dialog.Description className="sr-only">Share NUS Digital Twin</Dialog.Description>
          <div className="share-container grid grid-cols-1 gap-2 sm:grid-cols-3">
            <a href={`mailto:?body=${SHARE_TEXT}`}>
              <Icons.Mail />
              Email
            </a>
            <a
              target="_blank"
              href={`https://t.me/share/url?url=https://www.nus-digital-twin.com&text=View NUS Digital Twin`}
            >
              <Icons.Telegram />
              Telegram
            </a>
            <a target="_blank" href={`https://api.whatsapp.com/send?text=${SHARE_TEXT}`}>
              <Icons.WhatsApp />
              WhatsApp
            </a>
          </div>
          <div className="divider">OR</div>
          <div className="input-group">
            <input disabled className="input input--full" type="text" defaultValue="www.nus-digital-twin.com" />
            <button
              onClick={() => {
                setIsCopied(true);
                navigator.clipboard.writeText('www.nus-digital-twin.com');
              }}
            >
              {isCopied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ShareModal;
