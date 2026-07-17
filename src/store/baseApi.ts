import { createApi } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import type { AxiosRequestConfig, AxiosError } from 'axios'
import axiosInstance from '../axios/axiosInstance'


interface AxiosBaseQueryArgs {
  url: string
  method?: AxiosRequestConfig['method']
  data?: unknown
  params?: Record<string, unknown>
  headers?: Record<string, string>
}

interface AxiosBaseQueryError {
  status: number | undefined
  data: unknown
}


const axiosBaseQuery = (
  { baseUrl }: { baseUrl?: string } = { baseUrl: '' }
): BaseQueryFn<AxiosBaseQueryArgs, unknown, AxiosBaseQueryError> =>
  async ({ url, method = 'GET', data, params, headers }) => {
    try {
      const result = await axiosInstance({
        url,
        method,
        data,
        params,
        headers,
      })
      return { data: result.data }
    } catch (error) {
      const axiosError = error as AxiosError
      return {
        error: {
          status: axiosError.response?.status,
          data: axiosError.response?.data ?? axiosError.message,
        },
      }
    }
  }


export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Users', 'Otp', 'Auth', 'Prompt', 'SavedPrompt','People','Notification'],
  endpoints: () => ({}),
})