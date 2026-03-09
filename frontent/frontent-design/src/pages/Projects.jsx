import { useMemo, useState } from 'react'
import SectionHeading from '@/components/common/SectionHeading'
import ScrollReveal from '@/components/common/ScrollReveal'
import ProjectCard from '@/components/project/ProjectCard'
import { usePortfolio } from '@/hooks/usePortfolio'

const filters = ['all', 'completed', 'in-progress', 'draft']

function Projects() {
  const { projects, isProjectsLoading, projectsError } = usePortfolio()
  const [activeFilter, setActiveFilter] = useState('all')

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects
    return projects.filter((project) => project.status === activeFilter)
  }, [activeFilter, projects])

  return (
    <div>
      <SectionHeading
        eyebrow="Projects"
        title="Project showcase, case studies, and client website builds."
        description="A modular portfolio system ready for future backend-driven content management."
      />

      <div className="mt-8 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            className={activeFilter === filter ? 'btn-primary text-sm capitalize' : 'btn-ghost text-sm capitalize'}
            onClick={() => setActiveFilter(filter)}
          >
            {filter.replace('-', ' ')}
          </button>
        ))}
      </div>

      <section className="mt-10 grid gap-5 lg:grid-cols-3">
        {isProjectsLoading ? (
          <article className="glass-panel rounded-2xl p-6 text-sm text-[var(--color-muted)]">Loading projects...</article>
        ) : filteredProjects.length > 0 ? (
          filteredProjects.map((project) => <ProjectCard key={project.id} project={project} />)
        ) : (
          <article className="glass-panel rounded-2xl p-6 text-sm text-[var(--color-muted)]">
            No projects found for this filter.
          </article>
        )}
      </section>
      {projectsError ? <p className="mt-4 text-sm text-red-400">{projectsError}</p> : null}

      <section className="mt-16">
        <SectionHeading
          eyebrow="Case Studies"
          title="How projects are documented"
          description="Each case study includes challenge, solution, impact, visual gallery, and technical highlights."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {projects.slice(0, 2).map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 0.07}>
              <article className="glass-panel rounded-2xl p-6">
                <h3 className="section-title text-2xl font-semibold text-[var(--color-text)]">{project.title}</h3>
                <p className="mt-3 text-sm text-[var(--color-muted)]">{project.challenge}</p>
                <p className="mt-2 text-sm text-[var(--color-text)]">{project.impact}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Projects
