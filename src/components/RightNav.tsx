import React from 'react';
import Styles from '../styles/Navigation.module.css';
import NavLink from './NavLink';

interface RightNavProps {
  activePage: string;
  handleClick: (page: string) => void;
}

const RightNav = ({ activePage, handleClick }: RightNavProps) => {
  return (
    <>
      <nav className={`${Styles['nav-content']} ${Styles['right-nav']} ${Styles['nav']}`}>
        <div className={Styles['nav-body']}>
          <div className={Styles['nav-group']}>
            <div>Controls</div>
            <NavLink activePage={activePage} label="Buildings" handleClick={handleClick}></NavLink>
            <NavLink activePage={activePage} label="Energy" handleClick={handleClick}></NavLink>
            <NavLink activePage={activePage} label="Thermal Comfort" handleClick={handleClick}></NavLink>
            <NavLink activePage={activePage} label="Wind" handleClick={handleClick}></NavLink>
            <NavLink activePage={activePage} label="Solar" handleClick={handleClick}></NavLink>
          </div>
        </div>
      </nav>
    </>
  );
};

export default RightNav;
