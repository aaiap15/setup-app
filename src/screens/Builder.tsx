import { useState, useEffect } from 'react'
import { SLOTS, SOUND_MOOD, SETUPS } from '../data'
import { DeskPOV } from '../components/DeskPOV'
import { thock } from '../sound'
import { useStore, pick, recommendInto, tasteVec, applySetup } from '../store'
import {
  byId, byCat, won, issues, compatScore, isCompatible, itemFlag, totalOf, accentOf,
} from '../engine'
import { navigate, useHash } from '../router'
import type { SlotKey } from '../types'

// 내 것 꾸미기 — 단순·재밌게. 소리·색은 감성으로 (v5 §4.4)
export function Builder() {
  const { picks, banner, recPicks } = useStore()
  const [active, setActive] = useState<SlotKey>('case')
  const hash = useHash()

  // 딥링크: /build/<setupId> → 그 셋업을 내 책상에 불러오기
  useEffect(() => {
    const m = hash.match(/^\/build\/(.+)$/)
    if (m) { const s = SETUPS.find((x) => x.id === m[1]); if (s) { applySetup(s); navigate('/build') } }
  }, [hash])

  const iss = issues(picks)
  const warns = iss.filter((i) => i.sev !== 'ok')
  const reqDone = SLOTS.filter((s) => s.req && picks[s.key]).length
  const total = totalOf(picks)
  const cs = compatScore(picks)
  const accent = accentOf(picks)
  const list = byCat(active).filter((p) => isCompatible(p, picks))

  function tap(id: string) {
    pick(active, id)
    const p = byId(id)
    if (p?.cat === 'switch') thock(p.sound)
    if (picks[active] !== id) {
      const order = SLOTS.map((s) => s.key)
      for (let j = order.indexOf(active) + 1; j < order.length; j++) {
        if (SLOTS[j].req && !picks[SLOTS[j].key]) { setActive(SLOTS[j].key); break }
      }
    }
  }

  // 제품을 감성으로 설명 (스펙 아님)
  const feelOf = (p: ReturnType<typeof byId>) => {
    if (!p) return ''
    if (p.cat === 'switch' && p.sound) return SOUND_MOOD[p.sound]
    if (p.cat === 'keycap') return '오늘의 색'
    if (p.cat === 'case') return '단단한 무게감'
    if (p.cat === 'deskmat') return '책상의 바탕'
    return ''
  }

  return (
    <div className="shell build" style={{ paddingTop: 12, ['--theme-accent' as string]: accent, ['--a' as string]: accent }}>
      <div className="topbar"><span className="brand">⌨ <b>SETUP</b> · 내 것 꾸미기</span></div>

      {banner && <div className="banner"><span>✨</span><span>{banner}</span></div>}

      <div className="build-grid">
      <div className="build-left">
      {/* 라이브 프리뷰 — 내 의자에서 본 내 책상 (1인칭 POV) */}
      <div className="bhero">
        <DeskPOV picks={picks} />
        <div className="bhero__scrim" />
        <div className="bhero__status">
          <span>호환 {Object.keys(picks).length ? cs : '–'}</span>
          <span>·</span>
          <span>{won(total)}</span>
          <span>·</span>
          <span>{Math.round(reqDone / 4 * 100)}% 완성</span>
        </div>
        <button className="dice" onClick={() => recommendInto(tasteVec(), '내 취향', true)} aria-label="다른 조합">🎲</button>
      </div>
      </div>

      <div className="build-right">
      {warns.length > 0 && (
        <div className="compat">
          {warns.map((i, k) => <div key={k} className={'cmsg ' + i.sev}><span>{i.sev === 'warn' ? '⚠️' : '⛔'}</span><span>{i.msg}</span></div>)}
        </div>
      )}

      {/* 슬롯 — 톡 눌러 바꾸기 */}
      <div className="slots">
        {SLOTS.map((sl) => {
          const p = picks[sl.key] ? byId(picks[sl.key]!) : null
          return (
            <button key={sl.key} className={'slot' + (active === sl.key ? ' on' : '')} onClick={() => setActive(sl.key)}>
              <span className="k">{sl.label}</span>
              <span className={'v' + (p ? '' : ' empty')}>{p ? p.name : '고르기'}</span>
            </button>
          )
        })}
      </div>

      <button className="cta" disabled={reqDone < 3} onClick={() => navigate('/result')}>완성하기 →</button>

      <h2 className="picker-title">{SLOTS.find((s) => s.key === active)!.label} 고르기</h2>
      {list.length === 0
        ? <div className="empty">먼저 케이스를 고르면 어울리는 걸 보여드릴게요.</div>
        : <div className="items">
          {list.map((p) => {
            const sel = picks[active] === p.id
            const reco = recPicks[active] === p.id && !sel
            const flag = itemFlag(p, picks)
            return (
              <button key={p.id} className={'item' + (sel ? ' on' : '') + (reco ? ' reco' : '')} onClick={() => tap(p.id)}>
                {sel ? <span className="check">✓</span> : p.cat === 'switch'
                  ? <span className="listen" onClick={(e) => { e.stopPropagation(); thock(p.sound) }}>🔊</span> : null}
                <div className="sw" style={{ background: p.accent }} />
                <div className="nm">{p.name}</div>
                <div className="feel">{reco ? '취향 추천' : flag && flag.sev === 'block' ? flag.t : feelOf(p)}</div>
                <div className="price">{won(p.price)}</div>
              </button>
            )
          })}
        </div>}
      </div>
      </div>
    </div>
  )
}
