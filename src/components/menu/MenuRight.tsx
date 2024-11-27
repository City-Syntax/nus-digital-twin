import React from 'react';
import ScrollContainer from '../primitives/ScrollContainer';
import MenuLinks from './MenuLinks';
import Icons from '../Icons';

const MenuRight = () => {
  return (
    <nav className="menubar-right">
      <ScrollContainer>
        <div className="menubar-body">
          <div className="menu-list">
            <div className="menu-list-title">Controls</div>
            <MenuLinks.Controls dir="right" />
          </div>
          <div className="menu-list">
            <div className="menu-list-title">Resources</div>
            <a className="menu-link" href="/api/v1">
              <Icons.Api></Icons.Api>
              API Reference
            </a>
          </div>
        </div>
      </ScrollContainer>
    </nav>
  );
};

export default MenuRight;
