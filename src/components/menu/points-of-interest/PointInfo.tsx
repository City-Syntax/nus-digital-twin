import { useRef } from 'react';
import { useStore } from '@nanostores/react';
import { pointId } from '../../../store';
import CloseButton from '../CloseButton';
import pointsData from '../../../content/points-of-interest/points.json';
import LazyImage from '../../primitives/LazyImage';
import DownloadButton from '../../primitives/DownloadButton';
import type { PointsOfInterestProps } from '../../../content/config';
import { SORT_ORDER } from './pointsInfoUtils';

const PointInfo = () => {
  const $pointId = useStore(pointId);
  const menubodyRef = useRef<HTMLDivElement>(null);
  const properties = Object.entries(pointsData.filter((d) => d.id == $pointId)[0]);
  pointId.listen(() => {
    if (menubodyRef && menubodyRef.current) {
      menubodyRef.current.scrollTo(0, 0);
    }
  });

  return (
    <>
      <div className="menubar-content-header">
        <h2>Point of Interest</h2>
        <CloseButton page="point-info"></CloseButton>
      </div>
      <div className="menubar-content-body" ref={menubodyRef}>
        {properties
          .filter(([title]) => title !== 'id')
          .sort((a, b) => {
            const firstTitle = a[0] as keyof PointsOfInterestProps;
            const secondTitle = b[0] as keyof PointsOfInterestProps;
            return SORT_ORDER.indexOf(firstTitle) - SORT_ORDER.indexOf(secondTitle);
          })
          .map(([title, content]) => {
            return (
              <div key={`${title}-${$pointId}`}>
                <PointInfoContent title={title as keyof PointsOfInterestProps} content={content} />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default PointInfo;

const PointInfoContent = ({ title, content }: { title: keyof PointsOfInterestProps; content: any }) => {
  switch (title) {
    case 'img':
    case 'thermalImg':
      return (
        <div>
          <LazyImage key={content.src} img={content} caption={content.author} />
          <DownloadButton type={'image'} files={[{ filetype: '.jpg', url: content.src }]} />
        </div>
      );
    default:
      return (
        <>
          <h3>{title}</h3>
          <p>{content}</p>
        </>
      );
  }
};
