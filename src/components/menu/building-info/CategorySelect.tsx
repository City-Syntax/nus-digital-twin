import React, { useEffect, useRef, useState } from 'react';
import * as Select from '@radix-ui/react-select';
import Icons from '../../Icons';
import { CATEGORY_MAPPINGS } from './buildingInfoUtils';
import type { BuildingInfoCategories } from '../../../types';

interface CategorySelectProps {
  value: string;
  onValueChange: (val: BuildingInfoCategories) => void;
}

const CategorySelect = ({ value, onValueChange }: CategorySelectProps) => {
  const [width, setWidth] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current as HTMLDivElement;

    const resizeObserver = new ResizeObserver(() => {
      setWidth(element.clientWidth);
    });

    resizeObserver.observe(element);

    return () => resizeObserver.disconnect();
  }, []);
  return (
    <Select.Root value={value} onValueChange={onValueChange}>
      <Select.Trigger className="select-trigger" style={{ width: `${width ? `${width}px` : 'auto'}` }}>
        <div className="select-trigger-content" ref={ref}>
          <Select.Value />
          <Icons.ChevronDown></Icons.ChevronDown>
        </div>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="select-content" position="popper">
          <Select.Viewport>
            {Object.entries(CATEGORY_MAPPINGS).map((val) => {
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
