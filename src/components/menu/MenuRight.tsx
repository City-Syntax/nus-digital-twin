import React from 'react';
import MenuLink from './MenuLink';
import { useStore } from '@nanostores/react';
import { activeModel, buildingColorSetting } from '../../store';
import ScrollContainer from '../primitives/ScrollContainer';

const MenuRight = () => {
  const $activeModel = useStore(activeModel);
  const $buildingColorSetting = useStore(buildingColorSetting);
  return (
    <nav className="menubar-right">
      <ScrollContainer>
        <div className="menubar-body">
          <div className="menu-list">
            <div className="menu-list-title">Controls</div>
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
    </nav>
  );
};

export default MenuRight;
