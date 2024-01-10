import React, { useState } from 'react';

const Sidenav = () => {
  const [page, setPage] = useState('');

  const handleClick = (page: string) => {
    console.log(page);
    setPage(page);
  };

  return (
    <nav className="nav">
      <div className="nav-header">
        <h1>NUS Digital Twin</h1>
        <button>{`<<`}</button>
      </div>
      <div className="nav-group">
        <div>About</div>
        <NavLink activePage={page} label="About NUS Campus" handleClick={handleClick}></NavLink>
      </div>
      <div className="nav-group">
        <div>GIS Layers</div>
        <NavLink activePage={page} label="Street Centerlines" handleClick={handleClick}></NavLink>
        <NavLink activePage={page} label="Building Footprints" handleClick={handleClick}></NavLink>
        <NavLink activePage={page} label="Green Spaces" handleClick={handleClick}></NavLink>
        <NavLink activePage={page} label="Water Bodies" handleClick={handleClick}></NavLink>
      </div>
      <div className="nav-group">
        <div>Building Data Layers</div>
        <NavLink activePage={page} label="OSM Buildings" handleClick={handleClick}></NavLink>
        <NavLink activePage={page} label="Rhino Models" handleClick={handleClick}></NavLink>
        <NavLink activePage={page} label="BIM Models" handleClick={handleClick}></NavLink>
      </div>
      <div className="nav-group">
        <div>Controls</div>
        <NavLink activePage={page} label="Buildings" handleClick={handleClick}></NavLink>
        <NavLink activePage={page} label="Energy" handleClick={handleClick}></NavLink>
        <NavLink activePage={page} label="Thermal Comfort" handleClick={handleClick}></NavLink>
        <NavLink activePage={page} label="Wind" handleClick={handleClick}></NavLink>
        <NavLink activePage={page} label="Solar" handleClick={handleClick}></NavLink>
      </div>
      <div className="nav-group">
        <NavLink activePage={page} label="Help" handleClick={handleClick}></NavLink>
        <NavLink activePage={page} label="Settings" handleClick={handleClick}></NavLink>
      </div>
    </nav>
  );
};

interface Props {
  activePage: string;
  label: string;
  handleClick: (page: string) => void;
}

const NavLink = ({ activePage, label, handleClick }: Props) => {
  const pageName = label.toLowerCase().split(' ').join('-');
  return (
    <button className={activePage === pageName ? 'active' : ''} type="button" onClick={() => handleClick(pageName)}>
      {label}
    </button>
  );
};

export default Sidenav;
