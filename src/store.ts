import { useSyncExternalStore } from 'react'
import type { Axes, Picks, RecFilters, Setup } from './types'
import { MOODS, PRODUCTS, SETUPS } from './data'
import { averageAxes, recommend, picksAxes } from './engine'

// 취향·좋아요·빌드 상태 — localStorage 영속
const KEY = 'setup-app-v1'

interface Persisted {
  likedMoods: string[]
  likedProducts: string[]
  likedSetups: string[]
  diagnosed: boolean
}
interface State extends Persisted {
  picks: Picks
  filters: RecFilters
  banner: string
  recPicks: Picks
}

function loadPersisted(): Persisted {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) { const o = JSON.parse(raw); if (o && Array.isArray(o.likedMoods)) return { likedSetups: [], ...o } }
  } catch { /* ignore */ }
  return { likedMoods: [], likedProducts: [], likedSetups: [], diagnosed: false }
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
    const { likedMoods, likedProducts, likedSetups, diagnosed } = state
    localStorage.setItem(KEY, JSON.stringify({ likedMoods, likedProducts, likedSetups, diagnosed }))
  } catch { /* ignore */ }
}
function commit(next: State) { state = next; persist(); listeners.forEach((l) => l()) }
function subscribe(l: () => void) { listeners.add(l); return () => { listeners.delete(l) } }
function snapshot() { return state }
export function useStore(): State { return useSyncExternalStore(subscribe, snapshot, snapshot) }

const setupById = (id: string) => SETUPS.find((s) => s.id === id)

// 취향 벡터 — 좋아요한 무드/셋업/제품의 미학 축 평균
export function tasteVec(): Axes | null {
  const axes: (Axes | null | undefined)[] = [
    ...state.likedMoods.map((id) => MOODS.find((m) => m.id === id)?.ax),
    ...state.likedSetups.map((id) => { const s = setupById(id); return s ? picksAxes(s.picks) : null }),
    ...state.likedProducts.map((id) => PRODUCTS.find((p) => p.id === id)?.ax),
  ]
  return averageAxes(axes.filter(Boolean) as Axes[])
}
export const likeCount = () => state.likedMoods.length + state.likedSetups.length + state.likedProducts.length

// ---- actions ----
export function toggleLikeMood(id: string) {
  const has = state.likedMoods.includes(id)
  commit({ ...state, likedMoods: has ? state.likedMoods.filter((x) => x !== id) : [...state.likedMoods, id] })
}
export function toggleLikeSetup(id: string) {
  const has = state.likedSetups.includes(id)
  commit({ ...state, likedSetups: has ? state.likedSetups.filter((x) => x !== id) : [...state.likedSetups, id] })
}
export function setDiagnosed(v: boolean) { commit({ ...state, diagnosed: v }) }
export function pick(slot: string, id: string) {
  const picks = { ...state.picks }
  if (picks[slot as keyof Picks] === id) delete picks[slot as keyof Picks]
  else picks[slot as keyof Picks] = id
  commit({ ...state, picks })
}
export function setFilters(f: Partial<RecFilters>) { commit({ ...state, filters: { ...state.filters, ...f } }) }
export function clearBanner() { if (state.banner) commit({ ...state, banner: '', recPicks: {} }) }

// 특정 셋업을 내 것으로 불러오기 (블로그 → 꾸미기)
export function applySetup(s: Setup) {
  commit({ ...state, picks: { ...s.picks }, recPicks: { ...s.picks }, banner: `‘${s.title}’를 내 것으로 불러왔어요. 마음에 드는 건 두고, 바꾸고 싶은 건 톡 눌러 바꿔보세요.` })
}

const clamp = (n: number) => Math.max(0, Math.min(1, n))

// 역방향 빌드 (v5 §2.3) — 취향 → 셋업. jitter=true면 셔플(다른 조합)
export function recommendInto(target: Axes | null, label: string, jitter = false) {
  let t = target || tasteVec() || { mm: .5, wc: .5, ql: .5 }
  if (jitter) { const j = () => (Math.random() - .5) * .22; t = { mm: clamp(t.mm + j()), wc: clamp(t.wc + j()), ql: clamp(t.ql + j()) } }
  const rec = recommend(t, state.filters)
  commit({
    ...state,
    picks: { ...rec.picks },
    recPicks: { ...rec.picks },
    banner: `${label}에 맞춰 ‘${rec.words}’ 셋업을 골라봤어요. 톡 눌러 바꿔도 돼요.`,
  })
}

export function resetAll() {
  commit({ likedMoods: [], likedProducts: [], likedSetups: [], diagnosed: false, picks: {}, filters: { sound: 'any', use: 'any', budget: 600000 }, banner: '', recPicks: {} })
}
