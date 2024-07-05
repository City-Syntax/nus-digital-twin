import React, { useState } from 'react';
import Icons from '../Icons';

const LazyImage = ({ src, alt }: { src?: string; alt?: string }) => {
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
    </div>
  );
};

export default LazyImage;
