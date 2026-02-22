import { useParams } from 'react-router-dom';
import { useGetTodosByUserIdQuery } from '@/entities/todo/api';

export const useUserTodos = () => {
  const { id } = useParams<{ id: string }>();
  const userId = Number(id);
  const isValidId = !isNaN(userId) && userId > 0;

  const { data: todos = [], isLoading, error } = useGetTodosByUserIdQuery(userId, {
    skip: !isValidId,
  });

  return {
    todos,
    userId,
    isValidId,
    isLoading,
    error: error ? (error as any).message || null : null,
    isEmpty: todos.length === 0 && !isLoading && !error,
  };
};