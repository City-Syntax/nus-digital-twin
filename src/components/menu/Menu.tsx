import { useRef, useState } from 'react';
import MenuLeft from './MenuLeft';
import MenuRight from './MenuRight';
import { useStore } from '@nanostores/react';
import { activePages } from '../../store';
import type { BuildingInfoCategories, EnergyGraphType, NavType } from '../../types';
import AboutNUSCampus from './AboutNUSCampus';
import StreetCenterlines from './StreetCenterlines';
import BuildingFootprints from './BuildingFootprints';
import GreenSpaces from './GreenSpaces';
import OSMBuildings from './OSMBuildings';
import BIM from './BIM';
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
import RhinoUrban from './RhinoUrban';
import RhinoBuildings from './RhinoBuildings';
import UBEM from './UBEM';
import AutoHeight from '../primitives/AutoHeight';
import PointInfo from './points-of-interest/PointInfo';
import PointsOfInterest from './points-of-interest/PointsOfInterest';
import Resources from './Resources';

const Menu = () => {
  const $activePages = useStore(activePages);
  const [category, setCategory] = useState<BuildingInfoCategories>('general');
  const [graphType, setGraphType] = useState<EnergyGraphType>('eu');
  const [helpNavType, setHelpNavType] = useState<NavType>('mouse');
  const menuLeftRef = useRef<HTMLDivElement>(null);
  const menuRightRef = useRef<HTMLDivElement>(null);
  const menuBottomRef = useRef<HTMLDivElement>(null);

  // Retain the height of menu bottom before its closes
  activePages.listen((val) => {
    if (val.bottom === '') {
      const menuBottom = menuBottomRef.current as HTMLDivElement;
      menuBottom.style.height = menuBottom.clientHeight + 'px';
    }
  });

  return (
    <div>
      <div className="menu-left show-md">
        <MenuLeft></MenuLeft>
        <CSSTransition
          mountOnEnter
          unmountOnExit
          in={$activePages.left !== ''}
          timeout={150}
          classNames="menu-left"
          nodeRef={menuLeftRef}
        >
          <div className="menubar-content" ref={menuLeftRef}>
            {$activePages.left === 'osm' && <OSMBuildings></OSMBuildings>}
            {$activePages.left === 'about' && <AboutNUSCampus></AboutNUSCampus>}
            {$activePages.left === 'help' && <Help navType={helpNavType} setNavType={setHelpNavType}></Help>}
            {$activePages.left === 'street-centerlines' && <StreetCenterlines></StreetCenterlines>}
            {$activePages.left === 'building-footprints' && <BuildingFootprints></BuildingFootprints>}
            {$activePages.left === 'green-spaces' && <GreenSpaces></GreenSpaces>}
            {$activePages.left === 'rhino-building' && <RhinoBuildings></RhinoBuildings>}
            {$activePages.left === 'rhino-urban' && <RhinoUrban></RhinoUrban>}
            {$activePages.left === 'ubem' && <UBEM></UBEM>}
            {$activePages.left === 'bim' && <BIM></BIM>}
            {$activePages.left === 'settings' && <Settings></Settings>}
            {$activePages.left === 'point-info' && <PointInfo />}
            {$activePages.left === 'points-of-interest' && <PointsOfInterest />}
            {$activePages.left === 'building-info' && (
              <BuildingInfo category={category} setCategory={setCategory}></BuildingInfo>
            )}
          </div>
        </CSSTransition>
      </div>
      <div className="menu-right show-md">
        <CSSTransition
          mountOnEnter
          unmountOnExit
          in={$activePages.right !== ''}
          timeout={150}
          classNames="menu-right"
          nodeRef={menuRightRef}
        >
          <div className="menubar-content" ref={menuRightRef}>
            {$activePages.right === 'buildings' && <Buildings></Buildings>}
            {$activePages.right === 'energy' && <Energy graphType={graphType} setGraphType={setGraphType}></Energy>}
            {$activePages.right === 'thermal-comfort' && <ThermalComfort></ThermalComfort>}
            {$activePages.right === 'wind' && <Wind></Wind>}
            {$activePages.right === 'solar' && <Solar></Solar>}
            {$activePages.right === 'distance' && <Distance></Distance>}
          </div>
        </CSSTransition>
        <MenuRight></MenuRight>
      </div>
      <div className="menu-bottom hide-md">
        <CSSTransition
          mountOnEnter
          unmountOnExit
          in={$activePages.bottom !== ''}
          timeout={150}
          classNames="menu-bottom"
          nodeRef={menuBottomRef}
        >
          <div className="menubar-content" ref={menuBottomRef}>
            <AutoHeight>
              {$activePages.bottom === 'about' && <AboutNUSCampus></AboutNUSCampus>}
              {$activePages.bottom === 'building-info' && (
                <BuildingInfo category={category} setCategory={setCategory}></BuildingInfo>
              )}
              {$activePages.bottom === 'point-info' && <PointInfo />}
              {$activePages.bottom === 'points-of-interest' && <PointsOfInterest />}
              {$activePages.bottom === 'street-centerlines' && <StreetCenterlines></StreetCenterlines>}
              {$activePages.bottom === 'building-footprints' && <BuildingFootprints></BuildingFootprints>}
              {$activePages.bottom === 'green-spaces' && <GreenSpaces></GreenSpaces>}
              {$activePages.bottom === 'bim' && <BIM></BIM>}
              {$activePages.bottom === 'rhino-building' && <RhinoBuildings></RhinoBuildings>}
              {$activePages.bottom === 'osm' && <OSMBuildings></OSMBuildings>}
              {$activePages.bottom === 'ubem' && <UBEM></UBEM>}
              {$activePages.bottom === 'rhino-urban' && <RhinoUrban></RhinoUrban>}
              {$activePages.bottom === 'buildings' && <Buildings></Buildings>}
              {$activePages.bottom === 'energy' && <Energy graphType={graphType} setGraphType={setGraphType}></Energy>}
              {$activePages.bottom === 'thermal-comfort' && <ThermalComfort></ThermalComfort>}
              {$activePages.bottom === 'wind' && <Wind></Wind>}
              {$activePages.bottom === 'solar' && <Solar></Solar>}
              {$activePages.bottom === 'distance' && <Distance></Distance>}
              {$activePages.bottom === 'help' && <Help navType={helpNavType} setNavType={setHelpNavType}></Help>}
              {$activePages.bottom === 'settings' && <Settings></Settings>}
              {$activePages.bottom === 'search' && <Search></Search>}
              {$activePages.bottom === 'controls' && <Controls></Controls>}
              {$activePages.bottom === 'layers' && <Layers></Layers>}
              {$activePages.bottom === 'menu' && <MoreMenu></MoreMenu>}
              {$activePages.bottom === 'resources' && <Resources></Resources>}
            </AutoHeight>
          </div>
        </CSSTransition>
        <MenuBottom></MenuBottom>
      </div>
    </div>
  );
};

export default Menu;
