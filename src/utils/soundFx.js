// Pure Web Audio API tactical sound synthesizer (zero external assets)

let audioCtx = null;

function getCtx() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (Ctx) audioCtx = new Ctx();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function isSoundMuted() {
  try {
    return localStorage.getItem('ptit_muted') === '1';
  } catch {
    return false;
  }
}

export function setSoundMuted(muted) {
  try {
    localStorage.setItem('ptit_muted', muted ? '1' : '0');
  } catch {
    // ignore storage quota errors
  }
}

function playTone(freq, duration = 0.09, type = 'triangle', volume = 0.07, delay = 0) {
  if (isSoundMuted()) return;
  const ctx = getCtx();
  if (!ctx) return;

  try {
    const start = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(start);
    osc.stop(start + duration + 0.02);
  } catch {
    // ignore audio block
  }
}

export function playClick() {
  playTone(540, 0.045, 'sine', 0.045);
}

export function playCorrect(combo = 0) {
  const base = 523.25 * Math.pow(1.06, Math.min(combo, 8)); // C5 stepping up
  playTone(base, 0.09, 'triangle', 0.075, 0);
  playTone(base * 1.25, 0.14, 'triangle', 0.075, 0.06);
}

export function playWrong() {
  playTone(190, 0.12, 'sawtooth', 0.055, 0);
  playTone(150, 0.16, 'sawtooth', 0.05, 0.08);
}

export function playBossHit() {
  playTone(140, 0.1, 'square', 0.065, 0);
  playTone(440, 0.08, 'triangle', 0.07, 0.03);
  playTone(660, 0.15, 'triangle', 0.07, 0.08);
}

export function playVictory() {
  const notes = [523.25, 659.25, 783.99, 1046.5];
  notes.forEach((f, idx) => {
    playTone(f, 0.18, 'triangle', 0.075, idx * 0.085);
  });
}
