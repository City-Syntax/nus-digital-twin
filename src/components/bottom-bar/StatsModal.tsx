import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { getAllStats } from 'lib/analytics';
import Icons from '@components/Icons';

const StatsModal = () => {
  const [lifetimeVisits, setLifetimeVisits] = useState(0);
  const [fetchStatus, setFetchStatus] = useState<'fetching' | 'fetched' | 'err'>('fetching');

  return (
    <Dialog.Root
      onOpenChange={(open) => {
        if (open) {
          setFetchStatus('fetching');
          getAllStats()
            .then((data) => {
              setLifetimeVisits(data.visits.value);
              setFetchStatus('err');
            })
            .catch(() => {
              setFetchStatus('err');
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
          <div className="flex items-center gap-1">
            Visits (from 8 May 2025):
            {fetchStatus === 'fetching' && <Icons.Spinner className="animate-spin size-5 inline-flex" />}
            {fetchStatus === 'fetched' && <span>{lifetimeVisits}</span>}
            {fetchStatus === 'err' && <span>Error.</span>}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default StatsModal;
