import { SETUPS, MOODS, SOUND_MOOD } from '../data'
import { KeebScene } from '../components/KeebScene'
import { sceneCtx } from './Feed'
import { thock } from '../sound'
import { useStore, toggleLikeSetup, applySetup } from '../store'
import { byId, won, totalOf } from '../engine'
import { navigate } from '../router'

// 셋업 포스트 — 블로그형 상세 (이야기 + 재료를 감성으로)
export function SetupDetail({ id }: { id: string }) {
  const { likedSetups } = useStore()
  const s = SETUPS.find((x) => x.id === id)
  if (!s) return <div className="shell"><div className="empty">셋업을 찾을 수 없어요.</div>
    <button className="cta" onClick={() => navigate('/feed')}>둘러보기로</button></div>

  const kc = s.picks.keycap ? byId(s.picks.keycap) : null
  const accent = kc?.accent ?? '#2453DE'
  const mood = MOODS.find((m) => m.id === s.moodId)
  const liked = likedSetups.includes(s.id)
  const related = SETUPS.filter((x) => x.moodId === s.moodId && x.id !== s.id).slice(0, 4)

  // 재료를 감성으로 (스펙 아님)
  const feel = (slot: 'case' | 'switch' | 'keycap') => {
    const p = s.picks[slot] ? byId(s.picks[slot]!) : null
    if (!p) return null
    const label = { case: '케이스', switch: '스위치', keycap: '키캡' }[slot]
    const mood = slot === 'switch' && p.sound ? SOUND_MOOD[p.sound] : slot === 'keycap' ? '오늘의 색' : '단단한 무게감'
    return { label, name: p.name, mood, price: p.price }
  }

  return (
    <div className="shell detail" style={{ ['--a' as string]: accent, ['--theme-accent' as string]: accent }}>
      <div className="topbar"><button className="reset" onClick={() => navigate('/feed')}>← 둘러보기</button></div>

      <div className="detail-grid">
      <div className="detail-left">
      <div className="detail__hero">
        <KeebScene accent={accent} seed={s.id.charCodeAt(2)} {...sceneCtx(s)} />
        <div className="detail__scrim" />
        <p className="detail__caption">{s.caption}</p>
        <button className="listen-big" onClick={() => thock(s.picks.switch ? byId(s.picks.switch)?.sound : 'thocky')}>🔊 타건음 듣기</button>
      </div>
      </div>

      <div className="detail-right">
      <div className="detail__head">
        <h1 className="detail__title">{s.title}</h1>
        <div className="detail__by">{s.creator} · {mood?.emoji} {mood?.name} · {s.space}</div>
      </div>

      <p className="detail__story">{s.story}</p>

      <div className="detail__tags">{s.tags.map((t) => <span key={t} className="tag on">{t}</span>)}</div>

      <h2 className="detail__h2">이 책상의 재료 <span className="detail__total">총 {won(totalOf(s.picks))}</span></h2>
      <div className="parts">
        {(['keycap', 'switch', 'case'] as const).map((slot) => {
          const f = feel(slot); if (!f) return null
          return (
            <div className="part-line" key={slot}>
              <span className="part-k">{f.label}</span>
              <div className="part-mid"><div className="part-name">{f.name}</div><div className="part-mood">{f.mood}</div></div>
              <span className="part-price">{won(f.price)}</span>
            </div>
          )
        })}
      </div>

      <div className="detail__actions">
        <button className={'cta ghost like-btn' + (liked ? ' on' : '')} onClick={() => toggleLikeSetup(s.id)}>
          {liked ? '♥ 저장됨' : '♡ 저장'}
        </button>
        <button className="cta" onClick={() => { applySetup(s); navigate('/build') }}>✨ 이 셋업으로 내 것 꾸미기</button>
      </div>
      </div>
      </div>

      {related.length > 0 && <>
        <h2 className="detail__h2" style={{ marginTop: 32 }}>비슷한 결의 책상</h2>
        <div className="related">
          {related.map((r) => {
            const rk = r.picks.keycap ? byId(r.picks.keycap) : null
            return (
              <button key={r.id} className="rel" style={{ ['--a' as string]: rk?.accent ?? '#2453DE' }} onClick={() => navigate('/setup/' + r.id)}>
                <div className="rel__img"><KeebScene accent={rk?.accent ?? '#2453DE'} seed={r.id.charCodeAt(2)} {...sceneCtx(r)} /></div>
                <div className="rel__t">{r.title}</div>
              </button>
            )
          })}
        </div>
      </>}
    </div>
  )
}
