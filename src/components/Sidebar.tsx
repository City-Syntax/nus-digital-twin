import React, { useState } from 'react';
import Panel from './Panel';
import LeftNav from './LeftNav';
import RightNav from './RightNav';
import Styles from '../styles/Navigation.module.scss';

const Sidebar = () => {
  const [activePage, setActivePage] = useState('');
  const [isLeftPanel, setIsLeftPanel] = useState<Boolean>();
  const handleLeftNav = (page: string) => {
    setIsLeftPanel(true);
    setActivePage(page);
  };
  const handleRightNav = (page: string) => {
    setIsLeftPanel(false);
    setActivePage(page);
  };
  const handleClose = () => setActivePage('');
  const key = activePage as keyof typeof Panel;

  return (
    <>
      <div className={Styles['left-container']}>
        <LeftNav activePage={activePage} handleClick={handleLeftNav}></LeftNav>
        {key && isLeftPanel && Panel[key]({ handleClick: handleClose })}
      </div>
      <div className={Styles['right-container']}>
        {key && !isLeftPanel && Panel[key]({ handleClick: handleClose })}
        <RightNav activePage={activePage} handleClick={handleRightNav}></RightNav>
      </div>
    </>
  );
};

export default Sidebar;
