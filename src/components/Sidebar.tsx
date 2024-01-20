import React, { useState } from 'react';
import LeftPanel from './LeftPanel';
import LeftNav from './LeftNav';
import Styles from '../styles/Navigation.module.css';

const Sidebar = () => {
  const [activePage, setActivePage] = useState('');
  const handleClick = (page: string) => setActivePage(page);

  return (
    <div className={Styles.leftbar}>
      <LeftNav activePage={activePage} handleClick={handleClick}></LeftNav>
      {activePage === 'about-nus-campus' && <LeftPanel.AboutNUSCampus></LeftPanel.AboutNUSCampus>}
      {activePage === 'street-centerlines' && <LeftPanel.StreetCenterlines></LeftPanel.StreetCenterlines>}
      {activePage === 'building-footprints' && <LeftPanel.BuildingFootprints></LeftPanel.BuildingFootprints>}
      {activePage === 'green-spaces' && <LeftPanel.GreenSpaces></LeftPanel.GreenSpaces>}
      {activePage === 'water-bodies' && <LeftPanel.WaterBodies></LeftPanel.WaterBodies>}
      {activePage === 'osm-buildings' && <LeftPanel.OSMBuildings></LeftPanel.OSMBuildings>}
      {activePage === 'rhino-models' && <LeftPanel.RhinoModels></LeftPanel.RhinoModels>}
      {activePage === 'bim-models' && <LeftPanel.BIMModels></LeftPanel.BIMModels>}
      {activePage === 'buildings' && <LeftPanel.Buildings></LeftPanel.Buildings>}
      {activePage === 'energy' && <LeftPanel.Energy></LeftPanel.Energy>}
      {activePage === 'thermal-comfort' && <LeftPanel.ThermalComfort></LeftPanel.ThermalComfort>}
      {activePage === 'wind' && <LeftPanel.Wind></LeftPanel.Wind>}
      {activePage === 'solar' && <LeftPanel.Solar></LeftPanel.Solar>}
      {activePage === 'help' && <LeftPanel.Help></LeftPanel.Help>}
      {activePage === 'settings' && <LeftPanel.Settings></LeftPanel.Settings>}
    </div>
  );
};

export default Sidebar;
