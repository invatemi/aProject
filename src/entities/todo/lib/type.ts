import { z } from 'zod';

export interface ITodoCardProps {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export const TodoSchema = z.object({
  userId: z.number().int(),
  id: z.number().int(),
  title: z.string().min(1),
  completed: z.boolean(),
}).passthrough();

export const TodosArraySchema = z.array(TodoSchema);
export type Todo = z.infer<typeof TodoSchema>;