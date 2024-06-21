import React from 'react';
import CloseButton from './CloseButton';
import { useStore } from '@nanostores/react';
import { activeGISLayer } from '../../store';

const StreetCenterlines = () => {
  const $activeGISLayer = useStore(activeGISLayer);
  return (
    <>
      <div className="menubar-content-header">
        <h2>Layers: Street Centerlines</h2>
        <CloseButton></CloseButton>
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
            className={`clear-gis-btn ${$activeGISLayer.size === 0 ? 'hide' : ''}`}
          >
            Clear all GIS layers
          </button>
        </div>
      </div>
    </>
  );
};

export default StreetCenterlines;
