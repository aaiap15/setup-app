import { useStore, tasteVec, likeCount } from '../store'
import { archetypeOf, vibeWords } from '../engine'

// 시그니처 — 취향 게이지 (v5 §4.2)
export function TasteGauge() {
  useStore() // 좋아요 변화에 리렌더
  const v = tasteVec()

  if (!v) {
    return (
      <div className="gauge">
        <div className="gauge__head">
          <span className="gauge__emoji">🔍</span>
          <div>
            <div className="gauge__k">당신의 취향</div>
            <div className="gauge__v">아직 없음</div>
          </div>
        </div>
        <p className="gauge__hint">끌리는 분위기에 ♡ 를 눌러보세요. 누를수록 추천·정체성이 정확해져요.</p>
      </div>
    )
  }

  const r = archetypeOf(v)
  const axis = (l: string, rr: string, val: number) => (
    <div className="axis">
      <span>{l}</span>
      <div className="track"><i style={{ left: `${Math.round(val * 100)}%` }} /></div>
      <span className="r">{rr}</span>
    </div>
  )
  return (
    <div className="gauge">
      <div className="gauge__head">
        <span className="gauge__emoji">{r.arche.emoji}</span>
        <div>
          <div className="gauge__k">당신의 취향</div>
          <div className="gauge__v">
            {r.arche.name} <small>{likeCount()}개 좋아요 · {vibeWords(v)}</small>
          </div>
        </div>
      </div>
      <div className="gauge__axes">
        {axis('미니멀', '맥시멀', v.mm)}
        {axis('웜', '쿨', 1 - v.wc)}
        {axis('조용', '화려', v.ql)}
      </div>
    </div>
  )
}
