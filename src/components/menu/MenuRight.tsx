import React from 'react';
import ScrollContainer from '../primitives/ScrollContainer';
import MenuLinks from './MenuLinks';

const MenuRight = () => {
  return (
    <nav className="menubar-right">
      <ScrollContainer>
        <div className="menubar-body">
          <div className="menu-list">
            <div className="menu-list-title">Controls</div>
            <MenuLinks.Controls />
          </div>
        </div>
      </ScrollContainer>
    </nav>
  );
};

export default MenuRight;
