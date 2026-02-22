import { z } from 'zod';

export interface IAlbumCardProps {
  userId: number;
  id: number;
  title: string;
}

export const AlbumSchema = z.object({
  userId: z.number().int(),
  id: z.number().int(),
  title: z.string().min(1),
}).passthrough();

export const AlbumsArraySchema = z.array(AlbumSchema);
export type Album = z.infer<typeof AlbumSchema>;