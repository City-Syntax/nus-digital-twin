import React from 'react';
import MenuLink from './MenuLink';
import CloseButton from './CloseButton';

const Controls = () => {
  return (
    <>
      <div className="menubar-content-header">
        <h2>Controls</h2>
        <CloseButton></CloseButton>
      </div>
      <div className="menubar-content-body">
        <div className="menu-list">
          <MenuLink toPage="buildings" label="Buildings" iconName="Buildings"></MenuLink>
          <MenuLink toPage="energy" label="Energy" iconName="Energy"></MenuLink>
          <MenuLink toPage="thermal-comfort" label="Thermal Comfort" iconName="ThermalComfort"></MenuLink>
          <MenuLink toPage="wind" label="Wind" iconName="Wind"></MenuLink>
          <MenuLink toPage="solar" label="Solar" iconName="Solar"></MenuLink>
          <MenuLink toPage="distance" label="Distance" iconName="Distance"></MenuLink>
        </div>
      </div>
    </>
  );
};

export default Controls;
