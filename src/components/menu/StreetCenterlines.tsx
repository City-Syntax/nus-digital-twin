import React from 'react';
import CloseButton from './CloseButton';
import { useStore } from '@nanostores/react';
import { activeGISLayer } from '../../store';
import DownloadButton from '../primitives/DownloadButton';
import { cn } from '@lib/utils';

const StreetCenterlines = () => {
  const $activeGISLayer = useStore(activeGISLayer);
  return (
    <>
      <div className="menubar-content-header">
        <h2>Layers: Street Centerlines</h2>
        <CloseButton page="street-centerlines"></CloseButton>
      </div>
      <div className="menubar-content-body">
        <div>
          Display street centerlines. Street centerlines are a series of lines that represent each road and their
          attributes.
        </div>
        <div>
          <div className="btn-group">
            <button
              onClick={() => activeGISLayer.set(new Set([...$activeGISLayer, 'street-centerlines']))}
              className={$activeGISLayer.has('street-centerlines') ? 'active' : ''}
              type="button"
            >
              On
            </button>
            <button
              onClick={() =>
                activeGISLayer.set(new Set([...$activeGISLayer].filter((layer) => layer !== 'street-centerlines')))
              }
              className={!$activeGISLayer.has('street-centerlines') ? 'active' : ''}
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
            files={[{ filetype: '.shp', url: '/shapefiles/centerlines/roads.zip' }]}
          ></DownloadButton>
        </div>
      </div>
    </>
  );
};

export default StreetCenterlines;
