import React from 'react';
import MenuLink from './MenuLink';
import { useStore } from '@nanostores/react';
import { searchQuery } from '../../store';
import Icons from '../Icons';

const MenuLeft = () => {
  const $searchQuery = useStore(searchQuery);
  return (
    <nav className="menubar-left">
      <div className="menubar-header">
        <div className="search">
          <input
            type="text"
            placeholder="Search buildings"
            onChange={(e) => searchQuery.set(e.target.value)}
            value={$searchQuery}
            name="search"
          />
          <Icons.Search></Icons.Search>
        </div>
      </div>
      <div className="menubar-body">
        <div className="menu-list">
          <div className="menu-list-title">About</div>
          <MenuLink label="About NUS Campus"></MenuLink>
        </div>
        <div className="menu-list">
          <div className="menu-list-title">GIS Layers</div>
          <MenuLink label="Street Centerlines"></MenuLink>
          <MenuLink label="Building Footprints"></MenuLink>
          <MenuLink label="Green Spaces"></MenuLink>
          <MenuLink label="Water Bodies"></MenuLink>
        </div>
        <div className="menu-list">
          <div className="menu-list-title">Building Data Layers</div>
          <MenuLink label="OSM Buildings"></MenuLink>
          <MenuLink label="Rhino Models"></MenuLink>
          <MenuLink label="BIM Models"></MenuLink>
        </div>
      </div>
      <div className="menubar-footer">
        <div className="menu-list">
          <MenuLink label="Help"></MenuLink>
          <MenuLink label="Settings"></MenuLink>
        </div>
      </div>
    </nav>
  );
};

export default MenuLeft;
