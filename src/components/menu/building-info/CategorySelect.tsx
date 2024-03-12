import React from 'react';
import * as Select from '@radix-ui/react-select';
import Icons from '../../Icons';
import { infoCategories } from './buildingInfoUtils';

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
            {infoCategories.map((c) => {
              return (
                <Select.Item className="select-item" value={c.id} key={c.id}>
                  <Select.ItemText>{c.label}</Select.ItemText>
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
