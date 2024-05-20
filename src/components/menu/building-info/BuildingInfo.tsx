import React, { useState } from 'react';
import MenuContent from '../MenuContent';
import { buildingProperties } from '../../../store';
import { useStore } from '@nanostores/react';
import { SECTIONS_TO_DISPLAY, TITLE_MAPPINGS, type Categories, CATEGORY_MAPPINGS } from './buildingInfoUtils';
import CategorySelect from './CategorySelect';
import type { BuildingPropertiesProps } from '../../../content/config';

const BuildingInfo = () => {
  const [category, setCategory] = useState<Categories>('general');
  const $buildingProperties = useStore(buildingProperties);
  const selectedProperties = Object.entries($buildingProperties).filter((data) =>
    SECTIONS_TO_DISPLAY[category].includes(data[0] as keyof BuildingPropertiesProps),
  );
  buildingProperties.listen(() => setCategory('general'));

  return (
    <MenuContent title={$buildingProperties.name || 'Unknown Building Name'}>
      <CategorySelect value={category} onValueChange={(value: Categories) => setCategory(value)}></CategorySelect>
      {selectedProperties.length <= 1 && <p>No information under '{CATEGORY_MAPPINGS[category]}' yet.</p>}
      {selectedProperties.map((data) => {
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
