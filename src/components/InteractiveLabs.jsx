import React, { useEffect, useMemo, useState } from 'react';
import { Activity, Pause, Play, Radar, RotateCcw, SlidersHorizontal } from 'lucide-react';
import UnifiedBridgeLab from './UnifiedBridgeLab';
import { FormulaBlock, RichMath } from './MathBlock';
import { playClick } from '../utils/soundFx';

const CONV_PRESETS = [
  {
    id: 'rect-exp',
    title: 'Xung vuông * Hàm mũ: x(t) = u(t)−u(t−2), h(t) = e⁻ᵗu(t)',
    calcY: (t) => {
      if (t < 0) return 0;
      if (t < 2) return 1 - Math.exp(-t);
      return (Math.exp(2) - 1) * Math.exp(-t);
    },
    getRegionInfo: (t) => {
      if (t < 0) return { label: 'Khoảng 1: t < 0 (Không giao)', formula: 'y(t) = 0' };
      if (t < 2)
        return {
          label: 'Khoảng 2: 0 ≤ t < 2 (Giao trên [0, t])',
          formula: 'y(t) = \\int_0^t 1\\cdot e^{-(t-\\tau)}d\\tau = 1 - e^{-t}',
        };
      return {
        label: 'Khoảng 3: t ≥ 2 (Phủ trọn [0, 2])',
        formula: 'y(t) = \\int_0^2 1\\cdot e^{-(t-\\tau)}d\\tau = (e^2 - 1)e^{-t}',
      };
    },
    xHeight: (tau) => (tau >= 0 && tau <= 2 ? 1 : 0),
    hFlippedHeight: (t, tau) => (tau <= t ? Math.exp(-(t - tau)) : 0),
    tMin: -0.6,
    tMax: 4.5,
  },
  {
    id: 'rect-rect',
    title: 'Hai xung vuông (Hình thang): x(t) = [0,1], h(t) = [0,3]',
    calcY: (t) => {
      if (t < 0) return 0;
      if (t < 1) return t;
      if (t < 3) return 1;
      if (t < 4) return 4 - t;
      return 0;
    },
    getRegionInfo: (t) => {
      if (t < 0 || t >= 4) return { label: 'Ngoài vùng giao (t < 0 hoặc t ≥ 4)', formula: 'y(t) = 0' };
      if (t < 1) return { label: 'Khoảng 1: 0 ≤ t < 1 (Đang trượt vào)', formula: 'y(t) = \\int_0^t 1\\,d\\tau = t' };
      if (t < 3) return { label: 'Khoảng 2: 1 ≤ t < 3 (Nằm lọt trong [0,3])', formula: 'y(t) = \\int_{t-1}^{t} 1\\,d\\tau = 1' };
      return { label: 'Khoảng 3: 3 ≤ t < 4 (Đang trượt ra)', formula: 'y(t) = \\int_{t-3}^1 1\\,d\\tau = 4 - t' };
    },
    xHeight: (tau) => (tau >= 0 && tau <= 1 ? 1 : 0),
    hFlippedHeight: (t, tau) => (tau >= t - 3 && tau <= t ? 1 : 0),
    tMin: -0.5,
    tMax: 4.5,
  },
  {
    id: 'exp-exp',
    title: 'Hai hàm mũ nhân quả: x(t) = e⁻ᵗu(t), h(t) = e⁻²ᵗu(t)',
    calcY: (t) => (t < 0 ? 0 : Math.exp(-t) - Math.exp(-2 * t)),
    getRegionInfo: (t) => {
      if (t < 0) return { label: 'Khoảng 1: t < 0 (Không giao)', formula: 'y(t) = 0' };
      return {
        label: 'Khoảng 2: t ≥ 0 (Giao trên [0, t])',
        formula: 'y(t) = \\int_0^t e^{-\\tau}e^{-2(t-\\tau)}d\\tau = e^{-t} - e^{-2t}',
      };
    },
    xHeight: (tau) => (tau >= 0 ? Math.exp(-tau) : 0),
    hFlippedHeight: (t, tau) => (tau <= t ? Math.exp(-2 * (t - tau)) : 0),
    tMin: -0.5,
    tMax: 4.5,
  },
];

