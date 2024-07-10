import React, { useEffect, useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaCarouselType } from 'embla-carousel';
import Icons from '../Icons';
import LazyImage from './LazyImage';
import type { ImageProps } from '../../types';

const Carousel = ({ imageSources: urls }: { imageSources: ImageProps }) => {
  if (!urls || urls.length === 0) {
    return <></>;
  }

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [imageSources, setImageSources] = useState<ImageProps>([]);
  const images = import.meta.glob<{ default: ImageMetadata }>('/src/assets/**/*.{jpeg,jpg,png,gif}');

  useEffect(() => {
    const res = urls.map((url) => {
      return {
        ...url,
        astroImage: images[url.src],
      };
    });

    const fetchImages = async () => {
      const sources = await Promise.all(
        res.map(async (r) => {
          const img = await r.astroImage();
          return { ...r, src: img.default.src };
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
            {imageSources.length === 0 && (
              <div className="carousel-item">
                <LazyImage></LazyImage>
              </div>
            )}
            {imageSources.map((img) => (
              <div className="carousel-item" key={img.src}>
                <LazyImage src={img.src} caption={img.author ? `Image by ${img.author}` : ''}></LazyImage>
              </div>
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
