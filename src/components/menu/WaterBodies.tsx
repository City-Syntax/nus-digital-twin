import React from 'react';
import CloseButton from './CloseButton';
import { useStore } from '@nanostores/react';
import { activeGISLayer } from '../../store';

const WaterBodies = () => {
  const $activeGISLayer = useStore(activeGISLayer);
  return (
    <>
      <div className="menubar-content-header">
        <h2>Layers: Water Bodies</h2>
        <CloseButton></CloseButton>
      </div>
      <div className="menubar-content-body">
        <div>Highlight water bodies.</div>
        <div>
          <div className="btn-group">
            <button
              onClick={() => activeGISLayer.set(new Set([...$activeGISLayer, 'water-bodies']))}
              className={$activeGISLayer.has('water-bodies') ? 'active' : ''}
              type="button"
            >
              On
            </button>
            <button
              onClick={() =>
                activeGISLayer.set(new Set([...$activeGISLayer].filter((layer) => layer !== 'water-bodies')))
              }
              className={!$activeGISLayer.has('water-bodies') ? 'active' : ''}
              type="button"
            >
              Off
            </button>
          </div>
          <button
            onClick={() => activeGISLayer.set(new Set())}
            type="button"
            className={`clear-gis-btn ${$activeGISLayer.size === 0 ? 'hide' : ''}`}
          >
            Clear all GIS layers
          </button>
        </div>
      </div>
    </>
  );
};

export default WaterBodies;
