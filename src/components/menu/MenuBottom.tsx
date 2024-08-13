import React from 'react';
import MenuLink from './MenuLink';

const MenuBottom = () => {
  return (
    <nav className="menubar-bottom">
      <div className="menu-list">
        <MenuLink toPage="search" isVertical isBottom label="Search" iconName="Search"></MenuLink>
      </div>
      <div className="menu-list">
        <MenuLink toPage="about" isVertical isBottom isLeft label="About" iconName="About"></MenuLink>
      </div>
      <div className="menu-list">
        <MenuLink toPage="layers" isVertical isBottom label="Layers" iconName="Layers"></MenuLink>
      </div>
      <div className="menu-list">
        <MenuLink toPage="controls" isVertical isBottom label="Controls" iconName="Controls"></MenuLink>
      </div>
      <div className="menu-list show-sm">
        <MenuLink toPage="help" isVertical isBottom isLeft label="Help" iconName="Help"></MenuLink>
      </div>
      <div className="menu-list show-sm">
        <MenuLink toPage="settings" isVertical isBottom isLeft label="Settings" iconName="Settings"></MenuLink>
      </div>
      <div className="menu-list hide-sm">
        <MenuLink toPage="menu" isVertical isBottom isLeft label="Menu" iconName="Menu"></MenuLink>
      </div>
    </nav>
  );
};

export default MenuBottom;
