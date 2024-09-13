import { useStore } from '@nanostores/react';
import { pointsOfInterestId } from '../../../store';
import CloseButton from '../CloseButton';
import buildingsData from '../../../content/points-of-interest/points.json';
import LazyImage from '../../primitives/LazyImage';

const PointsOfInterest = () => {
  const $pointId = useStore(pointsOfInterestId);
  const { images } = buildingsData.filter((d) => d.id == $pointId)[0];
  return (
    <>
      <div className="menubar-content-header">
        <h2>Points of Interest</h2>
        <CloseButton page="points-of-interest"></CloseButton>
      </div>
      <div className="menubar-content-body">
        {images
          .sort((a, b) => {
            if (a.src.includes('thermal') && b.src.includes('thermal')) {
              return 1;
            }

            if (a.src.includes('thermal')) {
              return 1;
            }

            if (b.src.includes('thermal')) {
              return -1;
            }

            return 1;
          })
          .map((img, i) => {
            return (
              <div key={`${$pointId}-${i}`}>
                <div className="img-wrapper">
                  <LazyImage src={img.src} caption={img.author} />
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default PointsOfInterest;
