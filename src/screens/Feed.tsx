import { useState } from 'react'
import { SETUPS, VIBES } from '../data'
import { KeebScene } from '../components/KeebScene'
import { TasteGauge } from '../components/TasteGauge'
import { thock } from '../sound'
import { useStore, toggleLikeSetup, tasteVec, likeCount, recommendInto } from '../store'
import { byId, picksAxes, dist, totalOf, won } from '../engine'
import { navigate } from '../router'
import type { Setup } from '../types'

// 삶의 맥락 파생 (원칙 1)
export const sceneCtx = (s: Setup) => ({
  warm: s.tags.some((t) => ['웜', '레트로', '코랄', '우드'].includes(t)),
  mug: !s.tags.includes('RGB') && !s.tags.includes('게이밍'),
  night: s.tags.includes('다크') || s.moodId === 'm1' || s.moodId === 'm7',
})
const TIER_BADGE: Record<string, string> = { anchor: '✦ 드림', budget: '입문' }

// 둘러보기 — 블로그형 데스크셋업 공유 (v5 UI/UX)
export function Feed() {
  const { likedSetups, diagnosed } = useStore()
  const [playing, setPlaying] = useState<string | null>(null)
  const [vibe, setVibe] = useState('전체')
  const v = tasteVec()

  let list: Setup[] = vibe === '전체' ? [...SETUPS] : SETUPS.filter((s) => s.tags.includes(vibe))
  if (v) list.sort((a, b) => {
    const da = picksAxes(a.picks), db = picksAxes(b.picks)
    return (da ? dist(da, v) : 9) - (db ? dist(db, v) : 9)
  })

  function play(s: Setup) {
    const sw = s.picks.switch ? byId(s.picks.switch) : null
    thock(sw?.sound); setPlaying(s.id)
    setTimeout(() => setPlaying((p) => (p === s.id ? null : p)), 400)
  }

  return (
    <div className="shell">
      <div className="topbar">
        <span className="brand">⌨ <b>SETUP</b></span>
        {!diagnosed && <button className="reset" onClick={() => navigate('/diagnose')}>취향 진단</button>}
      </div>

      <p className="eyebrow">데스크셋업 둘러보기</p>
      <h1 className="h1">남의 책상을 구경하다,<br />내 취향을 발견해요</h1>

      <div style={{ marginTop: 16 }}><TasteGauge /></div>

      <div className="vibes">
        {VIBES.map((t) => (
          <button key={t} className={'vchip' + (vibe === t ? ' on' : '')} onClick={() => setVibe(t)}>{t}</button>
        ))}
      </div>

      <div className="feed">
        {list.map((s, idx) => {
          const kc = s.picks.keycap ? byId(s.picks.keycap) : null
          const accent = kc?.accent ?? '#2453DE'
          const liked = likedSetups.includes(s.id)
          const ar = ['3/4', '1/1', '4/5', '5/7', '3/4', '1/1'][idx % 6]
          const ctx = sceneCtx(s)
          return (
            <article key={s.id} className={'mood' + (playing === s.id ? ' playing' : '')} style={{ ['--a' as string]: accent }}>
              <div className="mood__frame" style={{ ['--ar' as string]: ar }}
                onClick={() => navigate('/setup/' + s.id)} onPointerDown={() => play(s)}>
                <KeebScene accent={accent} seed={s.id.charCodeAt(2)} playing={playing === s.id} {...ctx} />
                <span className="mood__sound">🔊 타건음</span>
                {TIER_BADGE[s.tier] && <span className={'tier-badge ' + s.tier}>{TIER_BADGE[s.tier]}</span>}
                <button className={'mood__like' + (liked ? ' on' : '')}
                  onClick={(e) => { e.stopPropagation(); toggleLikeSetup(s.id) }} aria-label="좋아요">
                  {liked ? '♥' : '♡'}
                </button>
              </div>
              <div className="mood__body" onClick={() => navigate('/setup/' + s.id)}>
                <p className="mood__caption">{s.caption}</p>
                <div className="mood__name">{s.title}</div>
                <div className="mood__meta"><span className="mood__creator">{s.creator}</span><span className="mood__space">· {s.space}</span></div>
                <div className="mood__price">총 {won(totalOf(s.picks))}</div>
                <div className="mood__tags">{s.tags.filter((t) => t !== '입문' && t !== '드림').slice(0, 2).map((t) => <span key={t} className="tag">{t}</span>)}</div>
              </div>
            </article>
          )
        })}
      </div>

      <button className={'float-cta' + (likeCount() > 0 ? ' show' : '')} onClick={() => { recommendInto(null, '내 취향'); navigate('/build') }}>
        ✨ 이 취향으로 내 공간 꾸미기
      </button>
    </div>
  )
}
