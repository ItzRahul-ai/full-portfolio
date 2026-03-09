import { motion as Motion } from 'framer-motion'
import { revealVariants } from '@/animations/pageVariants'

function ScrollReveal({ className = '', delay = 0, children }) {
  return (
    <Motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={revealVariants}
      transition={{ delay }}
    >
      {children}
    </Motion.div>
  )
}

export default ScrollReveal
