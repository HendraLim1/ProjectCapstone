import { PRODUCTS_URL } from '../features/constants';
import { apiSlice } from './apiSlice';

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ keyword }) => ({
        url: PRODUCTS_URL,
        params: { keyword },
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Products'],
    }),

    getProductById: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: (result, error, id) => [{ type: 'Product', id }],
    }),

    allProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/allproducts`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Products'],
    }),

    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    createProduct: builder.mutation({
      query: (productData) => ({
        url: `${PRODUCTS_URL}`,
        method: 'POST',
        body: productData,
      }),
      invalidatesTags: ['Products'],
    }),

    updateProduct: builder.mutation({
      query: ({ productId, data }) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: 'PUT',
        body: data,
        formData: true,
      }),
      invalidatesTags: (result, error, { productId }) => [
        'Products',
        { type: 'Product', id: productId },
      ],
    }),

    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),

    createReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}/reviews`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result, error, { productId }) => [{ type: 'Product', id: productId }],
    }),

    getTopProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/top`,
      }),
      keepUnusedDataFor: 5,
    }),

    getNewProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/new`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAllProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
  useGetTopProductsQuery,
  useGetNewProductsQuery,
  useUploadProductImageMutation,
} = productApiSlice;
