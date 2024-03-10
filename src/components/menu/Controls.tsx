import React from 'react';
import MenuContent from './MenuContent';
import MenuLink from './MenuLink';

const Controls = () => {
  return (
    <MenuContent title="Controls">
      <div className="menubar-content-body">
        <div className="menu-list">
          <MenuLink label="Buildings"></MenuLink>
          <MenuLink label="Energy"></MenuLink>
          <MenuLink label="Thermal Comfort"></MenuLink>
          <MenuLink label="Wind"></MenuLink>
          <MenuLink label="Solar"></MenuLink>
          <MenuLink label="Distance"></MenuLink>
        </div>
      </div>
    </MenuContent>
  );
};

export default Controls;
