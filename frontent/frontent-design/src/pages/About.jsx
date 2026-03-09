import { motion as Motion } from 'framer-motion'
import SectionHeading from '@/components/common/SectionHeading'
import ScrollReveal from '@/components/common/ScrollReveal'
import { PERSONAL_INFO } from '@/utils/constants'
import profileImage from '@/assets/my photo.jpeg'

const skills = [
  'React / Vite Architecture',
  'Tailwind Design Systems',
  'Framer Motion Orchestration',
  'Three.js and React Three Fiber',
  'Frontend Performance Optimization',
  'API-driven UI Integration',
]

const timeline = [
  { year: '2026', title: 'Independent Frontend Consultant', detail: 'Delivering premium product interfaces for startups and agencies.' },
  { year: '2025', title: 'Motion-driven Product Builds', detail: 'Introduced reusable animation systems for high-velocity teams.' },
  { year: '2024', title: 'Scalable UI Foundations', detail: 'Developed maintainable component architectures and frontend standards.' },
]

function About() {
  return (
    <div>
      <SectionHeading
        eyebrow="About"
        title="Design-minded developer with a systems-first approach."
        description="I combine product strategy, visual storytelling, and scalable engineering to ship digital experiences that feel premium and perform reliably."
      />

      <section className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_1.4fr]">
        <ScrollReveal>
          <article className="glass-panel rounded-3xl p-5">
            <img src={profileImage} alt={PERSONAL_INFO.name} className="h-full w-full rounded-2xl object-cover" />
          </article>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <article className="glass-panel rounded-3xl p-6 md:p-8">
            <p className="text-sm leading-relaxed text-[var(--color-muted)]">{PERSONAL_INFO.tagline}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {skills.map((skill) => (
                <div
                  key={skill}
                  className="rounded-xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg-soft)_65%,transparent)] px-4 py-3 text-sm text-[var(--color-text)]"
                >
                  {skill}
                </div>
              ))}
            </div>
          </article>
        </ScrollReveal>
      </section>

      <section className="mt-16">
        <SectionHeading eyebrow="Journey" title="Milestones" description="A focused path from interface quality to full frontend architecture leadership." />
        <div className="mt-8 space-y-4">
          {timeline.map((item, index) => (
            <ScrollReveal key={item.year} delay={index * 0.07}>
              <Motion.article className="glass-panel rounded-2xl p-5 md:p-6" whileHover={{ y: -4 }}>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="section-title text-xl font-semibold text-[var(--color-text)]">{item.title}</h3>
                  <span className="text-xs uppercase tracking-[0.24em] text-[var(--color-accent)]">{item.year}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{item.detail}</p>
              </Motion.article>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  )
}

export default About
