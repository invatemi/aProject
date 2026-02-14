import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUserAPI } from '@/app/store/services';
import { User } from '@/app/store/types';

export const useUserProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userId = Number(id);
  const isValidId = !isNaN(userId) && userId > 0;

  useEffect(() => {
    const loadUser = async () => {
      if (!isValidId) {
        setError('Некорректный идентификатор пользователя');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const userData = await fetchUserAPI(userId);
        setUser(userData);
      } catch (err) {
        setError(
          err instanceof Error 
            ? err.message 
            : `Ошибка загрузки профиля пользователя ${userId}`
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, [userId, isValidId]);

  return {
    user,
    userId,
    isValidId,
    isLoading,
    error,
    isEmpty: !user && !isLoading && !error
  };
};