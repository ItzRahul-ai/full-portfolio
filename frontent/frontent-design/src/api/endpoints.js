const env = import.meta.env

export const API_ENDPOINTS = {
  auth: {
    login: env.VITE_AUTH_LOGIN_ENDPOINT || '/auth/login',
    signup: env.VITE_AUTH_SIGNUP_ENDPOINT || '/auth/signup',
    otp: env.VITE_AUTH_OTP_ENDPOINT || '/auth/otp',
  },
  projects: {
    list: env.VITE_PROJECTS_LIST_ENDPOINT || '/projects',
    create: env.VITE_PROJECTS_CREATE_ENDPOINT || '/projects',
    update: env.VITE_PROJECTS_UPDATE_ENDPOINT || '/projects/:id',
    patch: env.VITE_PROJECTS_PATCH_ENDPOINT || '/projects/:id',
    remove: env.VITE_PROJECTS_DELETE_ENDPOINT || '/projects/:id',
  },
  enquiries: {
    list: env.VITE_ENQUIRIES_LIST_ENDPOINT || '/enquiries',
    create: env.VITE_ENQUIRIES_CREATE_ENDPOINT || '/enquiries',
    patch: env.VITE_ENQUIRIES_PATCH_ENDPOINT || '/enquiries/:id',
    replace: env.VITE_ENQUIRIES_PUT_ENDPOINT || '/enquiries/:id',
    track: env.VITE_ENQUIRIES_TRACK_ENDPOINT || '/enquiries/reference/:reference',
  },
}

export function buildEndpoint(template, params = {}) {
  return Object.entries(params).reduce(
    (url, [key, value]) => url.replace(`:${key}`, encodeURIComponent(String(value))),
    template,
  )
}
