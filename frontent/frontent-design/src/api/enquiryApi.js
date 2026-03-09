import { axiosClient } from '@/api/axiosClient'
import { API_ENDPOINTS, buildEndpoint } from '@/api/endpoints'

function extractList(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.enquiries)) return payload.enquiries
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.result)) return payload.result
  return []
}

function extractItem(payload) {
  if (!payload || Array.isArray(payload)) return null
  return payload.enquiry || payload.item || payload.data || payload.result || payload
}

export function normalizeEnquiry(enquiry, fallbackRef = '') {
  const generatedRef = `ENQ-${Date.now()}`
  const reference = String(enquiry?.reference || enquiry?.id || enquiry?._id || fallbackRef || generatedRef)
  return {
    id: reference,
    reference,
    type: enquiry?.type || 'general',
    name: enquiry?.name || '',
    email: enquiry?.email || '',
    phone: enquiry?.phone || '',
    company: enquiry?.company || '',
    service: enquiry?.service || '',
    budget: enquiry?.budget || '',
    message: enquiry?.message || '',
    status: enquiry?.status || 'new',
    createdAt: enquiry?.createdAt || enquiry?.created_at || '',
  }
}

export const enquiryApi = {
  async fetchEnquiries() {
    const payload = await axiosClient.get(API_ENDPOINTS.enquiries.list)
    return extractList(payload).map((enquiry, index) => normalizeEnquiry(enquiry, `ENQ-${1000 + index}`))
  },

  async createEnquiry(enquiryInput) {
    const payload = await axiosClient.post(API_ENDPOINTS.enquiries.create, enquiryInput)
    const item = extractItem(payload)
    return normalizeEnquiry(item || enquiryInput)
  },

  async updateEnquiryStatus(enquiryId, status, replace = false) {
    const endpointTemplate = replace ? API_ENDPOINTS.enquiries.replace : API_ENDPOINTS.enquiries.patch
    const endpoint = buildEndpoint(endpointTemplate, { id: enquiryId })
    const payload = replace
      ? await axiosClient.put(endpoint, { status })
      : await axiosClient.patch(endpoint, { status })
    const item = extractItem(payload)
    return normalizeEnquiry(item || { id: enquiryId, reference: enquiryId, status }, enquiryId)
  },

  async getEnquiryByReference(reference) {
    const endpoint = buildEndpoint(API_ENDPOINTS.enquiries.track, { reference })
    const payload = await axiosClient.get(endpoint)
    const item = extractItem(payload)
    return item ? normalizeEnquiry(item, reference) : null
  },
}
