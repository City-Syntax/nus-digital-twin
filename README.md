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

Each building has the following attributes.

| Key                         | Value                                                                                 |
| --------------------------- | ------------------------------------------------------------------------------------- |
| elementId                   | A unique identifier for the building, corresponds to the OSM elementId                |
| name                        | The name of the building                                                              |
| address                     | The location of the building                                                          |
| postal                      | The 6-digit postal code for the building                                              |
| latitude                    | A number representing the latitude of the building, used to set the camera on search  |
| latitude                    | A number representing the longitude of the building, used to set the camera on search |
| downloads                   | The files available for this building, see the table below                            |
| floorToFloorHeight          |                                                                                       |
| perimeterZoneDepth          |                                                                                       |
| wallConstruction            |                                                                                       |
| roofConstruction            |                                                                                       |
| externalWallType            |                                                                                       |
| internalWalls               |                                                                                       |
| fenestrationType            |                                                                                       |
| fenestrationShading         |                                                                                       |
| northWindowToWallRatio      |                                                                                       |
| southWindowToWallRatio      |                                                                                       |
| eastWindowToWallRatio       |                                                                                       |
| westWindowToWallRatio       |                                                                                       |
| windowFrameConductance      |                                                                                       |
| glazingType                 |                                                                                       |
| windowLeakage               |                                                                                       |
| naturalVentilation          |                                                                                       |
| daylightResponse            |                                                                                       |
| thermostatSetPoint          |                                                                                       |
| coreOutsideAirFlowrate      |                                                                                       |
| perimeterOutsideAirFlowrate |                                                                                       |
| coreOccupantDensity         |                                                                                       |
| perimeterOccupantDensity    |                                                                                       |
| coreEquipmentPower          |                                                                                       |
| perimeterEquipmentPower     |                                                                                       |
| coreLightingPower           |                                                                                       |
| perimeterLightingPower      |                                                                                       |
| occupancySchedule           |                                                                                       |
| equipmentUsage              |                                                                                       |
| lightingUsage               |                                                                                       |
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

### Adding Shapefiles

Shapefiles have to be converted to GeoJSON format before they can be loaded into Cesium using [`GeoJsonDataSource`](https://cesium.com/learn/ion-sdk/ref-doc/GeoJsonDataSource.html). The conversion can be done using [`ogr2ogr`](https://gdal.org/programs/ogr2ogr.html) in [GDAL](https://gdal.org/).

```bash
ogr2ogr -f "GeoJSON" output.json input.shp
```

### Optional Environment Variables

- `PUBLIC_SHOW_MAPBOX` is used to enable Mapbox tiles in development mode. By default, Mapbox tiles are disabled in development to save on bandwidth. The loading screen is also disabled when Mapbox tiles are disabled. The only valid value is `true`, all other values are ignored.

### Known Issues

- The `radix-ui/select` component does not support an exit animation.
- Picking is not available for Urban Building Energy Models (UBEM) as individual building data cannot be obtained currently.
