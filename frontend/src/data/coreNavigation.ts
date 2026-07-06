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
  { id: 'about', label: '个人简介', eyebrow: 'PLAYER PROFILE', to: '/about', theme: 'cyan', x: 50, y: 8 },
  { id: 'projects', label: '我的作品', eyebrow: 'WORK ARCHIVE', to: '/projects', theme: 'violet', x: 82, y: 34 },
  { id: 'skills', label: '技能树', eyebrow: 'VERTICAL SKILL TREE', to: '/skills', theme: 'blue', x: 70, y: 84 },
  { id: 'logs', label: '项目日志', eyebrow: 'PROJECT LOG', to: '/blog', theme: 'gold', x: 30, y: 84 },
  { id: 'contact', label: '联系我', eyebrow: 'OPEN CHANNEL', to: '/contact', theme: 'pink', x: 18, y: 34 }
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
  '/projects': 'violet',
  '/skills': 'blue',
  '/lab': 'blue',
  '/blog': 'gold',
  '/contact': 'pink'
}