function ConvolutionLab() {
  const [presetId, setPresetId] = useState(CONV_PRESETS[0].id);
  const preset = CONV_PRESETS.find((p) => p.id === presetId) || CONV_PRESETS[0];
  const [tVal, setTVal] = useState(1.2);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setTVal((prev) => {
        const next = prev + 0.06;
        return next > preset.tMax ? preset.tMin : next;
      });
    }, 55);
    return () => clearInterval(id);
  }, [playing, preset.tMin, preset.tMax]);

  const toX = (val) => 30 + ((val + 1) / 6) * 280;
  const region = preset.getRegionInfo(tVal);

  const yPoints = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 110; i++) {
      const t = preset.tMin + (i / 110) * (preset.tMax - preset.tMin);
      pts.push({ t, y: preset.calcY(t) });
    }
    return pts;
  }, [preset]);

  const maxY = Math.max(...yPoints.map((p) => p.y), 1);

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            Máy Trượt Tích Chập Tương Tác (TEL1368)
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Bấm Play hoặc kéo thanh thời gian t để xem miền giao giữa x(τ) và h(t−τ) quyết định cận tích phân như thế nào.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {CONV_PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                playClick();
                setPresetId(p.id);
                setTVal(0.8);
                setPlaying(false);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border cursor-pointer ${
                presetId === p.id
                  ? 'border-emerald-500/60 bg-emerald-500/15 text-emerald-400'
                  : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)]'
              }`}
            >
              {p.title.split(':')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPlaying((p) => !p)}
              className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              {playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              {playing ? 'Tạm dừng' : 'Chạy tự động'}
            </button>
            <button
              onClick={() => {
                setPlaying(false);
                setTVal(preset.tMin);
              }}
              className="px-3 py-2 rounded-lg border border-[var(--border-subtle)] text-xs font-semibold flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Về đầu
            </button>
          </div>

          <div className="font-mono text-sm">
            t = <strong className="text-cyan-400">{tVal.toFixed(2)}</strong> &nbsp;|&nbsp; y(t) ={' '}
            <strong className="text-emerald-400">{preset.calcY(tVal).toFixed(3)}</strong>
          </div>
        </div>

        <input
          type="range"
          min={preset.tMin}
          max={preset.tMax}
          step="0.04"
          value={tVal}
          onChange={(e) => {
            setPlaying(false);
            setTVal(Number(e.target.value));
          }}
          className="w-full"
        />
      </div>

      {/* Dual Scope */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4">
          <div className="text-xs font-mono text-[var(--text-secondary)] mb-2">
            Miền biến τ: <span className="text-amber-400">x(τ) đứng yên</span> &amp;{' '}
            <span className="text-cyan-400">h(t−τ) trượt sang phải</span>
          </div>
          <svg viewBox="0 0 340 160" className="w-full h-44 bg-[var(--bg-inset)] rounded-lg border border-[var(--border-subtle)]">
            <line x1="20" y1="130" x2="320" y2="130" stroke="rgba(148,163,184,0.35)" />
            {/* x(tau) */}
            <path
              d={(() => {
                let d = `M ${toX(-0.9).toFixed(1)},130 `;
                for (let k = 0; k <= 120; k++) {
                  const tau = -0.9 + (k / 120) * 5.7;
                  const y = 130 - preset.xHeight(tau) * 90;
                  d += `L ${toX(tau).toFixed(1)},${y.toFixed(1)} `;
                }
                return d;
              })()}
              fill="rgba(245,158,11,0.14)"
              stroke="#f59e0b"
              strokeWidth="2"
            />
            {/* overlap fill */}
            <path
              d={(() => {
                let d = `M ${toX(-0.9).toFixed(1)},130 `;
                for (let k = 0; k <= 120; k++) {
                  const tau = -0.9 + (k / 120) * 5.7;
                  const prod = preset.xHeight(tau) * preset.hFlippedHeight(tVal, tau);
                  const y = 130 - prod * 90;
                  d += `L ${toX(tau).toFixed(1)},${y.toFixed(1)} `;
                }
                d += `L ${toX(4.8).toFixed(1)},130 Z`;
                return d;
              })()}
              fill="rgba(16,185,129,0.42)"
            />
            {/* h(t-tau) */}
            <path
              d={(() => {
                let d = `M ${toX(-0.9).toFixed(1)},130 `;
                for (let k = 0; k <= 120; k++) {
                  const tau = -0.9 + (k / 120) * 5.7;
                  const y = 130 - preset.hFlippedHeight(tVal, tau) * 90;
                  d += `L ${toX(tau).toFixed(1)},${y.toFixed(1)} `;
                }
                return d;
              })()}
              fill="none"
              stroke="#06b6d4"
              strokeWidth="2.2"
            />
            {[0, 1, 2, 3, 4].map((tick) => (
              <text key={tick} x={toX(tick) - 3} y="146" fontSize="10" fill="var(--text-muted)" fontFamily="JetBrains Mono">
                {tick}
              </text>
            ))}
          </svg>
        </div>

        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4">
          <div className="text-xs font-mono text-emerald-400 mb-2">
            Kết quả tích chập y(t) = ∫ x(τ)h(t−τ) dτ
          </div>
          <svg viewBox="0 0 340 160" className="w-full h-44 bg-[var(--bg-inset)] rounded-lg border border-[var(--border-subtle)]">
            <line x1="20" y1="130" x2="320" y2="130" stroke="rgba(148,163,184,0.35)" />
            <path
              d={yPoints
                .map((p, idx) => {
                  const x = toX(p.t);
                  const y = 130 - (p.y / maxY) * 90;
                  return `${idx === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
                })
                .join(' ')}
              fill="none"
              stroke="#10b981"
              strokeWidth="2.6"
            />
            <circle
              cx={toX(tVal)}
              cy={130 - (preset.calcY(tVal) / maxY) * 90}
              r="5"
              fill="#10b981"
              stroke="#ffffff"
              strokeWidth="2"
            />
            {[0, 1, 2, 3, 4].map((tick) => (
              <text key={tick} x={toX(tick) - 3} y="146" fontSize="10" fill="var(--text-muted)" fontFamily="JetBrains Mono">
                {tick}
              </text>
            ))}
          </svg>
        </div>
      </div>

      {/* Auto-updated Integral Formula Card */}
      <div className="rounded-xl border border-emerald-500/35 bg-[var(--bg-surface)] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono text-emerald-400 font-bold">{region.label}</div>
          <div className="mt-1">
            <FormulaBlock latex={region.formula} />
          </div>
        </div>
        <div className="text-xs text-[var(--text-secondary)] max-w-sm">
          <RichMath text={preset.title} />
        </div>
      </div>
    </div>
  );
}

