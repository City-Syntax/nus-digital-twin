import React, { useEffect, useRef, useState } from 'react';
import * as Select from '@radix-ui/react-select';
import Icons from '../../Icons';
import { CATEGORY_MAPPINGS, type Categories } from './buildingInfoUtils';

interface CategorySelectProps {
  value: string;
  onValueChange: (val: Categories) => void;
}

const CategorySelect = ({ value, onValueChange }: CategorySelectProps) => {
  const [width, setWidth] = useState<any>('0');
  const contentRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const element = childRef.current as HTMLButtonElement;

    const resizeObserver = new ResizeObserver(() => {
      setWidth(element.clientWidth);
    });

    resizeObserver.observe(element);

    return () => resizeObserver.disconnect();
  }, []);
  return (
    <Select.Root value={value} onValueChange={onValueChange}>
      <div
        className="select-trigger-wrapper"
        ref={contentRef}
        style={{ width: `${width}px`, transition: 'width 0.25s', overflow: 'clip' }}
      >
        <Select.Trigger className="select-trigger" ref={childRef} style={{ width: `max-content` }}>
          <Select.Value />
          <Icons.ChevronDown></Icons.ChevronDown>
        </Select.Trigger>
      </div>
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
