import { Link, useParams } from 'react-router-dom'
import SectionHeading from '@/components/common/SectionHeading'
import ScrollReveal from '@/components/common/ScrollReveal'
import { usePortfolio } from '@/hooks/usePortfolio'

function ProjectDetails() {
  const { projectId } = useParams()
  const { projects, isProjectsLoading, projectsError } = usePortfolio()
  const project = projects.find((item) => item.slug === projectId || item.id === projectId)

  if (isProjectsLoading) {
    return (
      <div className="glass-panel rounded-3xl p-10 text-center">
        <p className="text-sm text-[var(--color-muted)]">Loading project details...</p>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="glass-panel rounded-3xl p-10 text-center">
        <p className="text-sm text-[var(--color-muted)]">Project not found.</p>
        {projectsError ? <p className="mt-3 text-sm text-red-400">{projectsError}</p> : null}
        <Link to="/projects" className="btn-primary mt-4 inline-flex">
          Back to Projects
        </Link>
      </div>
    )
  }

  return (
    <div>
      <section
        className="rounded-3xl border border-[var(--color-border)] p-6 md:p-8"
        style={{ background: `linear-gradient(130deg, ${project.gradientFrom}, ${project.gradientTo})` }}
      >
        <p className="text-xs uppercase tracking-[0.25em] text-white/75">{project.category}</p>
        <h1 className="section-title mt-3 text-4xl font-semibold text-white md:text-6xl">{project.title}</h1>
        <p className="mt-4 max-w-2xl text-sm text-white/80 md:text-base">{project.summary}</p>
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-ghost mt-6 inline-flex border-white/30 bg-white/10 text-white hover:border-white/55"
          >
            Open Live Project
          </a>
        ) : null}
      </section>

      <section className="mt-10 grid gap-5 lg:grid-cols-3">
        <article className="glass-panel rounded-2xl p-5">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-muted)]">Client</p>
          <p className="mt-2 text-lg font-medium text-[var(--color-text)]">{project.client}</p>
        </article>
        <article className="glass-panel rounded-2xl p-5">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-muted)]">Year</p>
          <p className="mt-2 text-lg font-medium text-[var(--color-text)]">{project.year}</p>
        </article>
        <article className="glass-panel rounded-2xl p-5">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-muted)]">Status</p>
          <p className="mt-2 text-lg font-medium capitalize text-[var(--color-text)]">{project.status}</p>
        </article>
      </section>

      <section className="mt-16">
        <SectionHeading eyebrow="Case Study" title="Challenge, solution, and business impact." />
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          <ScrollReveal>
            <article className="glass-panel rounded-2xl p-6">
              <h3 className="section-title text-xl font-semibold text-[var(--color-text)]">Challenge</h3>
              <p className="mt-3 text-sm text-[var(--color-muted)]">{project.challenge}</p>
            </article>
          </ScrollReveal>
          <ScrollReveal delay={0.06}>
            <article className="glass-panel rounded-2xl p-6">
              <h3 className="section-title text-xl font-semibold text-[var(--color-text)]">Solution</h3>
              <p className="mt-3 text-sm text-[var(--color-muted)]">{project.solution}</p>
            </article>
          </ScrollReveal>
          <ScrollReveal delay={0.12}>
            <article className="glass-panel rounded-2xl p-6">
              <h3 className="section-title text-xl font-semibold text-[var(--color-text)]">Impact</h3>
              <p className="mt-3 text-sm text-[var(--color-muted)]">{project.impact}</p>
            </article>
          </ScrollReveal>
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading
          eyebrow="Visual Gallery"
          title="Project visuals and showcase panels"
          description="This gallery uses frontend placeholders now and can be swapped with backend image assets later."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {project.visuals.map((visual, index) => (
            <ScrollReveal key={visual} delay={index * 0.06}>
              <article
                className="glass-panel flex min-h-40 items-end rounded-2xl p-4"
                style={{ background: `linear-gradient(145deg, ${project.gradientFrom}, ${project.gradientTo})` }}
              >
                <p className="text-sm font-medium text-white">{visual}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  )
}

export default ProjectDetails
