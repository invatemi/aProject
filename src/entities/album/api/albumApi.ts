import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Album, AlbumsArraySchema } from '../lib';
import { BASE_URL } from '@/shared';

export const albumApi = createApi({
  reducerPath: 'albumApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Album'],
  endpoints: (builder) => ({
    getAlbums: builder.query<Album[], void>({
      query: () => '/albums',
      transformResponse: (response: unknown) => AlbumsArraySchema.parse(response),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Album' as const, id })),
              { type: 'Album' as const, id: 'LIST' }
            ]
          : [{ type: 'Album' as const, id: 'LIST' }],
    }),
    getAlbumsByUserId: builder.query<Album[], number>({
      query: (userId) => `/albums?userId=${userId}`,
      transformResponse: (response: unknown) => AlbumsArraySchema.parse(response),
      providesTags: (result, _, userId) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Album' as const, id })),
              { type: 'Album' as const, id: `USER_${userId}` }
            ]
          : [{ type: 'Album' as const, id: `USER_${userId}` }],
    }),
  }),
});

export const { useGetAlbumsQuery, useGetAlbumsByUserIdQuery } = albumApi;