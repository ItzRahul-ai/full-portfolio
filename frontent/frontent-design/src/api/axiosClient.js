import axios from 'axios'
import { clearAuthToken, getAuthToken } from '@/utils/authToken'

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5110/api'

export const axiosClient = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken()
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error.response?.status
    const payload = error.response?.data
    const message =
      payload?.message ||
      payload?.error ||
      (error.code === 'ERR_NETWORK'
        ? 'Unable to connect to the backend. Check if the API server is running.'
        : 'Request failed.')

    if (status === 401) {
      clearAuthToken()
    }

    return Promise.reject({
      status,
      message,
      payload,
      isNetworkError: !error.response,
      originalError: error,
    })
  },
)
