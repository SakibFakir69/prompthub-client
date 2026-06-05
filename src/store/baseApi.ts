import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// axios watcher

export const baseApi =createApi({
    reducerPath:"baseApi",
    baseQuery:fetchBaseQuery({
        baseUrl:process.env.NEXT_PUBLIC_BACKEND_URL

    }),
    endpoints:()=>({}),
    
    tagTypes:['Users','Otp','Auth']

})