import { STORAGE_KEYS } from '@/utils/storageKeys'

export function getAuthToken() {
  return localStorage.getItem(STORAGE_KEYS.authToken) || ''
}

export function setAuthToken(token) {
  localStorage.setItem(STORAGE_KEYS.authToken, token)
}

export function clearAuthToken() {
  localStorage.removeItem(STORAGE_KEYS.authToken)
  localStorage.removeItem(STORAGE_KEYS.authUser)
}

export function isAuthenticated() {
  return Boolean(getAuthToken())
}

export function setAuthUser(user) {
  localStorage.setItem(STORAGE_KEYS.authUser, JSON.stringify(user))
}
