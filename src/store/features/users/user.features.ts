import { baseApi } from "../../baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
  

    registerUser: builder.mutation({
      query: (data) => ({
        url: "/api/v1/users",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth", "Users"],
    }),


    updateUser: builder.mutation({
      query: (data) => ({
        url: "/api/v1/users",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Auth", "Users"],
    }),

  
    deleteUser: builder.mutation({
      query: () => ({
        url: "/users",
        method: "DELETE",
      }),
      invalidatesTags: ["Auth", "Users"],
    }),

  

    getMe: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["Users", "Auth"],
    }),
  }),
});

// Export Hooks
export const {
  useRegisterUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetMeQuery,
  useLazyGetMeQuery, /// why use lazy here
} = userApi;