import React from 'react';
import MenuLink from './MenuLink';
import Searchbar from '../Searchbar';

const MenuLeft = () => {
  return (
    <nav className="menubar-left">
      <div className="menubar-header">
        <Searchbar />
      </div>
      <div className="menubar-body">
        <div className="menu-list">
          <div className="menu-list-title">About</div>
          <MenuLink toPage="about" label="About NUS Campus" iconName="About"></MenuLink>
        </div>
        <div className="menu-list">
          <div className="menu-list-title">GIS Layers</div>
          <MenuLink toPage="street-centerlines" label="Street Centerlines" iconName="StreetCenterlines"></MenuLink>
          <MenuLink toPage="building-footprints" label="Building Footprints" iconName="BuildingFootprints"></MenuLink>
          <MenuLink toPage="green-spaces" label="Green Spaces" iconName="GreenSpaces"></MenuLink>
          <MenuLink toPage="water-bodies" label="Water Bodies" iconName="WaterBodies"></MenuLink>
        </div>
        <div className="menu-list">
          <div className="menu-list-title">Building Scale Models</div>
          <MenuLink toPage="bim" label="BIM Models" iconName="BIMModels"></MenuLink>
          <MenuLink toPage="rhino-building" label="Rhino (Building)" iconName="RhinoModels"></MenuLink>
        </div>
        <div className="menu-list">
          <div className="menu-list-title">Urban Scale Models</div>
          <MenuLink toPage="osm" label="OSM Buildings" iconName="OSMBuildings"></MenuLink>
          <MenuLink toPage="rhino-urban" label="Rhino (Urban)" iconName="RhinoModels"></MenuLink>
          <MenuLink toPage="ubem" label="UBEM" iconName="UBEM"></MenuLink>
        </div>
      </div>
      <div className="menubar-footer">
        <div className="menu-list">
          <MenuLink toPage="help" label="Help" iconName="Help"></MenuLink>
          <MenuLink toPage="settings" label="Settings" iconName="Settings"></MenuLink>
        </div>
      </div>
    </nav>
  );
};

export default MenuLeft;
