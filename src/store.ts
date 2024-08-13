import { atom, map } from 'nanostores';
import { persistentAtom, persistentMap } from '@nanostores/persistent';
import type { GISLayers, MapLayers, MenuPages, Models, Position, UserSettings } from './types';

export const activePage = atom<MenuPages | ''>('');
export const activePages = map<{
  left: MenuPages | '';
  right: MenuPages | '';
  bottom: MenuPages | '';
}>({
  left: '',
  right: '',
  bottom: '',
});
export const activeMapLayer = persistentAtom<MapLayers>('mapLayer', 'street');
export const activeGISLayer = atom<Set<GISLayers>>(new Set());

export const activeModel = atom<Models | ''>('osm');
export const buildingColorSetting = atom<'' | 'distance'>('');

export const buildingId = atom('');
export const isSelectColorByDistance = atom(false);
export const colorByDistancePosition = atom<Position>({
  latitude: 1.29563,
  longitude: 103.77515,
});

export const userSettings = persistentMap<UserSettings>(
  'settings',
  {
    moveCameraOnSearch: true,
    reducedMotion: false,
  },
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  },
);

export const flyToPosition = atom<Position | null>(null);

export const toastMessage = map<{ msg: string; type: 'loading' | 'loaded' | 'default' }>({
  msg: '',
  type: 'default',
});
