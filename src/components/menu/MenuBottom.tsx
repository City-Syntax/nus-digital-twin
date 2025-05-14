import React from 'react';
import MenuLink from './MenuLink';

const MenuBottom = () => {
  return (
    <nav className="menubar-bottom bg-base">
      <div className="menu-list">
        <MenuLink toPage="search" dir="bottom" isVertical isBottom label="Search" iconName="Search"></MenuLink>
      </div>
      <div className="menu-list">
        <MenuLink toPage="about" dir="bottom" isVertical isBottom label="About" iconName="About"></MenuLink>
      </div>
      <div className="menu-list">
        <MenuLink toPage="layers" dir="bottom" isVertical isBottom label="Layers" iconName="Layers"></MenuLink>
      </div>
      <div className="menu-list">
        <MenuLink toPage="controls" dir="bottom" isVertical isBottom label="Controls" iconName="Controls"></MenuLink>
      </div>
      <div className="menu-list show-sm">
        <MenuLink toPage="resources" dir="bottom" isVertical isBottom label="Resources" iconName="Resources"></MenuLink>
      </div>
      <div className="menu-list">
        <MenuLink toPage="menu" dir="bottom" isVertical isBottom label="Menu" iconName="Menu"></MenuLink>
      </div>
    </nav>
  );
};

export default MenuBottom;
