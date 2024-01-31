import React from 'react';
import NavLink from './NavLink';

const RightNav = () => {
  return (
    <nav className="menubar-right">
      <div className="menubar-body">
        <div className="menu-list">
          <div className="menu-list-title">Controls</div>
          <NavLink label="Buildings"></NavLink>
          <NavLink label="Energy"></NavLink>
          <NavLink label="Thermal Comfort"></NavLink>
          <NavLink label="Wind"></NavLink>
          <NavLink label="Solar"></NavLink>
        </div>
      </div>
    </nav>
  );
};

export default RightNav;
