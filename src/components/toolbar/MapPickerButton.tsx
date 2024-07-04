import React from 'react';
import mapboxDark from '../../assets/mapbox-dark.png';
import mapboxSatellite from '../../assets/mapbox-satellite.png';
import mapboxStreet from '../../assets/mapbox-street.png';
import Icons from '../Icons';
import * as Popover from '@radix-ui/react-popover';
import { activeMapLayer } from '../../store';
import { useStore } from '@nanostores/react';

const MapPickerButton = () => {
  const $activeMapLayer = useStore(activeMapLayer);
  return (
    <Popover.Root modal>
      <Popover.Trigger asChild>
        <button className="toolbar-btn" id="map-picker-btn" type="button">
          <Icons.Picker></Icons.Picker>
          <span className="sr-only">Map Picker</span>
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="popover-content" align="end" onCloseAutoFocus={(e) => e.preventDefault()}>
          <div id="map-picker">
            <button
              className={`map-picker-item ${$activeMapLayer === 'street' ? 'active' : ''}`}
              type="button"
              onClick={() => activeMapLayer.set('street')}
            >
              <img onLoad={(e) => (e.currentTarget.style.opacity = '1')} src={mapboxStreet.src} alt="Mapbox Street" />
              Mapbox Street
            </button>
            <button
              className={`map-picker-item ${$activeMapLayer === 'dark' ? 'active' : ''}`}
              type="button"
              onClick={() => activeMapLayer.set('dark')}
            >
              <img onLoad={(e) => (e.currentTarget.style.opacity = '1')} src={mapboxDark.src} alt="Mapbox Dark" />
              Mapbox Dark
            </button>
            <button
              className={`map-picker-item ${$activeMapLayer === 'satellite' ? 'active' : ''}`}
              type="button"
              onClick={() => activeMapLayer.set('satellite')}
            >
              <img
                onLoad={(e) => (e.currentTarget.style.opacity = '1')}
                src={mapboxSatellite.src}
                alt="Mapbox Satellite"
              />
              Mapbox Satellite
            </button>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default MapPickerButton;
