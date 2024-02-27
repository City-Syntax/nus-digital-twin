import React from 'react';
import MenuContent from './MenuContent';
import { buildingColorSetting } from '../../store';
import { useStore } from '@nanostores/react';

const Buildings = () => {
  const $buildingColorSetting = useStore(buildingColorSetting);
  return (
    <MenuContent title="Controls: Buildings">
      <div className="menubar-content-body">
        <div>
          <h3>Color By</h3>
          <div className="btn-group">
            <button
              onClick={() => buildingColorSetting.set('distance')}
              className={`${$buildingColorSetting === 'distance' ? 'active' : ''}`}
            >
              Distance
            </button>
            <button
              onClick={() => buildingColorSetting.set('')}
              className={`${$buildingColorSetting === '' ? 'active' : ''}`}
            >
              Off
            </button>
          </div>
        </div>
        {$buildingColorSetting === 'distance' && (
          <div>
            <h3>Options</h3>
            <button className="menu-btn-secondary">Select central location</button>
          </div>
        )}
      </div>
    </MenuContent>
  );
};

export default Buildings;
