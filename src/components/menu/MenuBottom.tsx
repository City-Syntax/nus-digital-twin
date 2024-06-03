import React from 'react';
import MenuLink from './MenuLink';

const MenuBottom = () => {
  return (
    <nav className="menubar-bottom">
      <div className="menu-list">
        <MenuLink toPage="search" isVertical label="Search" iconName="Search"></MenuLink>
      </div>
      <div className="menu-list">
        <MenuLink toPage="about" isVertical label="About" iconName="About"></MenuLink>
      </div>
      <div className="menu-list">
        <MenuLink toPage="layers" isVertical label="Layers" iconName="Layers"></MenuLink>
      </div>
      <div className="menu-list">
        <MenuLink toPage="controls" isVertical label="Controls" iconName="Controls"></MenuLink>
      </div>
      <div className="menu-list show-sm">
        <MenuLink toPage="help" isVertical label="Help" iconName="Help"></MenuLink>
      </div>
      <div className="menu-list show-sm">
        <MenuLink toPage="settings" isVertical label="Settings" iconName="Settings"></MenuLink>
      </div>
      <div className="menu-list hide-sm">
        <MenuLink toPage="menu" isVertical label="Menu" iconName="Menu"></MenuLink>
      </div>
    </nav>
  );
};

export default MenuBottom;
