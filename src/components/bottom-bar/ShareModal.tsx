import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import Icons from '../Icons';

const ShareModal = () => {
  const SHARE_TEXT = 'View NUS Digital Twin at https://www.nus-digital-twin.com';
  const [isCopied, setIsCopied] = useState(false);

  const links = [
    {
      icon: Icons.Mail,
      label: 'Email',
      url: `mailto:?body=${SHARE_TEXT}`,
    },
    {
      icon: Icons.Telegram,
      label: 'Telegram',
      url: `https://t.me/share/url?url=https://www.nus-digital-twin.com&text=View NUS Digital Twin`,
    },
    {
      icon: Icons.WhatsApp,
      label: 'WhatsApp',
      url: `https://api.whatsapp.com/send?text=${SHARE_TEXT}`,
    },
  ];

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
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {links.map((link, index) => (
              <a
                className="text-sm flex items-center justify-center gap-1.5 transition-colors rounded-lg px-3.5 py-3 hover:bg-background-light border border-muted-foreground focus-visible:border-primary-light focus-visible:ring focus-visible:ring-primary-light"
                key={index}
                target="_blank"
                href={link.url}
              >
                <link.icon className="size-5" />
                {link.label}
              </a>
            ))}
          </div>
          <div className="divider">OR</div>
          <div className="input-group">
            <input
              disabled
              className="input px-3 w-full border border-muted-foreground"
              type="text"
              defaultValue="www.nus-digital-twin.com"
            />
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
