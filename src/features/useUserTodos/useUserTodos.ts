import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { fetchUserTodos } from '@/app/store/reducers';

export const useUserTodos = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const userId = Number(id);
  const isValidId = !isNaN(userId) && userId > 0;

  const { items: todos, status, error } = useAppSelector((state) => state.todos);

  useEffect(() => {
    if (isValidId) {
      dispatch(fetchUserTodos(userId));
    }
  }, [userId, isValidId, dispatch]);

  return {
    todos,
    userId,
    isValidId,
    isLoading: status === 'loading',
    error,
    isEmpty: todos.length === 0 && status === 'succeeded'
  };
};