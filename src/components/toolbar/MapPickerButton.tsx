import React from 'react';
import mapboxDark from '../../assets/mapbox-dark.png';
import mapboxSatellite from '../../assets/mapbox-satellite.png';
import Icons from '../Icons';
import * as Popover from '@radix-ui/react-popover';
import { mapLayer } from '../../store';
import { useStore } from '@nanostores/react';

const MapPickerButton = () => {
  const $mapLayer = useStore(mapLayer);
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
          <div id="map-picker">
            <button
              className={`map-picker-item ${$mapLayer === 'dark' ? 'active' : ''}`}
              type="button"
              onClick={() => mapLayer.set('dark')}
            >
              <img src={mapboxDark.src} alt="Mapbox Dark" />
              Mapbox Dark
            </button>
            <button
              className={`map-picker-item ${$mapLayer === 'satellite' ? 'active' : ''}`}
              type="button"
              onClick={() => mapLayer.set('satellite')}
            >
              <img src={mapboxSatellite.src} alt="Mapbox Satellite" />
              Mapbox Satellite
            </button>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default MapPickerButton;
