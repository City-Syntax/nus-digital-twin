import React, { useState } from 'react';
import Panel from './Panel';
import LeftNav from './LeftNav';
import Styles from '../styles/Navigation.module.css';

const Sidebar = () => {
  const [activePage, setActivePage] = useState('');
  const handleClick = (page: string) => setActivePage(page);
  const handleClose = () => setActivePage('');

  return (
    <div className={`${Styles['left-container']} ${Styles['nav-container']}`}>
      <LeftNav activePage={activePage} handleClick={handleClick}></LeftNav>
      {activePage === 'about-nus-campus' && <Panel.AboutNUSCampus handleClick={handleClose}></Panel.AboutNUSCampus>}
      {activePage === 'street-centerlines' && (
        <Panel.StreetCenterlines handleClick={handleClose}></Panel.StreetCenterlines>
      )}
      {activePage === 'building-footprints' && (
        <Panel.BuildingFootprints handleClick={handleClose}></Panel.BuildingFootprints>
      )}
      {activePage === 'green-spaces' && <Panel.GreenSpaces handleClick={handleClose}></Panel.GreenSpaces>}
      {activePage === 'water-bodies' && <Panel.WaterBodies handleClick={handleClose}></Panel.WaterBodies>}
      {activePage === 'osm-buildings' && <Panel.OSMBuildings handleClick={handleClose}></Panel.OSMBuildings>}
      {activePage === 'rhino-models' && <Panel.RhinoModels handleClick={handleClose}></Panel.RhinoModels>}
      {activePage === 'bim-models' && <Panel.BIMModels handleClick={handleClose}></Panel.BIMModels>}
      {activePage === 'buildings' && <Panel.Buildings handleClick={handleClose}></Panel.Buildings>}
      {activePage === 'energy' && <Panel.Energy handleClick={handleClose}></Panel.Energy>}
      {activePage === 'thermal-comfort' && <Panel.ThermalComfort handleClick={handleClose}></Panel.ThermalComfort>}
      {activePage === 'wind' && <Panel.Wind handleClick={handleClose}></Panel.Wind>}
      {activePage === 'solar' && <Panel.Solar handleClick={handleClose}></Panel.Solar>}
      {activePage === 'help' && <Panel.Help handleClick={handleClose}></Panel.Help>}
      {activePage === 'settings' && <Panel.Settings handleClick={handleClose}></Panel.Settings>}
    </div>
  );
};

export default Sidebar;
