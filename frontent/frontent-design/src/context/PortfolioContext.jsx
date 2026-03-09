import { useCallback, useEffect, useMemo, useState } from 'react'
import { enquiryApi } from '@/api/enquiryApi'
import { projectApi } from '@/api/projectApi'
import { PortfolioContext } from '@/context/portfolioContextInstance'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { initialEnquiries, initialProjects, initialSectionConfig } from '@/utils/mockData'
import { STORAGE_KEYS } from '@/utils/storageKeys'

export function PortfolioProvider({ children }) {
  const [projects, setProjects] = useState(initialProjects)
  const [enquiries, setEnquiries] = useState(initialEnquiries)
  const [isProjectsLoading, setIsProjectsLoading] = useState(true)
  const [isEnquiriesLoading, setIsEnquiriesLoading] = useState(false)
  const [projectsError, setProjectsError] = useState('')
  const [enquiriesError, setEnquiriesError] = useState('')
  const [isMutating, setIsMutating] = useState(false)
  const [sectionConfig, setSectionConfig] = useLocalStorage(STORAGE_KEYS.sections, initialSectionConfig)

  const mergedSectionConfig = useMemo(
    () => ({ ...initialSectionConfig, ...sectionConfig }),
    [sectionConfig],
  )

  useEffect(() => {
    setSectionConfig((prevConfig) => ({ ...initialSectionConfig, ...prevConfig }))
  }, [setSectionConfig])

  const refreshProjects = useCallback(async () => {
    setIsProjectsLoading(true)
    setProjectsError('')
    try {
      const fetchedProjects = await projectApi.fetchProjects()
      setProjects(fetchedProjects)
      return fetchedProjects
    } catch (error) {
      if (error?.isNetworkError) {
        setProjects(initialProjects)
        return initialProjects
      }

      setProjectsError(error.message || 'Unable to load projects.')
      throw error
    } finally {
      setIsProjectsLoading(false)
    }
  }, [])

  const refreshEnquiries = useCallback(async () => {
    setIsEnquiriesLoading(true)
    setEnquiriesError('')
    try {
      const fetchedEnquiries = await enquiryApi.fetchEnquiries()
      setEnquiries(fetchedEnquiries)
      return fetchedEnquiries
    } catch (error) {
      if (error?.isNetworkError) {
        setEnquiries(initialEnquiries)
        return initialEnquiries
      }

      setEnquiriesError(error.message || 'Unable to load enquiries.')
      throw error
    } finally {
      setIsEnquiriesLoading(false)
    }
  }, [])

  useEffect(() => {
    refreshProjects().catch(() => {})
  }, [refreshProjects])

  const createProject = useCallback(async (projectInput) => {
    setIsMutating(true)
    try {
      const createdProject = await projectApi.createProject(projectInput)
      setProjects((prevProjects) => [createdProject, ...prevProjects])
      return createdProject
    } finally {
      setIsMutating(false)
    }
  }, [])

  const updateProject = useCallback(async (projectId, updates) => {
    setIsMutating(true)
    try {
      const updatedProject = await projectApi.updateProject(projectId, updates)
      setProjects((prevProjects) =>
        prevProjects.map((project) => (project.id === projectId ? { ...project, ...updatedProject } : project)),
      )
      return updatedProject
    } finally {
      setIsMutating(false)
    }
  }, [])

  const setProjectStatus = useCallback(async (projectId, status) => {
    setIsMutating(true)
    try {
      const updatedProject = await projectApi.patchProject(projectId, { status })
      setProjects((prevProjects) =>
        prevProjects.map((project) => (project.id === projectId ? { ...project, ...updatedProject } : project)),
      )
      return updatedProject
    } finally {
      setIsMutating(false)
    }
  }, [])

  const deleteProject = useCallback(async (projectId) => {
    setIsMutating(true)
    try {
      await projectApi.deleteProject(projectId)
      setProjects((prevProjects) => prevProjects.filter((project) => project.id !== projectId))
    } finally {
      setIsMutating(false)
    }
  }, [])

  const addEnquiry = useCallback(async (enquiryInput) => {
    setIsMutating(true)
    try {
      const createdEnquiry = await enquiryApi.createEnquiry(enquiryInput)
      setEnquiries((prevEnquiries) => [createdEnquiry, ...prevEnquiries])
      return createdEnquiry
    } finally {
      setIsMutating(false)
    }
  }, [])

  const updateEnquiryStatus = useCallback(async (enquiryId, status) => {
    setIsMutating(true)
    try {
      const updatedEnquiry = await enquiryApi.updateEnquiryStatus(enquiryId, status)
      setEnquiries((prevEnquiries) =>
        prevEnquiries.map((enquiry) =>
          enquiry.id === enquiryId || enquiry.reference === enquiryId ? { ...enquiry, ...updatedEnquiry } : enquiry,
        ),
      )
      return updatedEnquiry
    } finally {
      setIsMutating(false)
    }
  }, [])

  const getEnquiryByReference = useCallback(
    async (reference) => {
      const trimmedReference = reference.trim()
      const existingEnquiry = enquiries.find(
        (enquiry) => enquiry.reference.toLowerCase() === trimmedReference.toLowerCase(),
      )
      if (existingEnquiry) return existingEnquiry

      const remoteEnquiry = await enquiryApi.getEnquiryByReference(trimmedReference)
      if (remoteEnquiry) {
        setEnquiries((prevEnquiries) => {
          const filteredEnquiries = prevEnquiries.filter(
            (enquiry) => enquiry.reference.toLowerCase() !== remoteEnquiry.reference.toLowerCase(),
          )
          return [remoteEnquiry, ...filteredEnquiries]
        })
      }
      return remoteEnquiry
    },
    [enquiries],
  )

  const updateSectionConfig = useCallback(
    (sectionName, enabled) => {
      setSectionConfig((prevConfig) => ({ ...initialSectionConfig, ...prevConfig, [sectionName]: enabled }))
    },
    [setSectionConfig],
  )

  const projectStats = useMemo(() => {
    const total = projects.length
    const completed = projects.filter((project) => project.status === 'completed').length
    const inProgress = projects.filter((project) => project.status === 'in-progress').length
    return { total, completed, inProgress }
  }, [projects])

  const value = useMemo(
    () => ({
      projects,
      enquiries,
      projectStats,
      sectionConfig: mergedSectionConfig,
      createProject,
      updateProject,
      setProjectStatus,
      deleteProject,
      addEnquiry,
      updateEnquiryStatus,
      getEnquiryByReference,
      updateSectionConfig,
      refreshProjects,
      refreshEnquiries,
      isProjectsLoading,
      isEnquiriesLoading,
      isMutating,
      projectsError,
      enquiriesError,
    }),
    [
      projects,
      enquiries,
      projectStats,
      mergedSectionConfig,
      createProject,
      updateProject,
      setProjectStatus,
      deleteProject,
      addEnquiry,
      updateEnquiryStatus,
      getEnquiryByReference,
      updateSectionConfig,
      refreshProjects,
      refreshEnquiries,
      isProjectsLoading,
      isEnquiriesLoading,
      isMutating,
      projectsError,
      enquiriesError,
    ],
  )

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>
}
