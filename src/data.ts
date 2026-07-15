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

  // ── 앵커(하이엔드) 부품 — 드림 셋업용 ──
  { id: 'c6', cat: 'case', brand: 'Salvun', name: 'SN 티타늄 65', price: 1180000, accent: '#4a5261', release: 'group_buy', attrs: { layout: '65' }, ax: { mm: .2, wc: .3, ql: .2 } },
  { id: 'c7', cat: 'case', brand: '공방 우드키', name: '하이엔드 월넛 65 (황동 웨이트)', price: 1090000, accent: '#6b4a2e', release: 'pre_order', attrs: { layout: '65' }, ax: { mm: .25, wc: .85, ql: .3 } },
  { id: 'c8', cat: 'case', brand: 'Mr.Suit', name: 'HHKB 60 프리미엄', price: 1120000, accent: '#2a2e35', release: 'group_buy', attrs: { layout: '60' }, ax: { mm: .15, wc: .35, ql: .15 } },
  { id: 'c9', cat: 'case', brand: 'NovelKeys', name: '아노다이즈드 퍼플 프리미엄 65', price: 1150000, accent: '#6a4bd0', release: 'group_buy', attrs: { layout: '65' }, ax: { mm: .7, wc: .4, ql: .75 } },
  { id: 'k7', cat: 'keycap', brand: 'GMK', name: '메타버스', price: 215000, accent: '#3a4a7a', release: 'group_buy', attrs: { cover: ['60', '65', '75', 'tkl'] }, ax: { mm: .4, wc: .3, ql: .35 } },
  { id: 'k8', cat: 'keycap', brand: 'GMK', name: '어드모나 (딥레드)', price: 240000, accent: '#7a3540', release: 'group_buy', attrs: { cover: ['60', '65', '75', 'tkl'] }, ax: { mm: .45, wc: .7, ql: .4 } },
  { id: 's6', cat: 'switch', brand: 'Tangerine', name: 'Cream Tangerine', price: 62000, accent: '#d98a3d', release: 'group_buy', attrs: { pin: 5 }, sound: 'marble', ax: { mm: .35, wc: .5, ql: .25 } },

  // ── 변주(입문) 부품 — 저예산 재현용 ──
  { id: 'c10', cat: 'case', brand: 'KBDfans', name: 'Tester68 플라스틱 65', price: 55000, accent: '#33373f', release: 'in_stock', attrs: { layout: '65' }, ax: { mm: .3, wc: .4, ql: .3 } },
  { id: 'c11', cat: 'case', brand: 'DIY', name: 'GK61 아크릴 60', price: 42000, accent: '#2a2d34', release: 'in_stock', attrs: { layout: '60' }, ax: { mm: .35, wc: .35, ql: .4 } },
  { id: 'p5', cat: 'pcb', brand: 'KBDfans', name: '기본 65 핫스왑 PCB', price: 38000, accent: '#3a3f47', release: 'in_stock', attrs: { layout: '65', hotswap: true }, ax: { mm: .4, wc: .4, ql: .4 } },
  { id: 'p6', cat: 'pcb', brand: 'DIY', name: '기본 60 핫스왑 PCB', price: 35000, accent: '#3a3f47', release: 'in_stock', attrs: { layout: '60', hotswap: true }, ax: { mm: .4, wc: .4, ql: .4 } },
  { id: 'k9', cat: 'keycap', brand: 'PBTfans', name: '무각 PBT (블랙)', price: 26000, accent: '#2f333b', release: 'in_stock', attrs: { cover: ['60', '65', '75', 'tkl'] }, ax: { mm: .2, wc: .3, ql: .2 } },
  { id: 'k10', cat: 'keycap', brand: '기본', name: '레트로 PBT (베이지)', price: 32000, accent: '#c4b48f', release: 'in_stock', attrs: { cover: ['60', '65', '75'] }, ax: { mm: .3, wc: .85, ql: .2 } },
  { id: 'k11', cat: 'keycap', brand: '기본', name: '파스텔 PBT (민트)', price: 34000, accent: '#a8d0c0', release: 'in_stock', attrs: { cover: ['60', '65', '75'] }, ax: { mm: .6, wc: .55, ql: .4 } },
  { id: 's7', cat: 'switch', brand: 'Outemu', name: '갈축', price: 11000, accent: '#5b4632', release: 'in_stock', attrs: { pin: 3 }, sound: 'thocky', ax: { mm: .3, wc: .45, ql: .35 } },
  { id: 's8', cat: 'switch', brand: 'Gateron', name: '적축', price: 14000, accent: '#8b2f2f', release: 'in_stock', attrs: { pin: 5 }, sound: 'marble', ax: { mm: .3, wc: .4, ql: .2 } },
  { id: 's9', cat: 'switch', brand: 'Kailh', name: '청축', price: 13000, accent: '#2f5a8b', release: 'in_stock', attrs: { pin: 3 }, sound: 'clacky', ax: { mm: .5, wc: .45, ql: .85 } },

  // ── 모니터 ──
  { id: 'mon1', cat: 'monitor', brand: 'LG', name: '27" 4K 미니멀', price: 480000, accent: '#3a4150', release: 'in_stock', attrs: { form: 'standard' }, ax: { mm: .25, wc: .35, ql: .25 } },
  { id: 'mon2', cat: 'monitor', brand: 'Dell', name: '34" 울트라와이드', price: 690000, accent: '#2f3a4a', release: 'in_stock', attrs: { form: 'ultrawide' }, ax: { mm: .35, wc: .3, ql: .35 } },
  { id: 'mon3', cat: 'monitor', brand: 'BenQ', name: '듀얼 27" 세팅', price: 820000, accent: '#28303e', release: 'in_stock', attrs: { form: 'dual' }, ax: { mm: .7, wc: .35, ql: .5 } },
  { id: 'mon4', cat: 'monitor', brand: 'Samsung', name: '27" 게이밍 240Hz', price: 560000, accent: '#6a4bd0', release: 'in_stock', attrs: { form: 'gaming' }, ax: { mm: .7, wc: .4, ql: .85 } },

  // ── 마우스 ──
  { id: 'ms1', cat: 'mouse', brand: 'Logitech', name: '미니멀 화이트 무선', price: 89000, accent: '#d3d5da', release: 'in_stock', attrs: {}, ax: { mm: .2, wc: .4, ql: .25 } },
  { id: 'ms2', cat: 'mouse', brand: 'Razer', name: '게이밍 RGB (블랙)', price: 129000, accent: '#6a4bd0', release: 'in_stock', attrs: {}, ax: { mm: .7, wc: .4, ql: .9 } },
  { id: 'ms3', cat: 'mouse', brand: '레트로', name: '베이지 무선 마우스', price: 59000, accent: '#cdba94', release: 'in_stock', attrs: {}, ax: { mm: .3, wc: .85, ql: .3 } },
  { id: 'ms4', cat: 'mouse', brand: 'Pulsar', name: '다크 에르고', price: 99000, accent: '#2a2e37', release: 'in_stock', attrs: {}, ax: { mm: .25, wc: .35, ql: .3 } },

  // ── 헤드셋 ──
  { id: 'hs1', cat: 'headset', brand: 'Audeze', name: '오픈형 우드 헤드셋', price: 340000, accent: '#6b4a2e', release: 'in_stock', attrs: {}, ax: { mm: .3, wc: .85, ql: .3 } },
  { id: 'hs2', cat: 'headset', brand: 'SteelSeries', name: '게이밍 RGB 헤드셋', price: 190000, accent: '#6a4bd0', release: 'in_stock', attrs: {}, ax: { mm: .7, wc: .4, ql: .9 } },
  { id: 'hs3', cat: 'headset', brand: 'HyperX', name: '미니멀 화이트 헤드셋', price: 150000, accent: '#cfd2d8', release: 'in_stock', attrs: {}, ax: { mm: .25, wc: .4, ql: .3 } },
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
  { key: 'monitor', label: '모니터', req: false },
  { key: 'mouse', label: '마우스', req: false },
  { key: 'headset', label: '헤드셋', req: false },
  { key: 'deskmat', label: '데스크매트', req: false },
  { key: 'stabilizer', label: '스테빌', req: false },
]

