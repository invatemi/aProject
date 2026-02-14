import type { RootState } from '@/app/store';

export const selectIsAnyLoading = (state: RootState): boolean => {
  if (
    state.posts.status === 'loading' ||
    state.posts.currentPostStatus === 'loading' ||
    state.users.status === 'loading' ||
    state.albums.status === 'loading' ||
    state.photos.status === 'loading' ||
    state.todos.status === 'loading'
  ) {
    return true;
  }

  const commentsStatus = state.comments.status || {};
  return Object.values(commentsStatus).some(status => status === 'loading');
};