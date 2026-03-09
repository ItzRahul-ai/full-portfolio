import { motion as Motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SectionHeading from '@/components/common/SectionHeading'
import ScrollReveal from '@/components/common/ScrollReveal'
import { SERVICE_CATALOG } from '@/utils/constants'
import { useParallax } from '@/hooks/useParallax'

function ServicesPreview() {
  const { ref, y } = useParallax(-20, 35)

  return (
    <section ref={ref} className="mt-28">
      <SectionHeading
        eyebrow="Services"
        title="Engineering services for ambitious digital products."
        description="Premium execution from interaction design to scalable frontend implementation."
      />

      <Motion.div className="mt-10 grid gap-5 md:grid-cols-2" style={{ y }}>
        {SERVICE_CATALOG.map((service, index) => (
          <ScrollReveal key={service.id} delay={index * 0.08}>
            <Motion.article
              className="glass-panel rounded-2xl p-6"
              whileHover={{ y: -8, rotateX: 2 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              data-cursor="active"
            >
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-muted)]">0{index + 1}</p>
              <h3 className="section-title mt-3 text-2xl font-semibold text-[var(--color-text)]">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{service.description}</p>
              <ul className="mt-4 space-y-2 text-sm text-[var(--color-text)]">
                {service.features.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <span className="text-[var(--color-accent)]">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </Motion.article>
          </ScrollReveal>
        ))}
      </Motion.div>

      <div className="mt-8">
        <Link to="/services" className="btn-primary">
          View Full Service Stack
        </Link>
      </div>
    </section>
  )
}

export default ServicesPreview
