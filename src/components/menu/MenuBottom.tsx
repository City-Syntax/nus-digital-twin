import React from 'react';
import MenuLink from './MenuLink';

const MenuBottom = () => {
  return (
    <nav className="menubar-bottom">
      <div className="menu-list">
        <MenuLink toPage="search" dir="bottom" isVertical isBottom label="Search" iconName="Search"></MenuLink>
      </div>
      <div className="menu-list">
        <MenuLink toPage="about" dir="bottom" isVertical isBottom isLeft label="About" iconName="About"></MenuLink>
      </div>
      <div className="menu-list">
        <MenuLink toPage="layers" dir="bottom" isVertical isBottom label="Layers" iconName="Layers"></MenuLink>
      </div>
      <div className="menu-list">
        <MenuLink toPage="controls" dir="bottom" isVertical isBottom label="Controls" iconName="Controls"></MenuLink>
      </div>
      <div className="menu-list">
        <MenuLink toPage="learning" dir="bottom" isVertical isBottom label="Learning" iconName="Learning"></MenuLink>
      </div>
      <div className="menu-list show-sm">
        <MenuLink toPage="help" dir="bottom" isVertical isBottom isLeft label="Help" iconName="Help"></MenuLink>
      </div>
      <div className="menu-list show-sm">
        <MenuLink
          toPage="settings"
          dir="bottom"
          isVertical
          isBottom
          isLeft
          label="Settings"
          iconName="Settings"
        ></MenuLink>
      </div>
      <div className="menu-list hide-sm">
        <MenuLink toPage="menu" dir="bottom" isVertical isBottom isLeft label="Menu" iconName="Menu"></MenuLink>
      </div>
    </nav>
  );
};

export default MenuBottom;
