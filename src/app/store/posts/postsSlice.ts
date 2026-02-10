import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types';
import { PostsState } from './types';
import { fetchPostsAPI } from '../services/api';

export const fetchPosts = createAsyncThunk<Post[]>(
    'posts/fetchAll',
    async (__, { rejectWithValue }) => {
        try {
            return await fetchPostsAPI();
        } catch (error : any) {
            return rejectWithValue(error.message || 'Ошибка загрузки постов');
        }
    }
)

const initialState: PostsState = {
  items: [],
  status: 'idle',
  error: null
};

const postsSlice = createSlice({
    name : 'posts',
    initialState,
    reducers : {
        clearPosts : (state) => {
            state.items = [];
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers : (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = "loading";
                state.error = null
            })
            .addCase(fetchPosts.fulfilled, (state, action : PayloadAction<Post[]>) => {
                state.status = "succeeded";
                state.items = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = "failed",
                state.error = action.payload as string || 'Неизвестная ошибка'
            })
    }
})

export const { clearPosts } = postsSlice.actions;
export default postsSlice.reducer;