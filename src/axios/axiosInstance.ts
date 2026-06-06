// axios/axiosInstance.ts
import axios from 'axios'
import type { AxiosError, InternalAxiosRequestConfig } from 'axios'

interface RetryableRequest extends InternalAxiosRequestConfig {
  _retry?: boolean
}

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,   
})


axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableRequest

    // If 401 and not already retried → attempt token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        
        await axiosInstance.post('/auth/refresh')

    
        return axiosInstance(originalRequest)
      } catch (refreshError) {
      
        if (typeof window !== 'undefined') {
          window.location.href = '/login'
        }
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default axiosInstance