export type CoreMode =
  | 'boot'
  | 'intro'
  | 'lobby'
  | 'menu'
  | 'transitioning'
  | 'radar'
  | 'terminal'
  | 'hidden'

export type CoreTheme = 'cyan' | 'violet' | 'red' | 'blue' | 'gold' | 'pink'

export type CoreNavItem = {
  id: string
  label: string
  eyebrow: string
  to: string
  theme: CoreTheme
  x: number
  y: number
}

export const coreNavItems: CoreNavItem[] = [
  { id: 'about', label: 'GUILD_LORE', eyebrow: 'PLAYER PROFILE', to: '/nexus#about', theme: 'cyan', x: 50, y: 8 },
  { id: 'realms', label: 'REALMS', eyebrow: 'SELECT WORLD', to: '/nexus#projects', theme: 'violet', x: 82, y: 27 },
  { id: 'quest', label: 'MAIN_QUEST', eyebrow: 'ACTIVE MISSION', to: '/projects', theme: 'red', x: 82, y: 73 },
  { id: 'tech', label: 'TECH_TREE', eyebrow: 'ABILITY GRID', to: '/nexus#lab', theme: 'blue', x: 50, y: 92 },
  { id: 'logs', label: 'PATCH_NOTES', eyebrow: 'SYSTEM HISTORY', to: '/nexus#blog', theme: 'gold', x: 18, y: 73 },
  { id: 'contact', label: 'CO_OP', eyebrow: 'OPEN CHANNEL', to: '/nexus#contact', theme: 'pink', x: 18, y: 27 }
]

export const coreThemeColors: Record<CoreTheme, { color: string; emissive: string; spin: number }> = {
  cyan: { color: '#00dff5', emissive: '#005c82', spin: 1 },
  violet: { color: '#8b5cf6', emissive: '#34156d', spin: 1.22 },
  red: { color: '#ff3f5f', emissive: '#761225', spin: 1.5 },
  blue: { color: '#2d7dff', emissive: '#123f91', spin: 1.34 },
  gold: { color: '#ffd24a', emissive: '#765100', spin: 0.82 },
  pink: { color: '#ff4bb5', emissive: '#7d1858', spin: 1.12 }
}

export const sectionThemeMap: Record<string, CoreTheme> = {
  about: 'cyan',
  projects: 'violet',
  quest: 'red',
  lab: 'blue',
  blog: 'gold',
  contact: 'pink'
}

export const routeThemeMap: Record<string, CoreTheme> = {
  '/about': 'cyan',
  '/projects': 'red',
  '/lab': 'blue',
  '/blog': 'gold'
}

