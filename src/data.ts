import type { Product, Mood, Archetype, SlotKey } from './types'

// 큐레이션 시드 — v5 §2.1 (유저 UGC 아님)
export const MOODS: Mood[] = [
  { id: 'm1', name: '고요한 밤', emoji: '🌙', copy: '무광 다크 · 조용한 리니어', accent: '#26304a', tags: ['다크', '조용', '미니멀'], sound: 'thocky', ax: { mm: .15, wc: .2, ql: .15 } },
  { id: 'm2', name: '따뜻한 타자기', emoji: '☕', copy: '레트로 베이지 감성', accent: '#c9b184', tags: ['웜', '레트로'], sound: 'marble', ax: { mm: .3, wc: .85, ql: .25 } },
  { id: 'm3', name: '네온 리그', emoji: '🌈', copy: 'RGB 풀라이트 게이밍', accent: '#d0489e', tags: ['화려', '게이밍'], sound: 'clacky', ax: { mm: .85, wc: .42, ql: .92 } },
  { id: 'm4', name: '아침 햇살 우드', emoji: '🌿', copy: '월넛과 황동 · 내추럴', accent: '#7a5230', tags: ['웜', '우드'], sound: 'marble', ax: { mm: .25, wc: .82, ql: .3 } },
  { id: 'm5', name: '무채색 미학', emoji: '⬛', copy: '블랙&화이트 미니멀', accent: '#3a3f47', tags: ['모노', '미니멀'], sound: 'thocky', ax: { mm: .2, wc: .32, ql: .2 } },
  { id: 'm6', name: '달콤한 키캡장', emoji: '🍬', copy: '파스텔 컬렉터', accent: '#b9c4e6', tags: ['파스텔', '아기자기'], sound: 'clacky', ax: { mm: .78, wc: .62, ql: .5 } },
  { id: 'm7', name: '심해 블루', emoji: '🌊', copy: '딥 블루 쿨톤', accent: '#1f5f8b', tags: ['쿨', '블루'], sound: 'thocky', ax: { mm: .35, wc: .15, ql: .35 } },
  { id: 'm8', name: '선셋 코랄', emoji: '🌅', copy: '웜 코랄 포인트', accent: '#e07a52', tags: ['웜', '코랄'], sound: 'clacky', ax: { mm: .55, wc: .8, ql: .55 } },
]

