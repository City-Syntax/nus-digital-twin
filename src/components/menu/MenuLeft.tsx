import React from 'react';
import MenuLink from './MenuLink';
import Searchbar from './Searchbar';
import Icons from '../Icons';
import ScrollContainer from '../primitives/ScrollContainer';
import MenuLinks from './MenuLinks';

const MenuLeft = () => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isOpen = e.target.checked;
    const buttons = e.target.parentElement?.querySelector('.menu-list-content')?.querySelectorAll('button');

    if (buttons) {
      buttons.forEach((button) => {
        if (isOpen) {
          button.tabIndex = 0;
        } else {
          button.tabIndex = -1;
        }
      });
    }
  };

  return (
    <nav className="menubar-left">
      <div className="menubar-header">
        <Searchbar />
      </div>
      <ScrollContainer>
        <div className="menubar-body">
          <div className="menu-list">
            <input id="about-left" className="toggle" type="checkbox" defaultChecked onChange={handleOnChange} />
            <label htmlFor="about-left" className="toggle-label menu-list-title">
              <span>About</span>
              <Icons.ChevronDown></Icons.ChevronDown>
            </label>
            <div className="menu-list-content">
              <MenuLink toPage="about" label="About NUS Campus" iconName="About" isLeft isBottom></MenuLink>
            </div>
          </div>
          <div className="menu-list">
            <input id="gis-layers-left" className="toggle" type="checkbox" defaultChecked onChange={handleOnChange} />
            <label htmlFor="gis-layers-left" className="toggle-label menu-list-title">
              <span>GIS Layers</span>
              <Icons.ChevronDown></Icons.ChevronDown>
            </label>
            <div className="menu-list-content">
              <MenuLinks.GISLayers />
            </div>
          </div>
          <div className="menu-list">
            <input
              id="building-scale-left"
              className="toggle"
              type="checkbox"
              defaultChecked
              onChange={handleOnChange}
            />
            <label htmlFor="building-scale-left" className="toggle-label menu-list-title">
              <span>Building Scale Models</span>
              <Icons.ChevronDown></Icons.ChevronDown>
            </label>
            <div className="menu-list-content">
              <MenuLinks.BuildingScaleModels />
            </div>
          </div>
          <div className="menu-list">
            <input id="urban-scale-left" className="toggle" type="checkbox" defaultChecked onChange={handleOnChange} />
            <label htmlFor="urban-scale-left" className="toggle-label menu-list-title">
              <span>Urban Scale Models</span>
              <Icons.ChevronDown></Icons.ChevronDown>
            </label>
            <div className="menu-list-content">
              <MenuLinks.UrbanScaleModels />
            </div>
          </div>
        </div>
      </ScrollContainer>
      <div className="menubar-footer">
        <div className="menu-list">
          <MenuLink toPage="help" label="Help" iconName="Help" isLeft isBottom></MenuLink>
          <MenuLink toPage="settings" label="Settings" iconName="Settings" isLeft isBottom></MenuLink>
        </div>
      </div>
    </nav>
  );
};

export default MenuLeft;
