import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { getActiveVisitors } from 'lib/analytics';

const StatsModal = () => {
  const [activeVisitors, setActiveVisitors] = useState(0);
  return (
    <Dialog.Root
      onOpenChange={(open) => {
        if (open) {
          getActiveVisitors().then((data) => {
            setActiveVisitors(data.visitors);
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
          <div className="modal__content__description">Visitors: {activeVisitors}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default StatsModal;
