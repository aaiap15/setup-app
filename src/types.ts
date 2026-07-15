// 미학 3축 — v5 §4.2 취향 게이지
export interface Axes {
  mm: number // 미니멀 ↔ 맥시멀
  wc: number // 웜 ↔ 쿨
  ql: number // 조용함 ↔ 화려함
}

export type Category =
  | 'case' | 'pcb' | 'switch' | 'keycap' | 'stabilizer' | 'deskmat'
  | 'monitor' | 'mouse' | 'headset'   // 데스크 장비 (POV에 반영)
export type Release = 'in_stock' | 'group_buy' | 'pre_order' | 'discontinued'
export type SoundProfile = 'thocky' | 'clacky' | 'marble'
export type MonitorForm = 'standard' | 'ultrawide' | 'dual' | 'gaming'

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
    form?: MonitorForm   // 모니터 형태
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

// 큐레이션 셋업 포스트 (v5 §2.1 · 블로그형 데스크셋업 공유)
export type Tier = 'anchor' | 'main' | 'budget' // 앵커(드림) / 주력 / 변주(저예산)
export interface Setup {
  id: string
  title: string
  caption: string    // "오늘의 무드" 한 줄 서사 ("새벽 2시, 마지막 커밋의 책상")
  creator: string
  moodId: string
  tier: Tier
  space: string      // 삶의 맥락 (원룸 구석 / 게이밍 데스크 / 작업실 …)
  story: string      // 감성 이야기 (스펙 아님)
  tags: string[]
  picks: Picks
}
