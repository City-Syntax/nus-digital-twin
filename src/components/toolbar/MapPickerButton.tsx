import React from 'react';
import mapboxDark from '../../assets/mapbox-dark.png';
import mapboxSatellite from '../../assets/mapbox-satellite.png';
import Icons from '../Icons';
import * as Popover from '@radix-ui/react-popover';

const MapPickerButton = () => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className="toolbar-btn" id="map-picker-btn" type="button">
          <Icons.Picker></Icons.Picker>
          <span className="sr-only">Map Picker</span>
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content align="end">
          <div className="map-picker-container">
            <div className="map-picker">
              <button className="map-picker-item" id="mapbox-dark-btn" type="button">
                <img src={mapboxDark.src} alt="Mapbox Dark" />
                Mapbox Dark
              </button>
              <button className="map-picker-item" id="mapbox-satellite-btn" type="button">
                <img src={mapboxSatellite.src} alt="Mapbox Satellite" />
                Mapbox Satellite
              </button>
            </div>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default MapPickerButton;
