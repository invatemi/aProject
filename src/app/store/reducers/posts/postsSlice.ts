import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../../types';
import { PostsState } from './types';
import { fetchPostsAPI, fetchPostByIdAPI } from '../../services/api';

export const fetchPosts = createAsyncThunk<Post[]>(
  'posts/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchPostsAPI();
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Ошибка загрузки постов');
    }
  }
);

export const fetchPostById = createAsyncThunk<Post, number>(
  'posts/fetchById',
  async (postId, { rejectWithValue }) => {
    try {
      return await fetchPostByIdAPI(postId);
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : `Ошибка загрузки поста ${postId}`
      );
    }
  }
);

const initialState: PostsState = {
  items: [],
  status: 'idle',
  error: null,
  currentPost: null,
  currentPostStatus: 'idle',
  currentPostError: null
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: (state) => {
      state.items = [];
      state.status = 'idle';
      state.error = null;
    },

    clearCurrentPost: (state) => {
      state.currentPost = null;
      state.currentPostStatus = 'idle';
      state.currentPostError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.items = [];
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || 'Неизвестная ошибка сети';
      });

    builder
      .addCase(fetchPostById.pending, (state) => {
        state.currentPostStatus = 'loading';
        state.currentPostError = null;
        state.currentPost = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.currentPostStatus = 'succeeded';
        state.currentPost = action.payload;
        state.currentPostError = null;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.currentPostStatus = 'failed';
        state.currentPostError = (action.payload as string) || 'Неизвестная ошибка';
        state.currentPost = null;
      });
  }
});

export const { clearPosts, clearCurrentPost } = postsSlice.actions;
export default postsSlice.reducer;