export const REL_KO: Record<string, string> = { in_stock: '재고', group_buy: '공구', pre_order: '예약', discontinued: '단종' }

// 스위치 사운드 → 감성 언어 (v5 §4.4 스펙 아니라 감성)
export const SOUND_MOOD: Record<string, string> = {
  thocky: '조용한 톡톡', marble: '묵직한 마블', clacky: '경쾌한 클릭',
}

// 취향 필터 (감성 태그)
export const VIBES = ['전체', '다크', '웜', '쿨', '미니멀', '레트로', 'RGB', '우드', '파스텔', '모노']

// 큐레이션 셋업 포스트 — 블로그형 데스크셋업 공유 (원칙 1·2·3)
// 앵커 4(150만+·드림) / 주력 12(30~80만·"나도 이정도면") / 변주 4(입문·"이 감성 저예산으로")
import type { Setup } from './types'
export const SETUPS: Setup[] = [
  // ── 앵커: 꿈을 판다 (갤러리의 천장) ──
  { id: 'a1', title: '티타늄 위의 정적', caption: '새벽 3시, 아무 소리도 남지 않은 책상', creator: '@endgame', moodId: 'm1', tier: 'anchor', space: '작업실', tags: ['다크', '미니멀', '드림'],
    story: '몇 년을 돌아 결국 여기 도착했어요. 티타늄의 묵직함 위로 아무 소리도 남지 않는 밤, 그게 제 엔드게임입니다.',
    picks: { case: 'c6', pcb: 'p1', switch: 's6', keycap: 'k7', monitor: 'mon1', mouse: 'ms4' } },
  { id: 'a2', title: '월넛 마스터피스', caption: '아침 햇살이 황동에 닿는 그 순간', creator: '@atelier', moodId: 'm4', tier: 'anchor', space: '작업실', tags: ['웜', '우드', '드림'],
    story: '나무의 결과 황동의 반짝임. 아침 햇살이 상판에 닿는 15분을 위해 이 책상을 완성했어요.',
    picks: { case: 'c7', pcb: 'p1', switch: 's6', keycap: 'k8', monitor: 'mon2', mouse: 'ms3', headset: 'hs1' } },
  { id: 'a3', title: '퍼플 엔드게임', caption: '방 전체가 보라색으로 잠기는 밤', creator: '@nocturne', moodId: 'm3', tier: 'anchor', space: '게이밍 데스크', tags: ['RGB', '게이밍', '드림'],
    story: '언더글로우가 켜지면 방이 통째로 보라색이 돼요. 승패보다 이 장면 앞에 앉는 순간이 좋아서 계속 켜둡니다.',
    picks: { case: 'c9', pcb: 'p4', switch: 's6', keycap: 'k6', monitor: 'mon3', mouse: 'ms2', headset: 'hs2' } },
  { id: 'a4', title: '화이트룸, 완벽한 침묵', caption: '아무것도 없는 방, 흰 키보드 하나', creator: '@snowroom', moodId: 'm5', tier: 'anchor', space: '침실', tags: ['모노', '미니멀', '드림'],
    story: '색도 소리도 다 덜어냈어요. 흰 방에 흰 키보드 하나만 남으니, 오히려 하루가 선명해집니다.',
    picks: { case: 'c8', pcb: 'p2', switch: 's6', keycap: 'k7', monitor: 'mon1', mouse: 'ms1', headset: 'hs3' } },

  // ── 주력: 행동을 판다 ("어? 이 정도면 나도") ──
  { id: 'm01', title: '마지막 커밋의 책상', caption: '새벽 2시, 오늘의 마지막 한 줄', creator: '@nightkeys', moodId: 'm1', tier: 'main', space: '원룸 구석', tags: ['다크', '미니멀'],
    story: '방 불을 끄고 모니터 불빛만 남겨요. 무광 네이비 위로 조용한 타건이 번지면 그날의 소음이 가라앉습니다.',
    picks: { case: 'c1', pcb: 'p1', switch: 's1', keycap: 'k4' } },
  { id: 'm02', title: '불 끄고 남은 흑판 하나', caption: '작을수록 생각이 선명해지는 자리', creator: '@silentboard', moodId: 'm1', tier: 'main', space: '원룸 구석', tags: ['다크', '모노'],
    story: '책상 위엔 딱 필요한 것만. 60키의 작은 흑판 하나가 남으면 오히려 집중이 더 잘돼요.',
    picks: { case: 'c2', pcb: 'p2', switch: 's2', keycap: 'k4' } },
  { id: 'm03', title: '회색의 온도', caption: '블랙과 화이트 사이 어딘가', creator: '@greyscale', moodId: 'm5', tier: 'main', space: '작업실', tags: ['모노', '미니멀'],
    story: '색을 다 빼고 나니 남은 건 질감이었어요. 그 회색의 온도가 하루를 차분하게 잡아줍니다.',
    picks: { case: 'c4', pcb: 'p3', switch: 's3', keycap: 'k4' } },
  { id: 'm04', title: '80년대 사무실의 오후', caption: '베이지 위로 얹히는 묵직한 소리', creator: '@typewriter', moodId: 'm2', tier: 'main', space: '작업실', tags: ['웜', '레트로'],
    story: '레트로 사무실을 좋아해요. 베이지 키캡에 묵직한 소리가 얹히면 이메일 한 통에도 격식이 생깁니다.',
    picks: { case: 'c3', pcb: 'p1', switch: 's2', keycap: 'k3' } },
  { id: 'm05', title: '아침 햇살이 월넛에', caption: '하루 중 제일 좋은 그 빛', creator: '@woodgrain', moodId: 'm4', tier: 'main', space: '작업실', tags: ['웜', '우드'],
    story: '아침 햇살이 월넛 상판에 닿는 순간이 하루 중 제일 좋아요. 나무의 결, 그거면 충분합니다.',
    picks: { case: 'c3', pcb: 'p1', switch: 's1', keycap: 'k3' } },
  { id: 'm06', title: '화분 옆 세이지 키보드', caption: '초록과 나무 사이에서 타이핑', creator: '@botanist', moodId: 'm4', tier: 'main', space: '침실', tags: ['웜', '우드'],
    story: '작은 화분 옆에 세이지빛 키보드를 뒀어요. 초록 사이에서 타이핑하면 방이 조금 더 살아있는 느낌이에요.',
    picks: { case: 'c3', pcb: 'p1', switch: 's2', keycap: 'k2' } },
  { id: 'm07', title: '방이 보라색으로 물들 때', caption: '게임에 들어가는 그 스위치', creator: '@rgblord', moodId: 'm3', tier: 'main', space: '게이밍 데스크', tags: ['RGB', '게이밍'],
    story: '게임에 들어가는 순간 방이 보라색으로 물들어요. 그때부터가 진짜 내 시간입니다.',
    picks: { case: 'c5', pcb: 'p4', switch: 's4', keycap: 'k6' } },
  { id: 'm08', title: '블루아워의 몰입', caption: '차가운 블루로 통일한 리그', creator: '@bluehour', moodId: 'm7', tier: 'main', space: '게이밍 데스크', tags: ['쿨', 'RGB'],
    story: '승패보다도 이 셋업 앞에 앉는 순간의 몰입이 좋아서 계속 켜둡니다. 차가운 블루가 그렇게 만들어요.',
    picks: { case: 'c1', pcb: 'p1', switch: 's9', keycap: 'k5' } },
  { id: 'm09', title: '키캡을 모으는 마음', caption: '파스텔 한 세트 얹는 날의 기분', creator: '@pastel', moodId: 'm6', tier: 'main', space: '침실', tags: ['파스텔'],
    story: '키캡을 모으는 건 취미가 아니라 애정이에요. 파스텔 한 세트를 얹는 날은 그냥 기분이 좋아집니다.',
    picks: { case: 'c1', pcb: 'p1', switch: 's5', keycap: 'k5' } },
  { id: 'm10', title: '해질 무렵 코랄빛 15분', caption: '저녁의 그 따뜻한 15분', creator: '@sunset', moodId: 'm8', tier: 'main', space: '원룸 구석', tags: ['웜', '코랄'],
    story: '해질 무렵의 코랄빛을 좋아해요. 올리비아 키캡을 얹으면 저녁의 그 따뜻함이 책상에 머무릅니다.',
    picks: { case: 'c1', pcb: 'p1', switch: 's5', keycap: 'k1' } },
  { id: 'm11', title: '유행 안 타는 핑크&블랙', caption: '몇 년째 최애인 그 조합', creator: '@olivia', moodId: 'm2', tier: 'main', space: '작업실', tags: ['웜', '클래식'],
    story: '유행을 안 타는 조합이 결국 오래가더라고요. 핑크와 블랙, 몇 년째 제 최애입니다.',
    picks: { case: 'c1', pcb: 'p1', switch: 's1', keycap: 'k1' } },
  { id: 'm12', title: '딱 하나의 포인트', caption: '절제가 오래 물리지 않는 이유', creator: '@cobalt', moodId: 'm7', tier: 'main', space: '원룸 구석', tags: ['쿨', '미니멀'],
    story: '포인트는 딱 하나만. 네이비 케이스에 조용한 톡톡, 그 절제가 오히려 오래 물리지 않아요.',
    picks: { case: 'c1', pcb: 'p1', switch: 's1', keycap: 'k4' } },

  // ── 변주: 핑계를 없앤다 ("이 감성, 저예산으로") ──
  { id: 'b1', title: '이 새벽 감성, 13만 원으로', caption: '입문급으로도 이 밤이 만들어져요', creator: '@firstkeeb', moodId: 'm1', tier: 'budget', space: '원룸 구석', tags: ['다크', '미니멀', '입문'],
    story: '비싼 걸 살 필요는 없었어요. 저렴한 조합으로도 새벽의 그 조용한 타건은 충분히 만들어집니다.',
    picks: { case: 'c10', pcb: 'p5', switch: 's7', keycap: 'k9' } },
  { id: 'b2', title: '레트로 감성 입문판', caption: '베이지의 따뜻함, 14만 원', creator: '@budgetretro', moodId: 'm2', tier: 'budget', space: '작업실', tags: ['웜', '레트로', '입문'],
    story: '고가 키캡이 아니어도 베이지의 그 따뜻함은 나요. 첫 커스텀으로 딱 좋은 조합이에요.',
    picks: { case: 'c10', pcb: 'p5', switch: 's8', keycap: 'k10' } },
  { id: 'b3', title: '파스텔 첫 키보드', caption: '민트빛 입문, 부담 없이', creator: '@sweetstart', moodId: 'm6', tier: 'budget', space: '침실', tags: ['파스텔', '입문'],
    story: '파스텔은 비싸야 예쁜 게 아니에요. 민트빛 입문 세트로 아기자기한 책상을 시작해보세요.',
    picks: { case: 'c10', pcb: 'p5', switch: 's8', keycap: 'k11' } },
  { id: 'b4', title: '게이밍 입문, 청축의 쾌감', caption: '경쾌한 클릭, 11만 원대', creator: '@clickstart', moodId: 'm3', tier: 'budget', space: '게이밍 데스크', tags: ['게이밍', '입문'],
    story: '입문급이어도 청축의 그 경쾌함은 진짜예요. 게이밍의 손맛, 여기서 시작해도 충분합니다.',
    picks: { case: 'c11', pcb: 'p6', switch: 's9', keycap: 'k9' } },
]
