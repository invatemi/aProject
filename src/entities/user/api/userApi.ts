import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User, UsersArraySchema, UserSchema } from '../lib';
import { BASE_URL } from '@/shared';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => '/users',
      transformResponse: (response: unknown) => UsersArraySchema.parse(response),
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'User' as const, id })), { type: 'User', id: 'LIST' }]
          : [{ type: 'User', id: 'LIST' }],
    }),
    getUserById: builder.query<User, number>({
      query: (id) => `/users/${id}`,
      transformResponse: (response: unknown) => UserSchema.parse(response),
      providesTags: (result, _, id) => [{ type: 'User', id }],
    }),
  }),
});

export const { useGetUsersQuery, useGetUserByIdQuery } = userApi;