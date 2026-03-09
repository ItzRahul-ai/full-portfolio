import { useEffect, useState } from 'react'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import ScrollReveal from '@/components/common/ScrollReveal'
import GlassCard from '@/components/common/GlassCard'

const stats = [
  { label: 'Projects Delivered', value: 46, suffix: '+' },
  { label: 'Client Retention', value: 91, suffix: '%' },
  { label: 'Avg. Lighthouse Score', value: 97, suffix: '/100' },
  { label: 'Motion System Reusability', value: 84, suffix: '%' },
]

function AnimatedValue({ target, suffix }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-90px' })

  useEffect(() => {
    if (!inView) return undefined
    let frameId
    let startTime
    const duration = 900

    const tick = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.round(target * progress))
      if (progress < 1) frameId = requestAnimationFrame(tick)
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [inView, target])

  return (
    <p ref={ref} className="section-title text-3xl font-semibold text-[var(--color-text)] md:text-4xl">
      {count}
      {suffix}
    </p>
  )
}

function StatsSection() {
  return (
    <section className="mt-28">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item, index) => (
          <ScrollReveal key={item.label} delay={index * 0.05}>
            <GlassCard className="rounded-2xl p-5">
              <AnimatedValue target={item.value} suffix={item.suffix} />
              <p className="mt-2 text-sm text-[var(--color-muted)]">{item.label}</p>
            </GlassCard>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}

export default StatsSection
