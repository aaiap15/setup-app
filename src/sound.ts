import type { SoundProfile } from './types'

// 타건음 합성 — v5 §2.1 "소리 나는 핀터레스트" (WebAudio, 외부 파일 0)
let ctx: AudioContext | null = null

export function thock(profile: SoundProfile = 'thocky') {
  try {
    ctx = ctx || new (window.AudioContext || (window as any).webkitAudioContext)()
    const t = ctx.currentTime
    const freq = profile === 'clacky' ? 520 : profile === 'marble' ? 190 : 300
    const o = ctx.createOscillator(), g = ctx.createGain()
    o.type = 'triangle'
    o.frequency.setValueAtTime(freq, t)
    o.frequency.exponentialRampToValueAtTime(freq * 0.6, t + 0.06)
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(0.32, t + 0.005)
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.12)
    const bs = ctx.createBufferSource()
    const buf = ctx.createBuffer(1, ctx.sampleRate * 0.05, ctx.sampleRate)
    const d = buf.getChannelData(0)
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 3)
    const ng = ctx.createGain()
    ng.gain.value = profile === 'clacky' ? 0.24 : 0.12
    bs.buffer = buf
    o.connect(g).connect(ctx.destination)
    bs.connect(ng).connect(ctx.destination)
    o.start(t); o.stop(t + 0.14); bs.start(t)
  } catch { /* audio unavailable */ }
}
