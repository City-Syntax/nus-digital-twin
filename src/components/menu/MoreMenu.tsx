import React from 'react';
import MenuContent from './MenuContent';
import MenuLink from './MenuLink';

const MoreMenu = () => {
  return (
    <MenuContent title="Menu">
      <div className="menu-list">
        <MenuLink label="Help"></MenuLink>
        <MenuLink label="Settings"></MenuLink>
      </div>
    </MenuContent>
  );
};

export default MoreMenu;
