import React from 'react';
import MenuLink from './MenuLink';
import CloseButton from './CloseButton';
import ScrollContainer from '../primitives/ScrollContainer';

const MoreMenu = () => {
  return (
    <>
      <div className="menubar-content-header">
        <h2>Menu</h2>
        <CloseButton></CloseButton>
      </div>
      <ScrollContainer>
        <div className="menubar-content-body">
          <div className="menu-list">
            <MenuLink toPage="help" label="Help" iconName="Help" isBottom isLeft></MenuLink>
            <MenuLink toPage="settings" label="Settings" iconName="Settings" isBottom isLeft></MenuLink>
          </div>
        </div>
      </ScrollContainer>
    </>
  );
};

export default MoreMenu;
