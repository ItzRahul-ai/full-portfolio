import { useRef } from 'react'
import { useScroll, useTransform } from 'framer-motion'

export function useParallax(outputStart = -40, outputEnd = 40) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [outputStart, outputEnd])
  return { ref, y, progress: scrollYProgress }
}
