import { Link } from 'react-router-dom'
import HeroSection from '@/components/home/HeroSection'
import StatsSection from '@/components/home/StatsSection'
import ServicesPreview from '@/components/home/ServicesPreview'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import FAQSection from '@/components/home/FAQSection'
import ClientLogos from '@/components/home/ClientLogos'
import ProjectCard from '@/components/project/ProjectCard'
import SectionHeading from '@/components/common/SectionHeading'
import { usePortfolio } from '@/hooks/usePortfolio'

function Home() {
  const { projects, sectionConfig, isProjectsLoading, projectsError } = usePortfolio()
  const featuredProjects = projects.slice(0, 3)

  return (
    <div>
      {sectionConfig.hero ? <HeroSection /> : null}
      {sectionConfig.stats ? <StatsSection /> : null}
      {sectionConfig.services ? <ServicesPreview /> : null}

      <section className="mt-28">
        <SectionHeading
          eyebrow="Portfolio"
          title="Selected work built for performance, scale, and visual clarity."
          description="Each project is structured with reusable architecture and product-focused motion systems."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {isProjectsLoading ? (
            <article className="glass-panel rounded-2xl p-6 text-sm text-[var(--color-muted)]">Loading projects...</article>
          ) : featuredProjects.length > 0 ? (
            featuredProjects.map((project) => <ProjectCard key={project.id} project={project} />)
          ) : (
            <article className="glass-panel rounded-2xl p-6 text-sm text-[var(--color-muted)]">
              No projects available right now.
            </article>
          )}
        </div>
        {projectsError ? <p className="mt-4 text-sm text-red-400">{projectsError}</p> : null}
        <div className="mt-8">
          <Link to="/projects" className="btn-primary">
            Browse Full Portfolio
          </Link>
        </div>
      </section>

      {sectionConfig.testimonials ? <TestimonialsSection /> : null}
      {sectionConfig.faq ? <FAQSection /> : null}
      {sectionConfig.clients ? <ClientLogos /> : null}
    </div>
  )
}

export default Home
