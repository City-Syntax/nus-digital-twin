import React from 'react';
import * as Select from '@radix-ui/react-select';
import Icons from '../../Icons';

interface CategorySelectProps {
  value: string;
  onValueChange: (val: string) => void;
}

const CategorySelect = ({ value, onValueChange }: CategorySelectProps) => {
  return (
    <Select.Root value={value} onValueChange={onValueChange}>
      <Select.Trigger className="select-trigger">
        <Select.Value />
        <Icons.ChevronDown></Icons.ChevronDown>
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
  );
};

export default CategorySelect;
