import { useState } from 'react'
import { MOODS } from '../data'
import { Keys } from '../components/Keys'
import { thock } from '../sound'
import { toggleLikeMood, setDiagnosed, setFilters } from '../store'
import { navigate } from '../router'
import type { SoundProfile } from '../types'

// 취향 진단 — 이미지·소리만, 텍스트 질문 0 (v5 §2.2 / §4.3)
const SOUNDS: { key: SoundProfile; label: string; emoji: string; bars: number[] }[] = [
  { key: 'thocky', label: '조용한 톡톡', emoji: '🌙', bars: [6, 10, 7, 4] },
  { key: 'marble', label: '묵직한 마블', emoji: '🪨', bars: [4, 7, 12, 6] },
  { key: 'clacky', label: '경쾌한 클릭', emoji: '⚡', bars: [10, 14, 8, 16] },
]

export function Diagnose() {
  const [step, setStep] = useState(0)
  const [moods, setMoods] = useState<string[]>([])
  const [sound, setSound] = useState<SoundProfile | null>(null)

  const toggleMood = (id: string) => setMoods((m) => m.includes(id) ? m.filter((x) => x !== id) : [...m, id])

  function finish() {
    moods.forEach(toggleLikeMood)              // 진단 선택 → 취향 시드
    if (sound) setFilters({ sound: sound === 'clacky' ? 'click' : sound === 'thocky' ? 'thock' : 'quiet' })
    setDiagnosed(true)
    navigate('/feed')
  }

  return (
    <div className="shell diag">
      <div className="topbar"><span className="brand">⌨ <b>SETUP</b></span></div>
      <p className="eyebrow">60초 취향 진단</p>
      <h1 className="h1">{step === 0 ? '끌리는 장면을 골라주세요' : '어떤 소리가 좋으세요?'}</h1>
      <p className="sub">{step === 0 ? '스펙은 몰라도 됩니다. 눈이 가는 걸 그냥 고르세요.' : '눌러서 들어보고 골라주세요.'}</p>

      <div className="diag__prog"><i style={{ width: step === 0 ? '50%' : '100%' }} /></div>

      {step === 0 ? (
        <>
          <div className="pick-grid">
            {MOODS.map((m) => (
              <button
                key={m.id}
                className={'pick' + (moods.includes(m.id) ? ' on' : '')}
                onClick={() => toggleMood(m.id)}
                onPointerDown={() => thock(m.sound)}
              >
                <div className="pick__img" style={{ ['--a' as string]: m.accent }}>
                  <Keys n={24} seed={m.id.charCodeAt(1)} />
                </div>
                <div className="pick__cap">{m.emoji} {m.name}</div>
                {moods.includes(m.id) && <span className="check">✓</span>}
              </button>
            ))}
          </div>
          <button className="cta" disabled={moods.length === 0} onClick={() => setStep(1)}>
            다음 ({moods.length}개 선택) →
          </button>
        </>
      ) : (
        <>
          <div className="sound-row">
            {SOUNDS.map((s) => (
              <button
                key={s.key}
                className={'sound-chip' + (sound === s.key ? ' on' : '')}
                onClick={() => { setSound(s.key); thock(s.key) }}
              >
                <span style={{ fontSize: 22 }}>{s.emoji}</span>
                <span className="wave">{s.bars.map((h, i) => <i key={i} style={{ height: h }} />)}</span>
                <span className="lb">{s.label}</span>
              </button>
            ))}
          </div>
          <button className="cta" disabled={!sound} onClick={finish}>내 취향 완성하기 →</button>
          <button className="cta ghost" onClick={() => setStep(0)}>← 이전</button>
        </>
      )}
    </div>
  )
}
