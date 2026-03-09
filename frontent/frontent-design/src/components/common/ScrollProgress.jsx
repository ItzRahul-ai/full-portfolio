import { motion as Motion, useScroll, useSpring } from 'framer-motion'

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 })

  return (
    <Motion.div
      className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)]"
      style={{ scaleX }}
    />
  )
}

export default ScrollProgress
