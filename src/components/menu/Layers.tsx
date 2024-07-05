import React from 'react';
import MenuLink from './MenuLink';
import CloseButton from './CloseButton';
import { activeModel } from '../../store';
import { useStore } from '@nanostores/react';
import ScrollContainer from '../primitives/ScrollContainer';
import MenuLinks from './MenuLinks';

const Layers = () => {
  const $activeModel = useStore(activeModel);
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
            <MenuLink
              toPage="osm"
              label="OSM Buildings"
              iconName="OSMBuildings"
              isActive={$activeModel === 'osm'}
            ></MenuLink>
            <MenuLink
              toPage="rhino-urban"
              label="Rhino (Urban)"
              iconName="RhinoModels"
              isActive={$activeModel === 'rhino-urban'}
            ></MenuLink>
            <MenuLink toPage="ubem" label="UBEM" iconName="UBEM"></MenuLink>
          </div>
        </div>
      </ScrollContainer>
    </>
  );
};

export default Layers;
