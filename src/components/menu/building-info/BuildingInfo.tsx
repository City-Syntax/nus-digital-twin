import React, { useState } from 'react';
import MenuContent from '../MenuContent';
import { buildingProperties } from '../../../store';
import { useStore } from '@nanostores/react';
import { titleMappings } from './buildingInfoUtils';
import CategorySelect from './CategorySelect';

const BuildingInfo = () => {
  const [category, setCategory] = useState('general');
  const $buildingProperties = useStore(buildingProperties);
  buildingProperties.listen(() => setCategory('general'));

  return (
    <MenuContent title={$buildingProperties.name || 'Unknown Building Name'}>
      <div className="menubar-content-body">
        <CategorySelect value={category} onValueChange={(value: string) => setCategory(value)}></CategorySelect>
        {Object.keys($buildingProperties).length <= 1 && <p>No information about this building yet.</p>}
        {Object.entries($buildingProperties).map((data) => {
          if (data[0] === 'name') {
            return;
          }
          const title = data[0] as keyof typeof titleMappings;
          return (
            <div key={data[0]}>
              <h3>{titleMappings[title] || data[0]}</h3>
              <p>{data[1]}</p>
            </div>
          );
        })}
      </div>
    </MenuContent>
  );
};

export default BuildingInfo;
