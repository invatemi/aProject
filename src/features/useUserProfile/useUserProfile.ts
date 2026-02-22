import { useParams } from 'react-router-dom';
import { useGetUserByIdQuery } from '@/entities/user/api';

export const useUserProfile = () => {
  const { id } = useParams<{ id: string }>();
  const userId = Number(id);
  const isValidId = !isNaN(userId) && userId > 0;

  const { data: user, isLoading, error } = useGetUserByIdQuery(userId, {
    skip: !isValidId,
  });

  return {
    user,
    userId,
    isValidId,
    isLoading,
    error: error ? (error as any).message || null : null,
    isEmpty: !user && !isLoading && !error,
  };
};