import { useRef } from 'react'
import { motion as Motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { PERSONAL_INFO } from '@/utils/constants'
import logoImage from '@/assets/logo.jpeg'

function HeroSection() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const panelY = useTransform(scrollYProgress, [0, 1], [0, 280])
  const panelScale = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.9, 0.82])
  const panelRotate = useTransform(scrollYProgress, [0, 1], [0, -7])
  const badgeX = useTransform(scrollYProgress, [0, 1], [0, 150])
  const badgeY = useTransform(scrollYProgress, [0, 1], [0, -120])
  const badgeRotate = useTransform(scrollYProgress, [0, 1], [0, 95])
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const topFade = useTransform(scrollYProgress, [0, 0.75], [1, 0.15])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[170vh] overflow-hidden rounded-[2rem] border border-[var(--color-border)] grid-lines"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[color-mix(in_srgb,var(--color-accent)_16%,transparent)] via-transparent to-[color-mix(in_srgb,var(--color-accent-2)_20%,transparent)]" />
      <Motion.div
        className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-[color-mix(in_srgb,var(--color-accent)_20%,transparent)] blur-3xl"
        style={{ y: glowY, opacity: topFade }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-16 pt-20 md:px-8 md:pt-24">
        <Motion.p
          className="text-xs uppercase tracking-[0.32em] text-[var(--color-muted)]"
          style={{ opacity: topFade }}
        >
          Cinematic Interface Engineering
        </Motion.p>

        <Motion.div
          className="glass-panel glow-edge mt-8 max-w-4xl rounded-3xl p-6 md:p-10"
          style={{ y: panelY, scale: panelScale, rotateZ: panelRotate, transformOrigin: 'center top' }}
        >
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              <img
                src={logoImage}
                alt="Dip Coder logo"
                className="h-14 w-14 rounded-xl object-cover shadow-[0_0_30px_-10px_var(--color-glow)]"
              />
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">Developer</p>
                <p className="section-title text-lg font-semibold text-[var(--color-text)]">{PERSONAL_INFO.name}</p>
              </div>
            </div>
            <span className="rounded-full border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg-soft)_70%,transparent)] px-4 py-2 text-xs uppercase tracking-[0.22em] text-[var(--color-muted)]">
              Available for Projects
            </span>
          </div>

          <h1 className="section-title text-4xl font-semibold leading-tight text-[var(--color-text)] md:text-7xl">
            Premium Frontend
            <span className="block bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)] bg-clip-text text-transparent">
              With Cinematic Motion
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--color-muted)] md:text-lg">
            I craft high-end developer portfolios and product interfaces with smooth transitions, 3D atmosphere, and
            backend-ready architecture.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/projects" className="btn-primary">
              Explore Projects
            </Link>
            <Link to="/contact" className="btn-ghost">
              Start a Collaboration
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <article className="rounded-2xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg-soft)_64%,transparent)] p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">Architecture</p>
              <p className="mt-2 font-medium text-[var(--color-text)]">Modular and scalable</p>
            </article>
            <article className="rounded-2xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg-soft)_64%,transparent)] p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">Motion</p>
              <p className="mt-2 font-medium text-[var(--color-text)]">Framer + smooth scroll flow</p>
            </article>
            <article className="rounded-2xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg-soft)_64%,transparent)] p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">3D System</p>
              <p className="mt-2 font-medium text-[var(--color-text)]">Three.js ambient scene</p>
            </article>
          </div>
        </Motion.div>

        <Motion.div
          className="absolute right-8 top-28 hidden h-44 w-44 items-center justify-center rounded-full border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg-soft)_70%,transparent)] shadow-[0_0_45px_-18px_var(--color-glow)] md:flex"
          style={{ x: badgeX, y: badgeY, rotate: badgeRotate }}
        >
          <div className="relative h-28 w-28 rounded-full border border-[var(--color-accent)]">
            <div className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--color-accent-2)]" />
            <div className="absolute left-1/2 top-1/2 h-[2px] w-20 -translate-x-1/2 -translate-y-1/2 bg-[var(--color-accent)] opacity-70" />
          </div>
        </Motion.div>
      </div>
    </section>
  )
}

export default HeroSection
