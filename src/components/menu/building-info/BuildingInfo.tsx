import React from 'react';
import { buildingId } from '../../../store';
import { useStore } from '@nanostores/react';
import { SECTIONS_TO_DISPLAY, TITLE_MAPPINGS, CATEGORY_MAPPINGS, SORT_ORDER } from './buildingInfoUtils';
import type { BuildingInfoCategories, DownloadProps } from '../../../types';
import CategorySelect from './CategorySelect';
import type { BuildingPropertiesProps } from '../../../content/config';
import buildingsData from '../../../content/buildings/buildings.json';
import CloseButton from '../CloseButton';
import DownloadButton from '../../primitives/DownloadButton';
import Carousel from '../../primitives/Carousel';
import Icons from '../../Icons';

type BuildingInfoProps = {
  category: BuildingInfoCategories;
  setCategory: (category: BuildingInfoCategories) => void;
};

const BuildingInfo = ({ category, setCategory }: BuildingInfoProps) => {
  const $buildingId = useStore(buildingId);
  const buildingProperties = buildingsData.filter((d) => d.elementId == $buildingId)[0];
  const propertiesToDisplay = Object.entries(buildingProperties).filter((data) =>
    SECTIONS_TO_DISPLAY[category].includes(data[0] as keyof BuildingPropertiesProps),
  );
  buildingId.listen(() => setCategory('general'));

  return (
    <>
      <div className="menubar-content-header">
        <h2>{buildingProperties.name}</h2>
        <CloseButton></CloseButton>
      </div>
      <div className="menubar-content-body">
        <CategorySelect
          value={category}
          onValueChange={(value: BuildingInfoCategories) => setCategory(value)}
        ></CategorySelect>
        {propertiesToDisplay.length < 1 && <p>No information under '{CATEGORY_MAPPINGS[category]}' yet.</p>}
        {propertiesToDisplay
          .sort((a, b) => {
            const firstTitle = a[0] as keyof BuildingPropertiesProps;
            const secondTitle = b[0] as keyof BuildingPropertiesProps;
            return SORT_ORDER.indexOf(firstTitle) - SORT_ORDER.indexOf(secondTitle);
          })
          .map((data) => {
            return (
              <div key={data[0]}>
                <BuildingInfoContent
                  title={data[0] as keyof BuildingPropertiesProps}
                  content={data[1]}
                ></BuildingInfoContent>
              </div>
            );
          })}
      </div>
      <div className="menubar-content-footer">
        <a
          href={`https://docs.google.com/forms/d/e/1FAIpQLSdPktLMj_Ob6YvreQBa7M4_nd8FXK0sLGwQnCeAd8gtbk9HBw/viewform?entry.1908367072=Issue with building: ${buildingProperties.name} (${$buildingId})`}
          target="_blank"
          rel="noreferrer"
          className="report-link"
        >
          <Icons.Flag></Icons.Flag>
          Report issue
        </a>
      </div>
    </>
  );
};

export default BuildingInfo;

const BuildingInfoContent = ({ title, content }: { title: keyof BuildingPropertiesProps; content: any }) => {
  switch (title) {
    case 'downloads':
      return (
        <>
          <h3>{TITLE_MAPPINGS[title]}</h3>
          <div className="download-btn-container">
            {content.map((c: DownloadProps) => (
              <DownloadButton key={c.type} {...c}></DownloadButton>
            ))}
          </div>
        </>
      );
    case 'images':
      return (
        <>
          <Carousel imageSources={content}></Carousel>
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
