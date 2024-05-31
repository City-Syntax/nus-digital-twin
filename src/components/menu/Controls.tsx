import React from 'react';
import MenuLink from './MenuLink';
import CloseButton from './CloseButton';

const Controls = () => {
  return (
    <>
      <div className="menubar-content-header">
        <h2>Controls</h2>
        <CloseButton></CloseButton>
      </div>
      <div className="menubar-content-body">
        <div className="menu-list">
          <MenuLink label="Buildings"></MenuLink>
          <MenuLink label="Energy"></MenuLink>
          <MenuLink label="Thermal Comfort"></MenuLink>
          <MenuLink label="Wind"></MenuLink>
          <MenuLink label="Solar"></MenuLink>
          <MenuLink label="Distance"></MenuLink>
        </div>
      </div>
    </>
  );
};

export default Controls;
