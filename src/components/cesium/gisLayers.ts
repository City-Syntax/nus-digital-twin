import { GeoJsonDataSource, Color, ConstantProperty, ClassificationType, HeightReference } from 'cesium';

/**
 * The classification type
 * prevents the lines from overlaying on top of 3D tiles
 */
export async function loadBuildingFootprints() {
  const buildingFootprintsData = await GeoJsonDataSource.load('/shapefiles/footprints/buildings.json', {
    stroke: Color.fromCssColorString('#0e7490ff'),
    fill: Color.fromCssColorString('#06b6d4cc'),
  });

  buildingFootprintsData.entities.values.forEach((entity) => {
    if (entity.polygon) {
      entity.polygon.heightReference = new ConstantProperty(HeightReference.CLAMP_TO_TERRAIN);
    }
  });

  return buildingFootprintsData;
}

export async function loadStreetCenterlines() {
  const streetCenterlinesData = await GeoJsonDataSource.load('/shapefiles/centerlines/roads.json', {
    stroke: Color.fromCssColorString('#ca8a04ff'),
    clampToGround: true,
  });

  streetCenterlinesData.entities.values.forEach((entity) => {
    if (entity.polyline) {
      entity.polyline.classificationType = new ConstantProperty(ClassificationType.TERRAIN);
    }
  });

  return streetCenterlinesData;
}

export async function loadGreenSpaces() {
  const greenSpacesData = await GeoJsonDataSource.load('/shapefiles/green-spaces/natural.json', {
    stroke: Color.fromCssColorString('#15803dff'),
    fill: Color.fromCssColorString('#22c55ecc'),
  });

  greenSpacesData.entities.values.forEach((entity) => {
    if (entity.polygon) {
      entity.polygon.heightReference = new ConstantProperty(HeightReference.CLAMP_TO_TERRAIN);
    }
  });

  return greenSpacesData;
}
