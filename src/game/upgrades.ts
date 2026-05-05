export interface Upgrade {
  id: string
  name: string
  icon: string
  desc: string
  baseCost: number
  baseCps: number
  clickBonus: number
  count: number
}

export interface ClickUpgrade {
  id: string
  name: string
  icon: string
  desc: string
  cost: number
  bonus: number
}

export const UPGRADES: Upgrade[] = [
  {
    id: 'cursor',
    name: 'Курсор',
    icon: '🖱️',
    desc: 'Автоматически кликает',
    baseCost: 15,
    baseCps: 0.1,
    clickBonus: 0,
    count: 0,
  },
  {
    id: 'grandma',
    name: 'Бабушка',
    icon: '👵',
    desc: 'Печёт по старому рецепту',
    baseCost: 100,
    baseCps: 0.5,
    clickBonus: 0,
    count: 0,
  },
  {
    id: 'farm',
    name: 'Ферма',
    icon: '🌾',
    desc: 'Выращивает печенье',
    baseCost: 500,
    baseCps: 3,
    clickBonus: 0,
    count: 0,
  },
  {
    id: 'mine',
    name: 'Шахта',
    icon: '⛏️',
    desc: 'Добывает шоколадную руду',
    baseCost: 2000,
    baseCps: 10,
    clickBonus: 0,
    count: 0,
  },
  {
    id: 'factory',
    name: 'Фабрика',
    icon: '🏭',
    desc: 'Промышленное производство',
    baseCost: 8000,
    baseCps: 40,
    clickBonus: 0,
    count: 0,
  },
  {
    id: 'bank',
    name: 'Банк',
    icon: '🏦',
    desc: 'Печенье — новая валюта',
    baseCost: 30000,
    baseCps: 150,
    clickBonus: 0,
    count: 0,
  },
  {
    id: 'temple',
    name: 'Храм',
    icon: '🛕',
    desc: 'Боги жаждут печенья',
    baseCost: 120000,
    baseCps: 500,
    clickBonus: 0,
    count: 0,
  },
  {
    id: 'wizard',
    name: 'Волшебная башня',
    icon: '🧙',
    desc: 'Магия ускоряет выпечку',
    baseCost: 500000,
    baseCps: 1800,
    clickBonus: 0,
    count: 0,
  },
  {
    id: 'portal',
    name: 'Портал',
    icon: '🌀',
    desc: 'Из параллельных миров',
    baseCost: 2000000,
    baseCps: 6000,
    clickBonus: 0,
    count: 0,
  },
  {
    id: 'timemachine',
    name: 'Машина времени',
    icon: '⏰',
    desc: 'Из будущего с печеньем',
    baseCost: 8000000,
    baseCps: 20000,
    clickBonus: 0,
    count: 0,
  },
]

export const CLICK_UPGRADES: ClickUpgrade[] = [
  { id: 'reinforce', name: 'Железный палец',    icon: '💪', desc: '+1 за клик',    cost: 50,      bonus: 1 },
  { id: 'double',    name: 'Двойной клик',      icon: '⚡', desc: '+3 за клик',    cost: 300,     bonus: 3 },
  { id: 'golden',    name: 'Золотой коготь',    icon: '🦅', desc: '+10 за клик',   cost: 2500,    bonus: 10 },
  { id: 'laser',     name: 'Лазерный указатель',icon: '🔴', desc: '+50 за клик',   cost: 15000,   bonus: 50 },
  { id: 'cyber',     name: 'Кибер-перчатка',    icon: '🤖', desc: '+200 за клик',  cost: 80000,   bonus: 200 },
  { id: 'godhand',   name: 'Рука бога',         icon: '✋', desc: '+1000 за клик', cost: 500000,  bonus: 1000 },
]
