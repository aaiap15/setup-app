import { useSyncExternalStore } from 'react'
import type { Axes, Picks, RecFilters } from './types'
import { MOODS, PRODUCTS } from './data'
import { averageAxes, recommend } from './engine'

// 취향·좋아요·빌드 상태 — localStorage 영속
const KEY = 'setup-app-v1'

interface Persisted {
  likedMoods: string[]
  likedProducts: string[]
  diagnosed: boolean
}
interface State extends Persisted {
  picks: Picks
  filters: RecFilters
  banner: string
  recPicks: Picks // 추천으로 채워진 슬롯 (표시용)
}

function loadPersisted(): Persisted {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) { const o = JSON.parse(raw); if (o && Array.isArray(o.likedMoods)) return o }
  } catch { /* ignore */ }
  return { likedMoods: [], likedProducts: [], diagnosed: false }
}

let state: State = {
  ...loadPersisted(),
  picks: {},
  filters: { sound: 'any', use: 'any', budget: 600000 },
  banner: '',
  recPicks: {},
}
const listeners = new Set<() => void>()

function persist() {
  try {
    const { likedMoods, likedProducts, diagnosed } = state
    localStorage.setItem(KEY, JSON.stringify({ likedMoods, likedProducts, diagnosed }))
  } catch { /* ignore */ }
}
function commit(next: State) { state = next; persist(); listeners.forEach((l) => l()) }

function subscribe(l: () => void) { listeners.add(l); return () => { listeners.delete(l) } }
function snapshot() { return state }
export function useStore(): State { return useSyncExternalStore(subscribe, snapshot, snapshot) }

// 취향 벡터 — 좋아요한 무드/제품의 미학 축 평균
export function tasteVec() {
  const axes = [
    ...state.likedMoods.map((id) => MOODS.find((m) => m.id === id)?.ax),
    ...state.likedProducts.map((id) => PRODUCTS.find((p) => p.id === id)?.ax),
  ].filter(Boolean) as import('./types').Axes[]
  return averageAxes(axes)
}
export const likeCount = () => state.likedMoods.length + state.likedProducts.length

// ---- actions ----
export function toggleLikeMood(id: string) {
  const has = state.likedMoods.includes(id)
  commit({ ...state, likedMoods: has ? state.likedMoods.filter((x) => x !== id) : [...state.likedMoods, id] })
}
export function setDiagnosed(v: boolean) { commit({ ...state, diagnosed: v }) }
export function setPicks(picks: Picks) { commit({ ...state, picks }) }
export function pick(slot: string, id: string) {
  const picks = { ...state.picks }
  if (picks[slot as keyof Picks] === id) delete picks[slot as keyof Picks]
  else picks[slot as keyof Picks] = id
  commit({ ...state, picks })
}
export function setFilters(f: Partial<RecFilters>) { commit({ ...state, filters: { ...state.filters, ...f } }) }
export function clearBanner() { if (state.banner) commit({ ...state, banner: '', recPicks: {} }) }

// 역방향 빌드 실행 (v5 §2.3) — 취향/무드 → 셋업 추천
export function recommendInto(target: Axes | null, label: string) {
  const t = target || tasteVec() || { mm: .5, wc: .5, ql: .5 }
  const rec = recommend(t, state.filters)
  commit({
    ...state,
    picks: { ...rec.picks },
    recPicks: { ...rec.picks },
    banner: `${label}에 맞춰 ‘${rec.words}’ 셋업을 추천했어요. 마음에 드는 건 두고, 바꾸고 싶은 건 직접 골라도 돼요.`,
  })
}

export function resetAll() {
  commit({ likedMoods: [], likedProducts: [], diagnosed: false, picks: {}, filters: { sound: 'any', use: 'any', budget: 600000 }, banner: '', recPicks: {} })
}
