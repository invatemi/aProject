import { z } from 'zod';

export const PostSchema = z.object({
  userId: z.union([z.number(), z.string()]).transform(val => String(val)),
  id: z.number().int(),
  title: z.string().min(1),
  body: z.string().min(1),
});

export const CommentSchema = z.object({
  postId: z.number().int(),
  id: z.number().int(),
  name: z.string().min(1),
  email: z.string().email(),
  body: z.string().min(1),
});

export const PostsArraySchema = z.array(PostSchema);
export const CommentsArraySchema = z.array(CommentSchema);

export type Post = z.infer<typeof PostSchema>;
export type Comment = z.infer<typeof CommentSchema>;