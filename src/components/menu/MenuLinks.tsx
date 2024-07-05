import React from 'react';
import { activeGISLayer, activeModel } from '../../store';
import MenuLink from './MenuLink';
import { useStore } from '@nanostores/react';

const GISLayers = () => {
  const $activeGISLayer = useStore(activeGISLayer);
  return (
    <>
      <MenuLink
        toPage="street-centerlines"
        label="Street Centerlines"
        iconName="StreetCenterlines"
        isActive={$activeGISLayer.has('street-centerlines')}
      ></MenuLink>
      <MenuLink
        toPage="building-footprints"
        label="Building Footprints"
        iconName="BuildingFootprints"
        isActive={$activeGISLayer.has('building-footprints')}
      ></MenuLink>
      <MenuLink
        toPage="green-spaces"
        label="Green Spaces"
        iconName="GreenSpaces"
        isActive={$activeGISLayer.has('green-spaces')}
      ></MenuLink>
    </>
  );
};

const BuildingScaleModels = () => {
  const $activeModel = useStore(activeModel);

  return (
    <>
      <MenuLink toPage="bim" label="BIM Models" iconName="BIMModels" isActive={$activeModel === 'bim'}></MenuLink>
      <MenuLink toPage="rhino-building" label="Rhino (Building)" iconName="RhinoModels"></MenuLink>
    </>
  );
};

export default {
  GISLayers,
  BuildingScaleModels,
};
