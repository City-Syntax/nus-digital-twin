import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { getAllStats } from 'lib/analytics';

const StatsModal = () => {
  const [lifetimeVisitors, setLifetimeVisitors] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Dialog.Root
      onOpenChange={(open) => {
        if (open) {
          setIsLoading(true);
          getAllStats().then((data) => {
            setLifetimeVisitors(data.visitors.value);
            setIsLoading(false);
          });
        }
      }}
    >
      <Dialog.Trigger asChild>
        <button className="link">Stats</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="modal__overlay" />
        <Dialog.Content className="modal__content">
          <Dialog.Title>Statistics</Dialog.Title>
          <Dialog.Description className="sr-only">Statistics for NUS Digital Twin</Dialog.Description>
          <div className="modal__content__description">
            Visitors (from 8 May 2025): {isLoading ? 'Loading...' : lifetimeVisitors}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default StatsModal;
