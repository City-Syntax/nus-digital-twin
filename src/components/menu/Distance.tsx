import React from 'react';
import CloseButton from './CloseButton';
import { buildingColorSetting, buildingDataLayer, isSelectColorByDistance } from '../../store';
import { useStore } from '@nanostores/react';

const Distance = () => {
  const $buildingColorSetting = useStore(buildingColorSetting);
  const $isSelectColorByDistance = useStore(isSelectColorByDistance);
  const $buildingDataLayer = useStore(buildingDataLayer);
  return (
    <>
      <div className="menubar-content-header">
        <h2>Controls: Distance</h2>
        <CloseButton></CloseButton>
      </div>
      <div className="menubar-content-body">
        <div>
          <h3>Color by distance</h3>
          {$buildingDataLayer !== 'osm' ? (
            <div className="hint">Color effects are only available on OpenStreetMaps models.</div>
          ) : (
            <>
              <div className="hint">Colors buildings based on the proximity to the selected building.</div>
              <div className="btn-group">
                <button
                  className={`${$buildingColorSetting === 'distance' ? 'active' : ''}`}
                  onClick={() => buildingColorSetting.set('distance')}
                  disabled={$buildingDataLayer !== 'osm'}
                >
                  On
                </button>
                <button
                  className={`${$buildingColorSetting === '' ? 'active' : ''}`}
                  onClick={() => buildingColorSetting.set('')}
                  disabled={$buildingDataLayer !== 'osm'}
                >
                  Off
                </button>
              </div>
            </>
          )}
        </div>
        {$buildingColorSetting === 'distance' && $buildingDataLayer === 'osm' && (
          <div>
            <h3>Options</h3>
            <div className="btn-group">
              <button
                className={`${$isSelectColorByDistance ? 'active' : ''}`}
                onClick={() => isSelectColorByDistance.set(!$isSelectColorByDistance)}
              >
                Select{$isSelectColorByDistance && 'ing'} central building
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Distance;
