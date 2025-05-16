import { useStore } from '@nanostores/react';
import { activeModel, isModelsAdded } from '@store';
import CloseButton from './CloseButton';
import { cn } from '@lib/utils';
import Icons from '@components/Icons';

const OSMBuildings = () => {
  const $activeModel = useStore(activeModel);
  const isLoaded = useStore(isModelsAdded)['osm'];

  return (
    <>
      <div className="menubar-content-header">
        <h2>Layers: OSM Buildings</h2>
        <CloseButton page="osm"></CloseButton>
      </div>
      <div className="menubar-content-body">
        <div>Displays OSM buildings, a building layer provided by OpenStreetMaps.</div>
        <div className="relative">
          <div className="btn-group">
            <button
              onClick={() => activeModel.set('osm')}
              className={cn({ active: $activeModel === 'osm' })}
              disabled={!isLoaded}
            >
              On
            </button>
            <button
              onClick={() => activeModel.set('')}
              className={cn({ active: $activeModel !== 'osm' })}
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
            OSM buildings are loading...
          </div>
        </div>
      </div>
    </>
  );
};

export default OSMBuildings;
