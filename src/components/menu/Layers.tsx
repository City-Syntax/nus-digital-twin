import React from 'react';
import MenuLink from './MenuLink';
import CloseButton from './CloseButton';
import { activeGISLayer, activeModel } from '../../store';
import { useStore } from '@nanostores/react';

const Layers = () => {
  const $activeModel = useStore(activeModel);
  const $activeGISLayer = useStore(activeGISLayer);
  return (
    <>
      <div className="menubar-content-header">
        <h2>Layers</h2>
        <CloseButton></CloseButton>
      </div>
      <div className="menubar-content-body">
        <div className="menu-list">
          <div className="menu-list-title">GIS Layers</div>
          <MenuLink
            toPage="street-centerlines"
            label="Street Centerlines"
            iconName="StreetCenterlines"
            isActive={$activeGISLayer === 'street-centerlines'}
          ></MenuLink>
          <MenuLink
            toPage="building-footprints"
            label="Building Footprints"
            iconName="BuildingFootprints"
            isActive={$activeGISLayer === 'building-footprints'}
          ></MenuLink>
          <MenuLink
            toPage="green-spaces"
            label="Green Spaces"
            iconName="GreenSpaces"
            isActive={$activeGISLayer === 'green-spaces'}
          ></MenuLink>
          <MenuLink
            toPage="water-bodies"
            label="Water Bodies"
            iconName="WaterBodies"
            isActive={$activeGISLayer === 'water-bodies'}
          ></MenuLink>
        </div>
        <div className="menu-list">
          <div className="menu-list-title">Building Scale Models</div>
          <MenuLink toPage="bim" label="BIM Models" iconName="BIMModels" isActive={$activeModel === 'bim'}></MenuLink>
          <MenuLink toPage="rhino-building" label="Rhino (Building)" iconName="RhinoModels"></MenuLink>
        </div>
        <div className="menu-list">
          <div className="menu-list-title">Urban Scale Models</div>
          <MenuLink
            toPage="osm"
            label="OSM Buildings"
            iconName="OSMBuildings"
            isActive={$activeModel === 'osm'}
          ></MenuLink>
          <MenuLink toPage="rhino-urban" label="Rhino (Urban)" iconName="RhinoModels"></MenuLink>
          <MenuLink toPage="ubem" label="UBEM" iconName="UBEM" isActive={$activeModel === 'ubem'}></MenuLink>
        </div>
      </div>
    </>
  );
};

export default Layers;
