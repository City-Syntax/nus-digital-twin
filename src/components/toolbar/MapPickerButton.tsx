import Icons from '../Icons';
import * as Popover from '@radix-ui/react-popover';
import { activeMapLayer } from '../../store';
import { useStore } from '@nanostores/react';
import type { ImageProps, MapLayers } from '../../types';
import LazyImage from '../primitives/LazyImage';

const MapPickerButton = () => {
  const $activeMapLayer = useStore(activeMapLayer);
  const mapLayers: Array<{
    id: MapLayers;
    img: ImageProps;
    name: string;
  }> = [
    { id: 'street', img: { src: '/src/assets/mapbox-street.png' }, name: 'Mapbox Street' },
    { id: 'dark', img: { src: '/src/assets/mapbox-dark.png' }, name: 'Mapbox Dark' },
    { id: 'satellite', img: { src: '/src/assets/mapbox-satellite.png' }, name: 'Mapbox Satellite' },
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
                  <LazyImage ratio="1/1" img={layer.img} alt={layer.name}></LazyImage>
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
