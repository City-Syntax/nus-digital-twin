import { getModelFromCesiumIon } from './cesiumUtils';

export async function load() {
  const sde4 = await getModelFromCesiumIon({
    assetId: 2464285,
    featureIdLabel: '628774809',
  });

  const ync = await getModelFromCesiumIon({
    assetId: 2463878,
    featureIdLabel: '732229050',
  });

  return [sde4, ync];
}
