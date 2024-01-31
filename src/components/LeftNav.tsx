import React from 'react';
import NavLink from './NavLink';
import { useStore } from '@nanostores/react';
import { searchQuery } from '../store';
import Icons from './Icons';

const LeftNav = () => {
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
          />
          <Icons.Search></Icons.Search>
        </div>
      </div>
      <div className="menubar-body">
        <div className="menu-list">
          <div className="menu-list-title">About</div>
          <NavLink label="About NUS Campus"></NavLink>
        </div>
        <div className="menu-list">
          <div className="menu-list-title">GIS Layers</div>
          <NavLink label="Street Centerlines"></NavLink>
          <NavLink label="Building Footprints"></NavLink>
          <NavLink label="Green Spaces"></NavLink>
          <NavLink label="Water Bodies"></NavLink>
        </div>
        <div className="menu-list">
          <div className="menu-list-title">Building Data Layers</div>
          <NavLink label="OSM Buildings"></NavLink>
          <NavLink label="Rhino Models"></NavLink>
          <NavLink label="BIM Models"></NavLink>
        </div>
      </div>
      <div className="menubar-footer">
        <div className="menu-list">
          <NavLink label="Help"></NavLink>
          <NavLink label="Settings"></NavLink>
        </div>
      </div>
    </nav>
  );
};

export default LeftNav;
