import React, { useRef, useState, useEffect, type ReactNode } from 'react';
import AnimateHeight, { type Height } from 'react-animate-height';

const AutoHeight = ({ duration = 300, children, ...props }: { duration?: number; children: ReactNode }) => {
  const [height, setHeight] = useState<Height>('auto');
  const contentDiv = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = contentDiv.current as HTMLDivElement;

    const resizeObserver = new ResizeObserver(() => {
      setHeight(element.clientHeight);
    });

    resizeObserver.observe(element);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <AnimateHeight
      {...props}
      height={height}
      contentClassName="flex flex-col space-y-(--content-gap)"
      contentRef={contentDiv}
      disableDisplayNone
      duration={duration}
    >
      {children}
    </AnimateHeight>
  );
};

export default AutoHeight;
