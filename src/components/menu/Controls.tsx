import React from 'react';
import MenuContent from './MenuContent';
import MenuLink from './MenuLink';

const Controls = () => {
  return (
    <MenuContent title="Controls">
      <div className="menu-list">
        <MenuLink label="Buildings"></MenuLink>
        <MenuLink label="Energy"></MenuLink>
        <MenuLink label="Thermal Comfort"></MenuLink>
        <MenuLink label="Wind"></MenuLink>
        <MenuLink label="Solar"></MenuLink>
      </div>
    </MenuContent>
  );
};

export default Controls;
