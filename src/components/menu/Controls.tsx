import React from 'react';
import { useStore } from '@nanostores/react';
import MenuLink from './MenuLink';
import CloseButton from './CloseButton';
import { activeModel, buildingColorSetting } from '../../store';
import ScrollContainer from '../primitives/ScrollContainer';

const Controls = () => {
  const $activeModel = useStore(activeModel);
  const $buildingColorSetting = useStore(buildingColorSetting);
  return (
    <>
      <div className="menubar-content-header">
        <h2>Controls</h2>
        <CloseButton></CloseButton>
      </div>
      <ScrollContainer>
        <div className="menubar-content-body">
          <div className="menu-list">
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
          </div>
        </div>
      </ScrollContainer>
    </>
  );
};

export default Controls;
