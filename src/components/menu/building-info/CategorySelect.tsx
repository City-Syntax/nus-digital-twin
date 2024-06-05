import React, { useEffect, useRef, useState } from 'react';
import * as Select from '@radix-ui/react-select';
import Icons from '../../Icons';
import { CATEGORY_MAPPINGS, type Categories } from './buildingInfoUtils';

interface CategorySelectProps {
  value: string;
  onValueChange: (val: Categories) => void;
}

const CategorySelect = ({ value, onValueChange }: CategorySelectProps) => {
  const [width, setWidth] = useState<any>(null);
  const contentRef = useRef<HTMLButtonElement>(null);
  const childRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = childRef.current as HTMLDivElement;

    const resizeObserver = new ResizeObserver(() => {
      setWidth(element.clientWidth);
    });

    resizeObserver.observe(element);

    return () => resizeObserver.disconnect();
  }, []);
  return (
    <Select.Root value={value} onValueChange={onValueChange}>
      <Select.Trigger className="select-trigger" ref={contentRef} style={{ width: `${width ? `${width}px` : 'auto'}` }}>
        <div ref={childRef}>
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
