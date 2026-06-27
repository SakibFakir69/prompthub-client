import { baseApi } from "../../baseApi";


export interface User {
  id: string
  name: string
  email: string
  role: string
  createdAt: string
}

export interface AuthResponse {
  message: string
  accessToken?: string
  user?: User
  status:boolean
}

export interface LoginPayload {
  email: string
  password: string
}

export interface ChangePasswordPayload {
  password: string
  newPassword: string
}

export interface ResetPasswordPayload {
  email: string
  confirmPassword: string
  newPassword: string
}

export interface ResetEmailPayload {
  email: string
}


export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    loginUser: builder.mutation<AuthResponse, LoginPayload>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        data,                       
      }),
      invalidatesTags: ["Auth"],
    }),

    changePassword: builder.mutation<AuthResponse, ChangePasswordPayload>({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        data,                     
      }),
      invalidatesTags: ["Auth"],
    }),

    resetPassword: builder.mutation<AuthResponse, ResetPasswordPayload>({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        data,                        
      }),
    }),

    refreshToken: builder.mutation<AuthResponse, void>({
      query: () => ({
        url: "/auth/refresh",
        method: "POST",             
      }),
      invalidatesTags: ["Auth"],
    }),

    logoutUser: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),

    resetEmail: builder.mutation<{ message: string }, ResetEmailPayload>({
      query: (data) => ({
        url: "/auth/reset-email",
        method: "POST",
        data,                       
      }),
    }),

    // useResetCodeMutation,
    // useResendResetCodeMutation,

    getMe: builder.query<User, void>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),

    googleLogin: builder.mutation<AuthResponse, void>({
      query: () => ({
        url: "/auth/google",
        method: "GET",               
      }),
    }),

  }),
  overrideExisting: false,
});

export const {
  useLoginUserMutation,
  useChangePasswordMutation,
  useResetPasswordMutation,
  useRefreshTokenMutation,
  useLogoutUserMutation,
  useResetEmailMutation,
  // useResetCodeMutation,
  // useResendResetCodeMutation,
  useGetMeQuery,
  useLazyGetMeQuery,
  useGoogleLoginMutation,
} = authApi