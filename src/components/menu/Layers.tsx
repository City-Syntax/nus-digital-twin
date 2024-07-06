import React from 'react';
import CloseButton from './CloseButton';
import ScrollContainer from '../primitives/ScrollContainer';
import MenuLinks from './MenuLinks';

const Layers = () => {
  return (
    <>
      <div className="menubar-content-header">
        <h2>Layers</h2>
        <CloseButton></CloseButton>
      </div>
      <ScrollContainer>
        <div className="menubar-content-body">
          <div className="menu-list">
            <div className="menu-list-title">GIS Layers</div>
            <MenuLinks.GISLayers />
          </div>
          <div className="menu-list">
            <div className="menu-list-title">Building Scale Models</div>
            <MenuLinks.BuildingScaleModels />
          </div>
          <div className="menu-list">
            <div className="menu-list-title">Urban Scale Models</div>
            <MenuLinks.UrbanScaleModels />
          </div>
        </div>
      </ScrollContainer>
    </>
  );
};

export default Layers;
