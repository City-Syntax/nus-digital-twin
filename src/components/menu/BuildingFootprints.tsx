import React from 'react';
import CloseButton from './CloseButton';
import { useStore } from '@nanostores/react';
import { activeGISLayer } from '../../store';
import DownloadButton from '../primitives/DownloadButton';
import { cn } from '@lib/utils';

const BuildingFootprints = () => {
  const $activeGISLayer = useStore(activeGISLayer);
  return (
    <>
      <div className="menubar-content-header">
        <h2>Layers: Building Footprints</h2>
        <CloseButton page="building-footprints"></CloseButton>
      </div>
      <div className="menubar-content-body">
        <div>
          Display building footprints. Building footprints are polygons representing a specific building on the map.
        </div>
        <div>
          <div className="btn-group">
            <button
              onClick={() => activeGISLayer.set(new Set([...$activeGISLayer, 'building-footprints']))}
              className={$activeGISLayer.has('building-footprints') ? 'active' : ''}
              type="button"
            >
              On
            </button>
            <button
              onClick={() =>
                activeGISLayer.set(new Set([...$activeGISLayer].filter((layer) => layer !== 'building-footprints')))
              }
              className={!$activeGISLayer.has('building-footprints') ? 'active' : ''}
              type="button"
            >
              Off
            </button>
          </div>
          <button
            onClick={() => activeGISLayer.set(new Set())}
            type="button"
            className={cn(
              'absolute right-4 text-sm text-muted-foreground transition-colors mt-2 hover:text-muted-foreground/75',
              {
                hidden: $activeGISLayer.size === 0,
              },
            )}
          >
            Clear all GIS layers
          </button>
        </div>
        <div>
          <h3>Downloads</h3>
          <DownloadButton
            type="Shapefile"
            files={[{ filetype: '.shp', url: '/shapefiles/footprints/buildings.zip' }]}
          ></DownloadButton>
        </div>
      </div>
    </>
  );
};

export default BuildingFootprints;
