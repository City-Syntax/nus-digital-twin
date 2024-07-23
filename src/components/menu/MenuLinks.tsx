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
      <MenuLink
        toPage="rhino-building"
        label="Rhino (Building)"
        iconName="RhinoModels"
        isActive={$activeModel === 'rhino-building'}
      ></MenuLink>
    </>
  );
};

const UrbanScaleModels = () => {
  const $activeModel = useStore(activeModel);

  return (
    <>
      <MenuLink toPage="osm" label="OSM Buildings" iconName="OSMBuildings" isActive={$activeModel === 'osm'}></MenuLink>
      <MenuLink
        toPage="rhino-urban"
        label="Rhino (Urban)"
        iconName="RhinoModels"
        isActive={$activeModel === 'rhino-urban'}
      ></MenuLink>
      <MenuLink toPage="ubem" label="UBEM" iconName="UBEM"></MenuLink>
    </>
  );
};

const Controls = () => {
  const $buildingColorSetting = useStore(buildingColorSetting);
  const $activeModel = useStore(activeModel);
  return (
    <>
      <MenuLink toPage="buildings" label="Buildings" iconName="Buildings"></MenuLink>
      <MenuLink toPage="energy" label="Energy" iconName="Energy"></MenuLink>
      <MenuLink toPage="thermal-comfort" label="Thermal Comfort" iconName="ThermalComfort"></MenuLink>
      <MenuLink toPage="wind" label="Wind" iconName="Wind"></MenuLink>
      <MenuLink toPage="solar" label="Solar" iconName="Solar"></MenuLink>
      <MenuLink
        toPage="distance"
        label="Distance"
        iconName="Distance"
        isActive={$buildingColorSetting === 'distance' && $activeModel === 'osm'}
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
