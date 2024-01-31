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
          <input
            type="radio"
            id="osm-on"
            name="osm"
            onClick={() => buildingDataLayer.set('osm')}
            defaultChecked={$buildingDataLayer === 'osm'}
          />
          <label htmlFor="osm-on">On</label>
          <input
            type="radio"
            id="osm-off"
            name="osm"
            onClick={() => buildingDataLayer.set('')}
            defaultChecked={$buildingDataLayer !== 'osm'}
          />
          <label htmlFor="osm-off">Off</label>
        </div>
      </div>
    </MenuContent>
  );
};

export default OSMBuildings;
