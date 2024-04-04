import React, { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

const Carousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const onSelect = (emblaApi: any) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  };
  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="carousel">
      <div className="carousel-content" ref={emblaRef}>
        <div className="carousel-content-container">
          <div className="carousel-item">Slide 1</div>
          <div className="carousel-item">Slide 2</div>
          <div className="carousel-item">Slide 3</div>
        </div>
      </div>
      <div className="carousel-actions">
        <button onClick={() => emblaApi?.scrollPrev()} disabled={prevBtnDisabled}>
          Previous
        </button>
        <button onClick={() => emblaApi?.scrollNext()} disabled={nextBtnDisabled}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
