import { getImage } from 'astro:assets';
import type { ImagePreviews } from '../components/primitives/ImagePreviews';

const images = import.meta.glob<{ default: ImageMetadata }>('/src/assets/**/*.{jpeg,jpg,png,gif}');

// Run on the Astro side so static builds emit optimized files for the React islands.
export async function getImagePreviews(paths?: string[], width = 960): Promise<ImagePreviews> {
  const entries = Object.entries(images).filter(([path]) => !paths || paths.includes(path));

  return Object.fromEntries(
    await Promise.all(
      entries.map(async ([path, load]) => {
        const { default: original } = await load();
        const preview = await getImage({
          src: original,
          width: Math.min(width, original.width),
          format: 'jpg',
          quality: 80,
        });

        return [path, { src: preview.src, originalSrc: original.src }];
      }),
    ),
  );
}
