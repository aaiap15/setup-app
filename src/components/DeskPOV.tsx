import { byId } from '../engine'
import type { Picks } from '../types'

// 내 것 꾸미기 전용 — 1인칭 데스크 POV
// 내 의자에 앉아 내 책상을 보는 시점: 모니터(앞) · 키보드(데스크매트 위) · 마우스(오른쪽)
// 내가 고른 장비가 실제로 놓여 있는 것처럼 (키보드=케이스/키캡 컬러, 매트=데스크매트 색)

const ROWS: number[][] = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
  [1.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.5],
  [1.75, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2.25],
  [2.25, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.75, 1],
  [1.25, 1.25, 1.25, 6.25, 1.25, 1, 1, 1],
]
function isAccent(r: number, i: number, len: number): boolean {
  if (r === 0 && i === 0) return true
  if (r === 2 && i === len - 1) return true
  if (r === 4 && i === 3) return true
  if (r === 3 && i === len - 1) return true
  return (r * 7 + i * 13) % 12 === 0
}

export function DeskPOV({ picks, playing = false }: { picks: Picks; playing?: boolean }) {
  const kb = (picks.keycap && byId(picks.keycap)?.accent) || (picks.case && byId(picks.case)?.accent) || '#2453DE'
  const mat = (picks.deskmat && byId(picks.deskmat)?.accent) || '#1b1e26'
  const hasKb = !!(picks.case || picks.keycap)

  return (
    <div className={'pov' + (playing ? ' playing' : '')} style={{ ['--a' as string]: kb, ['--mat' as string]: mat }} aria-hidden="true">
      <div className="pov__wall" />
      {/* 모니터 (앞에 세워짐) */}
      <div className="pov__monitor"><span className="pov__screen" /></div>
      <div className="pov__stand" />
      <div className="pov__beam" />
      {/* 책상 + 데스크매트 (원근) */}
      <div className="pov__desk" />
      <div className="pov__mat" />
      {/* 마우스 (오른쪽) */}
      <div className="pov__mouse"><span className="pov__mwheel" /></div>
      {/* 커피잔 (왼쪽) */}
      <div className="pov__mug"><span className="pov__steam a" /><span className="pov__steam b" /></div>
      {/* 키보드 (내 손 앞, 매트 위) */}
      <div className="pov__kbwrap">
        {hasKb ? (
          <div className="pov__board">
            {ROWS.map((row, r) => (
              <div className="prow" key={r}>
                {row.map((w, i) => (
                  <span key={i} className={'pkey' + (isAccent(r, i, row.length) ? ' accent' : '')} style={{ flexGrow: w }} />
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="pov__empty">케이스와 키캡을 고르면<br />내 책상에 놓여요</div>
        )}
      </div>
      <div className="pov__vig" />
    </div>
  )
}
