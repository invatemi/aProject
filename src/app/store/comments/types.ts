import { Comment as AppComment } from '../types';

export interface CommentsState {
  byPostId: Record<number, AppComment[]>;
  status: Record<number, 'idle' | 'loading' | 'succeeded' | 'failed'>;
  error: Record<number, string | null>;
}