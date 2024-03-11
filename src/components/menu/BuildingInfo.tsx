import React from 'react';
import MenuContent from './MenuContent';
import { buildingProperties } from '../../store';
import { useStore } from '@nanostores/react';
import * as Select from '@radix-ui/react-select';

const BuildingInfo = () => {
  const $buildingProperties = useStore(buildingProperties);
  const titleMappings = {
    address: 'Address',
    postal: 'Postal Code',
    floorToFloorHeight: 'Floor to Floor Height',
    perimeterZoneDepth: 'Perimeter Zone Depth',
    fenestrationType: 'Fenestration Type',
    fenestrationShading: 'Fenestration Shading',
    northWindowToWallRatio: 'North Window to Wall Ratio',
    southWindowToWallRatio: 'South Window to Wall Ratio',
    eastWindowToWallRatio: 'East Window to Wall Ratio',
    westWindowToWallRatio: 'West Window to Wall Ratio',
  };

  return (
    <MenuContent title={$buildingProperties.name || 'Unknown Building Name'}>
      <div className="menubar-content-body">
        <Select.Root defaultValue="general">
          <Select.Trigger className="select-trigger">
            <Select.Value />
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="select-content">
              <Select.Viewport>
                <Select.Item className="select-item" value="general">
                  <Select.ItemText>General</Select.ItemText>
                </Select.Item>
                <Select.Item className="select-item" value="partitions">
                  <Select.ItemText>Structural, Enclosure and Internal Partitions</Select.ItemText>
                </Select.Item>
                <Select.Item className="select-item" value="fenestration">
                  <Select.ItemText>Fenestration</Select.ItemText>
                </Select.Item>
                <Select.Item className="select-item" value="hvac">
                  <Select.ItemText>Heating, Ventilation and Air-conditioning</Select.ItemText>
                </Select.Item>
                <Select.Item className="select-item" value="density-and-power">
                  <Select.ItemText>Density and Power</Select.ItemText>
                </Select.Item>
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
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
