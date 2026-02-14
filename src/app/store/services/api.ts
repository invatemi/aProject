import { apiRequest } from './apiRequest';

import {
  PostsArraySchema,
  CommentsArraySchema,
  PostSchema,
  UsersArraySchema,
  UserSchema,
  AlbumsArraySchema,
  PhotosArraySchema,
  TodosArraySchema,
} from '../types';

import {
  POSTS_URL,
  COMMENTS_URL,
  USERS_URL,
  ALBUMS_URL,
  PHOTOS_URL,
  TODOS_URL
} from "./constant"

export const fetchPostsAPI = () => 
  apiRequest(
    () => fetch(POSTS_URL),
    (data) => PostsArraySchema.parse(data),
    'fetchPosts'
  );

export const fetchCommentsAPI = (postId: number) => 
  apiRequest(
    () => fetch(`${COMMENTS_URL}?postId=${postId}`),
    (data) => CommentsArraySchema.parse(data),
    `fetchComments(postId=${postId})`
  );

export const fetchUsersAPI = () => 
  apiRequest(
    () => fetch(USERS_URL),
    (data) => UsersArraySchema.parse(data),
    'fetchUsers'
  );

export const fetchUserAPI = (userId: number) => 
  apiRequest(
    () => fetch(`${USERS_URL}/${userId}`),
    (data) => UserSchema.parse(data),
    `fetchUser(id=${userId})`
  );

export const fetchUserPostsAPI = (userId: number) => 
  apiRequest(
    () => fetch(`${POSTS_URL}?userId=${userId}`),
    (data) => PostsArraySchema.parse(data),
    `fetchUserPosts(userId=${userId})`
  );

export const fetchUserAlbumsAPI = (userId: number) => 
  apiRequest(
    () => fetch(`${ALBUMS_URL}?userId=${userId}`),
    (data) => AlbumsArraySchema.parse(data),
    `fetchUserAlbums(userId=${userId})`
  );

export const fetchAlbumPhotosAPI = (albumId: number) => 
  apiRequest(
    () => fetch(`${PHOTOS_URL}?albumId=${albumId}`),
    (data) => PhotosArraySchema.parse(data),
    `fetchAlbumPhotos(albumId=${albumId})`
  );

export const fetchUserTodosAPI = (userId: number) => 
  apiRequest(
    () => fetch(`${TODOS_URL}?userId=${userId}`),
    (data) => TodosArraySchema.parse(data),
    `fetchUserTodos(userId=${userId})`
  );

export const fetchPostByIdAPI = (postId: number) => 
  apiRequest(
    () => fetch(`${POSTS_URL}/${postId}`),
    (data) => PostSchema.parse(data),
    `fetchPostById(id=${postId})`
  );

export const fetchAlbumsAPI = () => 
  apiRequest(
    () => fetch(ALBUMS_URL),
    (data) => AlbumsArraySchema.parse(data),
    'fetchAlbums'
  );