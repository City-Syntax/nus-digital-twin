import React, { useState } from 'react';
import LeftPanel from './LeftPanel';
import LeftNav from './LeftNav';
import Styles from '../styles/Navigation.module.css';

const Sidebar = () => {
  const [activePage, setActivePage] = useState('');
  const handleClick = (page: string) => setActivePage(page);
  const handleClose = () => setActivePage('');

  return (
    <div className={`${Styles['left-container']} ${Styles['nav-container']}`}>
      <LeftNav activePage={activePage} handleClick={handleClick}></LeftNav>
      {activePage === 'about-nus-campus' && (
        <LeftPanel.AboutNUSCampus handleClick={handleClose}></LeftPanel.AboutNUSCampus>
      )}
      {activePage === 'street-centerlines' && (
        <LeftPanel.StreetCenterlines handleClick={handleClose}></LeftPanel.StreetCenterlines>
      )}
      {activePage === 'building-footprints' && (
        <LeftPanel.BuildingFootprints handleClick={handleClose}></LeftPanel.BuildingFootprints>
      )}
      {activePage === 'green-spaces' && <LeftPanel.GreenSpaces handleClick={handleClose}></LeftPanel.GreenSpaces>}
      {activePage === 'water-bodies' && <LeftPanel.WaterBodies handleClick={handleClose}></LeftPanel.WaterBodies>}
      {activePage === 'osm-buildings' && <LeftPanel.OSMBuildings handleClick={handleClose}></LeftPanel.OSMBuildings>}
      {activePage === 'rhino-models' && <LeftPanel.RhinoModels handleClick={handleClose}></LeftPanel.RhinoModels>}
      {activePage === 'bim-models' && <LeftPanel.BIMModels handleClick={handleClose}></LeftPanel.BIMModels>}
      {activePage === 'buildings' && <LeftPanel.Buildings handleClick={handleClose}></LeftPanel.Buildings>}
      {activePage === 'energy' && <LeftPanel.Energy handleClick={handleClose}></LeftPanel.Energy>}
      {activePage === 'thermal-comfort' && (
        <LeftPanel.ThermalComfort handleClick={handleClose}></LeftPanel.ThermalComfort>
      )}
      {activePage === 'wind' && <LeftPanel.Wind handleClick={handleClose}></LeftPanel.Wind>}
      {activePage === 'solar' && <LeftPanel.Solar handleClick={handleClose}></LeftPanel.Solar>}
      {activePage === 'help' && <LeftPanel.Help handleClick={handleClose}></LeftPanel.Help>}
      {activePage === 'settings' && <LeftPanel.Settings handleClick={handleClose}></LeftPanel.Settings>}
    </div>
  );
};

export default Sidebar;
