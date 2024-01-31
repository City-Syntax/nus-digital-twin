import React from 'react';
import MenuLink from './MenuLink';

const MenuRight = () => {
  return (
    <nav className="menubar-right">
      <div className="menubar-body">
        <div className="menu-list">
          <div className="menu-list-title">Controls</div>
          <MenuLink label="Buildings"></MenuLink>
          <MenuLink label="Energy"></MenuLink>
          <MenuLink label="Thermal Comfort"></MenuLink>
          <MenuLink label="Wind"></MenuLink>
          <MenuLink label="Solar"></MenuLink>
        </div>
      </div>
    </nav>
  );
};

export default MenuRight;
