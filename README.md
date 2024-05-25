# NUS Digital Twin

This project is built with Astro and CesiumJS with Cesium Ion.

## Getting Started

1. Clone this repository
2. Install dependencies using `yarn install`
3. Create a `.env` file, set `PUBLIC_CESIUM_TOKEN='YOUR_CESIUM_ION_TOKEN'` and `PUBLIC_MAPBOX_TOKEN='YOUR_MAPBOX_ACCESS_TOKEN'`
   - The Cesium Ion token can be obtained from [ion.cesium.com/tokens](https://ion.cesium.com/tokens)
   - The Mapbox access token can be obtained from [https://account.mapbox.com/access-tokens/](https://account.mapbox.com/access-tokens/)
4. Run the application locally using `yarn dev`

### Optional Environment Variables

- `PUBLIC_SHOW_MAPBOX` is used to enable Mapbox tiles in development mode. By default, Mapbox tiles are disabled in development to save on bandwidth. The loading screen is also disabled when Mapbox tiles are disabled. The only valid value is `true`, all other values are ignored.
