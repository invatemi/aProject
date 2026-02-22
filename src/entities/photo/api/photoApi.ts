import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Photo, PhotosArraySchema } from '../lib';
import { BASE_URL } from '@/shared';

export const photoApi = createApi({
  reducerPath: 'photoApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Photo'],
  endpoints: (builder) => ({
    getPhotosByAlbumId: builder.query<Photo[], number>({
      query: (albumId) => `/photos?albumId=${albumId}`,
      transformResponse: (response: unknown) => PhotosArraySchema.parse(response),
      providesTags: (result, _, albumId) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Photo' as const, id })), { type: 'Photo', id: `ALBUM_${albumId}` }]
          : [{ type: 'Photo', id: `ALBUM_${albumId}` }],
    }),
  }),
});

export const { useGetPhotosByAlbumIdQuery } = photoApi;