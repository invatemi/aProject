import { useGetUsersQuery } from '@/entities/user/api';

export const useUsers = () => {
  const { data: users = [], isLoading, error } = useGetUsersQuery();

  return {
    users,
    isLoading,
    error: error ? (error as any).message || null : null,
    isEmpty: users.length === 0 && !isLoading && !error,
  };
};