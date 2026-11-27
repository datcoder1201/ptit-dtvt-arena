import React, { useMemo, useState } from 'react';
import { Activity, ArrowRight, Cpu, Layers, Radio, RotateCcw, Zap } from 'lucide-react';
import { CONCEPT_BRIDGES, RLC_PRESETS, SUBJECTS } from '../data/bridgesData';
import { FormulaBlock, RichMath } from './MathBlock';

export default function UnifiedBridgeLab({ onAwardXp }) {
  const [R, setR] = useState(8);
  const [L_mH, setL_mH] = useState(40);
  const [C_uF, setC_uF] = useState(100);
  const [omega, setOmega] = useState(500);
  const [activeBridgeId, setActiveBridgeId] = useState(CONCEPT_BRIDGES[0].id);

  const sim = useMemo(() => {
    const L = L_mH * 1e-3;
    const C = C_uF * 1e-6;
    const omega0 = 1 / Math.sqrt(L * C);
    const alpha = R / (2 * L);
    const zeta = alpha / omega0;
    const disc = alpha * alpha - omega0 * omega0;

    // Poles in s-plane
    let poles = [];
    let regime = '';
    if (Math.abs(disc) < 1e-2) {
      regime = 'Tắt dần tới hạn (Cực kép)';
      poles = [
        { re: -alpha, im: 0 },
        { re: -alpha, im: 0 },
      ];
    } else if (disc < 0) {
      const wd = Math.sqrt(omega0 * omega0 - alpha * alpha);
      regime = 'Dao động tắt dần (Cực phức liên hợp)';
      poles = [
        { re: -alpha, im: wd },
        { re: -alpha, im: -wd },
      ];
    } else {
      const sq = Math.sqrt(disc);
      regime = 'Quá tắt không dao động (2 cực thực âm)';
      poles = [
        { re: -alpha + sq, im: 0 },
        { re: -alpha - sq, im: 0 },
      ];
    }

    // AC Impedance at chosen omega
    const XL = omega * L;
    const XC = 1 / (omega * C);
    const X = XL - XC;
    const Zmag = Math.sqrt(R * R + X * X);
    const phiDeg = (Math.atan2(X, R) * 180) / Math.PI;
    const Q = (omega0 * L) / R;

    // Time-domain step/impulse simulation for Energy exchange (Phys) & h(t) (Sig)
    const tMax = 0.035; // 35 ms window
    const N = 90;
    const energyPoints = [];
    const hPoints = [];
    for (let i = 0; i <= N; i++) {
      const t = (i / N) * tMax;
      let iNorm = 0;
      let uCNorm = 0;
      let hVal = 0;
      if (disc < -1e-2) {
        const wd = Math.sqrt(omega0 * omega0 - alpha * alpha);
        // Unit step capacitor charge uC(0)=0, i(0)=0 -> uC(t) = 1 - e^{-at}(cos(wd*t) + (a/wd)sin(wd*t))
        // Impulse current i(t) proportional to e^{-at}sin(wd*t)
        const env = Math.exp(-alpha * t);
        iNorm = env * Math.sin(wd * t);
        uCNorm = env * Math.cos(wd * t);
        hVal = (omega0 * omega0 / wd) * env * Math.sin(wd * t);
      } else if (Math.abs(disc) <= 1e-2) {
        const env = Math.exp(-alpha * t);
        iNorm = alpha * t * env * 2.2;
        uCNorm = env * (1 + alpha * t) * 0.7;
        hVal = omega0 * omega0 * t * env;
      } else {
        const sq = Math.sqrt(disc);
        const s1 = -alpha + sq;
        const s2 = -alpha - sq;
        iNorm = (Math.exp(s1 * t) - Math.exp(s2 * t)) * 0.9;
        uCNorm = (Math.exp(s1 * t) + Math.exp(s2 * t)) * 0.45;
        hVal = (omega0 * omega0 / (2 * sq)) * (Math.exp(s1 * t) - Math.exp(s2 * t));
      }
      energyPoints.push({
        t,
        we: uCNorm * uCNorm,
        wb: iNorm * iNorm,
      });
      hPoints.push({ t, h: hVal });
    }

    // Frequency response |H(jw)| = w0^2 / sqrt((w0^2 - w^2)^2 + (2*alpha*w)^2)
    const freqPoints = [];
    const wMax = Math.max(1600, omega0 * 2.2);
    for (let i = 0; i <= 80; i++) {
      const w = (i / 80) * wMax;
      const denom = Math.sqrt(Math.pow(omega0 * omega0 - w * w, 2) + Math.pow(2 * alpha * w, 2));
      const mag = (omega0 * omega0) / Math.max(denom, 1e-6);
      freqPoints.push({ w, mag });
    }

    return {
      L,
      C,
      omega0,
      alpha,
      zeta,
      regime,
      poles,
      XL,
      XC,
      Zmag,
      phiDeg,
      Q,
      energyPoints,
      hPoints,
      freqPoints,
      wMax,
    };
  }, [R, L_mH, C_uF, omega]);

  const applyPreset = (p) => {
    setR(p.R);
    setL_mH(p.L);
    setC_uF(p.C);
    setOmega(p.omega);
  };

  // Build SVG paths cleanly
  const buildPath = (pts, getX, getY, maxX, minY, maxY, width, height, pad = 12) => {
    const spanY = Math.max(maxY - minY, 1e-6);
    return pts
      .map((pt, idx) => {
        const x = pad + (getX(pt) / maxX) * (width - 2 * pad);
        const y = height - pad - ((getY(pt) - minY) / spanY) * (height - 2 * pad);
        return `${idx === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
  };

  const maxH = Math.max(...sim.hPoints.map((p) => Math.abs(p.h)), 1);
  const maxFreqMag = Math.max(...sim.freqPoints.map((p) => p.mag), 1.2);
  const activeBridge = CONCEPT_BRIDGES.find((b) => b.id === activeBridgeId) || CONCEPT_BRIDGES[0];

  // s-plane scaling
  const sMaxRe = Math.max(1200, ...sim.poles.map((p) => Math.abs(p.re) * 1.35));
  const sMaxIm = Math.max(1200, ...sim.poles.map((p) => Math.abs(p.im) * 1.35));

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-[var(--border-subtle)] pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
            Phòng Lab Hợp Nhất: 1 Mạch RLC — 3 Góc Nhìn
          </h1>
          <p className="mt-1.5 text-sm sm:text-base text-[var(--text-secondary)] max-w-3xl">
            Chỉnh thông số vật lý bên dưới để quan sát cách <strong className="text-amber-400">Vật lý 2</strong>, <strong className="text-cyan-400">Lý thuyết mạch</strong> và <strong className="text-emerald-400">Tín hiệu &amp; Hệ thống</strong> mô tả cùng một hiện tượng bằng 3 hệ ngôn ngữ toán học khác nhau.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {RLC_PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => applyPreset(p)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:border-[var(--accent-circ)] text-[var(--text-primary)] transition cursor-pointer"
              title={p.desc}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Control Workbench */}
      <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 sm:p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div>
            <div className="flex justify-between text-xs font-medium mb-2">
              <span className="text-[var(--text-secondary)]">Điện trở R</span>
              <span className="font-mono text-[var(--text-primary)] font-semibold">{R} Ω</span>
            </div>
            <input
              type="range"
              min="2"
              max="80"
              step="1"
              value={R}
              onChange={(e) => setR(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-medium mb-2">
              <span className="text-[var(--text-secondary)]">Cuộn cảm L</span>
              <span className="font-mono text-[var(--text-primary)] font-semibold">{L_mH} mH</span>
            </div>
            <input
              type="range"
              min="5"
              max="80"
              step="1"
              value={L_mH}
              onChange={(e) => setL_mH(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-medium mb-2">
              <span className="text-[var(--text-secondary)]">Tụ điện C</span>
              <span className="font-mono text-[var(--text-primary)] font-semibold">{C_uF} µF</span>
            </div>
            <input
              type="range"
              min="20"
              max="250"
              step="5"
              value={C_uF}
              onChange={(e) => setC_uF(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-medium mb-2">
              <span className="text-[var(--text-secondary)]">Tần số nguồn ω</span>
              <span className="font-mono text-[var(--accent-circ)] font-semibold">{omega} rad/s</span>
            </div>
            <input
              type="range"
              min="100"
              max="1500"
              step="10"
              value={omega}
              onChange={(e) => setOmega(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-4 font-mono">
            <span>
              ω₀ = <strong className="text-amber-400">{sim.omega0.toFixed(1)}</strong> rad/s
            </span>
            <span>
              α = <strong className="text-cyan-400">{sim.alpha.toFixed(1)}</strong> s⁻¹
            </span>
            <span>
              ζ = <strong className="text-emerald-400">{sim.zeta.toFixed(2)}</strong>
            </span>
            <span>
              Q = <strong className="text-[var(--text-primary)]">{sim.Q.toFixed(2)}</strong>
            </span>
          </div>
          <span className="px-2.5 py-1 rounded-md bg-[var(--bg-inset)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-medium">
            Chế độ: {sim.regime}
          </span>
        </div>
      </div>

      {/* 3 Synchronized Subject Scopes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Layer 1: Vật lý 2 */}
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <h2 className="font-bold text-base text-[var(--text-primary)]">
                  1. Vật lý 2 ({SUBJECTS.phys.code})
                </h2>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded border border-amber-500/30 text-amber-400 bg-amber-500/10">
                Năng lượng trường
              </span>
            </div>

            <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-3">
              Năng lượng điện trường <span className="text-amber-400 font-semibold">W_E = ½Cu²</span> trong tụ và từ trường <span className="text-cyan-400 font-semibold">W_B = ½Li²</span> trong cuộn cảm trao đổi qua lại, tiêu tán dần thành nhiệt trên R.
            </p>

            {/* Energy Oscilloscope SVG */}
            <div className="rounded-lg bg-[var(--bg-inset)] border border-[var(--border-subtle)] p-2.5">
              <svg viewBox="0 0 320 135" className="w-full h-36">
                <line x1="12" y1="120" x2="308" y2="120" stroke="rgba(148,163,184,0.25)" strokeWidth="1" />
                <path
                  d={buildPath(sim.energyPoints, (p) => p.t, (p) => p.we, 0.035, 0, 1.05, 320, 135)}
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="2.2"
                />
                <path
                  d={buildPath(sim.energyPoints, (p) => p.t, (p) => p.wb, 0.035, 0, 1.05, 320, 135)}
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="2.2"
                  strokeDasharray="4 2"
                />
              </svg>
              <div className="flex justify-between text-[11px] font-mono text-[var(--text-secondary)] px-1">
                <span className="text-amber-400">— W_E (Điện trường)</span>
                <span className="text-cyan-400">-- W_B (Từ trường)</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] text-xs space-y-1">
            <FormulaBlock latex={`e_L = -L\\frac{di}{dt}, \\quad i_d = C\\frac{du_C}{dt}`} />
            <p className="text-[var(--text-secondary)]">
              <RichMath text={`Phương trình dao động tự do: $q'' + 2\\alpha q' + \\omega_0^2 q = 0$`} />
            </p>
          </div>
        </div>

        {/* Layer 2: Lý thuyết mạch */}
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <h2 className="font-bold text-base text-[var(--text-primary)]">
                  2. Lý thuyết mạch ({SUBJECTS.circ.code})
                </h2>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded border border-cyan-500/30 text-cyan-400 bg-cyan-500/10">
                Tổng trở phức
              </span>
            </div>

            <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-3">
              Gom hiệu ứng trường thành linh kiện tập trung R–L–C. Tại ω = {omega} rad/s, mạch mang tính{' '}
              <strong className="text-[var(--text-primary)]">
                {Math.abs(sim.XL - sim.XC) < 1.2 ? 'Thuần trở (Cộng hưởng!)' : sim.XL > sim.XC ? 'Cảm kháng (i trễ pha u)' : 'Dung kháng (i sớm pha u)'}
              </strong>.
            </p>

            {/* Circuit Schematic + Live Impedance SVG */}
            <div className="rounded-lg bg-[var(--bg-inset)] border border-[var(--border-subtle)] p-2.5">
              <svg viewBox="0 0 320 135" className="w-full h-36">
                {/* Outer loop */}
                <path d="M 35 45 L 70 45 M 115 45 L 140 45 M 195 45 L 225 45 M 245 45 L 285 45 L 285 105 L 35 105 L 35 45" fill="none" stroke="rgba(148,163,184,0.5)" strokeWidth="1.8" />
                {/* Source circle */}
                <circle cx="35" cy="75" r="14" fill="var(--bg-surface)" stroke="#06b6d4" strokeWidth="2" />
                <text x="35" y="79" textAnchor="middle" fill="#06b6d4" fontSize="11" fontFamily="JetBrains Mono">~</text>
                {/* Resistor box */}
                <rect x="70" y="37" width="45" height="16" rx="2" fill="var(--bg-surface)" stroke="#f59e0b" strokeWidth="1.8" />
                <text x="92" y="29" textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontFamily="JetBrains Mono">{R}Ω</text>
                {/* Inductor arcs */}
                <path d="M 140 45 Q 147 30 154 45 Q 161 30 168 45 Q 175 30 182 45 Q 189 30 195 45" fill="none" stroke="#06b6d4" strokeWidth="2" />
                <text x="167" y="27" textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontFamily="JetBrains Mono">j{sim.XL.toFixed(1)}Ω</text>
                {/* Capacitor plates */}
                <line x1="225" y1="32" x2="225" y2="58" stroke="#10b981" strokeWidth="2.5" />
                <line x1="245" y1="32" x2="245" y2="58" stroke="#10b981" strokeWidth="2.5" />
                <text x="235" y="25" textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontFamily="JetBrains Mono">-j{sim.XC.toFixed(1)}Ω</text>
                {/* Impedance summary inside loop */}
                <text x="165" y="83" textAnchor="middle" fill="var(--text-secondary)" fontSize="11" fontFamily="JetBrains Mono">
                  |Z| = {sim.Zmag.toFixed(2)} Ω  |  φ = {sim.phiDeg.toFixed(1)}°
                </text>
              </svg>
              <div className="flex justify-between text-[11px] font-mono text-[var(--text-secondary)] px-1">
                <span>X_L = {sim.XL.toFixed(1)} Ω</span>
                <span>X_C = {sim.XC.toFixed(1)} Ω</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] text-xs space-y-1">
            <FormulaBlock latex={`Z(p) = ${R} + ${(sim.L).toFixed(3)}p + \\frac{1}{${C_uF}\\cdot 10^{-6}p}`} />
            <p className="text-[var(--text-secondary)]">
              <RichMath text={`Phức AC: $\\dot{Z} = ${R} ${sim.XL - sim.XC >= 0 ? '+' : '-'} j${Math.abs(sim.XL - sim.XC).toFixed(1)}\\,\\Omega$`} />
            </p>
          </div>
        </div>

        {/* Layer 3: Tín hiệu & Hệ thống */}
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-emerald-400" />
                <h2 className="font-bold text-base text-[var(--text-primary)]">
                  3. Tín hiệu &amp; Hệ thống ({SUBJECTS.sig.code})
                </h2>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded border border-emerald-500/30 text-emerald-400 bg-emerald-500/10">
                s-Plane &amp; Phổ
              </span>
            </div>

            <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-3">
              Toàn bộ mạch thành hàm truyền <span className="font-mono text-emerald-400">H(s)</span>. Vì tất cả điểm cực có <span className="font-mono">Re(s) = −{sim.alpha.toFixed(0)} &lt; 0</span> (nằm bên trái trục ảo), hệ luôn <strong className="text-emerald-400">ỔN ĐỊNH BIBO</strong>.
            </p>

            {/* Dual mini scopes: s-plane + |H(jw)| */}
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg bg-[var(--bg-inset)] border border-[var(--border-subtle)] p-2">
                <svg viewBox="0 0 150 135" className="w-full h-36">
                  {/* Re and Im axes */}
                  <line x1="10" y1="67.5" x2="140" y2="67.5" stroke="rgba(148,163,184,0.3)" strokeWidth="1" />
                  <line x1="110" y1="10" x2="110" y2="125" stroke="rgba(148,163,184,0.45)" strokeWidth="1.2" />
                  <text x="114" y="18" fill="var(--text-muted)" fontSize="9" fontFamily="JetBrains Mono">jω</text>
                  <text x="13" y="62" fill="var(--text-muted)" fontSize="9" fontFamily="JetBrains Mono">σ</text>
                  {/* Shaded stable left-half plane hint */}
                  <rect x="10" y="10" width="100" height="115" fill="rgba(16,185,129,0.06)" />
                  {/* Poles X */}
                  {sim.poles.map((p, idx) => {
                    const px = 110 + (p.re / sMaxRe) * 90;
                    const py = 67.5 - (p.im / sMaxIm) * 52;
                    return (
                      <g key={idx} transform={`translate(${px}, ${py})`}>
                        <line x1="-5" y1="-5" x2="5" y2="5" stroke="#10b981" strokeWidth="2.2" />
                        <line x1="-5" y1="5" x2="5" y2="-5" stroke="#10b981" strokeWidth="2.2" />
                      </g>
                    );
                  })}
                </svg>
                <div className="text-[10px] font-mono text-center text-emerald-400">Giản đồ Cực (s-Plane)</div>
              </div>

              <div className="rounded-lg bg-[var(--bg-inset)] border border-[var(--border-subtle)] p-2">
                <svg viewBox="0 0 150 135" className="w-full h-36">
                  <line x1="10" y1="120" x2="140" y2="120" stroke="rgba(148,163,184,0.3)" strokeWidth="1" />
                  <path
                    d={buildPath(sim.freqPoints, (p) => p.w, (p) => p.mag, sim.wMax, 0, maxFreqMag * 1.05, 150, 135, 10)}
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="2.2"
                  />
                  {/* Current omega marker */}
                  {(() => {
                    const xCur = 10 + (Math.min(omega, sim.wMax) / sim.wMax) * 130;
                    return <line x1={xCur} y1="12" x2={xCur} y2="120" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="3 2" />;
                  })()}
                </svg>
                <div className="text-[10px] font-mono text-center text-violet-400">Phổ |H(jω)| (ω đang chọn)</div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] text-xs space-y-1">
            <FormulaBlock latex={`H(s) = \\frac{\\omega_0^2}{s^2 + ${(2 * sim.alpha).toFixed(0)}s + ${(sim.omega0 * sim.omega0 / 1000).toFixed(1)}\\cdot 10^3}`} />
            <p className="text-[var(--text-secondary)]">
              <RichMath text={`Cực: $s_{1,2} = ${sim.poles[0].re.toFixed(0)} ${sim.poles[0].im !== 0 ? `\\pm j${Math.abs(sim.poles[0].im).toFixed(0)}` : ''}$`} />
            </p>
          </div>
        </div>
      </div>

      {/* Concept Bridges Section */}
      <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2.5">
            <Layers className="w-5 h-5 text-violet-400" />
            <h2 className="text-lg sm:text-xl font-bold text-[var(--text-primary)]">
              6 Cầu Nối Xương Sống Liên Kết 3 Môn (Học 1 Hiểu 3)
            </h2>
          </div>
          <span className="text-xs text-[var(--text-secondary)]">
            Bấm từng cầu nối để xem cách quy đổi công thức qua lại khi đi thi
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left selector list */}
          <div className="lg:col-span-4 space-y-2">
            {CONCEPT_BRIDGES.map((b, idx) => {
              const active = b.id === activeBridgeId;
              return (
                <button
                  key={b.id}
                  onClick={() => {
                    setActiveBridgeId(b.id);
                    onAwardXp?.(5, `bridge-${b.id}`);
                  }}
                  className={`w-full text-left px-3.5 py-3 rounded-lg border text-sm transition cursor-pointer flex items-center justify-between gap-2 ${
                    active
                      ? 'border-violet-500/60 bg-violet-500/10 text-[var(--text-primary)] font-semibold'
                      : 'border-[var(--border-subtle)] bg-[var(--bg-inset)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)]'
                  }`}
                >
                  <span className="line-clamp-2">
                    <span className="font-mono text-xs text-violet-400 mr-1.5">#{idx + 1}</span>
                    {b.title}
                  </span>
                  <ArrowRight className={`w-4 h-4 shrink-0 ${active ? 'text-violet-400' : 'opacity-40'}`} />
                </button>
              );
            })}
          </div>

          {/* Right bridge detail */}
          <div className="lg:col-span-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-inset)] p-4 sm:p-5 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-[var(--text-primary)]">{activeBridge.title}</h3>
              <p className="text-sm text-[var(--text-secondary)] mt-1 mb-4">{activeBridge.summary}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                {[
                  { data: activeBridge.phys, accent: 'border-amber-500/30', titleColor: 'text-amber-400' },
                  { data: activeBridge.circ, accent: 'border-cyan-500/30', titleColor: 'text-cyan-400' },
                  { data: activeBridge.sig, accent: 'border-emerald-500/30', titleColor: 'text-emerald-400' },
                ].map((col, i) => (
                  <div key={i} className={`rounded-lg border ${col.accent} bg-[var(--bg-surface)] p-3.5 flex flex-col justify-between`}>
                    <div>
                      <div className={`text-xs font-bold uppercase tracking-wide ${col.titleColor} mb-2`}>
                        {col.data.label}
                      </div>
                      <div className="py-1.5 text-sm overflow-x-auto">
                        <FormulaBlock latex={col.data.formula} />
                      </div>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed mt-2">
                      {col.data.explain}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-primary)]">
              <Activity className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-violet-400">Mẹo ăn điểm tự luận: </span>
                <RichMath text={activeBridge.examTip} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
