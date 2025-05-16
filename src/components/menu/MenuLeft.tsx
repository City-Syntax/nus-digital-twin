import React from 'react';
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
    <nav className="bg-base flex flex-col py-4 rounded-menu gap-(--content-gap) w-(--menu-left-width)">
      <div className="px-4">
        <Searchbar />
      </div>
      <ScrollContainer>
        <div className="menubar-body">
          <div className="menu-list">
            <input id="about-left" className="menu-toggle" type="checkbox" defaultChecked onChange={handleOnChange} />
            <label htmlFor="about-left" className="menu-toggle-label menu-list-title">
              <span>About</span>
              <Icons.ChevronDown></Icons.ChevronDown>
            </label>
            <div className="menu-list-content">
              <MenuLinks.About dir="left" />
            </div>
          </div>
          <div className="menu-list">
            <input id="points-left" className="menu-toggle" type="checkbox" defaultChecked onChange={handleOnChange} />
            <label htmlFor="points-left" className="menu-toggle-label menu-list-title">
              <span>Points</span>
              <Icons.ChevronDown></Icons.ChevronDown>
            </label>
            <div className="menu-list-content">
              <MenuLinks.Points dir="left" />
            </div>
          </div>
          <div className="menu-list">
            <input
              id="gis-layers-left"
              className="menu-toggle"
              type="checkbox"
              defaultChecked
              onChange={handleOnChange}
            />
            <label htmlFor="gis-layers-left" className="menu-toggle-label menu-list-title">
              <span>GIS Layers</span>
              <Icons.ChevronDown></Icons.ChevronDown>
            </label>
            <div className="menu-list-content">
              <MenuLinks.GISLayers dir="left" />
            </div>
          </div>
          <div className="menu-list">
            <input
              id="building-scale-left"
              className="menu-toggle"
              type="checkbox"
              defaultChecked
              onChange={handleOnChange}
            />
            <label htmlFor="building-scale-left" className="menu-toggle-label menu-list-title">
              <span>Building Scale Models</span>
              <Icons.ChevronDown></Icons.ChevronDown>
            </label>
            <div className="menu-list-content">
              <MenuLinks.BuildingScaleModels dir="left" />
            </div>
          </div>
          <div className="menu-list">
            <input
              id="urban-scale-left"
              className="menu-toggle"
              type="checkbox"
              defaultChecked
              onChange={handleOnChange}
            />
            <label htmlFor="urban-scale-left" className="menu-toggle-label menu-list-title">
              <span>Urban Scale Models</span>
              <Icons.ChevronDown></Icons.ChevronDown>
            </label>
            <div className="menu-list-content">
              <MenuLinks.UrbanScaleModels dir="left" />
            </div>
          </div>
        </div>
      </ScrollContainer>
      <div className="menubar-footer">
        <div className="menu-list">
          <MenuLinks.Menu dir="left"></MenuLinks.Menu>
        </div>
      </div>
    </nav>
  );
};

export default MenuLeft;
