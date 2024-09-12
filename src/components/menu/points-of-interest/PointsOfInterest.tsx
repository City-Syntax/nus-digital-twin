import { useStore } from '@nanostores/react';
import { pointsOfInterestId } from '../../../store';
import CloseButton from '../CloseButton';
import buildingsData from '../../../content/points-of-interest/points.json';
import Carousel from '../../primitives/Carousel';

const PointsOfInterest = () => {
  const $pointId = useStore(pointsOfInterestId);
  const pointProperties = buildingsData.filter((d) => d.id == $pointId)[0];
  return (
    <>
      <div className="menubar-content-header">
        <h2>Points of Interest</h2>
        <CloseButton page="points-of-interest"></CloseButton>
      </div>
      <div className="menubar-content-body">
        <p>This feature is under construction.</p>
        <Carousel images={pointProperties.images} />
      </div>
    </>
  );
};

export default PointsOfInterest;
