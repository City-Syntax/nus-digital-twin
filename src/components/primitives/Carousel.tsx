import React, { useEffect, useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaCarouselType } from 'embla-carousel';
import Icons from '../Icons';
import LazyImage from './LazyImage';
import type { ImageProps } from '../../types';
import { cn } from '@lib/utils';

const Carousel = ({ images }: { images: ImageProps[] }) => {
  if (!images || images.length === 0) {
    return <></>;
  }

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  const onSelectDotBtn = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) {
        return;
      }

      emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    onInit(emblaApi);
    onSelect(emblaApi);
    onSelectDotBtn(emblaApi);
    emblaApi.on('reInit', onInit);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelectDotBtn);
    emblaApi.on('select', onSelectDotBtn);
  }, [emblaApi, onSelect, onSelectDotBtn]);

  return (
    <>
      <div className="carousel relative">
        <div className="rounded-xl overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {images.length === 0 && (
              <div className="flex-[0_0_100%] min-w-0 aspect-video min-h-[100px]">
                <LazyImage></LazyImage>
              </div>
            )}
            {images.map((img) => (
              <div className="flex-[0_0_100%] min-w-0 aspect-video min-h-[100px]" key={img.src}>
                <LazyImage img={img} caption={img.author ? `Photo by ${img.author}` : ''}></LazyImage>
              </div>
            ))}
          </div>
        </div>
        {images.length > 1 && (
          <div className="absolute flex justify-between w-full top-1/2 left-0 -translate-y-1/2 px-1">
            <button
              className="btn btn-sm btn-square transition-colors bg-background/70 rounded-4xl shrink-0 saturate-[120%] backdrop-blur-[1px] hover:bg-background/80 disabled:opacity-50 hover:disabled:bg-background/70"
              onClick={() => emblaApi?.scrollPrev()}
              disabled={prevBtnDisabled}
            >
              <Icons.ChevronLeft></Icons.ChevronLeft>
            </button>
            <button
              className="btn btn-sm btn-square transition-colors bg-background/70 rounded-4xl shrink-0 saturate-[120%] backdrop-blur-[2px] hover:bg-background/80 disabled:opacity-50 hover:disabled:bg-background/70"
              onClick={() => emblaApi?.scrollNext()}
              disabled={nextBtnDisabled}
            >
              <Icons.ChevronRight></Icons.ChevronRight>
            </button>
          </div>
        )}
      </div>
      <div
        className="flex justify-center gap-1 mt-2"
        style={{ visibility: `${images.length === 0 ? 'hidden' : 'visible'}` }}
      >
        {images.length === 0 && <button></button>}
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            className={cn('size-2 rounded-4xl transition-colors bg-muted-foreground/30 hover:bg-muted-foreground/40', {
              'bg-primary hover:bg-primary': selectedIndex === index,
            })}
            onClick={() => onDotButtonClick(index)}
          ></button>
        ))}
      </div>
    </>
  );
};

export default Carousel;
