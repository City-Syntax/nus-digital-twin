import React, { useEffect, useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Icons from '../Icons';

const Carousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback((emblaApi: any) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  const onInit = useCallback((emblaApi: any) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <>
      <div className="carousel">
        <div className="carousel-content" ref={emblaRef}>
          <div className="carousel-content-container">
            <div className="carousel-item">Slide 1</div>
            <div className="carousel-item">Slide 2</div>
            <div className="carousel-item">Slide 3</div>
            <div className="carousel-item">Slide 4</div>
          </div>
        </div>
        <div className="carousel-actions">
          <button onClick={() => emblaApi?.scrollPrev()} disabled={prevBtnDisabled}>
            <Icons.ChevronLeft></Icons.ChevronLeft>
          </button>
          <button onClick={() => emblaApi?.scrollNext()} disabled={nextBtnDisabled}>
            <Icons.ChevronRight></Icons.ChevronRight>
          </button>
        </div>
      </div>
      <div className="carousel-dots">
        {scrollSnaps.map((_, index) => (
          <button></button>
        ))}
      </div>
    </>
  );
};

export default Carousel;
