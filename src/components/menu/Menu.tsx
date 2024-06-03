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
import { MENU_PAGES } from './menuUtils';
import RhinoUrban from './RhinoUrban';
import RhinoBuildings from './RhinoBuildings';

const Menu = () => {
  const $activeMenu = useStore(activeMenu);

  return (
    <div>
      <div className="menu-left show-md">
        <MenuLeft></MenuLeft>
        <CSSTransition
          mountOnEnter
          unmountOnExit
          in={MENU_PAGES.LEFT.includes($activeMenu)}
          timeout={150}
          classNames="menu-left"
        >
          <div className="menubar-content">
            {$activeMenu === 'osm' && <OSMBuildings></OSMBuildings>}
            {$activeMenu === 'about' && <AboutNUSCampus></AboutNUSCampus>}
            {$activeMenu === 'help' && <Help></Help>}
            {$activeMenu === 'street-centerlines' && <StreetCenterlines></StreetCenterlines>}
            {$activeMenu === 'building-footprints' && <BuildingFootprints></BuildingFootprints>}
            {$activeMenu === 'green-spaces' && <GreenSpaces></GreenSpaces>}
            {$activeMenu === 'water-bodies' && <WaterBodies></WaterBodies>}
            {$activeMenu === 'rhino-building' && <RhinoBuildings></RhinoBuildings>}
            {$activeMenu === 'rhino-urban' && <RhinoUrban></RhinoUrban>}
            {$activeMenu === 'bim' && <BIMModels></BIMModels>}
            {$activeMenu === 'settings' && <Settings></Settings>}
            {$activeMenu === 'building-info' && <BuildingInfo></BuildingInfo>}
          </div>
        </CSSTransition>
      </div>
      <div className="menu-right show-md">
        <CSSTransition
          mountOnEnter
          unmountOnExit
          in={MENU_PAGES.RIGHT.includes($activeMenu)}
          timeout={150}
          classNames="menu-right"
        >
          <div className="menubar-content">
            {$activeMenu === 'buildings' && <Buildings></Buildings>}
            {$activeMenu === 'energy' && <Energy></Energy>}
            {$activeMenu === 'thermal-comfort' && <ThermalComfort></ThermalComfort>}
            {$activeMenu === 'wind' && <Wind></Wind>}
            {$activeMenu === 'solar' && <Solar></Solar>}
            {$activeMenu === 'distance' && <Distance></Distance>}
          </div>
        </CSSTransition>
        <MenuRight></MenuRight>
      </div>
      <div className="menu-bottom hide-md">
        <CSSTransition
          mountOnEnter
          unmountOnExit
          in={MENU_PAGES.BOTTOM.includes($activeMenu)}
          timeout={150}
          classNames="menu-bottom"
        >
          <div className="menubar-content">
            {$activeMenu === 'about' && <AboutNUSCampus></AboutNUSCampus>}
            {$activeMenu === 'building-info' && <BuildingInfo></BuildingInfo>}
            {$activeMenu === 'street-centerlines' && <StreetCenterlines></StreetCenterlines>}
            {$activeMenu === 'building-footprints' && <BuildingFootprints></BuildingFootprints>}
            {$activeMenu === 'green-spaces' && <GreenSpaces></GreenSpaces>}
            {$activeMenu === 'water-bodies' && <WaterBodies></WaterBodies>}
            {$activeMenu === 'osm' && <OSMBuildings></OSMBuildings>}
            {$activeMenu === 'rhino-building' && <RhinoBuildings></RhinoBuildings>}
            {$activeMenu === 'rhino-urban' && <RhinoUrban></RhinoUrban>}
            {$activeMenu === 'bim' && <BIMModels></BIMModels>}
            {$activeMenu === 'buildings' && <Buildings></Buildings>}
            {$activeMenu === 'energy' && <Energy></Energy>}
            {$activeMenu === 'thermal-comfort' && <ThermalComfort></ThermalComfort>}
            {$activeMenu === 'wind' && <Wind></Wind>}
            {$activeMenu === 'solar' && <Solar></Solar>}
            {$activeMenu === 'distance' && <Distance></Distance>}
            {$activeMenu === 'help' && <Help></Help>}
            {$activeMenu === 'settings' && <Settings></Settings>}
            {$activeMenu === 'search' && <Search></Search>}
            {$activeMenu === 'controls' && <Controls></Controls>}
            {$activeMenu === 'layers' && <Layers></Layers>}
            {$activeMenu === 'menu' && <MoreMenu></MoreMenu>}
          </div>
        </CSSTransition>
        <MenuBottom></MenuBottom>
      </div>
    </div>
  );
};

export default Menu;
