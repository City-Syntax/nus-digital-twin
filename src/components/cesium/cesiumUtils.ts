import { Model, Transforms, Cartesian3, HeadingPitchRoll, Math as CesiumMath, Cesium3DTileset } from 'cesium';
import buildingsData from '../../content/buildings/buildings.json';

const buildingsToShow = buildingsData
  .map((building) => building.elementId)
  .filter((id) => Boolean(Number(id))) // filter out ids that are not numbers
  .map((id) => ["${feature['elementId']} === " + id, true]);

export const OSM_SHOW_CONDITIONS = [...buildingsToShow, [true, false]];

export const OSM_DISTANCE_COLORS = [
  ['${distance} > 0.0155', "color('#08498a')"],
  ['${distance} > 0.015', "color('#085395')"],
  ['${distance} > 0.0145', "color('#085da0')"],
  ['${distance} > 0.014', "color('#0867ab')"],
  ['${distance} > 0.0135', "color('#0f6faf')"],
  ['${distance} > 0.013', "color('#1878b4')"],
  ['${distance} > 0.0125', "color('#2081b8')"],
  ['${distance} > 0.012', "color('#298abd')"],
  ['${distance} > 0.0115', "color('#3192c1')"],
  ['${distance} > 0.011', "color('#3a9cc7')"],
  ['${distance} > 0.0105', "color('#42a6cc')"],
  ['${distance} > 0.01', "color('#4bb0d1')"],
  ['${distance} > 0.0095', "color('#54b6d1')"],
  ['${distance} > 0.009', "color('#5fbdcd')"],
  ['${distance} > 0.0085', "color('#6bc3c9')"],
  ['${distance} > 0.008', "color('#76c9c6')"],
  ['${distance} > 0.0075', "color('#80cec2')"],
  ['${distance} > 0.007', "color('#8bd2bf')"],
  ['${distance} > 0.0065', "color('#97d6bb')"],
  ['${distance} > 0.006', "color('#a2dbb7')"],
  ['${distance} > 0.0055', "color('#abdeb6')"],
  ['${distance} > 0.005', "color('#b4e2ba')"],
  ['${distance} > 0.0045', "color('#bde5be')"],
  ['${distance} > 0.004', "color('#c6e9c2')"],
  ['${distance} > 0.0035', "color('#cdebc6')"],
  ['${distance} > 0.003', "color('#d2edcc')"],
  ['${distance} > 0.0025', "color('#d7efd1')"],
  ['${distance} > 0.002', "color('#dcf1d7')"],
  ['${distance} > 0.0015', "color('#e1f3dc')"],
  ['${distance} > 0.001', "color('#e6f6e1')"],
  ['${distance} > 0.0005', "color('#ecf8e6')"],
];

type GltfModelOptions = {
  longitude: number;
  latitude: number;
  height: number;
  heading?: number;
  pitch?: number;
  roll?: number;
  url: string;
  featureIdLabel: string;
  scale?: number;
  show?: boolean;
};

export function getModelFromGltf(params: GltfModelOptions) {
  const {
    longitude,
    latitude,
    height,
    heading = 0,
    pitch = 0,
    roll = 0,
    url,
    featureIdLabel,
    scale = 1,
    show = false,
  } = params;
  return Model.fromGltfAsync({
    modelMatrix: Transforms.headingPitchRollToFixedFrame(
      Cartesian3.fromDegrees(longitude, latitude, height),
      new HeadingPitchRoll(CesiumMath.toRadians(heading), CesiumMath.toRadians(pitch), CesiumMath.toRadians(roll)),
    ),
    show: show,
    scale: scale,
    url: url,
    featureIdLabel: featureIdLabel,
  });
}

type Cesium3DTilesetIonOptions = {
  assetId: number;
  featureIdLabel: string;
  show?: boolean;
};

export function getModelFromCesiumIon(params: Cesium3DTilesetIonOptions) {
  const { assetId, featureIdLabel, show = false } = params;
  return Cesium3DTileset.fromIonAssetId(assetId, {
    show: show,
    featureIdLabel: featureIdLabel,
  });
}

type Cesium3DTilesetUrlOptions = {
  url: string;
  featureIdLabel: string;
  show?: boolean;
};

export function getModelFromUrl(params: Cesium3DTilesetUrlOptions) {
  return Cesium3DTileset.fromUrl(params.url, {
    ...params,
  });
}

export function getNearestBuildingId(longitude: number, latitude: number): string | null {
  const threshold = 0.0005; // 50 meters

  const nearbyBuildings = buildingsData.filter((building) => {
    const longitudeDiff = Math.abs(building.longitude - longitude);
    const latitudeDiff = Math.abs(building.latitude - latitude);
    return longitudeDiff < threshold && latitudeDiff < threshold;
  });

  if (nearbyBuildings.length === 0) {
    return null;
  }

  // Euclidean Distance
  if (nearbyBuildings.length > 1) {
    nearbyBuildings.sort((a, b) => {
      const distA = Math.sqrt(Math.pow(a.longitude - longitude, 2) + Math.pow(a.latitude - latitude, 2));
      const distB = Math.sqrt(Math.pow(b.longitude - longitude, 2) + Math.pow(b.latitude - latitude, 2));
      return distA - distB;
    });
  }

  const closestBuilding = nearbyBuildings[0];
  return closestBuilding.elementId;
}
