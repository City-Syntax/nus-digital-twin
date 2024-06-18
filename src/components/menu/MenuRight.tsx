import React from 'react';
import MenuLink from './MenuLink';
import { useStore } from '@nanostores/react';
import { activeModel, buildingColorSetting } from '../../store';
import Icons from '../Icons';

const MenuRight = () => {
  const $activeModel = useStore(activeModel);
  const $buildingColorSetting = useStore(buildingColorSetting);
  return (
    <nav className="menubar-right">
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
        <div className="menu-list">
          <div className="menu-list-title">Learnings</div>
          <a className="menu-link" type="button" href="/tutorials">
            <Icons.Learning></Icons.Learning>
            <span>Tutorial Videos</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default MenuRight;
