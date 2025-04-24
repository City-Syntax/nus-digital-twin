import { MapboxStyleImageryProvider } from 'cesium';

export const mapboxSatellite = new MapboxStyleImageryProvider({
  styleId: 'satellite-v9',
  accessToken: import.meta.env.PUBLIC_MAPBOX_TOKEN,
});

export const mapboxDark = new MapboxStyleImageryProvider({
  styleId: 'dark-v11',
  accessToken: import.meta.env.PUBLIC_MAPBOX_TOKEN,
});

export const mapboxStreet = new MapboxStyleImageryProvider({
  styleId: 'streets-v12',
  accessToken: import.meta.env.PUBLIC_MAPBOX_TOKEN,
});

export type MapLayers = 'satellite' | 'dark' | 'street';
