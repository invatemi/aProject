import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Comment, CommentsArraySchema } from '../lib';
import { BASE_URL } from '@/shared';

export const commentApi = createApi({
  reducerPath: 'commentApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Comment'],
  endpoints: (builder) => ({
    getCommentsByPostId: builder.query<Comment[], number>({
      query: (postId) => `/comments?postId=${postId}`,
      transformResponse: (response: unknown) => CommentsArraySchema.parse(response),
      providesTags: (result, _, postId) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Comment' as const, id })), { type: 'Comment', id: `POST_${postId}` }]
          : [{ type: 'Comment', id: `POST_${postId}` }],
    }),
    getAllComments: builder.query<Comment[], void>({
      query: () => '/comments',
      transformResponse: (response: unknown) => CommentsArraySchema.parse(response),
    }),
  }),
});

export const { useGetCommentsByPostIdQuery, useGetAllCommentsQuery } = commentApi;