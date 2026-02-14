import { Post } from "../../types";

export interface PostsState {
  items: Post[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  currentPost: Post | null;
  currentPostStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  currentPostError: string | null;
}