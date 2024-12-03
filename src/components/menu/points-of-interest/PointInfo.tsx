import { useRef } from 'react';
import { useStore } from '@nanostores/react';
import { pointId } from '../../../store';
import CloseButton from '../CloseButton';
import pointsData from '../../../content/points-of-interest/points.json';
import LazyImage from '../../primitives/LazyImage';
import DownloadButton from '../../primitives/DownloadButton';
import type { PointsOfInterestProps } from '../../../content/config';
import { SORT_ORDER, TITLE_MAPPINGS } from './pointsInfoUtils';
import ScrollContainer from '../../primitives/ScrollContainer';

const PointInfo = () => {
  const $pointId = useStore(pointId);
  const menubodyRef = useRef<HTMLDivElement>(null);
  const properties = Object.entries(pointsData.filter((d) => d.id == $pointId)[0]);
  pointId.listen(() => {
    if (menubodyRef && menubodyRef.current) {
      menubodyRef.current.scrollTo(0, 0);
    }
  });

  const rows = properties.reduce(
    (acc, [first, second]) => {
      if (['id', 'img', 'thermalImg'].includes(first)) {
        return acc;
      }

      acc[0].push(first);
      acc[1].push(second);
      return acc;
    },
    [[] as string[], [] as string[]],
  );

  let csvContent = 'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(',')).join('\n');

  return (
    <>
      <div className="menubar-content-header">
        <h2>Point of Interest</h2>
        <CloseButton page="point-info"></CloseButton>
      </div>
      <ScrollContainer key={pointId.get()}>
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
          {rows[0].length > 2 && (
            <div>
              <h3>Download point data</h3>
              <DownloadButton type="data" files={[{ filetype: '.csv', url: csvContent }]} />
            </div>
          )}
          <div>
            <h3>Download all points data</h3>
            <DownloadButton
              type="full dataset"
              files={[{ filetype: '.csv', url: '/points-of-interest/points-data.csv' }]}
            />
          </div>
        </div>
      </ScrollContainer>
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
          <LazyImage key={content.src} img={content} caption={content.author} canDownload />
        </div>
      );
    case 'concreteSurface':
    case 'grassSurface':
    case 'asphaltSurface':
    case 'woodSurface':
    case 'brickSurface':
    case 'gravelSurface':
    case 'tilesSurface':
    case 'rubber':
    case 'buildingShade':
    case 'treeShade':
    case 'shadeProvision':
    case 'restSpotOutdoorFurniture':
    case 'waterFeature':
      return (
        <>
          <h3>{TITLE_MAPPINGS[title]}</h3>
          <p>{content ? 'Present' : 'Absent'}</p>
        </>
      );
    case 'skySegmentationPercent':
    case 'pavementSegmentationPercent':
    case 'waterSegmentationPercent':
    case 'vegetationSegmentationPercent':
    case 'buildingSegmentationPercent':
    case 'otherSegmentationPercent':
    case 'thermalRatio':
      return (
        <>
          <h3>{TITLE_MAPPINGS[title]}</h3>
          <p>{Math.round(content * 100) / 100}%</p>
        </>
      );
    default:
      return (
        <>
          <h3>{TITLE_MAPPINGS[title]}</h3>
          <p>{content}</p>
        </>
      );
  }
};
