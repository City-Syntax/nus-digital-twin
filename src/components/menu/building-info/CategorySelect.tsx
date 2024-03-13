import React from 'react';
import * as Select from '@radix-ui/react-select';
import Icons from '../../Icons';
import { categoryMappings, type Categories } from './buildingInfoUtils';

interface CategorySelectProps {
  value: string;
  onValueChange: (val: Categories) => void;
}

const CategorySelect = ({ value, onValueChange }: CategorySelectProps) => {
  return (
    <Select.Root value={value} onValueChange={onValueChange}>
      <Select.Trigger className="select-trigger">
        <Select.Value />
        <Icons.ChevronDown></Icons.ChevronDown>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="select-content" position="popper">
          <Select.Viewport>
            {Object.entries(categoryMappings).map((val) => {
              const [id, label] = val;
              return (
                <Select.Item className="select-item" value={id} key={id}>
                  <Select.ItemText>{label}</Select.ItemText>
                </Select.Item>
              );
            })}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default CategorySelect;
