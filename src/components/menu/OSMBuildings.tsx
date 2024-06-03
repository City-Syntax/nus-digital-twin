import React from 'react';
import { useStore } from '@nanostores/react';
import { activeModel } from '../../store';
import CloseButton from './CloseButton';

const OSMBuildings = () => {
  const $activeModel = useStore(activeModel);
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
            <button onClick={() => activeModel.set('osm')} className={$activeModel === 'osm' ? 'active' : ''}>
              On
            </button>
            <button onClick={() => activeModel.set('')} className={$activeModel !== 'osm' ? 'active' : ''}>
              Off
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OSMBuildings;
