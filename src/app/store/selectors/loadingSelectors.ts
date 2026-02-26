import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export const selectIsAnyLoading = createSelector(
  (state: RootState) => state.posts.status,
  (state: RootState) => state.users.status,
  (postsStatus, usersStatus) => {
    return postsStatus === 'loading' || usersStatus === 'loading';
  }
);