import React, { useEffect, useRef } from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';

const ScrollContainer = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const menuBody = ref.current as HTMLDivElement;
    if (menuBody.scrollHeight > menuBody.clientHeight) {
      menuBody.classList.add('overlay-bottom');
    }

    const controlOverlay = () => {
      if (menuBody.scrollHeight <= menuBody.clientHeight) {
        menuBody.classList.remove('overlay-top');
        menuBody.classList.remove('overlay-bottom');
        return;
      }

      const isTop = menuBody.scrollTop == 0;
      const isBottom = Math.ceil(menuBody.scrollTop + menuBody.offsetHeight) >= menuBody.scrollHeight;

      if (isTop) {
        menuBody.classList.remove('overlay-top');
        menuBody.classList.add('overlay-bottom');
      } else if (isBottom) {
        menuBody.classList.remove('overlay-bottom');
        menuBody.classList.add('overlay-top');
      } else {
        menuBody.classList.add('overlay-top');
        menuBody.classList.add('overlay-bottom');
      }
    };
    const resizeObserver = new ResizeObserver(controlOverlay);

    resizeObserver.observe(menuBody);
    menuBody.addEventListener('scroll', controlOverlay);
    return () => {
      menuBody.removeEventListener('scroll', controlOverlay);
      resizeObserver.disconnect();
    };
  }, []);
  return (
    <ScrollArea.Root className="ScrollAreaRoot">
      <ScrollArea.Viewport ref={ref} className="ScrollAreaViewport">
        {children}
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="vertical">
        <ScrollArea.Thumb className="ScrollAreaThumb" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
};

export default ScrollContainer;
