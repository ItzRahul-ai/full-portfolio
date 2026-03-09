import { useEffect, useState } from 'react'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import LogoIntroScene from '@/three/LogoIntroScene'

function LoadingScreen({ onComplete }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 2400)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!visible && onComplete) {
      const timer = window.setTimeout(() => onComplete(), 450)
      return () => window.clearTimeout(timer)
    }
    return undefined
  }, [visible, onComplete])

  return (
    <AnimatePresence>
      {visible ? (
        <Motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden bg-[var(--color-bg)]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="pointer-events-none absolute inset-0 opacity-90">
            <LogoIntroScene />
          </div>

          <Motion.div
            className="relative z-10 rounded-2xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_72%,transparent)] px-7 py-4 text-center backdrop-blur-lg"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">Initializing</p>
            <h2 className="section-title mt-2 text-2xl font-semibold text-[var(--color-text)] md:text-3xl">Dip Coder</h2>
          </Motion.div>
        </Motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default LoadingScreen
