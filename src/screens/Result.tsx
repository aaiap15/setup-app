import { useState } from 'react'
import { KeebScene } from '../components/KeebScene'
import { useStore } from '../store'
import { byId, won, totalOf, accentOf, compatScore, archetypeOf, averageAxes } from '../engine'
import { navigate } from '../router'

// 결과지 카드 — 성장 엔진 (v5 §2.4 / §4.3 / §4.5)
export function Result() {
  const { picks } = useStore()
  const [light, setLight] = useState(false)
  const [toast, setToast] = useState('')

  const items = Object.values(picks).map((id) => byId(id!)!).filter(Boolean)
  if (items.length === 0) {
    return <div className="shell"><div className="empty">먼저 셋업을 만들어주세요.</div>
      <button className="cta" onClick={() => navigate('/build')}>꾸미러 가기</button></div>
  }
  const av = averageAxes(items.map((i) => i.ax))!
  const r = archetypeOf(av)
  const accent = accentOf(picks)
  const title = (picks.keycap ? byId(picks.keycap)!.name.split(' ')[0] + ' ' : '') + (picks.case ? byId(picks.case)!.attrs.layout + '%' : '드림 셋업')

  function share() {
    const txt = `내 셋업 정체성은 “${r.arche.name}” 🖥 #SETUP 에서 내 드림 셋업을 설계해봐`
    if (navigator.share) navigator.share({ title: 'SETUP', text: txt }).catch(() => {})
    else if (navigator.clipboard) navigator.clipboard.writeText(txt).then(() => setToast('공유 문구를 복사했어요'), () => setToast(txt))
    else setToast(txt)
    setTimeout(() => setToast(''), 1900)
  }

  return (
    <div className="shell result" style={{ ['--theme-accent' as string]: accent }}>
      <div className="topbar" style={{ width: '100%' }}>
        <span className="brand">⌨ <b>SETUP</b></span>
        <button className="reset" onClick={() => setLight((l) => !l)}>{light ? '🌙 다크' : '☀️ 라이트'} 카드</button>
      </div>

      <div className={'card' + (light ? ' light' : '')}>
        <div className="card__img"><KeebScene accent={accent} seed={7} /></div>
        <div className="card__body">
          <div className="card__row">
            <h2 className="card__title">{title}</h2>
            <span className="card__handle">@you</span>
          </div>
          <div className="arche"><span className="em">{r.arche.emoji}</span><span className="nm">{r.arche.name}</span> 타입<span className="pct">{r.pct}%</span></div>
          <div className="card__parts">
            {(['case', 'switch', 'keycap'] as const).map((k) => picks[k] && (
              <div key={k}><b>{{ case: '케이스', switch: '스위치', keycap: '키캡' }[k]}</b>{byId(picks[k]!)!.name}</div>
            ))}
          </div>
          <div className="card__foot">
            <span className="tot">{won(totalOf(picks))} · 호환성 {compatScore(picks)}점</span>
            <span>made with ⌨ SETUP</span>
          </div>
        </div>
      </div>

      <div className="card-actions">
        <button className="cta ghost" style={{ flex: 1 }} onClick={() => navigate('/build')}>← 바꾸기</button>
        <button className="cta" style={{ flex: 1 }} onClick={share}>공유하기</button>
      </div>

      {/* v5 §4.5 불안 유저 해소 (FAQ 역할) */}
      <p className="faqline">스펙 몰라도 됩니다 · 광고비 받고 추천하지 않습니다 · 부품은 언제든 바꿀 수 있어요</p>

      <div className={'toast' + (toast ? ' show' : '')}>{toast}</div>
    </div>
  )
}
