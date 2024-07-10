import React, { useEffect, useRef } from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';

const ScrollContainer = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scrollViewport = ref.current as HTMLDivElement;
    if (scrollViewport.scrollHeight > scrollViewport.clientHeight) {
      scrollViewport.classList.add('overlay-bottom');
    }
  }, [children]);

  useEffect(() => {
    const scrollViewport = ref.current as HTMLDivElement;
    const controlOverlay = () => {
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
    const resizeObserver = new ResizeObserver(controlOverlay);

    resizeObserver.observe(scrollViewport);
    scrollViewport.addEventListener('scroll', controlOverlay);
    return () => {
      scrollViewport.removeEventListener('scroll', controlOverlay);
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
