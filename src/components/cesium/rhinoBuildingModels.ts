import { getModelFromCesiumIon, getModelFromGltf, getModelFromUrl } from './cesiumUtils';

export async function load() {
  const rhinoE6 = getModelFromUrl({
    url: '/e6/e6-rhino-ion/tileset.json',
    featureIdLabel: '139959760',
  });

  const rhinoE2A = getModelFromUrl({
    url: '/e2a/e2a-rhino-ion/tileset.json',
    featureIdLabel: '628777635',
  });

  const rhinoE7 = getModelFromGltf({
    latitude: 1.298697,
    longitude: 103.77293,
    height: 30,
    heading: 153,
    url: '/e7/e7-rhino.glb',
    featureIdLabel: '1060426986',
  });

  const rhinoCELC = getModelFromUrl({
    url: '/celc/celc-rhino-ion/tileset.json',
    featureIdLabel: '140084916',
  });

  const rhinoPioneerHouse2225 = getModelFromUrl({
    url: '/pioneer-house/pioneer-house-22-25-rhino-ion/tileset.json',
    featureIdLabel: '238932774',
  });

  const rhinoCOM2 = getModelFromUrl({
    url: '/com2/com2-rhino-ion/tileset.json',
    featureIdLabel: '54619699',
  });

  const rhinoPgprBlock1 = getModelFromUrl({
    url: '/pgpr/pgpr-block1-rhino-ion/tileset.json',
    featureIdLabel: '238932786',
  });

  const rhinoAS8 = getModelFromUrl({
    url: '/as8/as8-rhino-ion/tileset.json',
    featureIdLabel: '54583485',
  });

  const rhinoNUSMuseum = getModelFromUrl({
    url: '/nus-museum/nus-museum-rhino-ion/tileset.json',
    featureIdLabel: 'NUS_MUSEUM',
  });

  const rhinoSDE1 = getModelFromUrl({
    url: '/sde1/sde1-rhino-ion/tileset.json',
    featureIdLabel: '140078777',
  });

  const rhinoSDE2 = getModelFromUrl({
    url: '/sde2/sde2-rhino-ion/tileset.json',
    featureIdLabel: '140078560',
  });

  const rhinoSDE3 = getModelFromUrl({
    url: '/sde3/sde3-rhino-ion/tileset.json',
    featureIdLabel: '140079084',
  });

  const rhinoSDE4 = getModelFromUrl({
    url: '/sde4/sde4-rhino-ion/tileset.json',
    featureIdLabel: '628774809',
  });

  const rhinoTechnoEdge = getModelFromUrl({
    url: '/techno-edge/techno-edge-rhino-ion/tileset.json',
    featureIdLabel: '730959512',
  });

  const rhinoUSC = getModelFromUrl({
    url: '/usc/usc-rhino-ion/tileset.json',
    featureIdLabel: '730956214',
  });

  const rhinoTheDeck = getModelFromUrl({
    url: '/the-deck/the-deck-rhino-ion/tileset.json',
    featureIdLabel: '140087193',
  });

  const rhinoSSLS = getModelFromUrl({
    url: '/ssls/ssls-rhino-ion/tileset.json',
    featureIdLabel: '54619730',
  });

  const rhinoKuokFoundationHouse = getModelFromUrl({
    url: '/raffles-hall/kuok-foundation-house-rhino-ion/tileset.json',
    featureIdLabel: '241265457',
  });

  const rhinoMedicineScienceLibrary = getModelFromUrl({
    url: '/msl/msl-rhino-ion/tileset.json',
    featureIdLabel: '141913116',
  });

  const rhinoShearesMain = getModelFromUrl({
    url: '/sheares-hall/sheares-main-rhino-ion/tileset.json',
    featureIdLabel: '639258228',
  });

  const rhinoShearesA = getModelFromUrl({
    url: '/sheares-hall/sheares-a-rhino-ion/tileset.json',
    featureIdLabel: '455250294',
  });

  const rhinoRvrcG = getModelFromUrl({
    url: '/rvrc/rvrc-g-rhino-ion/tileset.json',
    featureIdLabel: '546382548',
  });

  const rhinoLKCMuseum = getModelFromUrl({
    url: '/lkc-museum/lkc-museum-rhino-ion/tileset.json',
    featureIdLabel: '54619794',
  });

  const rhinoYNCArtsCenter = getModelFromUrl({
    url: '/ync/ync-arts-center-rhino-ion/tileset.json',
    featureIdLabel: '732229049',
  });

  const rhinoAS7 = getModelFromUrl({
    url: '/as7/as7-rhino-ion/tileset.json',
    featureIdLabel: '142079835',
  });

  return Promise.all([
    rhinoE2A,
    rhinoE6,
    rhinoE7,
    rhinoCELC,
    rhinoPioneerHouse2225,
    rhinoNUSMuseum,
    rhinoCOM2,
    rhinoPgprBlock1,
    rhinoAS8,
    rhinoSDE1,
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
    rhinoAS7,
  ]);
}
