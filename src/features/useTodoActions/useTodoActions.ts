import { useAppDispatch } from '@/app/store/hooks';
import { toggleTodoStatus } from '@/app/store/reducers';

export const useTodoActions = () => {
  const dispatch = useAppDispatch();
  
  const toggleTodo = (todoId: number) => {
    dispatch(toggleTodoStatus(todoId));
  };
  
  return { toggleTodo };
};