import React from 'react';
import MenuContent from './MenuContent';
import { useStore } from '@nanostores/react';
import { buildingDataLayer } from '../../store';

const OSMBuildings = () => {
  const $buildingDataLayer = useStore(buildingDataLayer);
  return (
    <MenuContent title="Layers: OSM Buildings">
      <div>Displays OSM Buildings, a building layer provided by OpenStreetMaps.</div>
      <div>
        <div className="btn-group">
          <button onClick={() => buildingDataLayer.set('osm')} className={$buildingDataLayer === 'osm' ? 'active' : ''}>
            On
          </button>
          <button onClick={() => buildingDataLayer.set('')} className={$buildingDataLayer !== 'osm' ? 'active' : ''}>
            Off
          </button>
        </div>
      </div>
    </MenuContent>
  );
};

export default OSMBuildings;
