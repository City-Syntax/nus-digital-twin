import { useState } from 'react';
import Icons from '../Icons';

const LazyImage = ({
  src,
  alt,
  caption,
  canDownload,
}: {
  src?: string;
  alt?: string;
  caption?: string;
  canDownload?: boolean;
}) => {
  const PLACEHOLDER_SRC = `data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D`;
  const [hasLoaded, setHasLoaded] = useState(!src);

  return (
    <div className={`img-container ${hasLoaded ? 'img-container--loaded' : ''}`}>
      {!hasLoaded && (
        <div className="img-container__spinner">
          <Icons.Spinner />
        </div>
      )}
      <img onLoad={() => setHasLoaded(true)} src={src ? src : PLACEHOLDER_SRC} alt={alt || ''} />
      {hasLoaded && caption && <div className="img-container__caption">{caption}</div>}
      {hasLoaded && canDownload && (
        <button className="img-container__btn">
          <Icons.Download />
        </button>
      )}
    </div>
  );
};

export default LazyImage;
