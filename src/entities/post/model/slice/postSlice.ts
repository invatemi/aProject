import { createSlice, createEntityAdapter, EntityState } from '@reduxjs/toolkit';
import { Post } from '../../lib';
import { postApi } from '../../api';
import { RootState } from '@/app/store';

const postsAdapter = createEntityAdapter<Post>({
  sortComparer: (a, b) => b.id - a.id,
});

const initialState = postsAdapter.getInitialState({
  status: 'idle' as 'idle' | 'loading' | 'succeeded' | 'failed',
  error: null as string | null,
});

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: (state) => {
      postsAdapter.removeAll(state);
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        postApi.endpoints.getPosts.matchFulfilled,
        (state, action) => {
          postsAdapter.setAll(state, action.payload);
          state.status = 'succeeded';
          state.error = null;
        }
      )
      .addMatcher(
        postApi.endpoints.getPosts.matchPending,
        (state) => {
          state.status = 'loading';
          state.error = null;
        }
      )
      .addMatcher(
        postApi.endpoints.getPosts.matchRejected,
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message ?? 'Failed to fetch posts';
        }
      )
      .addMatcher(
        postApi.endpoints.getPostsByUserId.matchFulfilled,
        (state, action) => {
          postsAdapter.upsertMany(state, action.payload);
        }
      )
      .addMatcher(
        postApi.endpoints.getPostById.matchFulfilled,
        (state, action) => {
          postsAdapter.upsertOne(state, action.payload);
        }
      );
  },
});

export const { clearPosts } = postSlice.actions;

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors((state: RootState) => state.posts as unknown as EntityState<Post, number>);

export default postSlice.reducer;