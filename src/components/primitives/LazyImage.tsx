import { useEffect, useState } from 'react';
import Icons from '../Icons';
import type { ImageProps } from '../../types';

const astroImages = import.meta.glob<{ default: ImageMetadata }>('/src/assets/**/*.{jpeg,jpg,png,gif}');

const LazyImage = ({ img, alt, caption }: { img?: ImageProps; alt?: string; caption?: string }) => {
  const [hasLoaded, setHasLoaded] = useState(!img);
  const [src, setSrc] = useState('data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D');

  useEffect(() => {
    const fetchAstroImages = async () => {
      if (!img) {
        return;
      }

      const data = (await astroImages[img.src]()).default.src;
      setSrc(data);
    };
    fetchAstroImages();
  }, [img]);

  return (
    <div className={`img-container ${hasLoaded ? 'img-container--loaded' : ''}`}>
      {!hasLoaded && (
        <div className="img-container__spinner">
          <Icons.Spinner />
        </div>
      )}
      <img onLoad={() => setHasLoaded(true)} src={src} alt={alt || ''} />
      {hasLoaded && caption && <div className="img-container__caption">{caption}</div>}
    </div>
  );
};

export default LazyImage;
