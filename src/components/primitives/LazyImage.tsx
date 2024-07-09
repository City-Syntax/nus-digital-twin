import React, { useState } from 'react';
import Icons from '../Icons';

const LazyImage = ({ src, alt, author = 'Someone' }: { src?: string; alt?: string; author?: string }) => {
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
      {author && <div className="img-container__author">Image by {author}</div>}
    </div>
  );
};

export default LazyImage;
