// 데스크 '장면' — 장비샷이 아니라 삶의 맥락 (원칙 1)
// 모니터 글로우 · 스탠드 조명 · 김 나는 커피잔 · 창밖 어스름 + 각도 있는 키보드
const ROWS: number[][] = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
  [1.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.5],
  [1.75, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2.25],
  [2.25, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.75, 1],
  [1.25, 1.25, 1.25, 6.25, 1.25, 1, 1, 1],
]
function isAccent(r: number, i: number, len: number, seed: number): boolean {
  if (r === 0 && i === 0) return true
  if (r === 2 && i === len - 1) return true
  if (r === 4 && i === 3) return true
  if (r === 3 && i === len - 1) return true
  return (r * 7 + i * 13 + seed * 5) % 12 === 0
}

export function KeebScene({
  accent, seed = 1, playing = false, className = '',
  warm = false, mug = false, night = false,
}: {
  accent: string; seed?: number; playing?: boolean; className?: string
  warm?: boolean; mug?: boolean; night?: boolean
}) {
  const glowX = seed % 3 === 0 ? '26%' : seed % 3 === 1 ? '74%' : '48%'
  const tilt = 38 + (seed % 4) * 3
  const rot = -11 - (seed % 3) * 4
  const lampSide = seed % 2 === 0 ? 'left' : 'right'
  return (
    <div
      className={'scene ' + className + (playing ? ' playing' : '') + (night ? ' night' : '') + (warm ? ' warm' : '')}
      style={{ ['--a' as string]: accent, ['--gx' as string]: glowX }}
      aria-hidden="true"
    >
      {/* 창밖 어스름 */}
      <div className="scene__window" />
      {/* 모니터 + 화면 글로우 (책상의 주 광원) */}
      <div className="scene__monitor"><span className="scene__screen" /></div>
      <div className="scene__beam" />
      {/* 액센트 앰비언트 */}
      <div className="scene__glow" />
      {/* 스탠드 조명 */}
      {warm && <div className={'scene__lamp scene__lamp--' + lampSide} />}
      {/* 키보드 */}
      <div className="scene__deck">
        <div className="scene__under" />
        <div className="scene__board" style={{ transform: `rotateX(${tilt}deg) rotateZ(${rot}deg)` }}>
          {ROWS.map((row, r) => (
            <div className="krow" key={r}>
              {row.map((w, i) => (
                <span key={i} className={'key' + (isAccent(r, i, row.length, seed) ? ' accent' : '')} style={{ flexGrow: w }} />
              ))}
            </div>
          ))}
        </div>
      </div>
      {/* 김 나는 커피잔 */}
      {mug && (
        <div className="scene__mug">
          <span className="mug__steam s1" /><span className="mug__steam s2" />
          <span className="mug__cup" />
        </div>
      )}
      <div className="scene__grain" />
      <div className="scene__vig" />
    </div>
  )
}
