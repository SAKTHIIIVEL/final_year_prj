import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/api/v1`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Products", "Services", "Jobs", "Applications", "Inquiries", "FAQs", "Dashboard"],
  endpoints: (builder) => ({
    // --- Auth ---
    superAdminLogin: builder.mutation({ query: (body) => ({ url: "/super-admin/login", method: "POST", body }) }),
    adminLogin: builder.mutation({ query: (body) => ({ url: "/admin/login", method: "POST", body }) }),
    createAdmin: builder.mutation({ query: (body) => ({ url: "/super-admin/create-admin", method: "POST", body }) }),
    getProfile: builder.query({ query: () => "/auth/me" }),

    // --- Products ---
    getProducts: builder.query({ query: () => "/products", providesTags: ["Products"] }),
    getProduct: builder.query({ query: (id) => `/products/${id}`, providesTags: ["Products"] }),
    createProduct: builder.mutation({ query: (body) => ({ url: "/products", method: "POST", body }), invalidatesTags: ["Products", "Dashboard"] }),
    updateProduct: builder.mutation({ query: ({ id, ...body }) => ({ url: `/products/${id}`, method: "PUT", body }), invalidatesTags: ["Products"] }),
    deleteProduct: builder.mutation({ query: (id) => ({ url: `/products/${id}`, method: "DELETE" }), invalidatesTags: ["Products", "Dashboard"] }),

    // --- Services ---
    getServices: builder.query({ query: () => "/services", providesTags: ["Services"] }),
    getServiceBySlug: builder.query({ query: (slug) => `/services/${slug}`, providesTags: ["Services"] }),
    getAdminServices: builder.query({ query: () => "/services/admin/all", providesTags: ["Services"] }),
    createService: builder.mutation({ query: (body) => ({ url: "/services", method: "POST", body }), invalidatesTags: ["Services", "Dashboard"] }),
    updateService: builder.mutation({ query: ({ id, ...body }) => ({ url: `/services/${id}`, method: "PUT", body }), invalidatesTags: ["Services"] }),
    deleteService: builder.mutation({ query: (id) => ({ url: `/services/${id}`, method: "DELETE" }), invalidatesTags: ["Services", "Dashboard"] }),

    // --- Jobs ---
    getJobs: builder.query({ query: () => "/jobs", providesTags: ["Jobs"] }),
    getJob: builder.query({ query: (id) => `/jobs/${id}`, providesTags: ["Jobs"] }),
    createJob: builder.mutation({ query: (body) => ({ url: "/jobs", method: "POST", body }), invalidatesTags: ["Jobs", "Dashboard"] }),
    updateJob: builder.mutation({ query: ({ id, ...body }) => ({ url: `/jobs/${id}`, method: "PUT", body }), invalidatesTags: ["Jobs"] }),
    deleteJob: builder.mutation({ query: (id) => ({ url: `/jobs/${id}`, method: "DELETE" }), invalidatesTags: ["Jobs", "Dashboard"] }),

    // --- Applications ---
    getApplications: builder.query({ query: (params) => ({ url: "/applications", params }), providesTags: ["Applications"] }),
    getApplication: builder.query({ query: (id) => `/applications/${id}`, providesTags: ["Applications"] }),
    updateApplicationStatus: builder.mutation({ query: ({ id, status }) => ({ url: `/applications/${id}`, method: "PATCH", body: { status } }), invalidatesTags: ["Applications", "Dashboard"] }),

    // --- Inquiries ---
    getInquiries: builder.query({ query: (params) => ({ url: "/inquiries", params }), providesTags: ["Inquiries"] }),
    updateInquiryStatus: builder.mutation({ query: ({ id, status }) => ({ url: `/inquiries/${id}`, method: "PATCH", body: { status } }), invalidatesTags: ["Inquiries", "Dashboard"] }),

    // --- FAQs ---
    getFAQs: builder.query({ query: () => "/faqs", providesTags: ["FAQs"] }),
    createFAQ: builder.mutation({ query: (body) => ({ url: "/faqs", method: "POST", body }), invalidatesTags: ["FAQs", "Dashboard"] }),
    updateFAQ: builder.mutation({ query: ({ id, ...body }) => ({ url: `/faqs/${id}`, method: "PUT", body }), invalidatesTags: ["FAQs"] }),
    deleteFAQ: builder.mutation({ query: (id) => ({ url: `/faqs/${id}`, method: "DELETE" }), invalidatesTags: ["FAQs", "Dashboard"] }),

    // --- Dashboard ---
    getDashboardStats: builder.query({ query: () => "/dashboard/stats", providesTags: ["Dashboard"] }),

    // --- Search ---
    searchAll: builder.query({ query: (q) => `/search?q=${q}` }),

    // --- Chatbot ---
    sendChatMessage: builder.mutation({ query: (body) => ({ url: "/chatbot/message", method: "POST", body }) }),

    // --- Upload ---
    uploadImage: builder.mutation({
      query: (formData) => ({ url: "/upload", method: "POST", body: formData }),
    }),
  }),
});

export const {
  useSuperAdminLoginMutation, useAdminLoginMutation, useCreateAdminMutation, useGetProfileQuery,
  useGetProductsQuery, useGetProductQuery, useCreateProductMutation, useUpdateProductMutation, useDeleteProductMutation,
  useGetServicesQuery, useGetServiceBySlugQuery, useGetAdminServicesQuery, useCreateServiceMutation, useUpdateServiceMutation, useDeleteServiceMutation,
  useGetJobsQuery, useGetJobQuery, useCreateJobMutation, useUpdateJobMutation, useDeleteJobMutation,
  useGetApplicationsQuery, useGetApplicationQuery, useUpdateApplicationStatusMutation,
  useGetInquiriesQuery, useUpdateInquiryStatusMutation,
  useGetFAQsQuery, useCreateFAQMutation, useUpdateFAQMutation, useDeleteFAQMutation,
  useGetDashboardStatsQuery,
  useSearchAllQuery,
  useSendChatMessageMutation,
  useUploadImageMutation,
} = api;
