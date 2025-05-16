import CloseButton from './CloseButton';
import { activeModel, isModelsAdded } from '@store';
import { useStore } from '@nanostores/react';
import Icons from '@components/Icons';
import { cn } from '@lib/utils';

const RhinoBuildings = () => {
  const $activeModel = useStore(activeModel);
  const isLoaded = useStore(isModelsAdded)['rhino-building'];

  return (
    <>
      <div className="menubar-content-header">
        <h2>Layers: Rhino Models (Building)</h2>
        <CloseButton page="rhino-building"></CloseButton>
      </div>
      <div className="menubar-content-body">
        <div>Displays Rhino Building Scale models.</div>
        <div>
          <div className="btn-group">
            <button
              onClick={() => activeModel.set('rhino-building')}
              className={cn({ active: $activeModel === 'rhino-building' })}
              disabled={!isLoaded}
            >
              On
            </button>
            <button
              onClick={() => activeModel.set('')}
              className={cn({ active: $activeModel !== 'rhino-building' })}
              disabled={!isLoaded}
            >
              Off
            </button>
          </div>
          <div
            className={cn('mt-1.5 flex gap-1.5 items-center text-sm text-muted-foreground transition-opacity', {
              'opacity-0': isLoaded,
            })}
          >
            <Icons.Spinner className="animate-spin size-3.5" />
            Rhino models are loading...
          </div>
        </div>
      </div>
    </>
  );
};

export default RhinoBuildings;
