import React from 'react';
import CloseButton from './CloseButton';
import { buildingDataLayer } from '../../store';
import { useStore } from '@nanostores/react';

const BIMModels = () => {
  const $buildingDataLayer = useStore(buildingDataLayer);
  return (
    <>
      <div className="menubar-content-header">
        <h2>Layers: BIM Models</h2>
        <CloseButton></CloseButton>
      </div>
      <div className="menubar-content-body">
        <div>
          Displays Building Information Models (BIM), a highly detailed digital building model.
          <br />
          Selecting BIM will disable any existing coloring effects applied.
        </div>
        <div>
          <div className="btn-group">
            <button
              onClick={() => buildingDataLayer.set('bim')}
              className={$buildingDataLayer === 'bim' ? 'active' : ''}
            >
              On
            </button>
            <button onClick={() => buildingDataLayer.set('')} className={$buildingDataLayer !== 'bim' ? 'active' : ''}>
              Off
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BIMModels;
