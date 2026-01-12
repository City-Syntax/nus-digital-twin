import { getModelFromGltf, getModelFromUrl } from './cesiumUtils';
import type { Model, Cesium3DTileset } from 'cesium';

export type ModelConfig =
  | { type: 'url'; url: string; featureIdLabel: string }
  | {
      type: 'gltf';
      latitude: number;
      longitude: number;
      height: number;
      heading?: number;
      pitch?: number;
      roll?: number;
      url: string;
      featureIdLabel: string;
      scale?: number;
    };

// Map of featureIdLabel to model configuration
export const rhinoBuildingModelConfigs: Map<string, ModelConfig> = new Map([
  ['139978993', { type: 'url', url: '/ea/ea-rhino-ion/tileset.json', featureIdLabel: '139978993' }],
  ['139976284', { type: 'url', url: '/e1a/e1a-rhino-ion/tileset.json', featureIdLabel: '139976284' }],
  ['628777635', { type: 'url', url: '/e2a/e2a-rhino-ion/tileset.json', featureIdLabel: '628777635' }],
  ['139970613', { type: 'url', url: '/e4/e4-rhino-ion/tileset.json', featureIdLabel: '139970613' }],
  ['54583929', { type: 'url', url: '/e5/e5-rhino-ion/tileset.json', featureIdLabel: '54583929' }],
  ['139959760', { type: 'url', url: '/e6/e6-rhino-ion/tileset.json', featureIdLabel: '139959760' }],
  [
    '1060426986',
    {
      type: 'gltf',
      latitude: 1.298697,
      longitude: 103.77293,
      height: 30,
      heading: 153,
      url: '/e7/e7-rhino.glb',
      featureIdLabel: '1060426986',
    },
  ],
  ['139959807', { type: 'url', url: '/e8/e8-rhino-ion/tileset.json', featureIdLabel: '139959807' }],
  ['140084916', { type: 'url', url: '/celc/celc-rhino-ion/tileset.json', featureIdLabel: '140084916' }],
  [
    '238932774',
    { type: 'url', url: '/pioneer-house/pioneer-house-22-25-rhino-ion/tileset.json', featureIdLabel: '238932774' },
  ],
  ['54619721', { type: 'url', url: '/com1/com1-rhino-ion/tileset.json', featureIdLabel: '54619721' }],
  ['54619699', { type: 'url', url: '/com2/com2-rhino-ion/tileset.json', featureIdLabel: '54619699' }],
  ['238932786', { type: 'url', url: '/pgpr/pgpr-block1-rhino-ion/tileset.json', featureIdLabel: '238932786' }],
  ['54583485', { type: 'url', url: '/as8/as8-rhino-ion/tileset.json', featureIdLabel: '54583485' }],
  ['NUS_MUSEUM', { type: 'url', url: '/nus-museum/nus-museum-rhino-ion/tileset.json', featureIdLabel: 'NUS_MUSEUM' }],
  ['140078777', { type: 'url', url: '/sde1/sde1-rhino-ion/tileset.json', featureIdLabel: '140078777' }],
  ['140078560', { type: 'url', url: '/sde2/sde2-rhino-ion/tileset.json', featureIdLabel: '140078560' }],
  ['140079084', { type: 'url', url: '/sde3/sde3-rhino-ion/tileset.json', featureIdLabel: '140079084' }],
  ['628774809', { type: 'url', url: '/sde4/sde4-rhino-ion/tileset.json', featureIdLabel: '628774809' }],
  ['730959512', { type: 'url', url: '/techno-edge/techno-edge-rhino-ion/tileset.json', featureIdLabel: '730959512' }],
  ['730956214', { type: 'url', url: '/usc/usc-rhino-ion/tileset.json', featureIdLabel: '730956214' }],
  ['140087193', { type: 'url', url: '/the-deck/the-deck-rhino-ion/tileset.json', featureIdLabel: '140087193' }],
  ['54619730', { type: 'url', url: '/ssls/ssls-rhino-ion/tileset.json', featureIdLabel: '54619730' }],
  [
    '241265457',
    { type: 'url', url: '/raffles-hall/kuok-foundation-house-rhino-ion/tileset.json', featureIdLabel: '241265457' },
  ],
  [
    '241265456',
    { type: 'url', url: '/raffles-hall/raffles-hall-6-rhino-ion/tileset.json', featureIdLabel: '241265456' },
  ],
  ['141913116', { type: 'url', url: '/msl/msl-rhino-ion/tileset.json', featureIdLabel: '141913116' }],
  ['639258228', { type: 'url', url: '/sheares-hall/sheares-main-rhino-ion/tileset.json', featureIdLabel: '639258228' }],
  ['455250294', { type: 'url', url: '/sheares-hall/sheares-a-rhino-ion/tileset.json', featureIdLabel: '455250294' }],
  ['546382548', { type: 'url', url: '/rvrc/rvrc-g-rhino-ion/tileset.json', featureIdLabel: '546382548' }],
  ['54619794', { type: 'url', url: '/lkc-museum/lkc-museum-rhino-ion/tileset.json', featureIdLabel: '54619794' }],
  ['732229049', { type: 'url', url: '/ync/ync-arts-center-rhino-ion/tileset.json', featureIdLabel: '732229049' }],
  ['142080062', { type: 'url', url: '/as5/as5-rhino-ion/tileset.json', featureIdLabel: '142080062' }],
  ['142079835', { type: 'url', url: '/as7/as7-rhino-ion/tileset.json', featureIdLabel: '142079835' }],
  [
    '142221863',
    { type: 'url', url: '/temasek-hall/temasek-hall-e-rhino-ion/tileset.json', featureIdLabel: '142221863' },
  ],
  ['111973157', { type: 'url', url: '/ystcm/ystcm-rhino-ion/tileset.json', featureIdLabel: '111973157' }],
  ['54619703', { type: 'url', url: '/i4/i4-rhino-ion/tileset.json', featureIdLabel: '54619703' }],
  ['54619685', { type: 'url', url: '/hssml/hssml-rhino-ion/tileset.json', featureIdLabel: '54619685' }],
  ['140087160', { type: 'url', url: '/biz1/biz1-rhino-ion/tileset.json', featureIdLabel: '140087160' }],
  ['124543527', { type: 'url', url: '/capt/capt-rhino-ion/tileset.json', featureIdLabel: '124543527' }],
  ['125842215', { type: 'url', url: '/create-tower/create-tower-rhino-ion/tileset.json', featureIdLabel: '125842215' }],
  [
    '54583490',
    { type: 'url', url: '/central-library/central-library-rhino-ion/tileset.json', featureIdLabel: '54583490' },
  ],
  [
    'HELIX_HOUSE',
    { type: 'url', url: '/helix-house/helix-house-rhino-ion/tileset.json', featureIdLabel: 'HELIX_HOUSE' },
  ],
  ['141912739', { type: 'url', url: '/md1/md1-rhino-ion/tileset.json', featureIdLabel: '141912739' }],
  [
    '124542228',
    { type: 'url', url: '/cinnamon-college/cinnamon-college-rhino-ion/tileset.json', featureIdLabel: '124542228' },
  ],
]);

/**
 * Load a single model by its featureIdLabel
 */
export async function loadModel(featureIdLabel: string): Promise<Model | Cesium3DTileset | null> {
  const config = rhinoBuildingModelConfigs.get(featureIdLabel);
  if (!config) {
    return null;
  }

  if (config.type === 'url') {
    return getModelFromUrl({
      url: config.url,
      featureIdLabel: config.featureIdLabel,
    });
  } else {
    return getModelFromGltf({
      latitude: config.latitude,
      longitude: config.longitude,
      height: config.height,
      heading: config.heading,
      pitch: config.pitch,
      roll: config.roll,
      url: config.url,
      featureIdLabel: config.featureIdLabel,
      scale: config.scale,
    });
  }
}

/**
 * Get all featureIdLabels for rhino building models
 */
export function getAllFeatureIdLabels(): string[] {
  return Array.from(rhinoBuildingModelConfigs.keys());
}
