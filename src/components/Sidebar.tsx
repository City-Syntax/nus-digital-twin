import React, { useState } from 'react';
import Sidepanel from './Sidepanel';
import Sidenav from './Sidenav';

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
