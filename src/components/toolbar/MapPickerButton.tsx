import React from 'react';
import mapboxDark from '../../assets/mapbox-dark.png';
import mapboxSatellite from '../../assets/mapbox-satellite.png';
import Icons from '../Icons';

const MapPickerButton = () => {
  return (
    <div className="map-picker-container">
      <div className="map-picker">
        <div className="map-picker-item">
          <img src={mapboxDark.src} alt="" />
          <span>Mapbox Dark</span>
        </div>
        <div className="map-picker-item">
          <img src={mapboxSatellite.src} alt="" />
          <span>Mapbox Satellite</span>
        </div>
      </div>
      <button id="map-picker-button" type="button">
        <Icons.Picker></Icons.Picker>
        <span className="sr-only">Map Picker</span>
      </button>
    </div>
  );
};

export default MapPickerButton;
