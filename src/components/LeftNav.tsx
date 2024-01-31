import React from 'react';
import Styles from '../styles/Navigation.module.scss';
import NavLink from './NavLink';
import { useStore } from '@nanostores/react';
import { searchQuery } from '../navStore';
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
        <div className={Styles['nav-group']}>
          <div>About</div>
          <NavLink.Left label="About NUS Campus"></NavLink.Left>
        </div>
        <div className={Styles['nav-group']}>
          <div>GIS Layers</div>
          <NavLink.Left label="Street Centerlines"></NavLink.Left>
          <NavLink.Left label="Building Footprints"></NavLink.Left>
          <NavLink.Left label="Green Spaces"></NavLink.Left>
          <NavLink.Left label="Water Bodies"></NavLink.Left>
        </div>
        <div className={Styles['nav-group']}>
          <div>Building Data Layers</div>
          <NavLink.Left label="OSM Buildings"></NavLink.Left>
          <NavLink.Left label="Rhino Models"></NavLink.Left>
          <NavLink.Left label="BIM Models"></NavLink.Left>
        </div>
      </div>
      <div className="menubar-footer">
        <div className={Styles['nav-group']}>
          <NavLink.Left label="Help"></NavLink.Left>
          <NavLink.Left label="Settings"></NavLink.Left>
        </div>
      </div>
    </nav>
  );
};

export default LeftNav;
