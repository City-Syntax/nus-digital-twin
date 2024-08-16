import React from 'react';
import CloseButton from './CloseButton';
import ScrollContainer from '../primitives/ScrollContainer';
import MenuLinks from './MenuLinks';

const Controls = () => {
  return (
    <>
      <div className="menubar-content-header">
        <h2>Controls</h2>
        <CloseButton page="controls"></CloseButton>
      </div>
      <ScrollContainer>
        <div className="menubar-content-body">
          <div className="menu-list">
            <MenuLinks.Controls dir="bottom" />
          </div>
        </div>
      </ScrollContainer>
    </>
  );
};

export default Controls;
