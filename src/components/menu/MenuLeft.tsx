import React, { useEffect, useRef } from 'react';
import MenuLink from './MenuLink';
import Searchbar from '../Searchbar';
import { useStore } from '@nanostores/react';
import { activeGISLayer, activeModel } from '../../store';
import Icons from '../Icons';

const MenuLeft = () => {
  const $activeModel = useStore(activeModel);
  const $activeGISLayer = useStore(activeGISLayer);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const menuBody = ref.current as HTMLDivElement;
    if (menuBody.scrollHeight > menuBody.clientHeight) {
      menuBody.classList.add('overlay-bottom');
    }

    const controlOverlay = () => {
      if (menuBody.scrollHeight <= menuBody.clientHeight) {
        menuBody.classList.remove('overlay-top');
        menuBody.classList.remove('overlay-bottom');
        return;
      }

      const isTop = menuBody.scrollTop == 0;
      const isBottom = Math.ceil(menuBody.scrollTop + menuBody.offsetHeight) >= menuBody.scrollHeight;

      if (isTop) {
        menuBody.classList.remove('overlay-top');
        menuBody.classList.add('overlay-bottom');
      } else if (isBottom) {
        menuBody.classList.remove('overlay-bottom');
        menuBody.classList.add('overlay-top');
      } else {
        menuBody.classList.add('overlay-top');
        menuBody.classList.add('overlay-bottom');
      }
    };
    const resizeObserver = new ResizeObserver(controlOverlay);

    resizeObserver.observe(menuBody);
    menuBody.addEventListener('scroll', controlOverlay);
    return () => {
      menuBody.removeEventListener('scroll', controlOverlay);
      resizeObserver.disconnect();
    };
  }, []);

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
      <div className="menubar-body" ref={ref}>
        <div className="menu-list">
          <input id="about-left" className="toggle" type="checkbox" defaultChecked onChange={handleOnChange} />
          <label htmlFor="about-left" className="toggle-label menu-list-title">
            <span>About</span>
            <Icons.ChevronDown></Icons.ChevronDown>
          </label>
          <div className="menu-list-content">
            <MenuLink toPage="about" label="About NUS Campus" iconName="About"></MenuLink>
          </div>
        </div>
        <div className="menu-list">
          <input id="gis-layers-left" className="toggle" type="checkbox" defaultChecked onChange={handleOnChange} />
          <label htmlFor="gis-layers-left" className="toggle-label menu-list-title">
            <span>GIS Layers</span>
            <Icons.ChevronDown></Icons.ChevronDown>
          </label>
          <div className="menu-list-content">
            <MenuLink
              toPage="street-centerlines"
              label="Street Centerlines"
              iconName="StreetCenterlines"
              isActive={$activeGISLayer.has('street-centerlines')}
            ></MenuLink>
            <MenuLink
              toPage="building-footprints"
              label="Building Footprints"
              iconName="BuildingFootprints"
              isActive={$activeGISLayer.has('building-footprints')}
            ></MenuLink>
            <MenuLink
              toPage="green-spaces"
              label="Green Spaces"
              iconName="GreenSpaces"
              isActive={$activeGISLayer.has('green-spaces')}
            ></MenuLink>
            <MenuLink
              toPage="water-bodies"
              label="Water Bodies"
              iconName="WaterBodies"
              isActive={$activeGISLayer.has('water-bodies')}
            ></MenuLink>
          </div>
        </div>
        <div className="menu-list">
          <input id="building-scale-left" className="toggle" type="checkbox" defaultChecked onChange={handleOnChange} />
          <label htmlFor="building-scale-left" className="toggle-label menu-list-title">
            <span>Building Scale Models</span>
            <Icons.ChevronDown></Icons.ChevronDown>
          </label>
          <div className="menu-list-content">
            <MenuLink toPage="bim" label="BIM Models" iconName="BIMModels" isActive={$activeModel === 'bim'}></MenuLink>
            <MenuLink toPage="rhino-building" label="Rhino (Building)" iconName="RhinoModels"></MenuLink>
          </div>
        </div>
        <div className="menu-list">
          <input id="urban-scale-left" className="toggle" type="checkbox" defaultChecked onChange={handleOnChange} />
          <label htmlFor="urban-scale-left" className="toggle-label menu-list-title">
            <span>Urban Scale Models</span>
            <Icons.ChevronDown></Icons.ChevronDown>
          </label>
          <div className="menu-list-content">
            <MenuLink
              toPage="osm"
              label="OSM Buildings"
              iconName="OSMBuildings"
              isActive={$activeModel === 'osm'}
            ></MenuLink>
            <MenuLink
              toPage="rhino-urban"
              label="Rhino (Urban)"
              iconName="RhinoModels"
              isActive={$activeModel === 'rhino-urban'}
            ></MenuLink>
            <MenuLink toPage="ubem" label="UBEM" iconName="UBEM"></MenuLink>
          </div>
        </div>
      </div>
      <div className="menubar-footer">
        <div className="menu-list">
          <MenuLink toPage="help" label="Help" iconName="Help"></MenuLink>
          <MenuLink toPage="settings" label="Settings" iconName="Settings"></MenuLink>
        </div>
      </div>
    </nav>
  );
};

export default MenuLeft;
