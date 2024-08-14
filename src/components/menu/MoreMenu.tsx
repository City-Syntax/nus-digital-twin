import React from 'react';
import MenuLink from './MenuLink';
import CloseButton from './CloseButton';
import ScrollContainer from '../primitives/ScrollContainer';
import MenuLinks from './MenuLinks';

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
            <MenuLinks.Menu dir="bottom"></MenuLinks.Menu>
          </div>
        </div>
      </ScrollContainer>
    </>
  );
};

export default MoreMenu;
