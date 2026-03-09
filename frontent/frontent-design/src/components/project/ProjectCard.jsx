import { motion as Motion } from 'framer-motion'
import { Link } from 'react-router-dom'

function ProjectCard({ project }) {
  return (
    <Motion.article
      className="glass-panel overflow-hidden rounded-2xl"
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 240, damping: 24 }}
      data-cursor="active"
    >
      <div
        className="h-40 border-b border-[var(--color-border)]"
        style={{ background: `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientTo})` }}
      />
      <div className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">{project.category}</p>
          <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-muted)]">
            {project.status}
          </span>
        </div>
        <h3 className="section-title mt-4 text-2xl font-semibold text-[var(--color-text)]">{project.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{project.summary}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg-soft)_65%,transparent)] px-3 py-1 text-xs text-[var(--color-text)]"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <Link to={`/projects/${project.slug}`} className="btn-primary inline-flex text-sm">
            View Case Study
          </Link>
          {project.liveUrl ? (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn-ghost inline-flex text-sm">
              Visit Live
            </a>
          ) : null}
        </div>
      </div>
    </Motion.article>
  )
}

export default ProjectCard
