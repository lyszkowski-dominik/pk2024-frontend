import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { PropertiesResponse, Property } from './types';

const BASE_URL = `${import.meta.env.VITE_APP_API_URL}`;

export const propertiesDataApiSlice = createApi({
  reducerPath: 'propertiesDataApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Property'],
  endpoints: (builder) => ({
    getProperties: builder.query<
      PropertiesResponse,
      { page: number; pageSize: number }
    >({
      query: ({ page, pageSize }) =>
        `/hoas/properties/?page=${page}&page_size=${pageSize}`,
      providesTags: (result) =>
        result
          ? [
              ...result.results.map(({ id }) => ({
                type: 'Property' as const,
                id,
              })),
              { type: 'Property', id: 'LIST' },
            ]
          : [{ type: 'Property', id: 'LIST' }],
    }),
    addProperty: builder.mutation<Property, Partial<Property>>({
      query: (property) => ({
        url: '/hoas/properties/',
        method: 'POST',
        body: property,
      }),
      invalidatesTags: [{ type: 'Property', id: 'LIST' }],
    }),
  }),
});

export const { useGetPropertiesQuery, useAddPropertyMutation } =
  propertiesDataApiSlice;
