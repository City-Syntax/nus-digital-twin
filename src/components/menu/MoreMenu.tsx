import React from 'react';
import CloseButton from './CloseButton';
import ScrollContainer from '../primitives/ScrollContainer';
import MenuLinks from './MenuLinks';
import MenuLink from './MenuLink';

const MoreMenu = () => {
  return (
    <>
      <div className="menubar-content-header">
        <h2>Menu</h2>
        <CloseButton page="menu"></CloseButton>
      </div>
      <ScrollContainer>
        <div className="menubar-content-body">
          <div className="menu-list">
            <div className="block sm:hidden">
              <MenuLink toPage="resources" label="Resources" iconName="Resources" dir="bottom" isBottom></MenuLink>
            </div>
            <MenuLinks.Menu dir="bottom"></MenuLinks.Menu>
          </div>
        </div>
      </ScrollContainer>
    </>
  );
};

export default MoreMenu;
