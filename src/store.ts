import { atom } from 'nanostores';
import type { MapLayers, MenuPages, Models, Position, UserSettings } from './types';

export const activePage = atom<MenuPages | ''>('');
export const activeMapLayer = atom<MapLayers>('street');

export const activeModel = atom<Models | ''>('osm');
export const buildingColorSetting = atom<'' | 'distance'>('');

export const buildingId = atom('');
export const isSelectColorByDistance = atom(false);
export const colorByDistancePosition = atom<Position>({
  latitude: 1.29563,
  longitude: 103.77515,
});

export const userSettings = atom<UserSettings>({
  moveCamera: true,
});

export const flyToPosition = atom<Position | null>(null);
