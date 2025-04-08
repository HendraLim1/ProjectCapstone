import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../features/constants';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include', // Include credentials in all requests
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Product', 'Order', 'User', 'Category'],
  endpoints: () => ({}),
});
