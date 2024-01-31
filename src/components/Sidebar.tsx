import React from 'react';
import Panel from './Panel';
import LeftNav from './LeftNav';
import RightNav from './RightNav';
import { useStore } from '@nanostores/react';
import { activeMenu, isLeftPanel } from '../store';

const Sidebar = () => {
  const $activeMenu = useStore(activeMenu);
  const $isLeftPanel = useStore(isLeftPanel);
  const key = $activeMenu as keyof typeof Panel;

  return (
    <div id="nav">
      <div className="menu-left">
        <LeftNav></LeftNav>
        {key && $isLeftPanel && Panel[key]()}
      </div>
      <div className="menu-right">
        {key && !$isLeftPanel && Panel[key]()}
        <RightNav></RightNav>
      </div>
    </div>
  );
};

export default Sidebar;
