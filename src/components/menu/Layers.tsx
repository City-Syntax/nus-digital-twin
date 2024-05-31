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
      </div>
    </>
  );
};

export default Layers;
