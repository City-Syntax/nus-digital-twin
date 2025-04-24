import { Model, Transforms, Cartesian3, HeadingPitchRoll, Math as CesiumMath, Cesium3DTileset } from 'cesium';

export async function load() {
  const rhinoE6 = await getModelFromGltf({
    longitude: 103.7730368432,
    latitude: 1.2991728525,
    height: 52.20497546,
    heading: 155.6,
    pitch: 90,
    url: '/e6/e6-rhino.gltf',
    featureIdLabel: '139959760',
    scale: 1.05,
  });

  const rhinoE2A = await getModelFromGltf({
    longitude: 103.7713864135,
    latitude: 1.2987547954,
    height: 71.4093914346,
    heading: 67,
    url: '/e2a/e2a-rhino.gltf',
    featureIdLabel: '628777635',
  });

  const rhinoCELC = await getModelFromGltf({
    longitude: 103.7713937579,
    latitude: 1.2969843253,
    height: 44.9642791517,
    heading: 18.5,
    url: '/celc/celc-rhino.gltf',
    featureIdLabel: '140084916',
    scale: 0.52,
  });

  const rhinoPioneerHouse = await getModelFromGltf({
    longitude: 103.7804112385,
    latitude: 1.2902299393,
    height: 26.1901156884,
    heading: 99.4,
    url: '/pioneer-house/pioneer-house-22-25-rhino.gltf',
    featureIdLabel: '238932774',
  });

  const rhinoCOM2 = await Model.fromGltfAsync({
    modelMatrix: Transforms.headingPitchRollToFixedFrame(
      Cartesian3.fromDegrees(103.7743124495, 1.2939952856, 37.2996820597),
      new HeadingPitchRoll(CesiumMath.toRadians(-204), CesiumMath.toRadians(0), CesiumMath.toRadians(0)),
    ),
    show: false,
    scale: 0.43,
    url: '/com2/com2-rhino.gltf',
    featureIdLabel: '54619699',
  });

  const rhinoPgprBlock1 = await Model.fromGltfAsync({
    modelMatrix: Transforms.headingPitchRollToFixedFrame(
      Cartesian3.fromDegrees(103.7829198753, 1.291489802, 51.2208270602),
      new HeadingPitchRoll(CesiumMath.toRadians(-40), CesiumMath.toRadians(0), CesiumMath.toRadians(0)),
    ),
    show: false,
    scale: 0.48,
    url: '/pgpr/pgpr-block1-rhino.gltf',
    featureIdLabel: '238932786',
  });
  const rhinoAS8 = await Model.fromGltfAsync({
    modelMatrix: Transforms.headingPitchRollToFixedFrame(
      Cartesian3.fromDegrees(103.7722692363, 1.296027148, 55.2598169315),
      new HeadingPitchRoll(CesiumMath.toRadians(109.9), CesiumMath.toRadians(0), CesiumMath.toRadians(0)),
    ),
    show: false,
    url: '/as8/as8-rhino.gltf',
    featureIdLabel: '54583485',
  });

  const rhinoNUSMuseum = await Model.fromGltfAsync({
    modelMatrix: Transforms.headingPitchRollToFixedFrame(
      Cartesian3.fromDegrees(103.7724974951, 1.3014554191, 38.705815314),
      new HeadingPitchRoll(CesiumMath.toRadians(19.5), CesiumMath.toRadians(0), CesiumMath.toRadians(0)),
    ),
    show: false,
    scale: 1.1,
    url: '/nus-museum/nus-museum-rhino.gltf',
    featureIdLabel: '54583930',
  });

  const rhinoSDE2 = await Model.fromGltfAsync({
    modelMatrix: Transforms.headingPitchRollToFixedFrame(
      Cartesian3.fromDegrees(103.7711425478, 1.297249525, 50.3291321597),
      new HeadingPitchRoll(CesiumMath.toRadians(199), CesiumMath.toRadians(0), CesiumMath.toRadians(0)),
    ),
    show: false,
    url: '/sde2/sde2-rhino.gltf',
    featureIdLabel: '140078560',
  });

  const rhinoSDE3 = await Model.fromGltfAsync({
    modelMatrix: Transforms.headingPitchRollToFixedFrame(
      Cartesian3.fromDegrees(103.7703213411, 1.2981575567, 72.1150038858),
      new HeadingPitchRoll(CesiumMath.toRadians(154.7), CesiumMath.toRadians(0), CesiumMath.toRadians(0)),
    ),
    scale: 1.2,
    show: false,
    url: '/sde3/sde3-rhino.gltf',
    featureIdLabel: '140079084',
  });

  const rhinoSDE4 = await Model.fromGltfAsync({
    modelMatrix: Transforms.headingPitchRollToFixedFrame(
      Cartesian3.fromDegrees(103.7703672003, 1.2968668531, 45.0226349587),
      new HeadingPitchRoll(CesiumMath.toRadians(108.8), CesiumMath.toRadians(0), CesiumMath.toRadians(0)),
    ),
    show: false,
    url: '/sde4/sde4-rhino.gltf',
    featureIdLabel: '628774809',
  });

  const rhinoTechnoEdge = await Model.fromGltfAsync({
    modelMatrix: Transforms.headingPitchRollToFixedFrame(
      Cartesian3.fromDegrees(103.7714223457, 1.2979071911, 58.3863356009),
      new HeadingPitchRoll(CesiumMath.toRadians(233.1), CesiumMath.toRadians(0), CesiumMath.toRadians(0)),
    ),
    show: false,
    url: '/techno-edge/techno-edge-rhino.gltf',
    featureIdLabel: '730959512',
  });

  const rhinoUSC = await Model.fromGltfAsync({
    modelMatrix: Transforms.headingPitchRollToFixedFrame(
      Cartesian3.fromDegrees(103.775544178, 1.2997341879, 27.7347173989),
      new HeadingPitchRoll(CesiumMath.toRadians(-2.5), CesiumMath.toRadians(0), CesiumMath.toRadians(0)),
    ),
    show: false,
    scale: 0.9,
    url: '/usc/usc-rhino.gltf',
    featureIdLabel: '730956214',
  });

  const rhinoTheDeck = await Model.fromGltfAsync({
    modelMatrix: Transforms.headingPitchRollToFixedFrame(
      Cartesian3.fromDegrees(103.7724884969, 1.2946662859, 65.883810451),
      new HeadingPitchRoll(CesiumMath.toRadians(-28), CesiumMath.toRadians(0), CesiumMath.toRadians(0)),
    ),
    show: false,
    scale: 1.4,
    url: '/the-deck/the-deck-rhino.gltf',
    featureIdLabel: '140087193',
  });

  const rhinoSSLS = await Model.fromGltfAsync({
    modelMatrix: Transforms.headingPitchRollToFixedFrame(
      Cartesian3.fromDegrees(103.7750945264, 1.295625549, 45.8205900698),
      new HeadingPitchRoll(CesiumMath.toRadians(55.6), CesiumMath.toRadians(0), CesiumMath.toRadians(0)),
    ),
    show: false,
    url: '/ssls/ssls-rhino.gltf',
    featureIdLabel: '54619730',
  });

  const rhinoKuokFoundationHouse = await Model.fromGltfAsync({
    modelMatrix: Transforms.headingPitchRollToFixedFrame(
      Cartesian3.fromDegrees(103.7736119902, 1.3003336117, 51.8346518242),
      new HeadingPitchRoll(CesiumMath.toRadians(-25.5), CesiumMath.toRadians(0), CesiumMath.toRadians(0)),
    ),
    show: false,
    scale: 1.52,
    url: '/raffles-hall/kuok-foundation-house-rhino.gltf',
    featureIdLabel: '241265457',
  });

  const rhinoMedicineScienceLibrary = await Model.fromGltfAsync({
    modelMatrix: Transforms.headingPitchRollToFixedFrame(
      Cartesian3.fromDegrees(103.7817655955, 1.2969427365, 39.6354038487),
      new HeadingPitchRoll(CesiumMath.toRadians(-69.8), CesiumMath.toRadians(0), CesiumMath.toRadians(0)),
    ),
    show: false,
    url: '/msl/msl-rhino.gltf',
    featureIdLabel: '141913116',
  });

  const rhinoShearesMain = await Model.fromGltfAsync({
    modelMatrix: Transforms.headingPitchRollToFixedFrame(
      Cartesian3.fromDegrees(103.7758329693, 1.2914051269, 44.1314822062),
      new HeadingPitchRoll(CesiumMath.toRadians(28.7), CesiumMath.toRadians(0), CesiumMath.toRadians(0)),
    ),
    scale: 1.2,
    show: false,
    url: '/sheares-hall/sheares-main-rhino.gltf',
    featureIdLabel: '639258228',
  });

  const rhinoShearesA = await Model.fromGltfAsync({
    modelMatrix: Transforms.headingPitchRollToFixedFrame(
      Cartesian3.fromDegrees(103.775214582, 1.2914901374, 30.437453453),
      new HeadingPitchRoll(CesiumMath.toRadians(111.3), CesiumMath.toRadians(0), CesiumMath.toRadians(90)),
    ),
    scale: 0.4,
    show: false,
    url: '/sheares-hall/sheares-a-rhino.gltf',
    featureIdLabel: '455250294',
  });

  const rhinoRvrcG = await Model.fromGltfAsync({
    modelMatrix: Transforms.headingPitchRollToFixedFrame(
      Cartesian3.fromDegrees(103.7767993479, 1.2974922895, 44.840297406),
      new HeadingPitchRoll(CesiumMath.toRadians(-70.1), CesiumMath.toRadians(0), CesiumMath.toRadians(0)),
    ),
    show: false,
    url: '/rvrc/rvrc-g-rhino.gltf',
    featureIdLabel: '546382548',
  });

  const rhinoLKCMuseum = await Cesium3DTileset.fromIonAssetId(2685876, {
    show: false,
    featureIdLabel: '54619794',
  });

  const rhinoYNCArtsCenter = await Cesium3DTileset.fromIonAssetId(2686261, {
    show: false,
    featureIdLabel: '732229049',
  });

  return [
    rhinoE2A,
    rhinoE6,
    rhinoCELC,
    rhinoPioneerHouse,
    rhinoNUSMuseum,
    rhinoCOM2,
    rhinoPgprBlock1,
    rhinoAS8,
    rhinoSDE2,
    rhinoSDE3,
    rhinoSDE4,
    rhinoUSC,
    rhinoTheDeck,
    rhinoSSLS,
    rhinoTechnoEdge,
    rhinoKuokFoundationHouse,
    rhinoMedicineScienceLibrary,
    rhinoShearesMain,
    rhinoShearesA,
    rhinoRvrcG,
    rhinoLKCMuseum,
    rhinoYNCArtsCenter,
  ];
}

type ModelOptions = {
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

function getModelFromGltf(params: ModelOptions) {
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
    show = true,
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
