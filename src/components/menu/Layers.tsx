import React from 'react';
import MenuLink from './MenuLink';
import CloseButton from './CloseButton';

const Layers = () => {
  return (
    <>
      <div className="menubar-content-header">
        <h2>Layers</h2>
        <CloseButton></CloseButton>
      </div>
      <div className="menubar-content-body">
        <div className="menu-list">
          <div className="menu-list-title">GIS Layers</div>
          <MenuLink toPage="street-centerlines" label="Street Centerlines" iconName="StreetCenterlines"></MenuLink>
          <MenuLink toPage="building-footprints" label="Building Footprints" iconName="BuildingFootprints"></MenuLink>
          <MenuLink toPage="green-spaces" label="Green Spaces" iconName="GreenSpaces"></MenuLink>
          <MenuLink toPage="water-bodies" label="Water Bodies" iconName="WaterBodies"></MenuLink>
        </div>
        <div className="menu-list">
          <div className="menu-list-title">Building Data Layers</div>
          <MenuLink toPage="osm" label="OSM Buildings" iconName="OSMBuildings"></MenuLink>
          <MenuLink toPage="rhino" label="Rhino Models" iconName="RhinoModels"></MenuLink>
          <MenuLink toPage="bim" label="BIM Models" iconName="BIMModels"></MenuLink>
        </div>
      </div>
    </>
  );
};

export default Layers;
