import React, { useState } from 'react';
import mapboxDark from '../../assets/mapbox-dark.png';
import mapboxSatellite from '../../assets/mapbox-satellite.png';
import Icons from '../Icons';

// https://stackoverflow.com/questions/32553158/detect-click-outside-react-component

const MapPickerButton = () => {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className="map-picker-container" onMouseLeave={() => setShowPicker(false)}>
      <div className={`map-picker ${showPicker ? '' : 'hidden'}`}>
        <button className="map-picker-item" id="mapbox-dark-btn" type="button">
          <img src={mapboxDark.src} alt="Mapbox Dark" />
          Mapbox Dark
        </button>
        <button className="map-picker-item" id="mapbox-satellite-btn" type="button">
          <img src={mapboxSatellite.src} alt="Mapbox Satellite" />
          Mapbox Satellite
        </button>
      </div>
      <button className="toolbar-btn" id="map-picker-button" type="button" onClick={() => setShowPicker(!showPicker)}>
        <Icons.Picker></Icons.Picker>
        <span className="sr-only">Map Picker</span>
      </button>
    </div>
  );
};

export default MapPickerButton;
