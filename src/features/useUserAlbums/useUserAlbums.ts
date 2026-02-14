import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUserAlbumsAPI } from '@/app/store/services';
import { Album } from '@/app/store/types';

export const useUserAlbums = () => {
  const { id } = useParams<{ id: string }>();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userId = Number(id);
  const isValidId = !isNaN(userId) && userId > 0;

  useEffect(() => {
    const loadAlbums = async () => {
      if (!isValidId) {
        setError('Некорректный идентификатор пользователя');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const userAlbums = await fetchUserAlbumsAPI(userId);
        setAlbums(userAlbums);
      } catch (err) {
        setError(
          err instanceof Error 
            ? err.message 
            : `Ошибка загрузки альбомов пользователя ${userId}`
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadAlbums();
  }, [userId, isValidId]);

  return {
    albums,
    userId,
    isValidId,
    isLoading,
    error,
    isEmpty: albums.length === 0 && !isLoading && !error
  };
};