import { Routes, Route, Navigate } from "react-router-dom";

import {
  PostPage,
  PostDetailPage,
  UsersPage,
  UserProfileLayoutPage,
  UserPostsPage,
  UserAlbumsPage,
  UserTodosPage,
  AlbumPhotosPage,
  ErrorPage,
  AlbumPage
} from "@/page";

export const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/posts" replace />} />
    
    <Route path="/posts" element={<PostPage />} />
    <Route path="/posts/:id" element={<PostDetailPage />} />
    <Route path="/users" element={<UsersPage />} />
    
    <Route path="/users/:id" element={<UserProfileLayoutPage />}>
      <Route index element={<Navigate to="posts" replace />} />
      <Route path="posts" element={<UserPostsPage />} />
      <Route path="albums" element={<UserAlbumsPage />} />
      <Route path="todos" element={<UserTodosPage />} />
    </Route>

    <Route path="/albums" element={<AlbumPage />} />
    <Route path="/albums/:id/photos" element={<AlbumPhotosPage />} />
    
    <Route path="*" element={<ErrorPage />} />
  </Routes>
);