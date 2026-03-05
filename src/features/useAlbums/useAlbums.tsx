import { useGetAlbumsQuery } from '@/entities/album/api';

export const useAlbums = () => {
  const { data: albums = [], isLoading, error } = useGetAlbumsQuery();

  return {
    albums,
    isLoading,
    error: error ? (error as any).message || null : null,
    isEmpty: albums.length === 0 && !isLoading && !error,
  };
};