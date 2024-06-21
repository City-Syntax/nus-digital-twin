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
            >
              On
            </button>
            <button
              onClick={() =>
                activeGISLayer.set(new Set([...$activeGISLayer].filter((layer) => layer !== 'water-bodies')))
              }
              className={!$activeGISLayer.has('water-bodies') ? 'active' : ''}
            >
              Off
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WaterBodies;
