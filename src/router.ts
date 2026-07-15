import { useSyncExternalStore } from 'react'

// 의존성 없는 해시 라우터
function getHash(): string {
  const h = window.location.hash.replace(/^#/, '')
  return h.length ? h : '/'
}
const subs = new Set<() => void>()
window.addEventListener('hashchange', () => subs.forEach((s) => s()))

export function useHash(): string {
  return useSyncExternalStore(
    (cb) => { subs.add(cb); return () => { subs.delete(cb) } },
    getHash, getHash,
  )
}
export function navigate(to: string) {
  window.location.hash = to
  window.scrollTo({ top: 0 })
}
