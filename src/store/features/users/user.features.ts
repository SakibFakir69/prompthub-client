import { baseApi } from "../../baseApi";

export interface User {
  id?: string
  name?: string
  email?: string
  // add more fields as needed
}

export interface RegisterUserPayload {
  name: string
  email: string
  password: string
}

export interface UpdateUserPayload {
  name?: string
  email?: string
  password?: string
}


export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    registerUser: builder.mutation<User, RegisterUserPayload>({
      query: (data) => ({
        url: "/user/users",
        method: "POST",
        data,                          
      }),
      invalidatesTags: ["Auth", "Users"],
    }),

    updateUser: builder.mutation<User, UpdateUserPayload>({
      query: (data) => ({
        url: "/user/users",
        method: "PUT",
        data,                          //
      }),
      invalidatesTags: ["Auth", "Users"],
    }),

    deleteUser: builder.mutation<{ success: boolean }, void>({
      query: () => ({
        url: "/user/users",
        method: "DELETE",
      }),
      invalidatesTags: ["Auth", "Users"],
    }),

  }),
  overrideExisting: false,          
});

// ─── Hooks ────────────────────────────────────────────────────────────────────

export const {
  useRegisterUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;