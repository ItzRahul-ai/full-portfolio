import { motion as Motion } from 'framer-motion'
import SectionHeading from '@/components/common/SectionHeading'
import ScrollReveal from '@/components/common/ScrollReveal'
import { SERVICE_CATALOG } from '@/utils/constants'

const deliverySteps = [
  'Discovery workshop and technical scoping',
  'Design translation into reusable components',
  'Motion and interaction architecture',
  'Performance optimization and QA hardening',
]

function Services() {
  return (
    <div>
      <SectionHeading
        eyebrow="Services"
        title="High-end frontend services for product-focused teams."
        description="Engagements are structured to deliver visual quality, shipping speed, and maintainable architecture."
      />

      <section className="mt-10 grid gap-5 md:grid-cols-2">
        {SERVICE_CATALOG.map((service, index) => (
          <ScrollReveal key={service.id} delay={index * 0.06}>
            <Motion.article className="glass-panel rounded-2xl p-6" whileHover={{ y: -6 }} data-cursor="active">
              <h3 className="section-title text-2xl font-semibold text-[var(--color-text)]">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{service.description}</p>
              <ul className="mt-5 space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex gap-2 text-sm text-[var(--color-text)]">
                    <span className="text-[var(--color-accent)]">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </Motion.article>
          </ScrollReveal>
        ))}
      </section>

      <section className="mt-16">
        <SectionHeading
          eyebrow="Workflow"
          title="Execution framework"
          description="Every engagement follows a clear operational cadence."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {deliverySteps.map((step, index) => (
            <ScrollReveal key={step} delay={index * 0.05}>
              <article className="glass-panel rounded-xl p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-muted)]">Step {index + 1}</p>
                <p className="mt-2 text-sm font-medium text-[var(--color-text)]">{step}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Services
