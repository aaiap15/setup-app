import type { Axes, Product, Picks, RecFilters } from './types'
import { PRODUCTS, ARCHES } from './data'

export const dist = (a: Axes, b: Axes) =>
  Math.sqrt((a.mm - b.mm) ** 2 + (a.wc - b.wc) ** 2 + (a.ql - b.ql) ** 2)

export const byId = (id: string) => PRODUCTS.find((p) => p.id === id)
export const byCat = (c: string) => PRODUCTS.filter((p) => p.cat === c)
export const won = (n: number) => '₩' + n.toLocaleString('ko-KR')

export function averageAxes(list: Axes[]): Axes | null {
  if (!list.length) return null
  const a = list.reduce((s, x) => ({ mm: s.mm + x.mm, wc: s.wc + x.wc, ql: s.ql + x.ql }), { mm: 0, wc: 0, ql: 0 })
  return { mm: a.mm / list.length, wc: a.wc / list.length, ql: a.ql / list.length }
}

export function archetypeOf(a: Axes) {
  let best = ARCHES[0], bd = 9
  for (const A of ARCHES) { const d = dist(a, A.t); if (d < bd) { bd = d; best = A } }
  return { arche: best, pct: Math.round(Math.max(56, Math.min(97, 100 - bd * 68))) }
}

// v5 §4: 스펙 아니라 감성 언어
export function vibeWords(a: Axes): string {
  const w: string[] = []
  w.push(a.wc < .42 ? '쿨톤' : a.wc > .6 ? '웜톤' : '뉴트럴')
  w.push(a.mm < .4 ? '미니멀' : a.mm > .6 ? '맥시멀' : '밸런스')
  w.push(a.ql < .4 ? '조용함' : a.ql > .6 ? '화려함' : '중간')
  return w.join(' · ')
}

// ---- 호환성 엔진 (화면 인프라로 깔림, 파고들 때만 드러남) ----
export interface Issue { sev: 'ok' | 'warn' | 'block'; msg: string }
export function issues(picks: Picks): Issue[] {
  const out: Issue[] = []
  const cs = picks.case && byId(picks.case), pc = picks.pcb && byId(picks.pcb)
  const sw = picks.switch && byId(picks.switch), kc = picks.keycap && byId(picks.keycap)
  if (cs && pc) {
    if (cs.attrs.layout !== pc.attrs.layout) out.push({ sev: 'block', msg: `케이스(${cs.attrs.layout})와 PCB(${pc.attrs.layout}) 레이아웃 불일치` })
    else out.push({ sev: 'ok', msg: `케이스·PCB 레이아웃 호환 (${cs.attrs.layout})` })
  }
  if (cs && kc && !(kc.attrs.cover ?? []).includes(cs.attrs.layout!)) out.push({ sev: 'warn', msg: `이 키캡셋은 ${cs.attrs.layout} 배열을 다 못 채울 수 있어요` })
  if (pc && sw) {
    if (pc.attrs.hotswap && sw.attrs.pin === 3) out.push({ sev: 'warn', msg: '핫스왑 기판엔 5핀 스위치 권장 (3핀도 장착 가능)' })
    if (!pc.attrs.hotswap) out.push({ sev: 'warn', msg: '솔더 기판이에요 — 납땜이 필요합니다' })
  }
  return out
}
export function compatScore(picks: Picks): number {
  let pen = 0
  for (const i of issues(picks)) pen += i.sev === 'block' ? 45 : i.sev === 'warn' ? 12 : 0
  return Math.max(0, 100 - pen)
}
export function isCompatible(prod: Product, picks: Picks): boolean {
  const cs = picks.case && byId(picks.case), pc = picks.pcb && byId(picks.pcb)
  if (prod.cat === 'pcb' && cs) return prod.attrs.layout === cs.attrs.layout
  if (prod.cat === 'case' && pc) return prod.attrs.layout === pc.attrs.layout
  if (prod.cat === 'keycap' && cs) return (prod.attrs.cover ?? []).includes(cs.attrs.layout!)
  return true
}
export function itemFlag(prod: Product, picks: Picks): { sev: string; t: string } | null {
  const cs = picks.case && byId(picks.case), pc = picks.pcb && byId(picks.pcb)
  if (prod.cat === 'pcb' && cs && prod.attrs.layout !== cs.attrs.layout) return { sev: 'block', t: '레이아웃 불일치' }
  if (prod.cat === 'case' && pc && prod.attrs.layout !== pc.attrs.layout) return { sev: 'block', t: '레이아웃 불일치' }
  if (prod.cat === 'keycap' && cs && !(prod.attrs.cover ?? []).includes(cs.attrs.layout!)) return { sev: 'warn', t: '커버리지 주의' }
  if (prod.cat === 'switch' && pc && pc.attrs.hotswap && prod.attrs.pin === 3) return { sev: 'warn', t: '3핀' }
  return null
}

// ---- 역방향 빌드: 감각 입력 → 셋업 (v5 §2.3) ----
function pickBest<T>(list: T[], score: (p: T) => number): T | null {
  let best: T | null = null, bs = -1e9
  for (const p of list) { const s = score(p); if (s > bs) { bs = s; best = p } }
  return best
}
export function recommend(target: Axes, f: RecFilters): { picks: Picks; words: string } {
  const budget = f.budget || 600000
  const picks: Picks = {}
  const cs = pickBest(byCat('case'), (p) => -dist(p.ax, target) - (p.price > budget * .45 ? .6 : 0))!
  picks.case = cs.id
  const pc = pickBest(byCat('pcb').filter((p) => p.attrs.layout === cs.attrs.layout),
    (p) => -dist(p.ax, target) + (f.use === 'game' && p.attrs.hotswap ? .3 : 0))
  if (pc) picks.pcb = pc.id
  const kc = pickBest(byCat('keycap').filter((p) => (p.attrs.cover ?? []).includes(cs.attrs.layout!)),
    (p) => -dist(p.ax, target) * 1.4 - (p.price > budget * .4 ? .4 : 0))
  if (kc) picks.keycap = kc.id
  const sw = pickBest(byCat('switch'), (p) => {
    let s = -dist(p.ax, target)
    if (f.sound === 'quiet') s += (p.sound === 'thocky' || p.sound === 'marble') ? .5 : -.4
    else if (f.sound === 'thock') s += p.sound === 'thocky' ? .6 : -.2
    else if (f.sound === 'click') s += p.sound === 'clacky' ? .6 : -.3
    if (f.use === 'type') s += p.sound !== 'clacky' ? .2 : -.2
    if (pc && pc.attrs.hotswap && p.attrs.pin === 3) s -= .15
    return s
  })
  if (sw) picks.switch = sw.id
  return { picks, words: vibeWords(target) }
}

export const totalOf = (picks: Picks) =>
  Object.values(picks).reduce((s, id) => s + (byId(id!)?.price ?? 0), 0)
export const accentOf = (picks: Picks) =>
  (picks.keycap && byId(picks.keycap)?.accent) || (picks.case && byId(picks.case)?.accent) || '#2453DE'
