import React, { useState } from 'react';
import { buildingId } from '../../../store';
import { useStore } from '@nanostores/react';
import { SECTIONS_TO_DISPLAY, TITLE_MAPPINGS, CATEGORY_MAPPINGS } from './buildingInfoUtils';
import type { BuildingInfoCategories } from '../menuTypes';
import CategorySelect from './CategorySelect';
import type { BuildingPropertiesProps } from '../../../content/config';
import buildingsData from '../../../content/buildings/buildings.json';
import CloseButton from '../CloseButton';

const BuildingInfo = () => {
  const [category, setCategory] = useState<BuildingInfoCategories>('general');
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
        {propertiesToDisplay.map((data) => {
          const title = data[0] as keyof BuildingPropertiesProps;
          const content = data[1];
          return (
            <div key={title}>
              <h3>{TITLE_MAPPINGS[title]}</h3>
              <p>{content}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default BuildingInfo;
