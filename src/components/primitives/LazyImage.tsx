import { useContext, useEffect, useState } from 'react';
import Icons from '../Icons';
import type { ImageProps } from '../../types';
import DownloadButton from './DownloadButton';
import { cn, parseDateToLocaleString } from '@lib/utils';
import ExifReader from 'exifreader';
import Tooltip from './Tooltip';
import { ImagePreviewsContext } from './ImagePreviews';

type LazyImageProps = {
  img?: ImageProps;
  ratio?: string;
  alt?: string;
  caption?: string;
  canDownload?: boolean;
  showDateTime?: boolean;
};

const LazyImageContent = ({ img, ratio = '16/9', alt, caption, canDownload, showDateTime }: LazyImageProps) => {
  const previews = useContext(ImagePreviewsContext);
  const image = img ? previews[img.src] : undefined;
  const src = image?.src;
  const originalSrc = image?.originalSrc;
  const [hasLoaded, setHasLoaded] = useState(!img);
  const [hasError, setHasError] = useState(false);
  const [dateTime, setDateTime] = useState('');

  useEffect(() => {
    setDateTime('');
    if (!showDateTime || !originalSrc) return;

    const controller = new AbortController();
    const readDateTime = async () => {
      try {
        const response = await fetch(originalSrc, { signal: controller.signal });
        if (!response.ok) return;
        const buffer = await response.arrayBuffer();
        const exifData = ExifReader.load(buffer);
        if (!controller.signal.aborted) {
          setDateTime(exifData['DateTimeOriginal']?.description || '');
        }
      } catch {
        // Optional metadata must not prevent the preview from displaying.
      }
    };
    void readDateTime();
    return () => controller.abort();
  }, [originalSrc, showDateTime]);

  const srcArr = (originalSrc || '').split('/');
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
          {!hasLoaded && !hasError && src && (
            <div className="text-foreground w-full absolute flex justify-center top-1/2 -translate-y-1/2">
              <Icons.Spinner className="size-8 animate-spin" />
            </div>
          )}
          {src && !hasError && (
            <img
              className="transition-opacity"
              decoding="async"
              onLoad={() => setHasLoaded(true)}
              onError={() => setHasError(true)}
              src={src}
              alt={alt || ''}
            />
          )}
          {img && (!src || hasError) && (
            <div
              className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground"
              role="status"
            >
              Image unavailable
            </div>
          )}
          {hasLoaded && (caption || (showDateTime && dateTime)) && (
            <Tooltip
              offset={[0, 4]}
              content={<div className="text-xs">{tooltipContent.filter((str) => Boolean(str)).join(', ')}</div>}
              placement="bottom-end"
            >
              <div className="img-info absolute top-0 right-0 rounded-none rounded-bl-2xl rounded-tr-2xl btn btn-secondary btn-square btn-sm border-none">
                <Icons.About className="size-5" />
              </div>
            </Tooltip>
          )}
        </div>
      </div>
      {canDownload && originalSrc && <DownloadButton type="image" files={[{ filetype, url: originalSrc }]} />}
    </>
  );
};

// Reset loading and metadata state whenever the selected image changes.
const LazyImage = (props: LazyImageProps) => <LazyImageContent key={props.img?.src} {...props} />;

export default LazyImage;
