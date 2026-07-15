// 절차적 셋업 렌더 (키캡 그리드) — 외부 이미지 0
export function Keys({ n = 32, seed = 3, cols }: { n?: number; seed?: number; cols?: number }) {
  return (
    <div
      className="mood__keys"
      style={cols ? { gridTemplateColumns: `repeat(${cols},1fr)` } : undefined}
      aria-hidden="true"
    >
      {Array.from({ length: n }).map((_, i) => (
        <span key={i} className={(i * 7 + seed * 3) % 6 === 0 ? 'lit' : ''} />
      ))}
    </div>
  )
}

export function hashSeed(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 997
  return h
}
