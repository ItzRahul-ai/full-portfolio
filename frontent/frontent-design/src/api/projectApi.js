import { axiosClient } from '@/api/axiosClient'
import { API_ENDPOINTS, buildEndpoint } from '@/api/endpoints'

function extractList(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.projects)) return payload.projects
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.result)) return payload.result
  return []
}

function extractItem(payload) {
  if (!payload || Array.isArray(payload)) return null
  return payload.project || payload.item || payload.data || payload.result || payload
}

export function normalizeProject(project, fallbackId = '') {
  const title = project?.title || project?.name || 'Untitled Project'
  const id = String(project?.id || project?._id || project?.slug || fallbackId || title.toLowerCase().replace(/\s+/g, '-'))
  const slug = String(project?.slug || id)
  return {
    id,
    slug,
    title,
    client: project?.client || project?.clientName || 'Unknown Client',
    category: project?.category || 'Web Project',
    year: String(project?.year || new Date().getFullYear()),
    status: project?.status || 'draft',
    summary: project?.summary || project?.description || '',
    challenge: project?.challenge || '',
    solution: project?.solution || '',
    impact: project?.impact || '',
    tags: Array.isArray(project?.tags) ? project.tags : [],
    gradientFrom: project?.gradientFrom || '#57b8ff',
    gradientTo: project?.gradientTo || '#9f7cff',
    liveUrl: project?.liveUrl || project?.url || '',
    visuals: Array.isArray(project?.visuals) ? project.visuals : [],
  }
}

export const projectApi = {
  async fetchProjects() {
    const payload = await axiosClient.get(API_ENDPOINTS.projects.list)
    return extractList(payload).map((project, index) => normalizeProject(project, `project-${index + 1}`))
  },

  async createProject(projectInput) {
    const payload = await axiosClient.post(API_ENDPOINTS.projects.create, projectInput)
    const item = extractItem(payload)
    return normalizeProject(item || projectInput)
  },

  async updateProject(projectId, projectInput) {
    const endpoint = buildEndpoint(API_ENDPOINTS.projects.update, { id: projectId })
    const payload = await axiosClient.put(endpoint, projectInput)
    const item = extractItem(payload)
    return normalizeProject(item || { ...projectInput, id: projectId }, projectId)
  },

  async patchProject(projectId, partialInput) {
    const endpoint = buildEndpoint(API_ENDPOINTS.projects.patch, { id: projectId })
    const payload = await axiosClient.patch(endpoint, partialInput)
    const item = extractItem(payload)
    return normalizeProject(item || { ...partialInput, id: projectId }, projectId)
  },

  async deleteProject(projectId) {
    const endpoint = buildEndpoint(API_ENDPOINTS.projects.remove, { id: projectId })
    return axiosClient.delete(endpoint)
  },
}
