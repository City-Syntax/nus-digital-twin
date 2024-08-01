# NUS Digital Twin

This project is built with Astro and CesiumJS with Cesium Ion.

## Getting Started

1. Clone this repository
2. Install dependencies using `yarn install`
3. Create a `.env` file, set `PUBLIC_CESIUM_TOKEN='YOUR_CESIUM_ION_TOKEN'` and `PUBLIC_MAPBOX_TOKEN='YOUR_MAPBOX_ACCESS_TOKEN'`
   - The Cesium Ion token can be obtained from [ion.cesium.com/tokens](https://ion.cesium.com/tokens)
   - The Mapbox access token can be obtained from [https://account.mapbox.com/access-tokens/](https://account.mapbox.com/access-tokens/)
4. Run the application locally using `yarn dev`

## Documentation

### Building Data

The data for the buildings displayed can be found in `src/content/buildings/buildings.json`, and its schema can be found in `src/content/config.ts`.

| Key                         | Value                                                                                 |
| --------------------------- | ------------------------------------------------------------------------------------- |
| elementId                   | A unique identifier for the building, corresponds to the OSM elementId                |
| name                        | The name of the building                                                              |
| address                     | The location of the building                                                          |
| postal                      | The 6-digit postal code for the building                                              |
| latitude                    | A number representing the latitude of the building, used to set the camera on search  |
| latitude                    | A number representing the longitude of the building, used to set the camera on search |
| downloads                   | The files available for this building, see the table below                            |
| floorToFloorHeight          | Specified in meters                                                                   |
| perimeterZoneDepth          | Specified in meters                                                                   |
| wallConstruction            | Specified in U value                                                                  |
| roofConstruction            | Specified in U value                                                                  |
| externalWallType            |                                                                                       |
| internalWalls               |                                                                                       |
| fenestrationType            |                                                                                       |
| fenestrationShading         |                                                                                       |
| northWindowToWallRatio      | Specified in percentage                                                               |
| southWindowToWallRatio      | Specified in percentage                                                               |
| eastWindowToWallRatio       | Specified in percentage                                                               |
| westWindowToWallRatio       | Specified in percentage                                                               |
| windowFrameConductance      | Specified in U value                                                                  |
| glazingType                 |                                                                                       |
| windowLeakage               | Specified in air changes per hour (ACH)                                               |
| naturalVentilation          |                                                                                       |
| daylightResponse            |                                                                                       |
| thermostatSetPoint          | Specified in degrees Celcius                                                          |
| coreOutsideAirFlowrate      | Specified in air changes per hour (ACH)                                               |
| perimeterOutsideAirFlowrate | Specified in air changes per hour (ACH)                                               |
| coreOccupantDensity         | Specified in people per square meter                                                  |
| perimeterOccupantDensity    | Specified in people per square meter                                                  |
| coreEquipmentPower          | Specified in Watts per square meter                                                   |
| perimeterEquipmentPower     | Specified in Watts per square meter                                                   |
| coreLightingPower           | Specified in Watts per square meter                                                   |
| perimeterLightingPower      | Specified in Watts per square meter                                                   |
| occupancySchedule           | Specified in hours per week                                                           |
| equipmentUsage              | Specified in hours per week                                                           |
| lightingUsage               | Specified in hours per week                                                           |
| coreOutsideAirSchedule      |                                                                                       |
| perimeterOutsideAirSchedule |                                                                                       |
| exhaustAirRecovery          |                                                                                       |
| economizerCycle             |                                                                                       |

| Key      | Value                            |
| -------- | -------------------------------- |
| filetype | The file type for download       |
| url      | Link to where the file is hosted |

### Adding Models

Models in `.glTF` format can be loaded into Cesium using [`Model.fromGltfAsync`](https://cesium.com/learn/ion-sdk/ref-doc/Model.html#.fromGltfAsync).

Models in other formats have to be converted into `.glTF` format.

| File format                | Recommended tool                                                                                |
| -------------------------- | ----------------------------------------------------------------------------------------------- |
| Wavefront (`.obj`, `.mtl`) | [`obj2gltf`](https://github.com/CesiumGS/obj2gltf)<br>`obj2gltf -i model.obj`                   |
| COLLADA (`.dae`)           | [`COLLADA2GLTF`](https://github.com/KhronosGroup/COLLADA2GLTF)<br>`./COLLADA2GTF-bin model.dae` |

For larger models (over a few hundred MBs), it is recommended to use Cesium ion Archives instead and load it into Cesium using [`Cesium3DTileset.fromUrl`](https://cesium.com/learn/ion-sdk/ref-doc/Cesium3DTileset.html#.fromUrl). See how to create a Cesium ion Archive [here](https://cesium.com/learn/ion/cesium-ion-archives-and-exports/).

### Adding Shapefiles

Shapefiles have to be converted to GeoJSON format before they can be loaded into Cesium using [`GeoJsonDataSource`](https://cesium.com/learn/ion-sdk/ref-doc/GeoJsonDataSource.html). The conversion can be done using [`ogr2ogr`](https://gdal.org/programs/ogr2ogr.html) in [GDAL](https://gdal.org/).

```bash
ogr2ogr -f "GeoJSON" output.json input.shp
```

### Optional Environment Variables

- `PUBLIC_SHOW_MAPBOX` is used to enable Mapbox tiles in development mode. By default, Mapbox tiles are disabled in development to save on bandwidth. The loading screen is also disabled when Mapbox tiles are disabled. The only valid value is `"true"`, all other values are ignored.

### Known Issues

- The `radix-ui/select` component does not support an exit animation.
- The `radix-ui/scroll-area` applies `display:table` which affects our layout, and is manually overriden in the CSS class `.scroll-area-viewport > div`. See the [GitHub issue](https://github.com/radix-ui/primitives/issues/926) and an [ongoing fix](https://github.com/radix-ui/primitives/pull/2945).
- Picking is disabled for Rhino (Urban) Models as individual building data is not available currently.
- For GIS Layers made up of polygons, such as building footprints and street centerlines, clamping them to ground directly using [`GeoJsonDataSource.clampToGround`](https://cesium.com/learn/ion-sdk/ref-doc/GeoJsonDataSource.html?classFilter=geojson#.clampToGround) results in rendering issues on certain browsers. A [workaround](https://github.com/City-Syntax/nus-digital-twin/pull/74) is used, but the GIS layer may appear on top of the building and not conform to the terrain.
  - See this [post](https://community.cesium.com/t/macos-driver-bug-for-small-clamp-to-ground-polygons/24277) on Cesium forums.
- Billboard images are provided in `.png` instead of `.svg` due to rendering issues on Cesium. See relevant [GitHub issue](https://github.com/CesiumGS/cesium/issues/4235).
