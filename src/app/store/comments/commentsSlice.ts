import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Comment as AppComment } from '../types';
import { CommentsState } from './types';
import { fetchCommentsAPI } from '../services/api';

export const fetchComments = createAsyncThunk<AppComment[], number>(
  'comments/fetchByPostId',
  async (postId, { rejectWithValue }) => {
    try {
      return await fetchCommentsAPI(postId);
    } catch (error: any) {
      return rejectWithValue(error.message || `Ошибка загрузки комментариев для поста ${postId}`);
    }
  }
);

const initialState: CommentsState = {
  byPostId: {},
  status: {},
  error: {}
};

const commentsSlice = createSlice({
    name : "comments",
    initialState,
    reducers : {
        clearComments: (state, action: PayloadAction<number>) => {
            const postId = action.payload;
            delete state.byPostId[postId];
            delete state.status[postId];
            delete state.error[postId];
        },
        clearAllComments: () => initialState
    },
    extraReducers : (builder) => {
        builder
            .addCase(fetchComments.pending, (state, action) => {
                const postId = action.meta.arg;
                state.status[postId] = 'loading';
                state.error[postId] = null;
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                const postId = action.meta.arg;
                state.status[postId] = 'succeeded';
                state.byPostId[postId] = action.payload;
            })
            .addCase(fetchComments.rejected, (state, action) => {
                const postId = action.meta.arg;
                state.status[postId] = 'failed';
                state.error[postId] = action.payload as string || 'Неизвестная ошибка';
            })
    }
})

export const { clearComments, clearAllComments } = commentsSlice.actions;
export default commentsSlice.reducer;