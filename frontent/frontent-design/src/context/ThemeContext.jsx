import { useCallback, useEffect, useMemo, useState } from 'react'
import { ThemeContext } from '@/context/themeContextInstance'
import { STORAGE_KEYS } from '@/utils/storageKeys'
import { getThemeTokens, themePresets } from '@/utils/themePresets'

function getStoredValue(key, fallback) {
  try {
    const rawValue = localStorage.getItem(key)
    return rawValue ? JSON.parse(rawValue) : fallback
  } catch {
    return fallback
  }
}

export function ThemeProvider({ children }) {
  const [themeId, setThemeId] = useState(() => getStoredValue(STORAGE_KEYS.themeId, themePresets[0].id))
  const [mode, setMode] = useState(() => getStoredValue(STORAGE_KEYS.themeMode, 'dark'))

  const activeTheme = useMemo(
    () => themePresets.find((theme) => theme.id === themeId) || themePresets[0],
    [themeId],
  )
  const tokens = useMemo(() => getThemeTokens(activeTheme.id, mode), [activeTheme.id, mode])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.themeId, JSON.stringify(activeTheme.id))
  }, [activeTheme.id])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.themeMode, JSON.stringify(mode))
  }, [mode])

  useEffect(() => {
    const root = document.documentElement
    root.dataset.themeMode = mode
    root.style.setProperty('--color-bg', tokens.bg)
    root.style.setProperty('--color-bg-soft', tokens.bgSoft)
    root.style.setProperty('--color-surface', tokens.surface)
    root.style.setProperty('--color-text', tokens.text)
    root.style.setProperty('--color-muted', tokens.muted)
    root.style.setProperty('--color-border', tokens.border)
    root.style.setProperty('--color-accent', tokens.accent)
    root.style.setProperty('--color-accent-2', tokens.accent2)
    root.style.setProperty('--color-glow', tokens.glow)
    root.style.setProperty('--color-gradient-from', tokens.gradientFrom)
    root.style.setProperty('--color-gradient-to', tokens.gradientTo)
  }, [mode, tokens])

  const setTheme = useCallback((nextThemeId) => {
    const targetTheme = themePresets.find((theme) => theme.id === nextThemeId)
    if (targetTheme) {
      setThemeId(targetTheme.id)
    }
  }, [])

  const toggleMode = useCallback(() => {
    setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'))
  }, [])

  const value = useMemo(
    () => ({
      mode,
      setMode,
      toggleMode,
      themeId: activeTheme.id,
      themeName: activeTheme.name,
      setTheme,
      themePresets,
    }),
    [activeTheme.id, activeTheme.name, mode, setTheme, toggleMode],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
