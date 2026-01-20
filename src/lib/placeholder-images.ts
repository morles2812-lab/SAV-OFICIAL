import placeholderData from './placeholder-images.json';
import type { StaticImageData } from 'next/image';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string | StaticImageData;
  imageHint: string;
};

export const PlaceHolderImages: ImagePlaceholder[] = placeholderData.placeholderImages;
