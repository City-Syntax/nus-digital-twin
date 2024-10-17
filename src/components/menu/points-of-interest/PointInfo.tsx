import { useStore } from '@nanostores/react';
import { pointId } from '../../../store';
import CloseButton from '../CloseButton';
import buildingsData from '../../../content/points-of-interest/points.json';
import LazyImage from '../../primitives/LazyImage';
import DownloadButton from '../../primitives/DownloadButton';

const PointInfo = () => {
  const $pointId = useStore(pointId);
  const { img, thermalImg } = buildingsData.filter((d) => d.id == $pointId)[0];

  return (
    <>
      <div className="menubar-content-header">
        <h2>Point of Interest</h2>
        <CloseButton page="point-info"></CloseButton>
      </div>
      <div className="menubar-content-body">
        {[img, thermalImg].map((img) => {
          if (!img) {
            return;
          }

          return (
            <div key={img.src}>
              <div className="img-wrapper" style={{ marginBottom: '4px' }}>
                <LazyImage key={img.src} img={img} caption={img.author} />
              </div>
              <DownloadButton type={'image'} files={[{ filetype: '.jpg', url: img.src }]} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PointInfo;
