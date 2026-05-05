export interface Achievement {
  id: string
  name: string
  icon: string
  req: (g: GameState) => boolean
}

export interface GameState {
  totalClicks: number
  allTimeCookies: number
  totalPurchases: number
  cps: number
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first',      name: 'Первый клик!',   icon: '🌟', req: (g) => g.totalClicks >= 1 },
  { id: 'clicks100',  name: '100 кликов',     icon: '💯', req: (g) => g.totalClicks >= 100 },
  { id: 'clicks1k',   name: '1000 кликов',    icon: '🖱️', req: (g) => g.totalClicks >= 1000 },
  { id: 'cookies100', name: '100 печений',    icon: '🍪', req: (g) => g.allTimeCookies >= 100 },
  { id: 'cookies1k',  name: '1К печений',     icon: '🥐', req: (g) => g.allTimeCookies >= 1000 },
  { id: 'cookies10k', name: '10К печений',    icon: '🎂', req: (g) => g.allTimeCookies >= 10000 },
  { id: 'cookies1m',  name: '1 миллион!',     icon: '👑', req: (g) => g.allTimeCookies >= 1000000 },
  { id: 'cookies1b',  name: '1 МИЛЛИАРД!!',   icon: '💎', req: (g) => g.allTimeCookies >= 1000000000 },
  { id: 'shop1',      name: 'Первая покупка', icon: '🛒', req: (g) => g.totalPurchases >= 1 },
  { id: 'shop10',     name: '10 покупок',     icon: '🏪', req: (g) => g.totalPurchases >= 10 },
  { id: 'cps10',      name: '10/сек',         icon: '⚙️', req: (g) => g.cps >= 10 },
  { id: 'cps100',     name: '100/сек',        icon: '🚀', req: (g) => g.cps >= 100 },
  { id: 'cps1000',    name: '1000/сек',       icon: '🌠', req: (g) => g.cps >= 1000 },
]
