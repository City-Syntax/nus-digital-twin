import { useEffect, useState } from 'react';
import Icons from '../Icons';
import type { ImageProps } from '../../types';
import DownloadButton from './DownloadButton';
import { cn, parseDateToLocaleString } from '@lib/utils';
import ExifReader from 'exifreader';
import Tippy from '@tippyjs/react';

const astroImages = import.meta.glob<{ default: ImageMetadata }>('/src/assets/**/*.{jpeg,jpg,png,gif}');

const LazyImage = ({
  img,
  ratio = '16/9',
  alt,
  caption,
  canDownload,
  showDateTime,
}: {
  img?: ImageProps;
  ratio?: string;
  alt?: string;
  caption?: string;
  canDownload?: boolean;
  showDateTime?: boolean;
}) => {
  const [hasLoaded, setHasLoaded] = useState(!img);
  const [src, setSrc] = useState('');
  const [dateTime, setDateTime] = useState('');

  useEffect(() => {
    const fetchAstroImages = async () => {
      if (!img) {
        return;
      }

      const data = (await astroImages[img.src]()).default.src;
      const response = await fetch(data);
      const buffer = await response.arrayBuffer();
      const exifData = ExifReader.load(buffer);
      setDateTime(exifData['DateTimeOriginal']?.description || '');
      setSrc(data);
    };
    fetchAstroImages();
  }, [img]);

  const srcArr = src.split('/');
  const filetype = '.' + srcArr[srcArr.length - 1].split('?')[0].split('.').pop();
  const tooltipContent = showDateTime && dateTime ? [caption, parseDateToLocaleString(dateTime)] : [caption];

  return (
    <>
      <div
        className="overflow-hidden rounded-2xl mb-1 [&_img]:size-full [&_img]:object-cover"
        style={{ aspectRatio: ratio }}
      >
        <div
          className={cn('relative h-full [&_img]:opacity-0 [&_.img-info]:opacity-0', {
            '[&_img]:opacity-100 [&_.img-info]:opacity-100': hasLoaded,
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
          {hasLoaded && (caption || (showDateTime && dateTime)) && (
            <Tippy
              offset={[0, 4]}
              content={<div className="text-xs">{tooltipContent.filter((str) => Boolean(str)).join(', ')}</div>}
              arrow={false}
              placement="bottom-end"
            >
              <div className="img-info absolute top-0 right-0 rounded-none rounded-bl-2xl rounded-tr-2xl btn btn-secondary btn-square btn-sm border-none">
                <Icons.About className="size-5" />
              </div>
            </Tippy>
          )}
        </div>
      </div>
      {canDownload && src && <DownloadButton type="image" files={[{ filetype: filetype, url: src }]} />}
    </>
  );
};

export default LazyImage;
