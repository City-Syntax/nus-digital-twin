import React, { useState } from 'react';
import MenuContent from '../MenuContent';
import { buildingProperties } from '../../../store';
import { useStore } from '@nanostores/react';
import { sectionsToDisplay, titleMappings, type Categories, categoryMappings } from './buildingInfoUtils';
import CategorySelect from './CategorySelect';
import type { BuildingPropertiesProps } from '../../../content/config';

const BuildingInfo = () => {
  const [category, setCategory] = useState<Categories>('general');
  const $buildingProperties = useStore(buildingProperties);
  const selectedProperties = Object.entries($buildingProperties).filter((data) =>
    sectionsToDisplay[category].includes(data[0] as keyof BuildingPropertiesProps),
  );
  buildingProperties.listen(() => setCategory('general'));

  return (
    <MenuContent title={$buildingProperties.name || 'Unknown Building Name'}>
      <CategorySelect value={category} onValueChange={(value: Categories) => setCategory(value)}></CategorySelect>
      {selectedProperties.length <= 1 && <p>No information under '{categoryMappings[category]}' yet.</p>}
      {selectedProperties.map((data) => {
        const title = data[0] as keyof BuildingPropertiesProps;
        return (
          <div key={data[0]}>
            <h3>{titleMappings[title] || data[0]}</h3>
            <p>{data[1]}</p>
          </div>
        );
      })}
    </MenuContent>
  );
};

export default BuildingInfo;
