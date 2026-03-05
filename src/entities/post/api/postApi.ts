import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Post, PostSchema, PostsArraySchema } from '../lib';
import { BASE_URL } from '@/shared';

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => '/posts',
      transformResponse: (response: unknown) => PostsArraySchema.parse(response),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Post' as const, id })),
              { type: 'Post' as const, id: 'LIST' }
            ]
          : [{ type: 'Post' as const, id: 'LIST' }],
    }),
    getPostById: builder.query<Post, number>({
      query: (id) => `/posts/${id}`,
      transformResponse: (response: unknown) => PostSchema.parse(response),
      providesTags: (result, _, id) => [{ type: 'Post' as const, id }],
    }),
    getPostsByUserId: builder.query<Post[], number>({
      query: (userId) => `/posts?userId=${userId}`,
      transformResponse: (response: unknown) => PostsArraySchema.parse(response),
      providesTags: (result, _, userId) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Post' as const, id })),
              { type: 'Post' as const, id: `USER_${userId}` }
            ]
          : [{ type: 'Post' as const, id: `USER_${userId}` }],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useGetPostsByUserIdQuery,
} = postApi;