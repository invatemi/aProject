export interface ITodoCardProps {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface ITodoListProps {
  theme: 'light' | 'dark';
  todos: ITodoCardProps[];
  onToggle?: (todoId: number) => void;
}