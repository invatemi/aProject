import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUserPostsAPI } from '@/app/store/services';
import { Post } from '@/app/store/types';

export const useUserPosts = () => {
  const { id } = useParams<{ id: string }>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userId = Number(id);
  const isValidId = !isNaN(userId) && userId > 0;

  useEffect(() => {
    const loadPosts = async () => {
      if (!isValidId) {
        setError('Некорректный идентификатор пользователя');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const userPosts = await fetchUserPostsAPI(userId);
        setPosts(userPosts);
      } catch (err) {
        setError(
          err instanceof Error 
            ? err.message 
            : `Ошибка загрузки постов пользователя ${userId}`
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, [userId, isValidId]);

  return {
    posts,
    userId,
    isValidId,
    isLoading,
    error,
    isEmpty: posts.length === 0 && !isLoading && !error
  };
};