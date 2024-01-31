import React from 'react';
import MenuLeft from './MenuLeft';
import MenuRight from './MenuRight';
import { useStore } from '@nanostores/react';
import { activeMenu } from '../../store';
import AboutNUSCampus from './AboutNUSCampus';
import StreetCenterlines from './StreetCenterlines';
import BuildingFootprints from './BuildingFootprints';
import GreenSpaces from './GreenSpaces';
import WaterBodies from './WaterBodies';
import OSMBuildings from './OSMBuildings';
import RhinoModels from './RhinoModels';
import BIMModels from './BIMModels';
import Help from './Help';
import Settings from './Settings';
import Buildings from './Buildings';
import BuildingInfo from './BuildingInfo';
import Energy from './Energy';
import ThermalComfort from './ThermalComfort';
import Solar from './Solar';
import Wind from './Wind';

const Menu = () => {
  const $activeMenu = useStore(activeMenu);

  return (
    <div id="nav">
      <div className="menu-left">
        <MenuLeft></MenuLeft>
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
        <MenuRight></MenuRight>
      </div>
    </div>
  );
};

export default Menu;
