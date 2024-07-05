import React from 'react';
import mapboxDark from '../../assets/mapbox-dark.png';
import mapboxSatellite from '../../assets/mapbox-satellite.png';
import mapboxStreet from '../../assets/mapbox-street.png';
import Icons from '../Icons';
import * as Popover from '@radix-ui/react-popover';
import { activeMapLayer } from '../../store';
import { useStore } from '@nanostores/react';
import type { MapLayers } from '../../types';
import type { ImageMetadata } from 'astro';
import LazyImage from '../primitives/LazyImage';

const MapPickerButton = () => {
  const $activeMapLayer = useStore(activeMapLayer);
  const mapLayers: Array<{
    id: MapLayers;
    img: ImageMetadata;
    name: string;
  }> = [
    { id: 'street', img: mapboxStreet, name: 'Mapbox Street' },
    { id: 'dark', img: mapboxDark, name: 'Mapbox Dark' },
    { id: 'satellite', img: mapboxSatellite, name: 'Mapbox Satellite' },
  ];

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
            {mapLayers.map((layer) => {
              return (
                <button
                  key={layer.id}
                  className={`map-picker__item ${$activeMapLayer === layer.id ? 'map-picker__item--active' : ''}`}
                  type="button"
                  onClick={() => activeMapLayer.set(layer.id)}
                >
                  <LazyImage src={layer.img.src} alt={layer.name}></LazyImage>
                  {layer.name}
                </button>
              );
            })}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default MapPickerButton;