function RocRadarLab() {
  const [p1, setP1] = useState(0.5);
  const [p2, setP2] = useState(1.8);
  const [rocMode, setRocMode] = useState('ring'); // outer | ring | inner

  const isCausal = rocMode === 'outer';
  const isStable = (rocMode === 'outer' && p2 < 1) || (rocMode === 'ring' && p1 < 1 && p2 > 1) || (rocMode === 'inner' && p1 > 1);

  const rocLabel =
    rocMode === 'outer'
      ? `|z| > ${p2.toFixed(1)}`
      : rocMode === 'ring'
      ? `${p1.toFixed(1)} < |z| < ${p2.toFixed(1)}`
      : `|z| < ${p1.toFixed(1)}`;

  const hFormula =
    rocMode === 'outer'
      ? `h[n] = \\left[A\\,(${p1.toFixed(1)})^n + B\\,(${p2.toFixed(1)})^n\\right]u[n]`
      : rocMode === 'ring'
      ? `h[n] = A\\,(${p1.toFixed(1)})^n u[n] - B\\,(${p2.toFixed(1)})^n u[-n-1]`
      : `h[n] = -\\left[A\\,(${p1.toFixed(1)})^n + B\\,(${p2.toFixed(1)})^n\\right]u[-n-1]`;

  const scale = 42; // 1 unit = 42 px
  const cx = 130;
  const cy = 130;

  return (
    <div className="space-y-6">
      <div className="border-b border-[var(--border-subtle)] pb-4">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">
          Radar Miền Hội Tụ ROC (Mặt Phẳng Phức z)
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Chỉnh vị trí 2 điểm cực p₁, p₂ và chọn miền hội tụ ROC để thấy ngay hệ nào Nhân quả, hệ nào Ổn định BIBO, và biểu thức h[n] thay đổi dấu như thế nào.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Interactive z-plane SVG */}
        <div className="lg:col-span-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 flex flex-col items-center">
          <svg viewBox="0 0 260 260" className="w-64 h-64 rounded-xl bg-[var(--bg-inset)] border border-[var(--border-subtle)]">
            <defs>
              <mask id="ringMask">
                <rect width="260" height="260" fill="black" />
                <circle cx={cx} cy={cy} r={p2 * scale} fill="white" />
                <circle cx={cx} cy={cy} r={p1 * scale} fill="black" />
              </mask>
              <mask id="outerMask">
                <rect width="260" height="260" fill="white" />
                <circle cx={cx} cy={cy} r={p2 * scale} fill="black" />
              </mask>
            </defs>

            {/* ROC Shading */}
            {rocMode === 'outer' && <rect width="260" height="260" fill="rgba(16,185,129,0.22)" mask="url(#outerMask)" />}
            {rocMode === 'ring' && <rect width="260" height="260" fill="rgba(16,185,129,0.22)" mask="url(#ringMask)" />}
            {rocMode === 'inner' && <circle cx={cx} cy={cy} r={p1 * scale} fill="rgba(16,185,129,0.22)" />}

            {/* Axes */}
            <line x1="10" y1={cy} x2="250" y2={cy} stroke="rgba(148,163,184,0.35)" />
            <line x1={cx} y1="10" x2={cx} y2="250" stroke="rgba(148,163,184,0.35)" />

            {/* Pole circles */}
            <circle cx={cx} cy={cy} r={p1 * scale} fill="none" stroke="#f59e0b" strokeWidth="1.3" strokeDasharray="3 3" />
            <circle cx={cx} cy={cy} r={p2 * scale} fill="none" stroke="#f43f5e" strokeWidth="1.3" strokeDasharray="3 3" />

            {/* Unit circle |z| = 1 */}
            <circle cx={cx} cy={cy} r={1 * scale} fill="none" stroke="#06b6d4" strokeWidth="2" />

            {/* Poles X on real axis */}
            {[p1, p2].map((r, i) => {
              const px = cx + r * scale;
              const color = i === 0 ? '#f59e0b' : '#f43f5e';
              return (
                <g key={i} transform={`translate(${px}, ${cy})`}>
                  <line x1="-5" y1="-5" x2="5" y2="5" stroke={color} strokeWidth="2.4" />
                  <line x1="-5" y1="5" x2="5" y2="-5" stroke={color} strokeWidth="2.4" />
                </g>
              );
            })}
            <text x={cx + 1 * scale + 3} y={cy - 6} fontSize="9" fill="#06b6d4" fontFamily="JetBrains Mono">|z|=1</text>
          </svg>

          <div className="mt-3 text-xs font-mono text-[var(--text-secondary)] text-center">
            Vòng tròn xanh lam: <span className="text-cyan-400 font-bold">|z| = 1</span> &nbsp;|&nbsp; Vùng xanh lá: <span className="text-emerald-400 font-bold">ROC</span>
          </div>
        </div>

        {/* Right: Controls & Output */}
        <div className="lg:col-span-7 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-amber-400 font-semibold">Cực trong |p₁|</span>
                <span className="font-mono">{p1.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="0.9"
                step="0.1"
                value={p1}
                onChange={(e) => setP1(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-rose-400 font-semibold">Cực ngoài |p₂|</span>
                <span className="font-mono">{p2.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="1.1"
                max="2.4"
                step="0.1"
                value={p2}
                onChange={(e) => setP2(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-semibold text-[var(--text-muted)] uppercase">Chọn Miền Hội Tụ (ROC)</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { id: 'outer', label: `Ngoài |z| > ${p2.toFixed(1)}` },
                { id: 'ring', label: `Vành khuyên ${p1.toFixed(1)} < |z| < ${p2.toFixed(1)}` },
                { id: 'inner', label: `Trong |z| < ${p1.toFixed(1)}` },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    playClick();
                    setRocMode(m.id);
                  }}
                  className={`px-3 py-2 rounded-lg text-xs font-mono font-semibold border cursor-pointer ${
                    rocMode === m.id
                      ? 'border-emerald-500 bg-emerald-500/15 text-emerald-400'
                      : 'border-[var(--border-subtle)] bg-[var(--bg-inset)] text-[var(--text-secondary)]'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className={`rounded-xl border p-3 ${isCausal ? 'border-emerald-500/40 bg-emerald-500/10' : 'border-[var(--border-subtle)] bg-[var(--bg-inset)]'}`}>
              <div className="text-[11px] font-mono text-[var(--text-muted)]">TÍNH NHÂN QUẢ</div>
              <div className={`text-sm font-bold mt-0.5 ${isCausal ? 'text-emerald-400' : 'text-rose-400'}`}>
                {isCausal ? 'NHÂN QUẢ (ROC ngoài cực lớn nhất)' : 'KHÔNG NHÂN QUẢ'}
              </div>
            </div>

            <div className={`rounded-xl border p-3 ${isStable ? 'border-emerald-500/40 bg-emerald-500/10' : 'border-[var(--border-subtle)] bg-[var(--bg-inset)]'}`}>
              <div className="text-[11px] font-mono text-[var(--text-muted)]">TÍNH ỔN ĐỊNH BIBO</div>
              <div className={`text-sm font-bold mt-0.5 ${isStable ? 'text-emerald-400' : 'text-rose-400'}`}>
                {isStable ? 'ỔN ĐỊNH (ROC chứa |z|=1)' : 'KHÔNG ỔN ĐỊNH'}
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-inset)] p-4">
            <div className="text-xs font-mono text-cyan-400 mb-1">
              Đáp ứng xung h[n] tương ứng ROC {rocLabel}:
            </div>
            <FormulaBlock latex={hFormula} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InteractiveLabs({ onAwardXp }) {
  const [labId, setLabId] = useState('rlc'); // rlc | conv | roc

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'rlc', label: 'Lab 1: 1 Mạch RLC — 3 Góc Nhìn', icon: Activity },
          { id: 'conv', label: 'Lab 2: Máy Trượt Tích Chập', icon: SlidersHorizontal },
          { id: 'roc', label: 'Lab 3: Radar Miền Hội Tụ ROC', icon: Radar },
        ].map((item) => {
          const Icon = item.icon;
          const active = labId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                playClick();
                setLabId(item.id);
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border flex items-center gap-2 cursor-pointer transition ${
                active
                  ? 'border-cyan-400 bg-cyan-500/15 text-cyan-400'
                  : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {labId === 'rlc' && <UnifiedBridgeLab onAwardXp={onAwardXp} />}
      {labId === 'conv' && <ConvolutionLab />}
      {labId === 'roc' && <RocRadarLab />}
    </div>
  );
}
