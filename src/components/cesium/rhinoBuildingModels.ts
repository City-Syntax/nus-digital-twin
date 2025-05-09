import { getModelFromCesiumIon, getModelFromGltf, getModelFromUrl } from './cesiumUtils';

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

  const rhinoE2A = await getModelFromUrl({
    url: '/e2a/e2a-rhino-ion/tileset.json',
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

  const rhinoCOM2 = await getModelFromGltf({
    longitude: 103.7743124495,
    latitude: 1.2939952856,
    height: 37.2996820597,
    heading: -204,
    url: '/com2/com2-rhino.gltf',
    featureIdLabel: '54619699',
    scale: 0.43,
  });

  const rhinoPgprBlock1 = await getModelFromGltf({
    longitude: 103.7829198753,
    latitude: 1.291489802,
    height: 51.2208270602,
    heading: -40,
    url: '/pgpr/pgpr-block1-rhino.gltf',
    featureIdLabel: '238932786',
    scale: 0.48,
  });

  const rhinoAS8 = await getModelFromGltf({
    longitude: 103.7722692363,
    latitude: 1.296027148,
    height: 55.2598169315,
    heading: 109.9,
    url: '/as8/as8-rhino.gltf',
    featureIdLabel: '54583485',
  });

  const rhinoNUSMuseum = await getModelFromUrl({
    url: '/nus-museum/nus-museum-rhino-ion/tileset.json',
    featureIdLabel: '54583930',
  });

  const rhinoSDE2 = await getModelFromGltf({
    longitude: 103.7711425478,
    latitude: 1.297249525,
    height: 50.3291321597,
    heading: 199,
    url: '/sde2/sde2-rhino.gltf',
    featureIdLabel: '140078560',
  });

  const rhinoSDE3 = await getModelFromGltf({
    longitude: 103.7703213411,
    latitude: 1.2981575567,
    height: 72.1150038858,
    heading: 154.7,
    scale: 1.2,
    url: '/sde3/sde3-rhino.gltf',
    featureIdLabel: '140079084',
  });

  const rhinoSDE4 = await getModelFromGltf({
    longitude: 103.7703672003,
    latitude: 1.2968668531,
    height: 45.0226349587,
    heading: 108.8,
    url: '/sde4/sde4-rhino.gltf',
    featureIdLabel: '628774809',
  });

  const rhinoTechnoEdge = await getModelFromGltf({
    longitude: 103.7714223457,
    latitude: 1.2979071911,
    height: 58.3863356009,
    heading: 233.1,
    url: '/techno-edge/techno-edge-rhino.gltf',
    featureIdLabel: '730959512',
  });

  const rhinoUSC = await getModelFromGltf({
    longitude: 103.775544178,
    latitude: 1.2997341879,
    height: 27.7347173989,
    heading: -2.5,
    scale: 0.9,
    url: '/usc/usc-rhino.gltf',
    featureIdLabel: '730956214',
  });

  const rhinoTheDeck = await getModelFromGltf({
    longitude: 103.7724884969,
    latitude: 1.2946662859,
    height: 65.8838104518,
    heading: -28,
    scale: 1.4,
    url: '/the-deck/the-deck-rhino.gltf',
    featureIdLabel: '140087193',
  });

  const rhinoSSLS = await getModelFromGltf({
    longitude: 103.7750945264,
    latitude: 1.295625549,
    height: 45.8205900698,
    heading: 55.6,
    url: '/ssls/ssls-rhino.gltf',
    featureIdLabel: '54619730',
  });

  const rhinoKuokFoundationHouse = await getModelFromGltf({
    longitude: 103.7736119902,
    latitude: 1.3003336117,
    height: 51.8346518242,
    heading: -25.5,
    scale: 1.52,
    url: '/raffles-hall/kuok-foundation-house-rhino.gltf',
    featureIdLabel: '241265457',
  });

  const rhinoMedicineScienceLibrary = await getModelFromGltf({
    longitude: 103.7817655955,
    latitude: 1.2969427365,
    height: 39.6354038487,
    heading: -69.8,
    url: '/msl/msl-rhino.gltf',
    featureIdLabel: '141913116',
  });

  const rhinoShearesMain = await getModelFromGltf({
    longitude: 103.7758329693,
    latitude: 1.2914051269,
    height: 44.1314822062,
    heading: 28.7,
    scale: 1.2,
    url: '/sheares-hall/sheares-main-rhino.gltf',
    featureIdLabel: '639258228',
  });

  const rhinoShearesA = await getModelFromGltf({
    longitude: 103.775214582,
    latitude: 1.2914901374,
    height: 30.437453453,
    heading: 111.3,
    scale: 0.4,
    url: '/sheares-hall/sheares-a-rhino.gltf',
    featureIdLabel: '455250294',
  });

  const rhinoRvrcG = await getModelFromGltf({
    longitude: 103.7767993479,
    latitude: 1.2974922895,
    height: 44.840297406,
    heading: -70.1,
    url: '/rvrc/rvrc-g-rhino.gltf',
    featureIdLabel: '546382548',
  });

  const rhinoLKCMuseum = await getModelFromCesiumIon({
    assetId: 2685876,
    featureIdLabel: '54619794',
  });

  const rhinoYNCArtsCenter = await getModelFromUrl({
    url: '/ync/ync-arts-center-rhino-ion/tileset.json',
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
