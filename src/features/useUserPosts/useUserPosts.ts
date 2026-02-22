import { useParams } from 'react-router-dom';
import { useGetPostsByUserIdQuery } from '@/entities/post/api';

export const useUserPosts = () => {
  const { id } = useParams<{ id: string }>();
  const userId = Number(id);
  const isValidId = !isNaN(userId) && userId > 0;

  const { data: posts = [], isLoading, error } = useGetPostsByUserIdQuery(userId, {
    skip: !isValidId,
  });

  return {
    posts,
    userId,
    isValidId,
    isLoading,
    error: error ? (error as any).message || null : null,
    isEmpty: posts.length === 0 && !isLoading && !error,
  };
};