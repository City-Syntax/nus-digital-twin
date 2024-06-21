import React from 'react';
import CloseButton from './CloseButton';
import { useStore } from '@nanostores/react';
import { activeGISLayer } from '../../store';

const BuildingFootprints = () => {
  const $activeGISLayer = useStore(activeGISLayer);
  return (
    <>
      <div className="menubar-content-header">
        <h2>Layers: Building Footprints</h2>
        <CloseButton></CloseButton>
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
            className={`clear-gis-btn ${$activeGISLayer.size === 0 ? 'hide' : ''}`}
          >
            Clear all GIS layers
          </button>
        </div>
        <div>
          <h3>Downloads</h3>
          <div className="download-btn">
            <a href="/shapefiles/footprints/buildings.zip" download>
              Download Shapefile (.shp)
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuildingFootprints;
