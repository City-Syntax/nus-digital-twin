import React from 'react';
import { buildingDataLayer } from '../store';
import { useStore } from '@nanostores/react';

const ButtonGroup = () => {
  const $buildingDataLayer = useStore(buildingDataLayer);
  return (
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
  );
};

export default ButtonGroup;
