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
import { CSSTransition } from 'react-transition-group';
import MenuContent from './MenuContent';
import { leftMenu, rightMenu, bottomMenu } from './menuUtils';

const Menu = () => {
  const $activeMenu = useStore(activeMenu);

  return (
    <div>
      <div className="menu-left show-md">
        <MenuLeft></MenuLeft>
        <CSSTransition
          mountOnEnter
          unmountOnExit
          in={leftMenu.includes($activeMenu)}
          timeout={100}
          classNames="my-node"
        >
          <MenuContent title={leftMenu.includes($activeMenu) ? $activeMenu : ''}>
            {$activeMenu === 'OSMBuildings' && <OSMBuildings></OSMBuildings>}
            {$activeMenu === 'AboutNUSCampus' && <AboutNUSCampus></AboutNUSCampus>}
            {$activeMenu === 'Help' && <Help></Help>}
            {$activeMenu === 'StreetCenterlines' && <StreetCenterlines></StreetCenterlines>}
            {$activeMenu === 'BuildingFootprints' && <BuildingFootprints></BuildingFootprints>}
            {$activeMenu === 'GreenSpaces' && <GreenSpaces></GreenSpaces>}
            {$activeMenu === 'WaterBodies' && <WaterBodies></WaterBodies>}
            {$activeMenu === 'RhinoModels' && <RhinoModels></RhinoModels>}
            {$activeMenu === 'BIMModels' && <BIMModels></BIMModels>}
            {$activeMenu === 'Settings' && <Settings></Settings>}
            {$activeMenu === 'BuildingInfo' && <BuildingInfo></BuildingInfo>}
          </MenuContent>
        </CSSTransition>
      </div>
      <div className="menu-right show-md">
        <CSSTransition
          mountOnEnter
          unmountOnExit
          in={rightMenu.includes($activeMenu)}
          timeout={100}
          classNames="my-node"
        >
          <MenuContent title={rightMenu.includes($activeMenu) ? $activeMenu : ''}>
            {$activeMenu === 'Buildings' && <Buildings></Buildings>}
            {$activeMenu === 'Energy' && <Energy></Energy>}
            {$activeMenu === 'ThermalComfort' && <ThermalComfort></ThermalComfort>}
            {$activeMenu === 'Wind' && <Wind></Wind>}
            {$activeMenu === 'Solar' && <Solar></Solar>}
            {$activeMenu === 'Distance' && <Distance></Distance>}
          </MenuContent>
        </CSSTransition>
        <MenuRight></MenuRight>
      </div>
      <div className="menu-bottom hide-md">
        <CSSTransition
          mountOnEnter
          unmountOnExit
          in={bottomMenu.includes($activeMenu)}
          timeout={150}
          classNames="menu-bottom"
        >
          <MenuContent title={bottomMenu.includes($activeMenu) ? $activeMenu : ''}>
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
          </MenuContent>
        </CSSTransition>
        <MenuBottom></MenuBottom>
      </div>
    </div>
  );
};

export default Menu;
