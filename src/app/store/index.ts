import { configureStore } from '@reduxjs/toolkit';

import {
  postsReducer, 
  commentsReducer, 
  usersReducer, 
  albumsReducer, 
  photosReducer, 
  todosReducer } from './reducers';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
    users: usersReducer,
    albums: albumsReducer,
    photos: photosReducer,
    todos: todosReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;