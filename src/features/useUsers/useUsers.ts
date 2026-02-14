import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { fetchUsers } from '@/app/store/reducers';

export const useUsers = () => {
  const dispatch = useAppDispatch();
  const { items: users, status, error } = useAppSelector((state) => state.users);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [dispatch, status]);

  return {
    users,
    isLoading: status === 'loading',
    error,
    isEmpty: users.length === 0 && status === 'succeeded'
  };
};