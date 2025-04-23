# NUS Digital Twin

NUS Digital Twin is an crowd-sourced campus digital twin of the National University of Singapore developed by [City Syntax Lab](https://www.citysyntax.io/).

## Publications

Ang, Y. Q., Ong, L., Teo, J., Gan, J. V., & Han, J. (2025). Advancing building performance simulation education through a crowdsourced campus digital twin. _Journal of Building Performance Simulation, 1–25_. [https://doi.org/10.1080/19401493.2025.2493866](https://doi.org/10.1080/19401493.2025.2493866)

## Getting Started

See [Getting Started in the Developer Guide](https://www.nus-digital-twin.com/dev-guide/getting-started/).

## Documentation

> [!IMPORTANT]
> The documentation is in the process of being moved to an Astro Starlight site at [nus-digital-twin.com/dev-guide](https://nus-digital-twin.com/dev-guide). The documentation shown below in this README.md consists of the content that has not yet been transferred completely.

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
