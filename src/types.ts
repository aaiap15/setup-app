// 미학 3축 — v5 §4.2 취향 게이지
export interface Axes {
  mm: number // 미니멀 ↔ 맥시멀
  wc: number // 웜 ↔ 쿨
  ql: number // 조용함 ↔ 화려함
}

export type Category =
  | 'case' | 'pcb' | 'switch' | 'keycap' | 'stabilizer' | 'deskmat'
export type Release = 'in_stock' | 'group_buy' | 'pre_order' | 'discontinued'
export type SoundProfile = 'thocky' | 'clacky' | 'marble'

export interface Product {
  id: string
  cat: Category
  brand: string
  name: string
  price: number
  accent: string
  release: Release
  attrs: {
    layout?: string
    hotswap?: boolean
    pin?: number
    cover?: string[]
  }
  sound?: SoundProfile
  ax: Axes
}

export interface Mood {
  id: string
  name: string
  emoji: string
  copy: string
  accent: string
  tags: string[]
  sound: SoundProfile
  ax: Axes
}

export interface Archetype {
  emoji: string
  name: string
  t: Axes
}

export type SlotKey = Category
export type Picks = Partial<Record<SlotKey, string>>
export interface RecFilters { sound: string; use: string; budget: number }
