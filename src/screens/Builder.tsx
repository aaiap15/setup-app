import { SLOTS, REL_KO } from '../data'
import { Keys } from '../components/Keys'
import { thock } from '../sound'
import { useStore, pick, setFilters, recommendInto, tasteVec } from '../store'
import {
  byId, byCat, won, issues, compatScore, isCompatible, itemFlag, totalOf, accentOf,
} from '../engine'
import { navigate } from '../router'
import { useState } from 'react'
import type { SlotKey } from '../types'

const SOUND_OPTS = [{ k: 'any', l: '무관' }, { k: 'quiet', l: '조용' }, { k: 'thock', l: '톡톡' }, { k: 'click', l: '클릭' }]
const USE_OPTS = [{ k: 'any', l: '무관' }, { k: 'type', l: '타이핑' }, { k: 'game', l: '게이밍' }]
const BUDGET_OPTS = [{ k: 300000, l: '30만' }, { k: 600000, l: '60만' }, { k: 1000000, l: '100만' }]

export function Builder() {
  const { picks, filters, banner, recPicks } = useStore()
  const [active, setActive] = useState<SlotKey>('case')
  const [compatOnly, setCompatOnly] = useState(true)

  const iss = issues(picks)
  const reqDone = SLOTS.filter((s) => s.req && picks[s.key]).length
  const total = totalOf(picks)
  const budget = filters.budget || 600000
  const cs = compatScore(picks)

  let list = byCat(active)
  if (compatOnly) list = list.filter((p) => isCompatible(p, picks))

  function tapItem(id: string) {
    pick(active, id)
    const p = byId(id)
    if (p?.cat === 'switch') thock(p.sound)
    if (picks[active] !== id) {
      const order = SLOTS.map((s) => s.key)
      const i = order.indexOf(active)
      for (let j = i + 1; j < order.length; j++) { if (SLOTS[j].req && !picks[SLOTS[j].key]) { setActive(SLOTS[j].key); break } }
    }
  }

  return (
    <div className="shell" style={{ paddingTop: 14, ['--theme-accent' as string]: accentOf(picks) }}>
      <div className="topbar"><span className="brand">⌨ <b>SETUP</b> · 꾸미기</span></div>

      {banner && <div className="banner"><span>✨</span><span>{banner}</span></div>}

      <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 14, padding: 14, marginBottom: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>✨ 취향으로 추천받기</div>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <Chips label="소리" opts={SOUND_OPTS} val={filters.sound} on={(v) => setFilters({ sound: String(v) })} />
          <Chips label="용도" opts={USE_OPTS} val={filters.use} on={(v) => setFilters({ use: String(v) })} />
          <Chips label="예산" opts={BUDGET_OPTS} val={filters.budget} on={(v) => setFilters({ budget: Number(v) })} />
          <button className="cta" style={{ width: 'auto', marginLeft: 'auto', padding: '11px 18px' }}
            onClick={() => recommendInto(tasteVec(), tasteVec() ? '내 취향' : '인기 밸런스')}>
            추천받기 →
          </button>
        </div>
      </div>

      <div className="slots">
        {SLOTS.map((sl) => {
          const p = picks[sl.key] ? byId(picks[sl.key]!) : null
          const blocked = iss.some((i) => i.sev === 'block' && i.msg.includes(sl.label))
          return (
            <button key={sl.key} className={'slot' + (active === sl.key ? ' on' : '')} onClick={() => setActive(sl.key)}>
              <span className="k">{sl.label}{sl.req ? '' : ' (선택)'}</span>
              <span className={'v' + (p ? '' : ' empty')}>
                {p ? p.name : '비어있음'} {p ? (blocked ? '⛔' : '✓') : (sl.req ? '+' : '○')}
              </span>
            </button>
          )
        })}
      </div>

      <div className="gauges3">
        <div className="g3"><div className="k">예산</div><div className="v">{won(total)}</div>
          <div className={'bar' + (total > budget ? ' crit' : '')}><i style={{ width: `${Math.min(100, Math.round(total / budget * 100))}%` }} /></div></div>
        <div className="g3"><div className="k">호환성</div><div className="v">{Object.keys(picks).length ? cs + '점' : '–'}</div>
          <div className={'bar ' + (cs >= 90 ? 'good' : cs >= 60 ? 'warn' : 'crit')}><i style={{ width: `${cs}%` }} /></div></div>
        <div className="g3"><div className="k">완성도</div><div className="v">{Math.round(reqDone / 4 * 100)}%</div>
          <div className="bar"><i style={{ width: `${Math.round(reqDone / 4 * 100)}%` }} /></div></div>
      </div>

      <div className="compat">
        {iss.length === 0
          ? <div className="cmsg faint">부품을 담으면 호환성을 실시간으로 체크해요.</div>
          : iss.map((i, k) => <div key={k} className={'cmsg ' + i.sev}><span>{i.sev === 'ok' ? '✅' : i.sev === 'warn' ? '⚠️' : '⛔'}</span><span>{i.msg}</span></div>)}
      </div>

      <button className="cta" disabled={reqDone < 3} onClick={() => navigate('/result')}>완성하기 →</button>

      <div className="picker-h">
        <h2>{SLOTS.find((s) => s.key === active)!.label} 고르기</h2>
        <button className={'toggle' + (compatOnly ? ' on' : '')} onClick={() => setCompatOnly((c) => !c)}>
          <span className="dot" /> 맞는 것만 보기
        </button>
      </div>

      {list.length === 0
        ? <div className="empty">호환되는 제품이 없어요. “맞는 것만 보기”를 꺼보세요.</div>
        : <div className="items">
          {list.map((p) => {
            const sel = picks[active] === p.id
            const reco = recPicks[active] === p.id && !sel
            const flag = itemFlag(p, picks)
            return (
              <button key={p.id} className={'item' + (sel ? ' on' : '') + (reco ? ' reco' : '')} onClick={() => tapItem(p.id)}>
                {sel ? <span className="check">✓</span> : p.cat === 'switch'
                  ? <span className="listen" onClick={(e) => { e.stopPropagation(); thock(p.sound) }}>🔊</span> : null}
                <div className="sw" style={{ background: p.accent }} />
                <div className="nm">{p.name}</div>
                {reco ? <span className="flag reco">추천</span>
                  : flag ? <span className={'flag ' + flag.sev}>{flag.t}</span>
                    : <span className="flag" style={{ color: 'var(--ink-soft)' }}>{REL_KO[p.release]}</span>}
                <div className="price">{won(p.price)}</div>
              </button>
            )
          })}
        </div>}
    </div>
  )
}

function Chips({ label, opts, val, on }: { label: string; opts: { k: string | number; l: string }[]; val: string | number; on: (v: string | number) => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span className="k mono" style={{ fontSize: 11, color: 'var(--ink-soft)', textTransform: 'uppercase' }}>{label}</span>
      <div style={{ display: 'flex', gap: 6 }}>
        {opts.map((o) => (
          <button key={o.k} className={'toggle' + (val === o.k ? ' on' : '')} style={{ padding: '6px 11px' }} onClick={() => on(o.k)}>{o.l}</button>
        ))}
      </div>
    </div>
  )
}
