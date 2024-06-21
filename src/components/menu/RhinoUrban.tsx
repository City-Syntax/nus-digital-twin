import React from 'react';
import CloseButton from './CloseButton';
import { useStore } from '@nanostores/react';
import { activeModel } from '../../store';

const RhinoUrban = () => {
  const $activeModel = useStore(activeModel);
  return (
    <>
      <div className="menubar-content-header">
        <h2>Layers: Rhino Models (Urban)</h2>
        <CloseButton></CloseButton>
      </div>
      <div className="menubar-content-body">
        <div>Displays Rhino Urban Scale models. Selecting individual buildings is not available for UBEM.</div>
        <div>
          <div className="btn-group">
            <button
              onClick={() => activeModel.set('rhino-urban')}
              className={$activeModel === 'rhino-urban' ? 'active' : ''}
            >
              On
            </button>
            <button onClick={() => activeModel.set('')} className={$activeModel !== 'rhino-urban' ? 'active' : ''}>
              Off
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RhinoUrban;
