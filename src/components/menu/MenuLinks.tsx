import React from 'react';
import { activeGISLayer, activeModel, buildingColorSetting, showPoints } from '../../store';
import MenuLink from './MenuLink';
import { useStore } from '@nanostores/react';
import type { MenuDir } from '../../types';
import Icons from '../Icons';

type MenuLinksProps = {
  dir: MenuDir;
};

const Points = ({ dir }: MenuLinksProps) => {
  const $showPoints = useStore(showPoints);
  return (
    <>
      <MenuLink
        toPage="points-of-interest"
        label="Points of Interest"
        iconName="Point"
        dir={dir}
        isActive={$showPoints}
        isLeft
        isBottom
      ></MenuLink>
    </>
  );
};

const GISLayers = ({ dir }: MenuLinksProps) => {
  const $activeGISLayer = useStore(activeGISLayer);
  return (
    <>
      <MenuLink
        toPage="street-centerlines"
        label="Street Centerlines"
        iconName="StreetCenterlines"
        dir={dir}
        isActive={$activeGISLayer.has('street-centerlines')}
        isLeft
        isBottom
      ></MenuLink>
      <MenuLink
        toPage="building-footprints"
        label="Building Footprints"
        iconName="BuildingFootprints"
        dir={dir}
        isActive={$activeGISLayer.has('building-footprints')}
        isLeft
        isBottom
      ></MenuLink>
      <MenuLink
        toPage="green-spaces"
        label="Green Spaces"
        iconName="GreenSpaces"
        dir={dir}
        isActive={$activeGISLayer.has('green-spaces')}
        isLeft
        isBottom
      ></MenuLink>
    </>
  );
};

const BuildingScaleModels = ({ dir }: MenuLinksProps) => {
  const $activeModel = useStore(activeModel);

  return (
    <>
      <MenuLink
        toPage="bim"
        label="BIM Models"
        iconName="BIMModels"
        dir={dir}
        isActive={$activeModel === 'bim'}
        isLeft
        isBottom
      ></MenuLink>
      <MenuLink
        toPage="rhino-building"
        label="Rhino (Building)"
        iconName="RhinoModels"
        dir={dir}
        isActive={$activeModel === 'rhino-building'}
        isLeft
        isBottom
      ></MenuLink>
    </>
  );
};

const UrbanScaleModels = ({ dir }: MenuLinksProps) => {
  const $activeModel = useStore(activeModel);

  return (
    <>
      <MenuLink
        toPage="osm"
        label="OSM Buildings"
        iconName="OSMBuildings"
        dir={dir}
        isActive={$activeModel === 'osm'}
        isLeft
        isBottom
      ></MenuLink>
      <MenuLink
        toPage="rhino-urban"
        label="Rhino (Urban)"
        iconName="RhinoModels"
        dir={dir}
        isActive={$activeModel === 'rhino-urban'}
        isLeft
        isBottom
      ></MenuLink>
      <MenuLink toPage="ubem" label="UBEM" iconName="UBEM" dir={dir} isLeft isBottom></MenuLink>
    </>
  );
};

const Controls = ({ dir }: MenuLinksProps) => {
  const $buildingColorSetting = useStore(buildingColorSetting);
  const $activeModel = useStore(activeModel);
  return (
    <>
      <MenuLink toPage="buildings" label="Buildings" iconName="Buildings" dir={dir} isRight isBottom></MenuLink>
      <MenuLink toPage="energy" label="Energy" iconName="Energy" dir={dir} isRight isBottom></MenuLink>
      <MenuLink
        toPage="thermal-comfort"
        label="Thermal Comfort"
        dir={dir}
        iconName="ThermalComfort"
        isRight
        isBottom
      ></MenuLink>
      <MenuLink toPage="wind" label="Wind" dir={dir} iconName="Wind" isRight isBottom></MenuLink>
      <MenuLink toPage="solar" label="Solar" dir={dir} iconName="Solar" isRight isBottom></MenuLink>
      <MenuLink
        toPage="distance"
        label="Distance"
        iconName="Distance"
        dir={dir}
        isActive={$buildingColorSetting === 'distance' && $activeModel === 'osm'}
        isRight
        isBottom
      ></MenuLink>
    </>
  );
};

const Menu = ({ dir }: MenuLinksProps) => {
  return (
    <>
      <MenuLink toPage="help" label="Help" iconName="Help" dir={dir} isBottom isLeft></MenuLink>
      <MenuLink toPage="settings" label="Settings" iconName="Settings" dir={dir} isBottom isLeft></MenuLink>
    </>
  );
};

const Resources = () => {
  return (
    <>
      <a className="menu-link" href="/tutorials" target="_blank">
        <Icons.Video></Icons.Video>
        Tutorial Videos
      </a>
      <a className="menu-link" href="/api/v1" target="_blank">
        <Icons.Api></Icons.Api>
        API Reference
      </a>
    </>
  );
};

export default {
  Points,
  GISLayers,
  BuildingScaleModels,
  UrbanScaleModels,
  Controls,
  Menu,
  Resources,
};
