import { useEffect, useState } from 'react';
import Icons from '../Icons';
import type { ImageProps } from '../../types';
import DownloadButton from './DownloadButton';
import { cn } from '@lib/utils';

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
      <div
        className="overflow-hidden rounded-2xl mb-1 [&_img]:size-full [&_img]:object-cover"
        style={{ aspectRatio: ratio }}
      >
        <div
          className={cn('relative h-full [&_img]:opacity-0 [&_.img-caption]:opacity-0', {
            '[&_img]:opacity-100 [&_.img-caption]:opacity-100': hasLoaded,
          })}
        >
          {!hasLoaded && (
            <div className="text-foreground w-full absolute flex justify-center top-1/2 -translate-y-1/2">
              <Icons.Spinner className="size-8 animate-spin" />
            </div>
          )}
          <img
            className="transition-opacity"
            onLoad={() => src && setHasLoaded(true)}
            src={src ? src : 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D'}
            alt={alt || ''}
          />
          {hasLoaded && caption && (
            <div className="img-caption font-title text-xs font-semibold text-foreground absolute bottom-0 left-0 py-0.5 px-2 text-shadow-lg transition-opacity">
              {caption}
            </div>
          )}
        </div>
      </div>
      {canDownload && src && <DownloadButton type="image" files={[{ filetype: filetype, url: src }]} />}
    </>
  );
};

export default LazyImage;
