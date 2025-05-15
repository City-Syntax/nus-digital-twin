import Icons from '../Icons';
import * as Popover from '@radix-ui/react-popover';
import { activeMapLayer } from '../../store';
import { useStore } from '@nanostores/react';
import type { ImageProps } from '../../types';
import type { MapLayers } from '@components/cesium/mapLayers';
import LazyImage from '../primitives/LazyImage';
import { cn } from '@lib/utils';

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
        <button className="toolbar-btn bg-base" id="map-picker-btn" type="button">
          <Icons.Picker></Icons.Picker>
          <span className="sr-only">Map Picker</span>
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="popover-content" align="end" onCloseAutoFocus={(e) => e.preventDefault()}>
          <div className="bg-base p-4 rounded-2xl flex gap-4 mb-4" id="map-picker">
            {mapLayers.map((layer) => (
              <button
                key={layer.id}
                className={cn(
                  'map-picker__item w-16 font-semibold text-xs/3.5 text-center cursor-pointer flex flex-col justify-center items-center gap-1 transition-colors [&_img]:min-h-16 [&_img]:min-w-16',
                  {
                    'map-picker__item--active': $activeMapLayer === layer.id,
                  },
                )}
                type="button"
                onClick={() => activeMapLayer.set(layer.id)}
              >
                <LazyImage ratio="1/1" img={layer.img} alt={layer.name}></LazyImage>
                {layer.name}
              </button>
            ))}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default MapPickerButton;
