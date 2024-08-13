import React from 'react';
import CloseButton from './CloseButton';
import { useStore } from '@nanostores/react';
import { activeGISLayer } from '../../store';
import DownloadButton from '../primitives/DownloadButton';

const GreenSpaces = () => {
  const $activeGISLayer = useStore(activeGISLayer);
  return (
    <>
      <div className="menubar-content-header">
        <h2>Layers: Green Spaces</h2>
        <CloseButton page="green-spaces"></CloseButton>
      </div>
      <div className="menubar-content-body">
        <div>Highlight green spaces. Green spaces refer to open-space areas reserved for nature.</div>
        <div>
          <div className="btn-group">
            <button
              onClick={() => activeGISLayer.set(new Set([...$activeGISLayer, 'green-spaces']))}
              className={$activeGISLayer.has('green-spaces') ? 'active' : ''}
              type="button"
            >
              On
            </button>
            <button
              onClick={() =>
                activeGISLayer.set(new Set([...$activeGISLayer].filter((layer) => layer !== 'green-spaces')))
              }
              className={!$activeGISLayer.has('green-spaces') ? 'active' : ''}
              type="button"
            >
              Off
            </button>
          </div>
          <button
            onClick={() => activeGISLayer.set(new Set())}
            type="button"
            className={`clear-gis-btn ${$activeGISLayer.size === 0 ? 'hide' : ''}`}
          >
            Clear all GIS layers
          </button>
        </div>
        <div>
          <h3>Downloads</h3>
          <DownloadButton
            type="Shapefile"
            files={[{ filetype: '.shp', url: '/shapefiles/green-spaces/natural.zip' }]}
          ></DownloadButton>
        </div>
      </div>
    </>
  );
};

export default GreenSpaces;
