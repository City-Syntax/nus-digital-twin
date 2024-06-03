import React from 'react';
import MenuLink from './MenuLink';
import CloseButton from './CloseButton';

const MoreMenu = () => {
  return (
    <>
      <div className="menubar-content-header">
        <h2>Menu</h2>
        <CloseButton></CloseButton>
      </div>
      <div className="menubar-content-body">
        <div className="menu-list">
          <MenuLink toPage="help" label="Help" iconName="Help"></MenuLink>
          <MenuLink toPage="settings" label="Settings" iconName="Settings"></MenuLink>
        </div>
      </div>
    </>
  );
};

export default MoreMenu;
