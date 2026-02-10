import type { RootState } from '@/app/store';

export const selectIsAnyLoading = (state: RootState): boolean => {
  if (state.posts.status === 'loading') return true;
  
  const commentsStatus = state.comments.status || {};
  return Object.values(commentsStatus).some(status => status === 'loading');
};