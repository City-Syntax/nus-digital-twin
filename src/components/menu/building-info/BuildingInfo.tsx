import React, { useState } from 'react';
import MenuContent from '../MenuContent';
import { buildingId, searchQuery } from '../../../store';
import { useStore } from '@nanostores/react';
import { SECTIONS_TO_DISPLAY, TITLE_MAPPINGS, type Categories, CATEGORY_MAPPINGS } from './buildingInfoUtils';
import CategorySelect from './CategorySelect';
import type { BuildingPropertiesProps } from '../../../content/config';
import buildingsData from '../../../content/buildings/buildings.json';

const BuildingInfo = () => {
  const [category, setCategory] = useState<Categories>('general');
  const $buildingId = useStore(buildingId);
  const buildingProperties = buildingsData.filter((d) => d.elementId == $buildingId)[0];
  const propertiesToDisplay = Object.entries(buildingProperties).filter((data) =>
    SECTIONS_TO_DISPLAY[category].includes(data[0] as keyof BuildingPropertiesProps),
  );

  buildingId.listen(() => setCategory('general'));

  // Prevent two components from being updated at the same time
  setTimeout(() => searchQuery.set(buildingProperties.name));

  return (
    <MenuContent title={buildingProperties.name}>
      <CategorySelect value={category} onValueChange={(value: Categories) => setCategory(value)}></CategorySelect>
      {propertiesToDisplay.length < 1 && <p>No information under '{CATEGORY_MAPPINGS[category]}' yet.</p>}
      {propertiesToDisplay.map((data) => {
        const title = data[0] as keyof BuildingPropertiesProps;
        return (
          <div key={data[0]}>
            <h3>{TITLE_MAPPINGS[title] || data[0]}</h3>
            <p>{data[1]}</p>
          </div>
        );
      })}
    </MenuContent>
  );
};

export default BuildingInfo;
