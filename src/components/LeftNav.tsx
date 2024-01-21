import React from 'react';
import Styles from '../styles/Navigation.module.css';
import NavLink from './NavLink';

interface LeftNavProps {
  activePage: string;
  handleClick: (page: string) => void;
}

const LeftNav = ({ activePage, handleClick }: LeftNavProps) => {
  return (
    <>
      <nav className={`${Styles['nav-content']} ${Styles['left-nav']} ${Styles['nav']}`}>
        <div className={Styles['nav-header']}>
          <input className={Styles['searchbar']} type="search" placeholder="Search buildings" />
        </div>
        <div className={Styles['nav-body']}>
          <div className={Styles['nav-group']}>
            <div>About</div>
            <NavLink activePage={activePage} label="About NUS Campus" handleClick={handleClick}></NavLink>
          </div>
          <div className={Styles['nav-group']}>
            <div>GIS Layers</div>
            <NavLink activePage={activePage} label="Street Centerlines" handleClick={handleClick}></NavLink>
            <NavLink activePage={activePage} label="Building Footprints" handleClick={handleClick}></NavLink>
            <NavLink activePage={activePage} label="Green Spaces" handleClick={handleClick}></NavLink>
            <NavLink activePage={activePage} label="Water Bodies" handleClick={handleClick}></NavLink>
          </div>
          <div className={Styles['nav-group']}>
            <div>Building Data Layers</div>
            <NavLink activePage={activePage} label="OSM Buildings" handleClick={handleClick}></NavLink>
            <NavLink activePage={activePage} label="Rhino Models" handleClick={handleClick}></NavLink>
            <NavLink activePage={activePage} label="BIM Models" handleClick={handleClick}></NavLink>
          </div>
        </div>
        <div className={Styles['nav-footer']}>
          <div className={Styles['nav-group']}>
            <NavLink activePage={activePage} label="Help" handleClick={handleClick}></NavLink>
            <NavLink activePage={activePage} label="Settings" handleClick={handleClick}></NavLink>
          </div>
        </div>
      </nav>
    </>
  );
};

export default LeftNav;
