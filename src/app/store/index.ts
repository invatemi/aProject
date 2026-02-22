import { configureStore } from '@reduxjs/toolkit';
import { albumApi } from '@/entities/album/api';
import { commentApi } from '@/entities/comments/api';
import { photoApi } from '@/entities/photo/api';
import { postApi } from '@/entities/post/api';
import { todoApi } from '@/entities/todo/api';
import { userApi } from '@/entities/user/api';

import {postsReducer} from '@/entities/post/model';
import {usersReducer} from '@/entities/user/model';
import {todosReducer} from "@/entities/todo/model"

export const store = configureStore({
  reducer: {
    
    [albumApi.reducerPath]: albumApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [photoApi.reducerPath]: photoApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [todoApi.reducerPath]: todoApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    
    posts: postsReducer,
    users: usersReducer,
    todos: todosReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      albumApi.middleware,
      commentApi.middleware,
      photoApi.middleware,
      postApi.middleware,
      todoApi.middleware,
      userApi.middleware,
    ),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;