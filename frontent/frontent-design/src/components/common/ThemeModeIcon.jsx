import { motion as Motion } from 'framer-motion'

function ThemeModeIcon({ mode, size = 20 }) {
  return (
    <Motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className="text-[var(--color-text)]"
      animate={{ rotate: mode === 'dark' ? 40 : 0, scale: mode === 'dark' ? 0.94 : 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
    >
      {mode === 'dark' ? (
        <Motion.path
          d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 1 0 9.8 9.8z"
          fill="currentColor"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 1, pathLength: 1 }}
          transition={{ duration: 0.35 }}
        />
      ) : (
        <>
          <Motion.circle
            cx="12"
            cy="12"
            r="4.2"
            fill="currentColor"
            initial={{ scale: 0.7, opacity: 0.4 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.28 }}
          />
          <Motion.g
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <path d="M12 1.7v2.7" />
            <path d="M12 19.6v2.7" />
            <path d="M4.4 4.4l1.9 1.9" />
            <path d="M17.7 17.7l1.9 1.9" />
            <path d="M1.7 12h2.7" />
            <path d="M19.6 12h2.7" />
            <path d="M4.4 19.6l1.9-1.9" />
            <path d="M17.7 6.3l1.9-1.9" />
          </Motion.g>
        </>
      )}
    </Motion.svg>
  )
}

export default ThemeModeIcon
