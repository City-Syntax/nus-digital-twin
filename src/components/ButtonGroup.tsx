import React from 'react';
import Styles from '../styles/Navigation.module.scss';
import { buildingDataLayers } from '../navStore';
import { useStore } from '@nanostores/react';

const ButtonGroup = () => {
  const $buildingDataLayers = useStore(buildingDataLayers);
  return (
    <div className={Styles['btn-group']}>
      <input
        type="radio"
        id="toggle-on"
        name="toggle"
        value="on"
        onClick={() => buildingDataLayers.setKey('osm', true)}
        defaultChecked={$buildingDataLayers.osm}
      />
      <label htmlFor="toggle-on">On</label>
      <input
        type="radio"
        id="toggle-off"
        name="toggle"
        value="off"
        onClick={() => buildingDataLayers.setKey('osm', false)}
        defaultChecked={!$buildingDataLayers.osm}
      />
      <label htmlFor="toggle-off">Off</label>
    </div>
  );
};

export default ButtonGroup;
