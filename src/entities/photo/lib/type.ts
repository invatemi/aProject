import { z } from 'zod';

export interface IPhotoCardProps {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string; 
}

export const PhotoSchema = z.object({
  albumId: z.number().int(),
  id: z.number().int(),
  title: z.string().min(1),
  url: z.string().url(),
  thumbnailUrl: z.string().url(),
}).passthrough();

export const PhotosArraySchema = z.array(PhotoSchema);
export type Photo = z.infer<typeof PhotoSchema>;