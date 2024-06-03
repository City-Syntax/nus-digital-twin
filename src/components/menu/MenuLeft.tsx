import React from 'react';
import MenuLink from './MenuLink';
import { useStore } from '@nanostores/react';
import { searchQuery, buildingId } from '../../store';
import Icons from '../Icons';
import buildingsData from '../../content/buildings/buildings.json';

const MenuLeft = () => {
  const $searchQuery = useStore(searchQuery);
  buildingId.listen((newId) => {
    if (newId === '') {
      return;
    }
    searchQuery.set(buildingsData.filter((d) => d.elementId == newId)[0].name);
  });

  return (
    <nav className="menubar-left">
      <div className="menubar-header">
        <div className="search">
          <input
            type="text"
            placeholder="Search buildings"
            onChange={(e) => searchQuery.set(e.target.value)}
            value={$searchQuery}
            name="search"
          />
          <Icons.Search></Icons.Search>
        </div>
      </div>
      <div className="menubar-body">
        <div className="menu-list">
          <div className="menu-list-title">About</div>
          <MenuLink toPage="about" label="About NUS Campus" iconName="AboutNUSCampus"></MenuLink>
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
