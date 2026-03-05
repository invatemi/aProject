import { useAppDispatch } from '@/app/store/hooks';
import { toggleTodoStatus } from '@/entities/todo/model';

export const useTodoActions = () => {
  const dispatch = useAppDispatch();

  const toggleTodo = (todoId: number) => {
    dispatch(toggleTodoStatus(todoId));
  };

  return { toggleTodo };
};