import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Todo, TodosArraySchema } from '../lib';
import { BASE_URL } from '@/shared';

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Todo'],
  endpoints: (builder) => ({
    getTodosByUserId: builder.query<Todo[], number>({
      query: (userId) => `/todos?userId=${userId}`,
      transformResponse: (response: unknown) => TodosArraySchema.parse(response),
      providesTags: (result, _, userId) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Todo' as const, id })), { type: 'Todo', id: `USER_${userId}` }]
          : [{ type: 'Todo', id: `USER_${userId}` }],
    }),
  }),
});

export const { useGetTodosByUserIdQuery } = todoApi;