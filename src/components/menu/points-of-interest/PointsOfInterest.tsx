import { useStore } from '@nanostores/react';
import { showPoints } from '../../../store';
import CloseButton from '../CloseButton';

const PointsOfInterest = () => {
  const $showPoints = useStore(showPoints);
  return (
    <>
      <div className="menubar-content-header">
        <h2>Layers: Points of Interest</h2>
        <CloseButton page="points-of-interest"></CloseButton>
      </div>
      <div className="menubar-content-body">
        <div>Display markers on the map for noteworthy locations.</div>
        <div>
          <div className="btn-group">
            <button onClick={() => showPoints.set(true)} className={$showPoints ? 'active' : ''}>
              On
            </button>
            <button onClick={() => showPoints.set(false)} className={!$showPoints ? 'active' : ''}>
              Off
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PointsOfInterest;
