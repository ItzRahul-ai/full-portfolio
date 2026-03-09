const darkBase = {
  bg: '#05070d',
  bgSoft: '#0f1527',
  surface: 'rgba(11, 16, 29, 0.68)',
  text: '#f5f8ff',
  muted: '#8d96ad',
  border: 'rgba(255, 255, 255, 0.14)',
}

const lightBase = {
  bg: '#f2f5fb',
  bgSoft: '#e7edf7',
  surface: 'rgba(255, 255, 255, 0.78)',
  text: '#12172b',
  muted: '#5a647d',
  border: 'rgba(17, 25, 44, 0.14)',
}

export const themePresets = [
  { id: 'obsidian-gold', name: 'Obsidian Gold', accent: '#d5ab61', accent2: '#5f84ff' },
  { id: 'neo-cobalt', name: 'Neo Cobalt', accent: '#58b4ff', accent2: '#9c7aff' },
  { id: 'satin-emerald', name: 'Satin Emerald', accent: '#2fc8ad', accent2: '#6be6ff' },
  { id: 'ember-royale', name: 'Ember Royale', accent: '#ff7f54', accent2: '#ffc14f' },
  { id: 'platinum-ice', name: 'Platinum Ice', accent: '#76d7ff', accent2: '#5e8cff' },
  { id: 'midnight-violet', name: 'Midnight Violet', accent: '#a88cff', accent2: '#57dcff' },
  { id: 'noir-ruby', name: 'Noir Ruby', accent: '#ff5b76', accent2: '#ffa766' },
  { id: 'monaco-teal', name: 'Monaco Teal', accent: '#31d5bb', accent2: '#5785ff' },
  { id: 'aurora-lime', name: 'Aurora Lime', accent: '#b6d93f', accent2: '#3f9dff' },
  { id: 'silver-marine', name: 'Silver Marine', accent: '#57caf4', accent2: '#4b7ae8' },
  { id: 'arctic-rose', name: 'Arctic Rose', accent: '#ff84b8', accent2: '#7ba8ff' },
  { id: 'graphite-mint', name: 'Graphite Mint', accent: '#53ddb2', accent2: '#68bfff' },
]

export function getThemeTokens(themeId, mode = 'dark') {
  const preset = themePresets.find((item) => item.id === themeId) || themePresets[0]
  const base = mode === 'light' ? lightBase : darkBase

  return {
    ...base,
    accent: preset.accent,
    accent2: preset.accent2,
    glow:
      mode === 'light'
        ? `color-mix(in srgb, ${preset.accent} 26%, transparent)`
        : `color-mix(in srgb, ${preset.accent} 40%, transparent)`,
    gradientFrom:
      mode === 'light'
        ? `color-mix(in srgb, ${preset.accent} 14%, ${base.bg})`
        : `color-mix(in srgb, ${preset.accent2} 16%, ${base.bg})`,
    gradientTo:
      mode === 'light'
        ? `color-mix(in srgb, ${preset.accent2} 9%, ${base.bgSoft})`
        : `color-mix(in srgb, ${preset.accent} 10%, ${base.bg})`,
  }
}
