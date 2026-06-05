import { baseApi } from "../../baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
  

    registerUser: builder.mutation({
      query: (data) => ({
        url: "/user/users",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth", "Users"],
    }),


    updateUser: builder.mutation({
      query: (data) => ({
        url: "/user/users",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Auth", "Users"],
    }),

  
    deleteUser: builder.mutation({
      query: () => ({
        url: "/user/users",
        method: "DELETE",
      }),
      invalidatesTags: ["Auth", "Users"],
    }),

  

  
  }),
});

// Export Hooks
export const {
  useRegisterUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;