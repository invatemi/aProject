import { useParams } from 'react-router-dom';
import { useGetAlbumsByUserIdQuery } from '@/entities/album/api';

export const useUserAlbums = () => {
  const { id } = useParams<{ id: string }>();
  const userId = Number(id);
  const isValidId = !isNaN(userId) && userId > 0;

  const { data: albums = [], isLoading, error } = useGetAlbumsByUserIdQuery(userId, {
    skip: !isValidId,
  });

  return {
    albums,
    userId,
    isValidId,
    isLoading,
    error: error ? (error as any).message || null : null,
    isEmpty: albums.length === 0 && !isLoading && !error,
  };
};