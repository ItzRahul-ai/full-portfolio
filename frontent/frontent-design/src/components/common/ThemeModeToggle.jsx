import { motion as Motion } from 'framer-motion'
import ThemeModeIcon from '@/components/common/ThemeModeIcon'

function ThemeModeToggle({ mode, onToggle, showLabel = false, className = '' }) {
  const isDark = mode === 'dark'

  return (
    <button
      className={`btn-ghost flex items-center gap-2 ${className}`}
      onClick={onToggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      aria-pressed={isDark}
      type="button"
    >
      {showLabel ? (
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-muted)]">
          {isDark ? 'Dark' : 'Light'}
        </span>
      ) : null}

      <span
        className={`relative flex h-7 w-14 items-center rounded-full border transition ${
          isDark
            ? 'border-[color-mix(in_srgb,var(--color-accent)_65%,transparent)] bg-[color-mix(in_srgb,var(--color-accent)_16%,transparent)]'
            : 'border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg-soft)_65%,transparent)]'
        }`}
      >
        <Motion.span
          className="absolute left-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-text)] text-[var(--color-bg)] shadow"
          animate={{ x: isDark ? 28 : 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 24 }}
        >
          <ThemeModeIcon mode={mode} size={12} />
        </Motion.span>
      </span>
    </button>
  )
}

export default ThemeModeToggle
