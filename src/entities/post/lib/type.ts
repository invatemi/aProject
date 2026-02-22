import { z } from 'zod';

export interface IPostCardProps {
    userId : string,
    id : number,
    title : string,
    body : string,
}

export const PostSchema = z.object({
  userId: z.number().int(),
  id: z.number().int(),
  title: z.string().min(1),
  body: z.string().min(1),
});

export const PostsArraySchema = z.array(PostSchema);
export type Post = z.infer<typeof PostSchema>;