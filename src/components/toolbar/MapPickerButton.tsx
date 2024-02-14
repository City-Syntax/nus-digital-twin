import React from 'react';
import mapboxDark from '../../assets/mapbox-dark.png';
import mapboxSatellite from '../../assets/mapbox-satellite.png';
import Icons from '../Icons';

const MapPickerButton = () => {
  return (
    <div className="map-picker-container">
      <div className="map-picker">
        <button className="map-picker-item">
          <img src={mapboxDark.src} alt="" />
          Mapbox Dark
        </button>
        <button className="map-picker-item">
          <img src={mapboxSatellite.src} alt="" />
          Mapbox Satellite
        </button>
      </div>
      <button className="toolbar-btn" id="map-picker-button" type="button">
        <Icons.Picker></Icons.Picker>
        <span className="sr-only">Map Picker</span>
      </button>
    </div>
  );
};

export default MapPickerButton;
