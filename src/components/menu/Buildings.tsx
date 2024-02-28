import React from 'react';
import MenuContent from './MenuContent';
import { buildingColorSetting, isSelectColorByDistance } from '../../store';
import { useStore } from '@nanostores/react';

const Buildings = () => {
  const $buildingColorSetting = useStore(buildingColorSetting);
  const $isSelectColorByDistance = useStore(isSelectColorByDistance);
  return (
    <MenuContent title="Controls: Buildings">
      <div className="menubar-content-body">
        <div>
          <h3>Color By</h3>
          <div className="btn-group">
            <button
              className={`${$buildingColorSetting === 'distance' ? 'active' : ''}`}
              onClick={() => buildingColorSetting.set('distance')}
            >
              Distance
            </button>
            <button
              className={`${$buildingColorSetting === '' ? 'active' : ''}`}
              onClick={() => buildingColorSetting.set('')}
            >
              Off
            </button>
          </div>
        </div>
        {$buildingColorSetting === 'distance' && (
          <div>
            <h3>Options</h3>
            <div className="btn-group">
              <button
                className={`${$isSelectColorByDistance ? 'active' : ''}`}
                onClick={() => isSelectColorByDistance.set(!$isSelectColorByDistance)}
              >
                Select{$isSelectColorByDistance && 'ing'} central location
              </button>
            </div>
          </div>
        )}
      </div>
    </MenuContent>
  );
};

export default Buildings;