export const PRODUCTS: Product[] = [
  { id: 'c1', cat: 'case', brand: 'KBDfans', name: 'TOFU65 알루 (네이비)', price: 129000, accent: '#2a3a6b', release: 'group_buy', attrs: { layout: '65' }, ax: { mm: .2, wc: .25, ql: .2 } },
  { id: 'c2', cat: 'case', brand: 'CannonKeys', name: 'Bakeneko60 (블랙 PC)', price: 118000, accent: '#23262b', release: 'in_stock', attrs: { layout: '60' }, ax: { mm: .15, wc: .3, ql: .15 } },
  { id: 'c3', cat: 'case', brand: '공방 우드키', name: '월넛 우드 65', price: 240000, accent: '#6b4a2e', release: 'pre_order', attrs: { layout: '65' }, ax: { mm: .25, wc: .85, ql: .3 } },
  { id: 'c4', cat: 'case', brand: 'Qwertykeys', name: 'QK75 (화이트 알루)', price: 165000, accent: '#cfd2d8', release: 'in_stock', attrs: { layout: '75' }, ax: { mm: .2, wc: .45, ql: .2 } },
  { id: 'c5', cat: 'case', brand: 'NovelKeys', name: 'NK65 (퍼플)', price: 139000, accent: '#6a4bd0', release: 'in_stock', attrs: { layout: '65' }, ax: { mm: .7, wc: .4, ql: .8 } },

  { id: 'p1', cat: 'pcb', brand: 'KBDfans', name: 'DZ65 RGB V3 핫스왑', price: 74000, accent: '#2453DE', release: 'in_stock', attrs: { layout: '65', hotswap: true }, ax: { mm: .5, wc: .4, ql: .7 } },
  { id: 'p2', cat: 'pcb', brand: 'CannonKeys', name: 'Bakeneko60 솔더 PCB', price: 52000, accent: '#3a3f47', release: 'in_stock', attrs: { layout: '60', hotswap: false }, ax: { mm: .2, wc: .3, ql: .2 } },
  { id: 'p3', cat: 'pcb', brand: 'Qwertykeys', name: 'QK75 핫스왑 PCB', price: 69000, accent: '#8a9099', release: 'in_stock', attrs: { layout: '75', hotswap: true }, ax: { mm: .3, wc: .4, ql: .3 } },
  { id: 'p4', cat: 'pcb', brand: 'NovelKeys', name: 'NK65 EE 핫스왑', price: 71000, accent: '#6a4bd0', release: 'in_stock', attrs: { layout: '65', hotswap: true }, ax: { mm: .6, wc: .4, ql: .75 } },

  { id: 's1', cat: 'switch', brand: 'Gazzew', name: 'Boba U4T 62g', price: 42000, accent: '#5b3b2a', release: 'group_buy', attrs: { pin: 5 }, sound: 'thocky', ax: { mm: .35, wc: .5, ql: .25 } },
  { id: 's2', cat: 'switch', brand: 'Gateron', name: 'Oil King 리니어', price: 45000, accent: '#1f2833', release: 'in_stock', attrs: { pin: 5 }, sound: 'marble', ax: { mm: .3, wc: .35, ql: .2 } },
  { id: 's3', cat: 'switch', brand: 'Cherry', name: 'MX Clear 택타일', price: 32000, accent: '#a9adb4', release: 'in_stock', attrs: { pin: 3 }, sound: 'thocky', ax: { mm: .3, wc: .45, ql: .35 } },
  { id: 's4', cat: 'switch', brand: 'Kailh', name: 'Box White 클릭키', price: 28000, accent: '#c8c8cf', release: 'in_stock', attrs: { pin: 3 }, sound: 'clacky', ax: { mm: .5, wc: .45, ql: .85 } },
  { id: 's5', cat: 'switch', brand: 'Prevail', name: 'Alpaca V2 리니어', price: 45000, accent: '#d8c0a8', release: 'in_stock', attrs: { pin: 5 }, sound: 'clacky', ax: { mm: .4, wc: .6, ql: .45 } },

  { id: 'k1', cat: 'keycap', brand: 'GMK', name: 'Olivia++', price: 168000, accent: '#c98b93', release: 'group_buy', attrs: { cover: ['60', '65', '75', 'tkl'] }, ax: { mm: .5, wc: .7, ql: .4 } },
  { id: 'k2', cat: 'keycap', brand: 'GMK', name: 'Botanical R3', price: 175000, accent: '#7fa07a', release: 'group_buy', attrs: { cover: ['60', '65', '75', 'tkl'] }, ax: { mm: .35, wc: .65, ql: .35 } },
  { id: 'k3', cat: 'keycap', brand: 'PBTfans', name: '레트로 베이지', price: 88000, accent: '#cdba94', release: 'in_stock', attrs: { cover: ['60', '65', '75'] }, ax: { mm: .25, wc: .85, ql: .2 } },
  { id: 'k4', cat: 'keycap', brand: 'PBTfans', name: '모노크롬 (블랙/화이트)', price: 82000, accent: '#3a3f47', release: 'in_stock', attrs: { cover: ['60', '65', '75', 'tkl'] }, ax: { mm: .2, wc: .3, ql: .2 } },
  { id: 'k5', cat: 'keycap', brand: 'SP', name: '파스텔 SA', price: 158000, accent: '#b8c6e8', release: 'discontinued', attrs: { cover: ['60', '65'] }, ax: { mm: .75, wc: .6, ql: .5 } },
  { id: 'k6', cat: 'keycap', brand: 'GMK', name: 'RGB 맥시멀', price: 172000, accent: '#d048a0', release: 'group_buy', attrs: { cover: ['60', '65', '75', 'tkl'] }, ax: { mm: .8, wc: .45, ql: .85 } },

  { id: 't1', cat: 'stabilizer', brand: 'Durock', name: 'V2 스크류인', price: 19000, accent: '#c9a94a', release: 'in_stock', attrs: {}, ax: { mm: .3, wc: .4, ql: .3 } },
  { id: 'd1', cat: 'deskmat', brand: '스튜디오 녹턴', name: '심야 (네이비)', price: 39000, accent: '#2453DE', release: 'in_stock', attrs: {}, ax: { mm: .3, wc: .3, ql: .3 } },
  { id: 'd2', cat: 'deskmat', brand: '공방 오브', name: '우드 브라운 가죽', price: 58000, accent: '#6b4a2e', release: 'in_stock', attrs: {}, ax: { mm: .25, wc: .85, ql: .2 } },
]

export const ARCHES: Archetype[] = [
  { emoji: '🌙', name: '미니멀 다크', t: { mm: .15, wc: .2, ql: .15 } },
  { emoji: '☕', name: '레트로 베이지', t: { mm: .3, wc: .85, ql: .2 } },
  { emoji: '🌿', name: '우드 내추럴', t: { mm: .25, wc: .8, ql: .35 } },
  { emoji: '⬛', name: '모노크롬', t: { mm: .2, wc: .35, ql: .2 } },
  { emoji: '🌈', name: 'RGB 맥시멀', t: { mm: .85, wc: .4, ql: .9 } },
  { emoji: '🍬', name: '파스텔 컬렉터', t: { mm: .8, wc: .75, ql: .5 } },
]

export const SLOTS: { key: SlotKey; label: string; req: boolean }[] = [
  { key: 'case', label: '케이스', req: true },
  { key: 'pcb', label: 'PCB', req: true },
  { key: 'switch', label: '스위치', req: true },
  { key: 'keycap', label: '키캡', req: true },
  { key: 'stabilizer', label: '스테빌', req: false },
  { key: 'deskmat', label: '데스크매트', req: false },
]

export const REL_KO: Record<string, string> = { in_stock: '재고', group_buy: '공구', pre_order: '예약', discontinued: '단종' }
