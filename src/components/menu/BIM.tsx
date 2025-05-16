import CloseButton from './CloseButton';
import { activeModel, isModelsAdded } from '@store';
import { useStore } from '@nanostores/react';
import { cn } from '@lib/utils';
import Icons from '@components/Icons';

const BIM = () => {
  const $activeModel = useStore(activeModel);
  const isLoaded = useStore(isModelsAdded)['bim'];

  return (
    <>
      <div className="menubar-content-header">
        <h2>Layers: BIM</h2>
        <CloseButton page="bim"></CloseButton>
      </div>
      <div className="menubar-content-body">
        <div>
          Displays Building Information Models (BIM), a highly detailed digital building model.
          <br />
          Selecting BIM will disable any existing coloring effects applied.
        </div>
        <div className="relative">
          <div className="btn-group">
            <button
              onClick={() => activeModel.set('bim')}
              className={cn({ active: $activeModel === 'bim' })}
              disabled={!isLoaded}
            >
              On
            </button>
            <button
              onClick={() => activeModel.set('')}
              className={cn({ active: $activeModel !== 'bim' })}
              disabled={!isLoaded}
            >
              Off
            </button>
          </div>
          <div
            className={cn(
              'mt-1 absolute right-0 flex gap-1.5 items-center text-sm text-muted-foreground transition-opacity',
              {
                'opacity-0': isLoaded,
              },
            )}
          >
            <Icons.Spinner className="animate-spin size-3.5" />
            BIM is loading...
          </div>
        </div>
      </div>
    </>
  );
};

export default BIM;
