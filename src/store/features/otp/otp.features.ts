import { baseApi } from "../../baseApi";




export const otpApi = baseApi.injectEndpoints({

    endpoints:(builder)=>({

        sendOtp:builder.mutation({
            query:(data)=>({
                url:'/otp/send-otp',
                method:"POST",
                body:data

            })
        }),
        
        verifyOtp:builder.mutation({
            query:(data)=>({
                url:'/otp/verify-otp',
                method:"POST",
                body:data

            })

        })

    })
})


export const {useSendOtpMutation,useVerifyOtpMutation} = otpApi;