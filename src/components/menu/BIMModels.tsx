import React from 'react';
import MenuContent from './MenuContent';
import { buildingDataLayer } from '../../store';
import { useStore } from '@nanostores/react';

const BIMModels = () => {
  const $buildingDataLayer = useStore(buildingDataLayer);
  return (
    <MenuContent title="Layers: BIM Models">
      <div>Displays Building Information Models (BIM), a highly detailed digital building model.</div>
      <div>
        <div className="btn-group">
          <button onClick={() => buildingDataLayer.set('bim')} className={$buildingDataLayer === 'bim' ? 'active' : ''}>
            On
          </button>
          <button onClick={() => buildingDataLayer.set('')} className={$buildingDataLayer !== 'bim' ? 'active' : ''}>
            Off
          </button>
        </div>
      </div>
    </MenuContent>
  );
};

export default BIMModels;
