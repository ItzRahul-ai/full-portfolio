import { axiosClient } from '@/api/axiosClient'
import { API_ENDPOINTS } from '@/api/endpoints'

function pickToken(payload) {
  return (
    payload?.token ||
    payload?.accessToken ||
    payload?.jwt ||
    payload?.data?.token ||
    payload?.data?.accessToken ||
    payload?.result?.token ||
    ''
  )
}

function pickUser(payload) {
  return payload?.user || payload?.data?.user || payload?.result?.user || null
}

export const authApi = {
  async login(credentials) {
    const payload = await axiosClient.post(API_ENDPOINTS.auth.login, credentials)
    return {
      payload,
      token: pickToken(payload),
      user: pickUser(payload),
      message: payload?.message || 'Logged in successfully.',
    }
  },

  async signup(signupInput) {
    const payload = await axiosClient.post(API_ENDPOINTS.auth.signup, signupInput)
    return {
      payload,
      token: pickToken(payload),
      user: pickUser(payload),
      message: payload?.message || 'Signup successful.',
    }
  },

  async verifyOtp(otpInput) {
    const payload = await axiosClient.post(API_ENDPOINTS.auth.otp, otpInput)
    return {
      payload,
      token: pickToken(payload),
      user: pickUser(payload),
      message: payload?.message || 'OTP verified.',
    }
  },
}
