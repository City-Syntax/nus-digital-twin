import React from 'react';
import MenuContent from './MenuContent';
import MenuLink from './MenuLink';

const Layers = () => {
  return (
    <MenuContent title="Layers">
      <div className="menu-list">
        <div className="menu-list-title">GIS Layers</div>
        <MenuLink label="Street Centerlines"></MenuLink>
        <MenuLink label="Building Footprints"></MenuLink>
        <MenuLink label="Green Spaces"></MenuLink>
        <MenuLink label="Water Bodies"></MenuLink>
      </div>
      <div className="menu-list">
        <div className="menu-list-title">Building Data Layers</div>
        <MenuLink label="OSM Buildings"></MenuLink>
        <MenuLink label="Rhino Models"></MenuLink>
        <MenuLink label="BIM Models"></MenuLink>
      </div>
    </MenuContent>
  );
};

export default Layers;
