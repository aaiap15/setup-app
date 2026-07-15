// 절차적 셋업 씬 — 사진 없이도 분위기 있는 제품샷처럼 (각도·언더글로우·그레인·비네트)
// 실제 키보드 레이아웃(스태거드 로우 + 스페이스바)이라 "구경하고 싶은" 이미지로 읽힘

// 각 로우의 키 폭(유닛). 65% 감성 배열을 단순화
const ROWS: number[][] = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
  [1.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.5],
  [1.75, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2.25],
  [2.25, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.75, 1],
  [1.25, 1.25, 1.25, 6.25, 1.25, 1, 1, 1],
]

function isAccent(r: number, i: number, len: number, seed: number): boolean {
  if (r === 0 && i === 0) return true              // esc
  if (r === 2 && i === len - 1) return true         // enter
  if (r === 4 && i === 3) return true               // spacebar
  if (r === 3 && i === len - 1) return true         // arrow
  return (r * 7 + i * 13 + seed * 5) % 12 === 0     // 시드 기반 노벨티 키
}

export function KeebScene({
  accent, seed = 1, playing = false, className = '',
}: { accent: string; seed?: number; playing?: boolean; className?: string }) {
  const glowX = seed % 3 === 0 ? '26%' : seed % 3 === 1 ? '74%' : '48%'
  const tilt = 38 + (seed % 4) * 3          // 38~47deg (덜 눕게)
  const rot = -11 - (seed % 3) * 4          // -11~-19deg
  return (
    <div
      className={'scene ' + className + (playing ? ' playing' : '')}
      style={{ ['--a' as string]: accent, ['--gx' as string]: glowX }}
      aria-hidden="true"
    >
      <div className="scene__glow" />
      <div className="scene__deck">
        <div className="scene__under" />
        <div className="scene__board" style={{ transform: `rotateX(${tilt}deg) rotateZ(${rot}deg)` }}>
          {ROWS.map((row, r) => (
            <div className="krow" key={r}>
              {row.map((w, i) => (
                <span
                  key={i}
                  className={'key' + (isAccent(r, i, row.length, seed) ? ' accent' : '')}
                  style={{ flexGrow: w }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="scene__grain" />
      <div className="scene__vig" />
    </div>
  )
}
