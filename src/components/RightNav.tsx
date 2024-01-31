import React from 'react';
import NavLink from './NavLink';

const RightNav = () => {
  return (
    <nav className="menubar-right">
      <div className="menubar-body">
        <div className="menu-item">
          <div>Controls</div>
          <NavLink.Right label="Buildings"></NavLink.Right>
          <NavLink.Right label="Energy"></NavLink.Right>
          <NavLink.Right label="Thermal Comfort"></NavLink.Right>
          <NavLink.Right label="Wind"></NavLink.Right>
          <NavLink.Right label="Solar"></NavLink.Right>
        </div>
      </div>
    </nav>
  );
};

export default RightNav;
