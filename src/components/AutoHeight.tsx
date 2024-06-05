import React, { useRef, useState, useEffect, type ReactNode } from 'react';
import AnimateHeight, { type Height } from 'react-animate-height';

const AutoHeight = ({ children, ...props }: { children: ReactNode }) => {
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
      contentClassName="auto-height-container"
      contentRef={contentDiv}
      disableDisplayNone
      duration={300}
    >
      {children}
    </AnimateHeight>
  );
};

export default AutoHeight;
