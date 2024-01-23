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
    <>
      <div className={Styles['left-container']}>
        <LeftNav></LeftNav>
        {key && $isLeftPanel && Panel[key]()}
      </div>
      <div className={Styles['right-container']}>
        {key && !$isLeftPanel && Panel[key]()}
        <RightNav></RightNav>
      </div>
    </>
  );
};

export default Sidebar;
