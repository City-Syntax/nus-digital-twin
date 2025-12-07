import { useEffect, useState } from 'react';
import CloseButton from './CloseButton';
import { activeModel, isModelsAdded } from '@store';
import { useStore } from '@nanostores/react';
import Icons from '@components/Icons';
import { cn } from '@lib/utils';

const RhinoBuildings = () => {
  const $activeModel = useStore(activeModel);
  const isLoaded = useStore(isModelsAdded)['rhino-building'];
  const [isLongLoading, setIsLongLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLongLoading(true);
    }, 8000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <div className="menubar-content-header">
        <h2>Layers: Rhino Models (Building)</h2>
        <CloseButton page="rhino-building"></CloseButton>
      </div>
      <div className="menubar-content-body">
        <div>Displays Rhino Building Scale models.</div>
        <div className="relative">
          <div className="btn-group">
            <button
              onClick={() => activeModel.set('rhino-building')}
              className={cn({ active: $activeModel === 'rhino-building' })}
              disabled={!isLoaded && !isLongLoading}
            >
              On
            </button>
            <button
              onClick={() => activeModel.set('')}
              className={cn({ active: $activeModel !== 'rhino-building' })}
              disabled={!isLoaded && !isLongLoading}
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
            {isLongLoading ? 'Some rhino models are still loading...' : 'Rhino models are loading...'}
          </div>
        </div>
      </div>
    </>
  );
};

export default RhinoBuildings;
