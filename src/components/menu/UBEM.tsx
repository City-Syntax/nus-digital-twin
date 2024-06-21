import React from 'react';
import CloseButton from './CloseButton';
import { useStore } from '@nanostores/react';
import { activeModel } from '../../store';

const UBEM = () => {
  const $activeModel = useStore(activeModel);
  return (
    <>
      <div className="menubar-content-header">
        <h2>Layers: Urban Building Energy Model</h2>
        <CloseButton></CloseButton>
      </div>
      <div className="menubar-content-body">
        <div>Displays Urban Building Energy Models. Selecting individual buildings is not available for UBEM.</div>
        <div>
          <div className="btn-group">
            <button onClick={() => activeModel.set('ubem')} className={$activeModel === 'ubem' ? 'active' : ''}>
              On
            </button>
            <button onClick={() => activeModel.set('')} className={$activeModel !== 'ubem' ? 'active' : ''}>
              Off
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UBEM;
