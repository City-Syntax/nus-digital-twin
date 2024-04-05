import React, { useEffect, useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Icons from '../Icons';
import nus from '../../assets/about-nus/nus.jpeg';

const Carousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback((emblaApi: any) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  const onSelectDotBtn = useCallback((emblaApi: any) => {
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

  const onInit = useCallback((emblaApi: any) => {
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
      <div className="carousel">
        <div className="carousel-content" ref={emblaRef}>
          <div className="carousel-content-container">
            <div className="carousel-item">
              <img src={nus.src} alt="" />
            </div>
            <div className="carousel-item">
              <img src={nus.src} alt="" />
            </div>
            <div className="carousel-item">
              <img src={nus.src} alt="" />
            </div>
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
          <button
            key={index}
            className={selectedIndex === index ? 'active' : ''}
            onClick={() => onDotButtonClick(index)}
          ></button>
        ))}
      </div>
    </>
  );
};

export default Carousel;
