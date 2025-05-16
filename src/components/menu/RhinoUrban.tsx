import CloseButton from './CloseButton';
import { useStore } from '@nanostores/react';
import { activeModel, isModelsAdded } from '@store';
import DownloadButton from '../primitives/DownloadButton';
import { cn } from '@lib/utils';
import Icons from '@components/Icons';

const RhinoUrban = () => {
  const $activeModel = useStore(activeModel);
  const isLoaded = useStore(isModelsAdded)['rhino-urban'];

  return (
    <>
      <div className="menubar-content-header">
        <h2>Layers: Rhino Models (Urban)</h2>
        <CloseButton page="rhino-urban"></CloseButton>
      </div>
      <div className="menubar-content-body">
        <div>Displays Rhino Urban Scale models.</div>
        <div className="relative">
          <div className="btn-group">
            <button
              onClick={() => activeModel.set('rhino-urban')}
              className={cn({ active: $activeModel === 'rhino-urban' })}
              disabled={!isLoaded}
            >
              On
            </button>
            <button
              onClick={() => activeModel.set('')}
              className={cn({ active: $activeModel !== 'rhino-urban' })}
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
            Rhino model is loading...
          </div>
        </div>
        <div>
          <h3>Downloads</h3>
          <DownloadButton type="Rhino" files={[{ filetype: '.dae', url: '/urban/rhino-urban.dae' }]}></DownloadButton>
        </div>
      </div>
    </>
  );
};

export default RhinoUrban;
