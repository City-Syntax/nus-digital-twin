import { createContext } from 'react';

export type ImagePreviews = Record<string, { src: string; originalSrc: string }>;

export const ImagePreviewsContext = createContext<ImagePreviews>({});
