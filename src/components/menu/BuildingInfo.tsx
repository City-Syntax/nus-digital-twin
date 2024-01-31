import React from 'react';
import MenuContent from './MenuContent';
import { buildingProperties } from '../../store';
import { useStore } from '@nanostores/react';

const BuildingInfo = () => {
  const $buildingProperties = useStore(buildingProperties);
  return (
    <MenuContent title={$buildingProperties.name}>
      <p>No information about this building yet.</p>
    </MenuContent>
  );
};

export default BuildingInfo;
