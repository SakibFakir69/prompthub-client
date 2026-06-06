import { baseApi } from "../../baseApi";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SendOtpPayload {
  email: string
}

export interface SendOtpResponse {
  message: string
}

export interface VerifyOtpPayload {
  email: string
  otp: string
}

export interface VerifyOtpResponse {
  message: string
  verified: boolean
}


export const otpApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    sendOtp: builder.mutation<SendOtpResponse, SendOtpPayload>({
      query: (data) => ({
        url: '/otp/send-otp',
        method: 'POST',
        data,                  
      }),
    }),

    verifyOtp: builder.mutation<VerifyOtpResponse, VerifyOtpPayload>({
      query: (data) => ({
        url: '/otp/verify-otp',
        method: 'POST',
        data,                  
      }),
    }),

  }),
  overrideExisting: false,
});

// ─── Hooks ────────────────────────────────────────────────────────────────────

export const { useSendOtpMutation, useVerifyOtpMutation } = otpApi;