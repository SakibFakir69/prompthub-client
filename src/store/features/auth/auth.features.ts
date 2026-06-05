import { baseApi } from "../../baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    loginUser: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
  
      invalidatesTags: ["Auth"],
    }),

    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),

    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),

    refreshToken: builder.mutation({
      query: () => ({
        url: "/auth/refresh",
        method: "POST",
        // Usually uses cookie, so no body needed
      }),
      invalidatesTags: ["Auth"],
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),

    // Email reset flow
    resetEmail: builder.mutation({
      query: (data) => ({
        url: "/auth/reset-email",
        method: "POST",
        body: data,
      }),
    }),

    // resetCode: builder.mutation({
    //   query: (data) => ({
    //     url: "/auth/reset-code",
    //     method: "POST",
    //     body: data,
    //   }),
    // }),

    // resendResetCode: builder.mutation({
    //   query: (data) => ({
    //     url: "/auth/reset-otp-code",
    //     method: "POST",
    //     body: data,
    //   }),
    // }),

  
    getMe: builder.query({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),

 
    googleLogin: builder.mutation({
      query: () => ({
        url: "/auth/google",
        method: "GET",
      }),
    }),
  }),
});

// Export hooks
export const {
  useLoginUserMutation,
  useChangePasswordMutation,
  useResetPasswordMutation,
  useRefreshTokenMutation,
  useLogoutUserMutation,
  useResetEmailMutation,
//   useResetCodeMutation,
//   useResendResetCodeMutation,
  useGetMeQuery,
  useLazyGetMeQuery,
  // Google (if needed)
  useGoogleLoginMutation,
} = authApi;