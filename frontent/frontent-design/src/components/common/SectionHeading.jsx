import { motion as Motion } from 'framer-motion'
import { revealVariants } from '@/animations/pageVariants'

function SectionHeading({ eyebrow, title, description, centered = false }) {
  return (
    <Motion.header
      className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={revealVariants}
    >
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-accent)]">{eyebrow}</p>
      ) : null}
      <h2 className="section-title mt-3 text-3xl font-semibold leading-tight text-[var(--color-text)] md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)] md:text-lg">{description}</p>
      ) : null}
    </Motion.header>
  )
}

export default SectionHeading
