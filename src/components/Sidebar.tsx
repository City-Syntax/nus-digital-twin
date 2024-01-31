import React from 'react';
import LeftNav from './LeftNav';
import RightNav from './RightNav';
import { useStore } from '@nanostores/react';
import { activeMenu } from '../store';
import AboutNUSCampus from './menu/AboutNUSCampus';
import StreetCenterlines from './menu/StreetCenterlines';
import BuildingFootprints from './menu/BuildingFootprints';
import GreenSpaces from './menu/GreenSpaces';
import WaterBodies from './menu/WaterBodies';
import OSMBuildings from './menu/OSMBuildings';
import RhinoModels from './menu/RhinoModels';
import BIMModels from './menu/BIMModels';
import Help from './menu/Help';
import Settings from './menu/Settings';
import Buildings from './menu/Buildings';
import BuildingInfo from './menu/BuildingInfo';
import Energy from './menu/Energy';
import ThermalComfort from './menu/ThermalComfort';
import Solar from './menu/Solar';
import Wind from './menu/Wind';

const Sidebar = () => {
  const $activeMenu = useStore(activeMenu);

  return (
    <div id="nav">
      <div className="menu-left">
        <LeftNav></LeftNav>
        {$activeMenu === 'AboutNUSCampus' && <AboutNUSCampus></AboutNUSCampus>}
        {$activeMenu === 'StreetCenterlines' && <StreetCenterlines></StreetCenterlines>}
        {$activeMenu === 'BuildingFootprints' && <BuildingFootprints></BuildingFootprints>}
        {$activeMenu === 'GreenSpaces' && <GreenSpaces></GreenSpaces>}
        {$activeMenu === 'WaterBodies' && <WaterBodies></WaterBodies>}
        {$activeMenu === 'OSMBuildings' && <OSMBuildings></OSMBuildings>}
        {$activeMenu === 'RhinoModels' && <RhinoModels></RhinoModels>}
        {$activeMenu === 'BIMModels' && <BIMModels></BIMModels>}
        {$activeMenu === 'Help' && <Help></Help>}
        {$activeMenu === 'Settings' && <Settings></Settings>}
        {$activeMenu === 'BuildingInfo' && <BuildingInfo></BuildingInfo>}
      </div>
      <div className="menu-right">
        {$activeMenu === 'Buildings' && <Buildings></Buildings>}
        {$activeMenu === 'Energy' && <Energy></Energy>}
        {$activeMenu === 'ThermalComfort' && <ThermalComfort></ThermalComfort>}
        {$activeMenu === 'Wind' && <Wind></Wind>}
        {$activeMenu === 'Solar' && <Solar></Solar>}
        <RightNav></RightNav>
      </div>
    </div>
  );
};

export default Sidebar;
