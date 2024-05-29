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
import BuildingInfo from './building-info/BuildingInfo';
import Energy from './Energy';
import ThermalComfort from './ThermalComfort';
import Solar from './Solar';
import Wind from './Wind';
import MenuBottom from './MenuBottom';
import Search from './Search';
import Controls from './Controls';
import Layers from './Layers';
import MoreMenu from './MoreMenu';
import Distance from './Distance';

const Menu = () => {
  const $activeMenu = useStore(activeMenu);

  return (
    <div>
      <div className="menu-left show-md">
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
      <div className="menu-right show-md">
        {$activeMenu === 'Buildings' && <Buildings></Buildings>}
        {$activeMenu === 'Energy' && <Energy></Energy>}
        {$activeMenu === 'ThermalComfort' && <ThermalComfort></ThermalComfort>}
        {$activeMenu === 'Wind' && <Wind></Wind>}
        {$activeMenu === 'Solar' && <Solar></Solar>}
        {$activeMenu === 'Distance' && <Distance></Distance>}
        <MenuRight></MenuRight>
      </div>
      <div className="menu-bottom hide-md">
        {($activeMenu === 'AboutNUSCampus' || $activeMenu === 'About') && <AboutNUSCampus></AboutNUSCampus>}
        {$activeMenu === 'BuildingInfo' && <BuildingInfo></BuildingInfo>}
        {$activeMenu === 'StreetCenterlines' && <StreetCenterlines></StreetCenterlines>}
        {$activeMenu === 'BuildingFootprints' && <BuildingFootprints></BuildingFootprints>}
        {$activeMenu === 'GreenSpaces' && <GreenSpaces></GreenSpaces>}
        {$activeMenu === 'WaterBodies' && <WaterBodies></WaterBodies>}
        {$activeMenu === 'OSMBuildings' && <OSMBuildings></OSMBuildings>}
        {$activeMenu === 'RhinoModels' && <RhinoModels></RhinoModels>}
        {$activeMenu === 'BIMModels' && <BIMModels></BIMModels>}
        {$activeMenu === 'Buildings' && <Buildings></Buildings>}
        {$activeMenu === 'Energy' && <Energy></Energy>}
        {$activeMenu === 'ThermalComfort' && <ThermalComfort></ThermalComfort>}
        {$activeMenu === 'Wind' && <Wind></Wind>}
        {$activeMenu === 'Solar' && <Solar></Solar>}
        {$activeMenu === 'Distance' && <Distance></Distance>}
        {$activeMenu === 'Help' && <Help></Help>}
        {$activeMenu === 'Settings' && <Settings></Settings>}
        {$activeMenu === 'Search' && <Search></Search>}
        {$activeMenu === 'Controls' && <Controls></Controls>}
        {$activeMenu === 'Layers' && <Layers></Layers>}
        {$activeMenu === 'Menu' && <MoreMenu></MoreMenu>}
        <MenuBottom></MenuBottom>
      </div>
    </div>
  );
};

export default Menu;
