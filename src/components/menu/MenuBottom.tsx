import React from 'react';
import MenuLink from './MenuLink';

const MenuBottom = () => {
  return (
    <nav className="menubar-bottom">
      <div className="menu-list">
        <MenuLink isVertical label="Search"></MenuLink>
      </div>
      <div className="menu-list">
        <MenuLink isVertical label="About" iconName="AboutNUSCampus"></MenuLink>
      </div>
      <div className="menu-list">
        <MenuLink isVertical label="Layers"></MenuLink>
      </div>
      <div className="menu-list">
        <MenuLink isVertical label="Controls"></MenuLink>
      </div>
      <div className="menu-list show-sm">
        <MenuLink isVertical label="Help"></MenuLink>
      </div>
      <div className="menu-list show-sm">
        <MenuLink isVertical label="Settings"></MenuLink>
      </div>
      <div className="menu-list hide-sm">
        <MenuLink isVertical label="Menu"></MenuLink>
      </div>
    </nav>
  );
};

export default MenuBottom;