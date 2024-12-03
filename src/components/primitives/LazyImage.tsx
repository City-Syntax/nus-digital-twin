import { useEffect, useState } from 'react';
import Icons from '../Icons';
import type { ImageProps } from '../../types';
import DownloadButton from './DownloadButton';

const astroImages = import.meta.glob<{ default: ImageMetadata }>('/src/assets/**/*.{jpeg,jpg,png,gif}');

const LazyImage = ({
  img,
  ratio = '16/9',
  alt,
  caption,
  canDownload,
}: {
  img?: ImageProps;
  ratio?: string;
  alt?: string;
  caption?: string;
  canDownload?: boolean;
}) => {
  const [hasLoaded, setHasLoaded] = useState(!img);
  const [src, setSrc] = useState('');

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

  const srcArr = src.split('/');
  const filetype = '.' + srcArr[srcArr.length - 1].split('?')[0].split('.').pop();

  return (
    <>
      <div className="img-wrapper" style={{ marginBottom: '4px', aspectRatio: ratio }}>
        <div className={`img-container ${hasLoaded ? 'img-container--loaded' : ''}`}>
          {!hasLoaded && (
            <div className="img-container__spinner">
              <Icons.Spinner />
            </div>
          )}
          <img
            onLoad={() => src && setHasLoaded(true)}
            src={src ? src : 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D'}
            alt={alt || ''}
          />
          {hasLoaded && caption && <div className="img-container__caption">{caption}</div>}
        </div>
      </div>
      {canDownload && src && <DownloadButton type="image" files={[{ filetype: filetype, url: src }]} />}
    </>
  );
};

export default LazyImage;
