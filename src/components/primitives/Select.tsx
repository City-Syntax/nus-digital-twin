import React, { useEffect, useRef, useState } from 'react';
import { Select as RadixSelect } from 'radix-ui';
import Icons from '../Icons';

interface SelectProps<T extends string> {
  value: T;
  onValueChange: (val: T) => void;
  options: Array<{
    id: T;
    label: string | number;
  }>;
}

const Select = <T extends string>({ value, onValueChange, options }: SelectProps<T>) => {
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
    <RadixSelect.Root value={value} onValueChange={onValueChange}>
      <RadixSelect.Trigger className="select-trigger" style={{ width: `${width ? `${width}px` : 'auto'}` }}>
        <div className="select-trigger-content" ref={ref}>
          <RadixSelect.Value />
          <Icons.ChevronDown className="select-icon"></Icons.ChevronDown>
        </div>
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content className="select-content" position="popper">
          <RadixSelect.Viewport>
            {options.map(({ id, label }) => {
              return (
                <RadixSelect.Item className="select-item" value={id} key={id}>
                  <RadixSelect.ItemText>{label}</RadixSelect.ItemText>
                </RadixSelect.Item>
              );
            })}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
};

export default Select;
