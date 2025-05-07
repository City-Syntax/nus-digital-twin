import * as Dialog from '@radix-ui/react-dialog';
import Icons from '../Icons';

const StatsModal = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="link">Stats</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="modal__overlay" />
        <Dialog.Content className="modal__content">
          <Dialog.Title>Statistics</Dialog.Title>
          <Dialog.Description className="sr-only">Statistics for NUS Digital Twin</Dialog.Description>
          <div className="modal__content__description">Visitors: 1234</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default StatsModal;
