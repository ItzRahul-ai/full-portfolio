import { useEffect, useMemo, useState } from 'react'
import SectionHeading from '@/components/common/SectionHeading'
import ScrollReveal from '@/components/common/ScrollReveal'
import ThemeModeToggle from '@/components/common/ThemeModeToggle'
import { usePortfolio } from '@/hooks/usePortfolio'
import { useTheme } from '@/hooks/useTheme'

const defaultProjectForm = {
  title: '',
  client: '',
  category: '',
  summary: '',
  challenge: '',
  solution: '',
  impact: '',
  status: 'draft',
}

function AdminDashboard() {
  const {
    projects,
    createProject,
    updateProject,
    deleteProject,
    setProjectStatus,
    enquiries,
    updateEnquiryStatus,
    sectionConfig,
    updateSectionConfig,
    projectStats,
    refreshEnquiries,
    isProjectsLoading,
    isEnquiriesLoading,
    isMutating,
    projectsError,
    enquiriesError,
  } = usePortfolio()
  const { mode, toggleMode, themeId, setTheme, themePresets } = useTheme()

  const [projectForm, setProjectForm] = useState(defaultProjectForm)
  const [editingProjectId, setEditingProjectId] = useState(null)
  const [selectedEnquiryId, setSelectedEnquiryId] = useState('')
  const [isSubmittingProject, setIsSubmittingProject] = useState(false)
  const [dashboardMessage, setDashboardMessage] = useState('')
  const [dashboardError, setDashboardError] = useState('')

  useEffect(() => {
    refreshEnquiries().catch((error) => {
      setDashboardError(error.message || 'Unable to load enquiries.')
    })
  }, [refreshEnquiries])

  useEffect(() => {
    if (!selectedEnquiryId && enquiries.length > 0) {
      setSelectedEnquiryId(enquiries[0].id)
    }
  }, [enquiries, selectedEnquiryId])

  const selectedEnquiry = useMemo(
    () => enquiries.find((enquiry) => enquiry.id === selectedEnquiryId) || null,
    [enquiries, selectedEnquiryId],
  )

  const handleProjectSubmit = async (event) => {
    event.preventDefault()
    setDashboardError('')
    setDashboardMessage('')
    setIsSubmittingProject(true)

    try {
      if (editingProjectId) {
        await updateProject(editingProjectId, projectForm)
        setDashboardMessage('Project updated successfully.')
        setEditingProjectId(null)
      } else {
        await createProject({
          ...projectForm,
          tags: ['React', 'Frontend'],
          visuals: ['Homepage view', 'Dashboard panel', 'Mobile experience'],
        })
        setDashboardMessage('Project created successfully.')
      }
      setProjectForm(defaultProjectForm)
    } catch (error) {
      setDashboardError(error.message || 'Project action failed.')
    } finally {
      setIsSubmittingProject(false)
    }
  }

  const handleProjectDelete = async (projectId) => {
    setDashboardError('')
    setDashboardMessage('')
    try {
      await deleteProject(projectId)
      setDashboardMessage('Project deleted successfully.')
    } catch (error) {
      setDashboardError(error.message || 'Unable to delete project.')
    }
  }

  const handleProjectStatusChange = async (projectId, status) => {
    setDashboardError('')
    try {
      await setProjectStatus(projectId, status)
    } catch (error) {
      setDashboardError(error.message || 'Unable to update project status.')
    }
  }

  const handleEnquiryStatusChange = async (enquiryId, status) => {
    setDashboardError('')
    try {
      await updateEnquiryStatus(enquiryId, status)
      setDashboardMessage('Enquiry status updated.')
    } catch (error) {
      setDashboardError(error.message || 'Unable to update enquiry status.')
    }
  }

  const inputClassName =
    'w-full rounded-xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg-soft)_68%,transparent)] px-4 py-3 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-accent)]'

  return (
    <div>
      <SectionHeading
        eyebrow="Admin Dashboard"
        title="API-connected CMS control panel for portfolio and enquiries."
        description="All project and enquiry operations are now connected to backend endpoints."
      />

      {dashboardMessage ? <p className="mt-4 text-sm text-emerald-400">{dashboardMessage}</p> : null}
      {dashboardError ? <p className="mt-3 text-sm text-red-400">{dashboardError}</p> : null}
      {projectsError ? <p className="mt-3 text-sm text-red-400">{projectsError}</p> : null}
      {enquiriesError ? <p className="mt-3 text-sm text-red-400">{enquiriesError}</p> : null}

      <section className="mt-10 grid gap-5 md:grid-cols-3">
        <article className="glass-panel rounded-2xl p-5">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-muted)]">Total Projects</p>
          <p className="section-title mt-2 text-3xl font-semibold text-[var(--color-text)]">
            {isProjectsLoading ? '...' : projectStats.total}
          </p>
        </article>
        <article className="glass-panel rounded-2xl p-5">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-muted)]">Completed</p>
          <p className="section-title mt-2 text-3xl font-semibold text-[var(--color-text)]">
            {isProjectsLoading ? '...' : projectStats.completed}
          </p>
        </article>
        <article className="glass-panel rounded-2xl p-5">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-muted)]">Enquiries</p>
          <p className="section-title mt-2 text-3xl font-semibold text-[var(--color-text)]">
            {isEnquiriesLoading ? '...' : enquiries.length}
          </p>
        </article>
      </section>

      <section className="mt-14 grid gap-6 lg:grid-cols-[1.1fr_1.3fr]">
        <ScrollReveal>
          <form className="glass-panel rounded-2xl p-6" onSubmit={handleProjectSubmit}>
            <h3 className="section-title text-2xl font-semibold text-[var(--color-text)]">
              {editingProjectId ? 'Edit Project' : 'Create Project'}
            </h3>
            <div className="mt-5 grid gap-4">
              <input
                className={inputClassName}
                placeholder="Project title"
                value={projectForm.title}
                onChange={(event) => setProjectForm((prevState) => ({ ...prevState, title: event.target.value }))}
                required
              />
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  className={inputClassName}
                  placeholder="Client name"
                  value={projectForm.client}
                  onChange={(event) =>
                    setProjectForm((prevState) => ({ ...prevState, client: event.target.value }))
                  }
                  required
                />
                <input
                  className={inputClassName}
                  placeholder="Category"
                  value={projectForm.category}
                  onChange={(event) =>
                    setProjectForm((prevState) => ({ ...prevState, category: event.target.value }))
                  }
                  required
                />
              </div>
              <textarea
                className={`${inputClassName} min-h-24`}
                placeholder="Summary"
                value={projectForm.summary}
                onChange={(event) =>
                  setProjectForm((prevState) => ({ ...prevState, summary: event.target.value }))
                }
                required
              />
              <textarea
                className={`${inputClassName} min-h-20`}
                placeholder="Challenge"
                value={projectForm.challenge}
                onChange={(event) =>
                  setProjectForm((prevState) => ({ ...prevState, challenge: event.target.value }))
                }
                required
              />
              <textarea
                className={`${inputClassName} min-h-20`}
                placeholder="Solution"
                value={projectForm.solution}
                onChange={(event) =>
                  setProjectForm((prevState) => ({ ...prevState, solution: event.target.value }))
                }
                required
              />
              <input
                className={inputClassName}
                placeholder="Impact"
                value={projectForm.impact}
                onChange={(event) => setProjectForm((prevState) => ({ ...prevState, impact: event.target.value }))}
                required
              />
              <select
                className={inputClassName}
                value={projectForm.status}
                onChange={(event) => setProjectForm((prevState) => ({ ...prevState, status: event.target.value }))}
              >
                <option value="draft">Draft</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <button type="submit" className="btn-primary" disabled={isSubmittingProject || isMutating}>
                {isSubmittingProject ? 'Saving...' : editingProjectId ? 'Update Project' : 'Create Project'}
              </button>
              {editingProjectId ? (
                <button
                  type="button"
                  className="btn-ghost"
                  onClick={() => {
                    setEditingProjectId(null)
                    setProjectForm(defaultProjectForm)
                  }}
                >
                  Cancel
                </button>
              ) : null}
            </div>
          </form>
        </ScrollReveal>

        <ScrollReveal delay={0.07}>
          <article className="glass-panel rounded-2xl p-6">
            <h3 className="section-title text-2xl font-semibold text-[var(--color-text)]">Manage Projects</h3>
            <div className="mt-5 max-h-[480px] space-y-3 overflow-y-auto pr-2">
              {isProjectsLoading ? (
                <p className="text-sm text-[var(--color-muted)]">Loading projects...</p>
              ) : (
                projects.map((project) => (
                  <div key={project.id} className="rounded-xl border border-[var(--color-border)] p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="font-medium text-[var(--color-text)]">{project.title}</h4>
                      <select
                        className="rounded-full border border-[var(--color-border)] bg-transparent px-3 py-1 text-xs text-[var(--color-text)]"
                        value={project.status}
                        onChange={(event) => handleProjectStatusChange(project.id, event.target.value)}
                      >
                        <option value="draft">draft</option>
                        <option value="in-progress">in-progress</option>
                        <option value="completed">completed</option>
                      </select>
                    </div>
                    <p className="mt-2 text-sm text-[var(--color-muted)]">{project.client}</p>
                    <div className="mt-3 flex gap-2">
                      <button
                        className="btn-ghost px-3 py-2 text-xs"
                        onClick={() => {
                          setEditingProjectId(project.id)
                          setProjectForm({
                            title: project.title,
                            client: project.client,
                            category: project.category,
                            summary: project.summary,
                            challenge: project.challenge,
                            solution: project.solution,
                            impact: project.impact,
                            status: project.status,
                          })
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-ghost px-3 py-2 text-xs"
                        onClick={() => handleProjectDelete(project.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </article>
        </ScrollReveal>
      </section>

      <section className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <article className="glass-panel rounded-2xl p-6">
          <h3 className="section-title text-2xl font-semibold text-[var(--color-text)]">Manage Enquiries</h3>
          <div className="mt-5 space-y-2">
            {isEnquiriesLoading ? (
              <p className="text-sm text-[var(--color-muted)]">Loading enquiries...</p>
            ) : (
              enquiries.map((enquiry) => (
                <button
                  key={enquiry.id}
                  className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition ${
                    selectedEnquiryId === enquiry.id
                      ? 'border-[var(--color-accent)] bg-[color-mix(in_srgb,var(--color-accent)_16%,transparent)]'
                      : 'border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg-soft)_65%,transparent)]'
                  }`}
                  onClick={() => setSelectedEnquiryId(enquiry.id)}
                >
                  <p className="font-medium text-[var(--color-text)]">{enquiry.reference}</p>
                  <p className="mt-1 text-xs text-[var(--color-muted)]">
                    {enquiry.name} - {enquiry.type}
                  </p>
                </button>
              ))
            )}
          </div>
        </article>

        <article className="glass-panel rounded-2xl p-6">
          <h3 className="section-title text-2xl font-semibold text-[var(--color-text)]">Enquiry Details</h3>
          {selectedEnquiry ? (
            <div className="mt-5 space-y-3">
              <p className="text-sm text-[var(--color-muted)]">Name: {selectedEnquiry.name}</p>
              <p className="text-sm text-[var(--color-muted)]">Email: {selectedEnquiry.email}</p>
              <p className="text-sm text-[var(--color-muted)]">Service: {selectedEnquiry.service}</p>
              <p className="text-sm text-[var(--color-muted)]">Message: {selectedEnquiry.message}</p>
              <select
                className="w-full rounded-xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg-soft)_65%,transparent)] px-4 py-3 text-sm text-[var(--color-text)]"
                value={selectedEnquiry.status}
                onChange={(event) => handleEnquiryStatusChange(selectedEnquiry.id, event.target.value)}
              >
                <option value="new">new</option>
                <option value="reviewing">reviewing</option>
                <option value="in-progress">in-progress</option>
                <option value="resolved">resolved</option>
                <option value="closed">closed</option>
              </select>
            </div>
          ) : (
            <p className="mt-4 text-sm text-[var(--color-muted)]">Select an enquiry to view details.</p>
          )}
        </article>
      </section>

      <section className="mt-14 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <article className="glass-panel rounded-2xl p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="section-title text-2xl font-semibold text-[var(--color-text)]">Theme Customization</h3>
            <ThemeModeToggle mode={mode} onToggle={toggleMode} showLabel />
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {themePresets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => setTheme(preset.id)}
                className={`rounded-xl border p-4 text-left transition ${
                  themeId === preset.id
                    ? 'border-[var(--color-accent)] bg-[color-mix(in_srgb,var(--color-accent)_16%,transparent)]'
                    : 'border-[var(--color-border)]'
                }`}
              >
                <p className="text-sm font-medium text-[var(--color-text)]">{preset.name}</p>
                <div className="mt-3 flex gap-2">
                  <span className="h-4 w-8 rounded-full" style={{ background: preset.accent }} />
                  <span className="h-4 w-8 rounded-full" style={{ background: preset.accent2 }} />
                </div>
              </button>
            ))}
          </div>
        </article>

        <article className="glass-panel rounded-2xl p-6">
          <h3 className="section-title text-2xl font-semibold text-[var(--color-text)]">Section Control</h3>
          <p className="mt-2 text-sm text-[var(--color-muted)]">Toggle homepage sections from admin panel.</p>
          <div className="mt-5 space-y-3">
            {Object.entries(sectionConfig).map(([sectionName, enabled]) => (
              <label
                key={sectionName}
                className="flex items-center justify-between rounded-xl border border-[var(--color-border)] px-4 py-3"
              >
                <span className="text-sm capitalize text-[var(--color-text)]">{sectionName}</span>
                <input
                  type="checkbox"
                  checked={enabled}
                  onChange={(event) => updateSectionConfig(sectionName, event.target.checked)}
                  className="h-4 w-4 accent-[var(--color-accent)]"
                />
              </label>
            ))}
          </div>
        </article>
      </section>
    </div>
  )
}

export default AdminDashboard
