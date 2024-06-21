import React from 'react';
import CloseButton from './CloseButton';
import { useStore } from '@nanostores/react';
import { activeGISLayer } from '../../store';

const GreenSpaces = () => {
  const $activeGISLayer = useStore(activeGISLayer);
  return (
    <>
      <div className="menubar-content-header">
        <h2>Layers: Green Spaces</h2>
        <CloseButton></CloseButton>
      </div>
      <div className="menubar-content-body">
        <div>Highlight green spaces. Green spaces refer to open-space areas reserved for nature.</div>
        <div>
          <div className="btn-group">
            <button
              onClick={() => activeGISLayer.set(new Set([...$activeGISLayer, 'green-spaces']))}
              className={$activeGISLayer.has('green-spaces') ? 'active' : ''}
            >
              On
            </button>
            <button
              onClick={() =>
                activeGISLayer.set(new Set([...$activeGISLayer].filter((layer) => layer !== 'green-spaces')))
              }
              className={!$activeGISLayer.has('green-spaces') ? 'active' : ''}
            >
              Off
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GreenSpaces;
