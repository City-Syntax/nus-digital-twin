import React from 'react';
import Panel from './Panel';
import LeftNav from './LeftNav';
import RightNav from './RightNav';
import Styles from '../styles/Navigation.module.scss';
import { useStore } from '@nanostores/react';
import { activePage, isLeftPanel } from '../navStore';

const Sidebar = () => {
  const $activePage = useStore(activePage);
  const $isLeftPanel = useStore(isLeftPanel);
  const key = $activePage as keyof typeof Panel;

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
