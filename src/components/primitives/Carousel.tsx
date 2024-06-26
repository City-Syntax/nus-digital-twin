import React, { useEffect, useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaCarouselType } from 'embla-carousel';
import Icons from '../Icons';

const Carousel = ({ imageSources: urls }: { imageSources: string[] }) => {
  if (!urls || urls.length === 0) {
    return <></>;
  }

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [imageSources, setImageSources] = useState<string[]>([]);
  const images = import.meta.glob<{ default: ImageMetadata }>('/src/assets/**/*.{jpeg,jpg,png,gif}');

  useEffect(() => {
    const fetchImages = async () => {
      const sources = await Promise.all(
        Object.entries(images)
          .filter(([key]) => urls.includes(key))
          .map(async ([_, image]) => {
            const res = await image();
            return res.default.src;
          }),
      );
      setImageSources(sources);
    };
    fetchImages();
  }, []);

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
      <div className="carousel">
        <div className="carousel-content" ref={emblaRef}>
          <div className="carousel-content-container">
            {imageSources.length === 0 && <CarouselImage></CarouselImage>}
            {imageSources.map((src) => (
              <CarouselImage key={src} src={src}></CarouselImage>
            ))}
          </div>
        </div>
        {imageSources.length > 1 && (
          <div className="carousel-actions">
            <button onClick={() => emblaApi?.scrollPrev()} disabled={prevBtnDisabled}>
              <Icons.ChevronLeft></Icons.ChevronLeft>
            </button>
            <button onClick={() => emblaApi?.scrollNext()} disabled={nextBtnDisabled}>
              <Icons.ChevronRight></Icons.ChevronRight>
            </button>
          </div>
        )}
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

const CarouselImage = ({ src }: { src?: string }) => {
  const PLACEHOLDER_SRC = `data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D`;
  const [hasLoaded, setHasLoaded] = useState(!src);

  return (
    <div className="carousel-item">
      {!hasLoaded && (
        <div className="carousel-spinner">
          <Icons.Spinner />
        </div>
      )}
      <img onLoad={() => setHasLoaded(true)} src={src ? src : PLACEHOLDER_SRC} alt="" />
    </div>
  );
};
