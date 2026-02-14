import { z } from 'zod';

export const PostSchema = z.object({
  userId: z.number().int(),
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

export const UserSchema = z.object({
  id: z.number().int(),
  name: z.string().min(1),
  username: z.string().min(1),
  email: z.string().email(),
  phone: z.string(),
  website: z.string()
    .optional()
    .transform(val => 
      val && !val.startsWith('http://') && !val.startsWith('https://')
        ? `https://${val}`
        : val
    )
    .pipe(z.string().url().optional()),
}).passthrough();

export const AlbumSchema = z.object({
  userId: z.number().int(),
  id: z.number().int(),
  title: z.string().min(1),
}).passthrough();

export const PhotoSchema = z.object({
  albumId: z.number().int(),
  id: z.number().int(),
  title: z.string().min(1),
  url: z.string().url(),
  thumbnailUrl: z.string().url(),
}).passthrough();

export const TodoSchema = z.object({
  userId: z.number().int(),
  id: z.number().int(),
  title: z.string().min(1),
  completed: z.boolean(),
}).passthrough();

export const PostsArraySchema = z.array(PostSchema);
export const CommentsArraySchema = z.array(CommentSchema);
export const UsersArraySchema = z.array(UserSchema);
export const AlbumsArraySchema = z.array(AlbumSchema);
export const PhotosArraySchema = z.array(PhotoSchema);
export const TodosArraySchema = z.array(TodoSchema);

export type Post = z.infer<typeof PostSchema>;
export type Comment = z.infer<typeof CommentSchema>;
export type User = z.infer<typeof UserSchema>;
export type Album = z.infer<typeof AlbumSchema>;
export type Photo = z.infer<typeof PhotoSchema>;
export type Todo = z.infer<typeof TodoSchema>;