import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_PRODUCTION_API_URL;

const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.userInfo?.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['Product', 'Order', 'User', 'Category'],
  endpoints: () => ({}),
});

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/api/users/login',
        method: 'POST',
        body: credentials,
        credentials: 'include',
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: '/api/users',
        method: 'POST',
        body: userData,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/api/users/logout',
        method: 'POST',
        credentials: 'include',
      }),
    }),
    getUserProfile: builder.query({
      query: () => ({
        url: '/api/users/profile',
        credentials: 'include',
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useGetUserProfileQuery } =
  authApiSlice;

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: '/api/users',
        credentials: 'include',
      }),
      providesTags: ['User'],
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `/api/users/${id}`,
        credentials: 'include',
      }),
      providesTags: (result, error, id) => [{ type: 'User', id }],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/api/users/${id}`,
        method: 'PUT',
        body: data,
        credentials: 'include',
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/api/users/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApiSlice;
