import React from 'react';
import MenuLeft from './MenuLeft';
import MenuRight from './MenuRight';
import { useStore } from '@nanostores/react';
import { activePage } from '../../store';
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
import UBEM from './UBEM';
import AutoHeight from '../AutoHeight';

const Menu = () => {
  const $activePage = useStore(activePage);

  return (
    <div>
      <div className="menu-left show-md">
        <MenuLeft></MenuLeft>
        <CSSTransition
          mountOnEnter
          unmountOnExit
          in={MENU_PAGES.LEFT.includes($activePage)}
          timeout={150}
          classNames="menu-left"
        >
          <div className="menubar-content">
            {$activePage === 'osm' && <OSMBuildings></OSMBuildings>}
            {$activePage === 'about' && <AboutNUSCampus></AboutNUSCampus>}
            {$activePage === 'help' && <Help></Help>}
            {$activePage === 'street-centerlines' && <StreetCenterlines></StreetCenterlines>}
            {$activePage === 'building-footprints' && <BuildingFootprints></BuildingFootprints>}
            {$activePage === 'green-spaces' && <GreenSpaces></GreenSpaces>}
            {$activePage === 'water-bodies' && <WaterBodies></WaterBodies>}
            {$activePage === 'rhino-building' && <RhinoBuildings></RhinoBuildings>}
            {$activePage === 'rhino-urban' && <RhinoUrban></RhinoUrban>}
            {$activePage === 'ubem' && <UBEM></UBEM>}
            {$activePage === 'bim' && <BIMModels></BIMModels>}
            {$activePage === 'settings' && <Settings></Settings>}
            {$activePage === 'building-info' && <BuildingInfo></BuildingInfo>}
          </div>
        </CSSTransition>
      </div>
      <div className="menu-right show-md">
        <CSSTransition
          mountOnEnter
          unmountOnExit
          in={MENU_PAGES.RIGHT.includes($activePage)}
          timeout={150}
          classNames="menu-right"
        >
          <div className="menubar-content">
            {$activePage === 'buildings' && <Buildings></Buildings>}
            {$activePage === 'energy' && <Energy></Energy>}
            {$activePage === 'thermal-comfort' && <ThermalComfort></ThermalComfort>}
            {$activePage === 'wind' && <Wind></Wind>}
            {$activePage === 'solar' && <Solar></Solar>}
            {$activePage === 'distance' && <Distance></Distance>}
          </div>
        </CSSTransition>
        <MenuRight></MenuRight>
      </div>
      <div className="menu-bottom hide-md">
        <CSSTransition
          mountOnEnter
          unmountOnExit
          in={MENU_PAGES.BOTTOM.includes($activePage)}
          timeout={200}
          classNames="menu-bottom"
        >
          <div className="menubar-content">
            <AutoHeight>
              {$activePage === 'about' && <AboutNUSCampus></AboutNUSCampus>}
              {$activePage === 'building-info' && <BuildingInfo></BuildingInfo>}
              {$activePage === 'street-centerlines' && <StreetCenterlines></StreetCenterlines>}
              {$activePage === 'building-footprints' && <BuildingFootprints></BuildingFootprints>}
              {$activePage === 'green-spaces' && <GreenSpaces></GreenSpaces>}
              {$activePage === 'water-bodies' && <WaterBodies></WaterBodies>}
              {$activePage === 'bim' && <BIMModels></BIMModels>}
              {$activePage === 'rhino-building' && <RhinoBuildings></RhinoBuildings>}
              {$activePage === 'osm' && <OSMBuildings></OSMBuildings>}
              {$activePage === 'ubem' && <UBEM></UBEM>}
              {$activePage === 'rhino-urban' && <RhinoUrban></RhinoUrban>}
              {$activePage === 'buildings' && <Buildings></Buildings>}
              {$activePage === 'energy' && <Energy></Energy>}
              {$activePage === 'thermal-comfort' && <ThermalComfort></ThermalComfort>}
              {$activePage === 'wind' && <Wind></Wind>}
              {$activePage === 'solar' && <Solar></Solar>}
              {$activePage === 'distance' && <Distance></Distance>}
              {$activePage === 'help' && <Help></Help>}
              {$activePage === 'settings' && <Settings></Settings>}
              {$activePage === 'search' && <Search></Search>}
              {$activePage === 'controls' && <Controls></Controls>}
              {$activePage === 'layers' && <Layers></Layers>}
              {$activePage === 'menu' && <MoreMenu></MoreMenu>}
            </AutoHeight>
          </div>
        </CSSTransition>
        <MenuBottom></MenuBottom>
      </div>
    </div>
  );
};

export default Menu;
