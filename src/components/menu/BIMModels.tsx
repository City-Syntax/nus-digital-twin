import React from 'react';
import CloseButton from './CloseButton';
import { activeModel } from '../../store';
import { useStore } from '@nanostores/react';

const BIMModels = () => {
  const $activeModel = useStore(activeModel);
  return (
    <>
      <div className="menubar-content-header">
        <h2>Layers: BIM Models</h2>
        <CloseButton page="bim"></CloseButton>
      </div>
      <div className="menubar-content-body">
        <div>
          Displays Building Information Models (BIM), a highly detailed digital building model.
          <br />
          Selecting BIM will disable any existing coloring effects applied.
        </div>
        <div>
          <div className="btn-group">
            <button onClick={() => activeModel.set('bim')} className={$activeModel === 'bim' ? 'active' : ''}>
              On
            </button>
            <button onClick={() => activeModel.set('')} className={$activeModel !== 'bim' ? 'active' : ''}>
              Off
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BIMModels;
