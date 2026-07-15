import { useState } from 'react'
import { MOODS } from '../data'
import type { Mood } from '../types'
import { Keys } from '../components/Keys'
import { TasteGauge } from '../components/TasteGauge'
import { thock } from '../sound'
import { useStore, toggleLikeMood, tasteVec, likeCount, recommendInto } from '../store'
import { dist } from '../engine'
import { navigate } from '../router'

// 무드 피드 — 소리 나는 핀터레스트 (v5 §2.1 / §4.3)
export function Feed() {
  const { likedMoods, diagnosed } = useStore()
  const [playing, setPlaying] = useState<string | null>(null)
  const v = tasteVec()

  const moods = [...MOODS]
  if (v) moods.sort((a, b) => dist(a.ax, v) - dist(b.ax, v))

  function play(m: Mood) {
    thock(m.sound); setPlaying(m.id)
    setTimeout(() => setPlaying((p) => (p === m.id ? null : p)), 400)
  }
  function dress() {
    recommendInto(null, '내 취향')
    navigate('/build')
  }

  return (
    <div className="shell">
      <div className="topbar">
        <span className="brand">⌨ <b>SETUP</b></span>
        {!diagnosed && <button className="reset" onClick={() => navigate('/diagnose')}>취향 진단</button>}
      </div>

      <p className="eyebrow">분위기 둘러보기</p>
      <h1 className="h1">끌리는 분위기에 ♡ 하면, 취향이 완성돼요</h1>

      <div style={{ marginTop: 16 }}><TasteGauge /></div>

      <div className="feed">
        {moods.map((m, idx) => {
          const liked = likedMoods.includes(m.id)
          return (
            <article key={m.id} className={'mood' + (playing === m.id ? ' playing' : '')}>
              <div
                className="mood__img"
                style={{ ['--a' as string]: m.accent, ['--ar' as string]: idx % 3 === 1 ? '1/1' : '3/4' }}
                onPointerDown={() => play(m)}
              >
                <Keys n={24} seed={m.id.charCodeAt(1)} />
                <span className="mood__sound">🔊 {m.name}</span>
                <button
                  className={'mood__like' + (liked ? ' on' : '')}
                  onClick={(e) => { e.stopPropagation(); toggleLikeMood(m.id) }}
                  aria-label="좋아요"
                >{liked ? '♥' : '♡'}</button>
              </div>
              <div className="mood__meta">
                <div className="mood__name">{m.emoji} {m.name}</div>
                <div className="mood__tags">{m.tags.map((t) => <span key={t} className="tag">{t}</span>)}</div>
              </div>
            </article>
          )
        })}
      </div>

      <button className={'float-cta' + (likeCount() > 0 ? ' show' : '')} onClick={dress}>
        ✨ 이 취향으로 내 공간 꾸미기
      </button>
    </div>
  )
}
