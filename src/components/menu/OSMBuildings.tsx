import React from 'react';
import { useStore } from '@nanostores/react';
import { buildingDataLayer } from '../../store';
import CloseButton from './CloseButton';

const OSMBuildings = () => {
  const $buildingDataLayer = useStore(buildingDataLayer);
  return (
    <>
      <div className="menubar-content-header">
        <h2>Layers: OSM Buildings</h2>
        <CloseButton></CloseButton>
      </div>
      <div className="menubar-content-body">
        <div>Displays OSM Buildings, a building layer provided by OpenStreetMaps.</div>
        <div>
          <div className="btn-group">
            <button
              onClick={() => buildingDataLayer.set('osm')}
              className={$buildingDataLayer === 'osm' ? 'active' : ''}
            >
              On
            </button>
            <button onClick={() => buildingDataLayer.set('')} className={$buildingDataLayer !== 'osm' ? 'active' : ''}>
              Off
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OSMBuildings;
