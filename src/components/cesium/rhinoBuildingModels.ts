import { getModelFromUrl } from './cesiumUtils';

export async function load() {
  const rhinoE6 = await getModelFromUrl({
    url: '/e6/e6-rhino-ion/tileset.json',
    featureIdLabel: '139959760',
  });

  const rhinoE2A = await getModelFromUrl({
    url: '/e2a/e2a-rhino-ion/tileset.json',
    featureIdLabel: '628777635',
  });

  const rhinoCELC = await getModelFromUrl({
    url: '/celc/celc-rhino-ion/tileset.json',
    featureIdLabel: '140084916',
  });

  const rhinoPioneerHouse2225 = await getModelFromUrl({
    url: '/pioneer-house/pioneer-house-22-25-rhino-ion/tileset.json',
    featureIdLabel: '238932774',
  });

  const rhinoCOM2 = await getModelFromUrl({
    url: '/com2/com2-rhino-ion/tileset.json',
    featureIdLabel: '54619699',
  });

  const rhinoPgprBlock1 = await getModelFromUrl({
    url: '/pgpr/pgpr-block1-rhino-ion/tileset.json',
    featureIdLabel: '238932786',
  });

  const rhinoAS8 = await getModelFromUrl({
    url: '/as8/as8-rhino-ion/tileset.json',
    featureIdLabel: '54583485',
  });

  const rhinoNUSMuseum = await getModelFromUrl({
    url: '/nus-museum/nus-museum-rhino-ion/tileset.json',
    featureIdLabel: '54583930',
  });

  const rhinoSDE2 = await getModelFromUrl({
    url: '/sde2/sde2-rhino-ion/tileset.json',
    featureIdLabel: '140078560',
  });

  const rhinoSDE3 = await getModelFromUrl({
    url: '/sde3/sde3-rhino-ion/tileset.json',
    featureIdLabel: '140079084',
  });

  const rhinoSDE4 = await getModelFromUrl({
    url: '/sde4/sde4-rhino-ion/tileset.json',
    featureIdLabel: '628774809',
  });

  const rhinoTechnoEdge = await getModelFromUrl({
    url: '/techno-edge/techno-edge-rhino-ion/tileset.json',
    featureIdLabel: '730959512',
  });

  const rhinoUSC = await getModelFromUrl({
    url: '/usc/usc-rhino-ion/tileset.json',
    featureIdLabel: '730956214',
  });

  const rhinoTheDeck = await getModelFromUrl({
    url: '/the-deck/the-deck-rhino-ion/tileset.json',
    featureIdLabel: '140087193',
  });

  const rhinoSSLS = await getModelFromUrl({
    url: '/ssls/ssls-rhino-ion/tileset.json',
    featureIdLabel: '54619730',
  });

  const rhinoKuokFoundationHouse = await getModelFromUrl({
    url: '/raffles-hall/kuok-foundation-house-rhino-ion/tileset.json',
    featureIdLabel: '241265457',
  });

  const rhinoMedicineScienceLibrary = await getModelFromUrl({
    url: '/msl/msl-rhino-ion/tileset.json',
    featureIdLabel: '141913116',
  });

  const rhinoShearesMain = await getModelFromUrl({
    url: '/sheares-hall/sheares-main-rhino-ion/tileset.json',
    featureIdLabel: '639258228',
  });

  const rhinoShearesA = await getModelFromUrl({
    url: '/sheares-hall/sheares-a-rhino-ion/tileset.json',
    featureIdLabel: '455250294',
  });

  const rhinoRvrcG = await getModelFromUrl({
    url: '/rvrc/rvrc-g-rhino-ion/tileset.json',
    featureIdLabel: '546382548',
  });

  const rhinoLKCMuseum = await getModelFromUrl({
    url: '/lkc-museum/lkc-museum-rhino-ion/tileset.json',
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
    rhinoPioneerHouse2225,
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
