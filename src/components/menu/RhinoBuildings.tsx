import React from 'react';
import CloseButton from './CloseButton';
import { activeModel } from '../../store';
import { useStore } from '@nanostores/react';

const RhinoBuildings = () => {
  const $activeModel = useStore(activeModel);
  return (
    <>
      <div className="menubar-content-header">
        <h2>Layers: Rhino Models (Building)</h2>
        <CloseButton></CloseButton>
      </div>
      <div className="menubar-content-body">
        <div>Displays Rhino Building Scale models.</div>
        <div>
          <div className="btn-group">
            <button
              onClick={() => activeModel.set('rhino-building')}
              className={$activeModel === 'rhino-building' ? 'active' : ''}
            >
              On
            </button>
            <button onClick={() => activeModel.set('')} className={$activeModel !== 'rhino-building' ? 'active' : ''}>
              Off
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RhinoBuildings;
