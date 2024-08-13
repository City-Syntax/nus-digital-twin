import React from 'react';
import { activeGISLayer, activeModel, buildingColorSetting } from '../../store';
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
        isLeft
        isBottom
      ></MenuLink>
      <MenuLink
        toPage="building-footprints"
        label="Building Footprints"
        iconName="BuildingFootprints"
        isActive={$activeGISLayer.has('building-footprints')}
        isLeft
        isBottom
      ></MenuLink>
      <MenuLink
        toPage="green-spaces"
        label="Green Spaces"
        iconName="GreenSpaces"
        isActive={$activeGISLayer.has('green-spaces')}
        isLeft
        isBottom
      ></MenuLink>
    </>
  );
};

const BuildingScaleModels = () => {
  const $activeModel = useStore(activeModel);

  return (
    <>
      <MenuLink
        toPage="bim"
        label="BIM Models"
        iconName="BIMModels"
        isActive={$activeModel === 'bim'}
        isLeft
        isBottom
      ></MenuLink>
      <MenuLink
        toPage="rhino-building"
        label="Rhino (Building)"
        iconName="RhinoModels"
        isActive={$activeModel === 'rhino-building'}
        isLeft
        isBottom
      ></MenuLink>
    </>
  );
};

const UrbanScaleModels = () => {
  const $activeModel = useStore(activeModel);

  return (
    <>
      <MenuLink
        toPage="osm"
        label="OSM Buildings"
        iconName="OSMBuildings"
        isActive={$activeModel === 'osm'}
        isLeft
        isBottom
      ></MenuLink>
      <MenuLink
        toPage="rhino-urban"
        label="Rhino (Urban)"
        iconName="RhinoModels"
        isActive={$activeModel === 'rhino-urban'}
        isLeft
        isBottom
      ></MenuLink>
      <MenuLink toPage="ubem" label="UBEM" iconName="UBEM" isLeft isBottom></MenuLink>
    </>
  );
};

const Controls = () => {
  const $buildingColorSetting = useStore(buildingColorSetting);
  const $activeModel = useStore(activeModel);
  return (
    <>
      <MenuLink toPage="buildings" label="Buildings" iconName="Buildings" isRight isBottom></MenuLink>
      <MenuLink toPage="energy" label="Energy" iconName="Energy" isRight isBottom></MenuLink>
      <MenuLink toPage="thermal-comfort" label="Thermal Comfort" iconName="ThermalComfort" isRight isBottom></MenuLink>
      <MenuLink toPage="wind" label="Wind" iconName="Wind" isRight isBottom></MenuLink>
      <MenuLink toPage="solar" label="Solar" iconName="Solar" isRight isBottom></MenuLink>
      <MenuLink
        toPage="distance"
        label="Distance"
        iconName="Distance"
        isActive={$buildingColorSetting === 'distance' && $activeModel === 'osm'}
        isRight
        isBottom
      ></MenuLink>
    </>
  );
};

export default {
  GISLayers,
  BuildingScaleModels,
  UrbanScaleModels,
  Controls,
};
