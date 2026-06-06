import { baseApi } from "../../baseApi";

// ─── Types ────────────────────────────────────────────────────────────────────



export interface SendOtpPayload {
  email: string,
  name:string

}

export interface SendOtpResponse {
  message: string,
  status:boolean,
}

export interface VerifyOtpPayload  extends SendOtpPayload{
  email: string
  otp: string,
}

export interface VerifyOtpResponse {
  message: string
  verified: boolean,
  status?:boolean
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