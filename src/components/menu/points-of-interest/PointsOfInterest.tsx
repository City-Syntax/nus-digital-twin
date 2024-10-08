import { useStore } from '@nanostores/react';
import { pointsOfInterestId } from '../../../store';
import CloseButton from '../CloseButton';
import buildingsData from '../../../content/points-of-interest/points.json';
import LazyImage from '../../primitives/LazyImage';
import { useState, useEffect } from 'react';
import type { ImageProps } from '../../../types';
import DownloadButton from '../../primitives/DownloadButton';

const PointsOfInterest = () => {
  const $pointId = useStore(pointsOfInterestId);
  const { images } = buildingsData.filter((d) => d.id == $pointId)[0];
  const [imagesData, setImagesData] = useState<ImageProps[]>([]);
  const astroImages = import.meta.glob<{ default: ImageMetadata }>('/src/assets/**/*.{jpeg,jpg,png,gif}');

  useEffect(() => {
    const fetchAstroImages = async () => {
      const data = await Promise.all(
        images.map(async (img) => ({
          ...img,
          src: (await astroImages[img.src]()).default.src,
        })),
      );
      setImagesData(data);
    };
    fetchAstroImages();
  }, [$pointId]);

  return (
    <>
      <div className="menubar-content-header">
        <h2>Points of Interest</h2>
        <CloseButton page="points-of-interest"></CloseButton>
      </div>
      <div className="menubar-content-body">
        {imagesData
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
                <div className="img-wrapper" style={{ marginBottom: '4px' }}>
                  <LazyImage src={img.src} caption={img.author} />
                </div>
                <DownloadButton type={'image'} files={[{ filetype: '.jpg', url: img.src }]} />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default PointsOfInterest;
