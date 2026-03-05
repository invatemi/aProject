import { z } from 'zod';

export interface IComppentsProps {
   postId : number;
   id : number;
   name : string;
   email : string;
   body : string
}

export const CommentSchema = z.object({
  postId: z.number().int(),
  id: z.number().int(),
  name: z.string().min(1),
  email: z.string().email(),
  body: z.string().min(1),
});

export const CommentsArraySchema = z.array(CommentSchema);
export type Comment = z.infer<typeof CommentSchema>;