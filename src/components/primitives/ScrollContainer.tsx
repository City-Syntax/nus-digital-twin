import React, { useEffect, useRef } from 'react';
import { ScrollArea } from 'radix-ui';

const ScrollContainer = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const controlOverlay = (scrollViewport: HTMLDivElement) => {
    if (scrollViewport.scrollHeight <= scrollViewport.clientHeight) {
      scrollViewport.classList.remove('overlay-top');
      scrollViewport.classList.remove('overlay-bottom');
      return;
    }

    const isTop = scrollViewport.scrollTop == 0;
    const isBottom = Math.ceil(scrollViewport.scrollTop + scrollViewport.offsetHeight) >= scrollViewport.scrollHeight;

    if (isTop) {
      scrollViewport.classList.remove('overlay-top');
      scrollViewport.classList.add('overlay-bottom');
    } else if (isBottom) {
      scrollViewport.classList.remove('overlay-bottom');
      scrollViewport.classList.add('overlay-top');
    } else {
      scrollViewport.classList.add('overlay-top');
      scrollViewport.classList.add('overlay-bottom');
    }
  };

  useEffect(() => {
    const scrollViewport = ref.current as HTMLDivElement;
    controlOverlay(scrollViewport);
  }, [children]);

  useEffect(() => {
    const scrollViewport = ref.current as HTMLDivElement;
    const resizeObserver = new ResizeObserver(() => controlOverlay(scrollViewport));

    resizeObserver.observe(scrollViewport);
    scrollViewport.addEventListener('scroll', () => controlOverlay(scrollViewport));
    return () => {
      scrollViewport.removeEventListener('scroll', () => controlOverlay(scrollViewport));
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <ScrollArea.Root className="scroll-area-root">
      <ScrollArea.Viewport ref={ref} className="scroll-area-viewport">
        {children}
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar className="scroll-area-scrollbar" orientation="vertical">
        <ScrollArea.Thumb className="scroll-area-thumb" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
};

export default ScrollContainer;
