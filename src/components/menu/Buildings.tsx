import React from 'react';
import MenuContent from './MenuContent';

const Buildings = () => {
  return (
    <MenuContent title="Controls: Buildings">
      <div className="menubar-content-body">
        <div>
          <h3>Color By</h3>
          <div className="btn-group">
            <button className="active">Distance</button>
            <button>Building Type</button>
          </div>
        </div>
        <div>
          <h3>Options</h3>
          <button className="menu-btn-secondary">Select central location</button>
        </div>
      </div>
    </MenuContent>
  );
};

export default Buildings;
