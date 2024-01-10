import React, { useState } from 'react';
import Sidepanel from './Sidepanel';

const Sidebar = () => {
  const [activePage, setActivePage] = useState('');
  const handleClick = (page: string) => setActivePage(page);

  return (
    <div className="sidebar">
      <Sidenav activePage={activePage} handleClick={handleClick}></Sidenav>
      {activePage === 'about-nus-campus' && <Sidepanel.AboutNUSCampus></Sidepanel.AboutNUSCampus>}
      {activePage === 'street-centerlines' && <Sidepanel.StreetCenterlines></Sidepanel.StreetCenterlines>}
      {activePage === 'building-footprints' && <Sidepanel.BuildingFootprints></Sidepanel.BuildingFootprints>}
      {activePage === 'green-spaces' && <Sidepanel.GreenSpaces></Sidepanel.GreenSpaces>}
      {activePage === 'water-bodies' && <Sidepanel.WaterBodies></Sidepanel.WaterBodies>}
      {activePage === 'osm-buildings' && <Sidepanel.OSMBuildings></Sidepanel.OSMBuildings>}
      {activePage === 'rhino-models' && <Sidepanel.RhinoModels></Sidepanel.RhinoModels>}
      {activePage === 'bim-models' && <Sidepanel.BIMModels></Sidepanel.BIMModels>}
      {activePage === 'buildings' && <Sidepanel.Buildings></Sidepanel.Buildings>}
      {activePage === 'energy' && <Sidepanel.Energy></Sidepanel.Energy>}
      {activePage === 'thermal-comfort' && <Sidepanel.ThermalComfort></Sidepanel.ThermalComfort>}
      {activePage === 'wind' && <Sidepanel.Wind></Sidepanel.Wind>}
      {activePage === 'solar' && <Sidepanel.Solar></Sidepanel.Solar>}
      {activePage === 'help' && <Sidepanel.Help></Sidepanel.Help>}
      {activePage === 'settings' && <Sidepanel.Settings></Sidepanel.Settings>}
    </div>
  );
};

export default Sidebar;

interface SideNavProps {
  activePage: string;
  handleClick: (page: string) => void;
}

const Sidenav = ({ activePage, handleClick }: SideNavProps) => {
  return (
    <nav className="nav">
      <div className="nav-header">
        <h1>NUS Digital Twin</h1>
        <button>{`<<`}</button>
      </div>
      <div className="nav-group">
        <div>About</div>
        <NavLink activePage={activePage} label="About NUS Campus" handleClick={handleClick}></NavLink>
      </div>
      <div className="nav-group">
        <div>GIS Layers</div>
        <NavLink activePage={activePage} label="Street Centerlines" handleClick={handleClick}></NavLink>
        <NavLink activePage={activePage} label="Building Footprints" handleClick={handleClick}></NavLink>
        <NavLink activePage={activePage} label="Green Spaces" handleClick={handleClick}></NavLink>
        <NavLink activePage={activePage} label="Water Bodies" handleClick={handleClick}></NavLink>
      </div>
      <div className="nav-group">
        <div>Building Data Layers</div>
        <NavLink activePage={activePage} label="OSM Buildings" handleClick={handleClick}></NavLink>
        <NavLink activePage={activePage} label="Rhino Models" handleClick={handleClick}></NavLink>
        <NavLink activePage={activePage} label="BIM Models" handleClick={handleClick}></NavLink>
      </div>
      <div className="nav-group">
        <div>Controls</div>
        <NavLink activePage={activePage} label="Buildings" handleClick={handleClick}></NavLink>
        <NavLink activePage={activePage} label="Energy" handleClick={handleClick}></NavLink>
        <NavLink activePage={activePage} label="Thermal Comfort" handleClick={handleClick}></NavLink>
        <NavLink activePage={activePage} label="Wind" handleClick={handleClick}></NavLink>
        <NavLink activePage={activePage} label="Solar" handleClick={handleClick}></NavLink>
      </div>
      <div className="nav-group">
        <NavLink activePage={activePage} label="Help" handleClick={handleClick}></NavLink>
        <NavLink activePage={activePage} label="Settings" handleClick={handleClick}></NavLink>
      </div>
    </nav>
  );
};

interface NavLinkProps {
  activePage: string;
  label: string;
  handleClick: (page: string) => void;
}

const NavLink = ({ activePage, label, handleClick }: NavLinkProps) => {
  const pageName = label.toLowerCase().split(' ').join('-');
  return (
    <button className={activePage === pageName ? 'active' : ''} type="button" onClick={() => handleClick(pageName)}>
      {label}
    </button>
  );
};
