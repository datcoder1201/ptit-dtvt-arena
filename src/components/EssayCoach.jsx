import React, { useMemo, useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Eye,
  EyeOff,
  Lightbulb,
  Search,
  SlidersHorizontal,
} from 'lucide-react';
import { ESSAYS_DATA } from '../data/essaysData';
import { SUBJECTS } from '../data/bridgesData';
import { RichMath } from './MathBlock';

function ConvolutionVisualizer() {
  const [tVal, setTVal] = useState(1.2);

  // x(tau) = 1 on [0, 2]; h(t - tau) = exp(-(t - tau)) for tau <= t
  const calcY = (t) => {
    if (t < 0) return 0;
    if (t < 2) return 1 - Math.exp(-t);
    return (Math.exp(2) - 1) * Math.exp(-t);
  };

  const yPoints = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 100; i++) {
      const t = -0.8 + (i / 100) * 5.6;
      pts.push({ t, y: calcY(t) });
    }
    return pts;
  }, []);

  const toX = (val) => 30 + ((val + 1) / 6) * 270;

  return (
    <div className="rounded-xl border border-emerald-500/35 bg-[var(--bg-inset)] p-4 space-y-3 my-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
          <SlidersHorizontal className="w-4 h-4" />
          Mô phỏng Trượt Tích Chập Trực Quan: y(t) = x(t) * h(t)
        </div>
        <div className="font-mono text-xs text-[var(--text-primary)]">
          t = <span className="text-cyan-400 font-bold">{tVal.toFixed(2)}</span> → y(t) ={' '}
          <span className="text-emerald-400 font-bold">{calcY(tVal).toFixed(3)}</span>
        </div>
      </div>

      <input
        type="range"
        min="-0.6"
        max="4.4"
        step="0.05"
        value={tVal}
        onChange={(e) => setTVal(Number(e.target.value))}
        className="w-full"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Top/Left: x(tau) and sliding h(t-tau) */}
        <div className="rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-2">
          <svg viewBox="0 0 320 120" className="w-full h-28">
            <line x1="20" y1="98" x2="305" y2="98" stroke="rgba(148,163,184,0.3)" />
            {/* x(tau) rectangle on [0, 2] */}
            <rect
              x={toX(0)}
              y="38"
              width={toX(2) - toX(0)}
              height="60"
              fill="rgba(245,158,11,0.18)"
              stroke="#f59e0b"
              strokeWidth="2"
            />
            {/* Overlap shaded region */}
            {tVal > 0 && (
              <path
                d={(() => {
                  const a = 0;
                  const b = Math.min(2, tVal);
                  let d = `M ${toX(a).toFixed(1)},98 `;
                  for (let k = 0; k <= 25; k++) {
                    const tau = a + (k / 25) * (b - a);
                    const val = Math.exp(-(tVal - tau));
                    d += `L ${toX(tau).toFixed(1)},${(98 - val * 60).toFixed(1)} `;
                  }
                  d += `L ${toX(b).toFixed(1)},98 Z`;
                  return d;
                })()}
                fill="rgba(16,185,129,0.35)"
              />
            )}
            {/* h(t - tau) sliding curve */}
            <path
              d={(() => {
                let d = '';
                for (let k = 0; k <= 40; k++) {
                  const tau = -1 + (k / 40) * (tVal + 1);
                  if (tau > tVal) break;
                  const val = Math.exp(-(tVal - tau));
                  const x = toX(tau);
                  const y = 98 - val * 60;
                  d += `${k === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)} `;
                }
                d += `L ${toX(tVal).toFixed(1)},98`;
                return d;
              })()}
              fill="none"
              stroke="#06b6d4"
              strokeWidth="2"
            />
            <text x={toX(0)} y="112" fontSize="9" fill="var(--text-muted)" fontFamily="JetBrains Mono">0</text>
            <text x={toX(2)} y="112" fontSize="9" fill="var(--text-muted)" fontFamily="JetBrains Mono">2</text>
            <text x={toX(tVal) - 4} y="25" fontSize="9" fill="#06b6d4" fontFamily="JetBrains Mono">t={tVal.toFixed(1)}</text>
          </svg>
          <div className="text-[11px] font-mono text-center text-[var(--text-secondary)]">
            <span className="text-amber-400">x(τ)</span> &amp; <span className="text-cyan-400">h(t−τ)</span> (Miền giao = Diện tích tích phân)
          </div>
        </div>

        {/* Right: Result y(t) */}
        <div className="rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-2">
          <svg viewBox="0 0 320 120" className="w-full h-28">
            <line x1="20" y1="98" x2="305" y2="98" stroke="rgba(148,163,184,0.3)" />
            <path
              d={yPoints
                .map((p, idx) => {
                  const x = toX(p.t);
                  const y = 98 - p.y * 65;
                  return `${idx === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
                })
                .join(' ')}
              fill="none"
              stroke="#10b981"
              strokeWidth="2.4"
            />
            <circle cx={toX(tVal)} cy={98 - calcY(tVal) * 65} r="4.5" fill="#10b981" stroke="#fff" strokeWidth="1.5" />
            <text x={toX(0)} y="112" fontSize="9" fill="var(--text-muted)" fontFamily="JetBrains Mono">0</text>
            <text x={toX(2)} y="112" fontSize="9" fill="var(--text-muted)" fontFamily="JetBrains Mono">2</text>
          </svg>
          <div className="text-[11px] font-mono text-center text-emerald-400">
            Ngõ ra y(t) — Chú ý luôn liên tục tại t = 0 và t = 2
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EssayCoach({ masteredIds, onToggleMastered }) {
  const [filterSubject, setFilterSubject] = useState('all');
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState(ESSAYS_DATA[0].id);
  const [revealedStepsMap, setRevealedStepsMap] = useState({});
  const [showHintMap, setShowHintMap] = useState({});

  const filtered = useMemo(() => {
    return ESSAYS_DATA.filter((e) => {
      if (filterSubject !== 'all' && e.subject !== filterSubject) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          e.title.toLowerCase().includes(q) ||
          e.topic.toLowerCase().includes(q) ||
          e.statement.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [filterSubject, search]);

  const revealNextStep = (id, total) => {
    setRevealedStepsMap((prev) => {
      const cur = prev[id] || 0;
      return { ...prev, [id]: Math.min(cur + 1, total) };
    });
  };

  const revealAllSteps = (id, total) => {
    setRevealedStepsMap((prev) => ({ ...prev, [id]: total }));
  };

  const hideAllSteps = (id) => {
    setRevealedStepsMap((prev) => ({ ...prev, [id]: 0 }));
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-[var(--border-subtle)] pb-5">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
              Kho 18 Dạng Tự Luận Tủ PTIT (Mở Từng Bước Chuẩn Barem)
            </h1>
            <p className="mt-1.5 text-sm text-[var(--text-secondary)]">
              Đọc đề → tự làm ra giấy nháp → bấm mở từng bước giải kèm điểm barem và cảnh báo bẫy trừ điểm của giảng viên.
            </p>
          </div>
          <div className="text-xs font-mono px-3 py-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shrink-0">
            Đã thuần thục: {masteredIds.length} / {ESSAYS_DATA.length} dạng
          </div>
        </div>

        <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-between">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: `Tất cả (${ESSAYS_DATA.length})` },
              { id: 'phys', label: 'Vật lý 2 (6)' },
              { id: 'circ', label: 'Lý thuyết mạch (6)' },
              { id: 'sig', label: 'Tín hiệu & Hệ thống (6)' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterSubject(tab.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                  filterSubject === tab.id
                    ? 'border-[var(--accent-circ)] bg-cyan-500/15 text-cyan-400'
                    : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm dạng bài (Gauss, ROC, Laplace...)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>
      </div>

      {/* Essay List */}
      <div className="space-y-4">
        {filtered.map((item) => {
          const isOpen = expandedId === item.id;
          const isMastered = masteredIds.includes(item.id);
          const revealedCount = revealedStepsMap[item.id] || 0;
          const showHint = !!showHintMap[item.id];
          const subj = SUBJECTS[item.subject];

          return (
            <div
              key={item.id}
              className={`rounded-xl border transition bg-[var(--bg-surface)] ${
                isOpen ? 'border-[var(--border-strong)] shadow-lg' : 'border-[var(--border-subtle)]'
              }`}
            >
              {/* Card Header */}
              <button
                onClick={() => setExpandedId(isOpen ? null : item.id)}
                className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer"
              >
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className={`font-mono px-2 py-0.5 rounded border ${subj.badgeClass}`}>
                      {subj.shortName}
                    </span>
                    <span className="font-mono text-[var(--text-muted)]">{item.topic}</span>
                    <span className="px-2 py-0.5 rounded bg-[var(--bg-inset)] text-[var(--text-secondary)] font-mono">
                      {item.points}
                    </span>
                    <span className="text-amber-400 font-medium">{item.frequency}</span>
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-[var(--text-primary)]">
                    <RichMath text={item.title} />
                  </h2>
                </div>

                <div className="flex items-center gap-2 shrink-0 mt-1">
                  {isMastered && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                  {isOpen ? (
                    <ChevronDown className="w-5 h-5 text-[var(--text-secondary)]" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-[var(--text-secondary)]" />
                  )}
                </div>
              </button>

              {/* Expanded Body */}
              {isOpen && (
                <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-[var(--border-subtle)] space-y-4">
                  {/* Problem statement */}
                  <div className="rounded-lg bg-[var(--bg-inset)] border border-[var(--border-subtle)] p-4 text-sm sm:text-base leading-relaxed text-[var(--text-primary)]">
                    <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-1.5">
                      Đề bài tự luận chuẩn PTIT
                    </div>
                    <RichMath text={item.statement} />
                  </div>

                  {/* Link note */}
                  <div className="text-xs text-[var(--text-secondary)] flex items-center gap-2">
                    <span className="font-semibold text-violet-400">Liên kết 3 môn:</span>
                    <RichMath text={item.linkNote} />
                  </div>

                  {/* Special Interactive Convolution Visualizer on sig-2 */}
                  {item.id === 'sig-2' && <ConvolutionVisualizer />}

                  {/* Action Controls */}
                  <div className="flex flex-wrap items-center justify-between gap-2.5">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setShowHintMap((p) => ({ ...p, [item.id]: !p[item.id] }))}
                        className="px-3 py-1.5 rounded-lg border border-amber-500/40 bg-amber-500/10 text-amber-400 text-xs font-semibold flex items-center gap-1.5 cursor-pointer hover:bg-amber-500/20"
                      >
                        <Lightbulb className="w-3.5 h-3.5" />
                        {showHint ? 'Ẩn gợi ý' : 'Xem gợi ý hướng giải'}
                      </button>

                      {revealedCount < item.steps.length && (
                        <button
                          onClick={() => revealNextStep(item.id, item.steps.length)}
                          className="px-3.5 py-1.5 rounded-lg bg-cyan-500 text-slate-950 text-xs font-bold flex items-center gap-1.5 cursor-pointer hover:bg-cyan-400"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          Mở Bước {revealedCount + 1} / {item.steps.length}
                        </button>
                      )}

                      {revealedCount < item.steps.length ? (
                        <button
                          onClick={() => revealAllSteps(item.id, item.steps.length)}
                          className="px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
                        >
                          Mở toàn bộ lời giải
                        </button>
                      ) : (
                        <button
                          onClick={() => hideAllSteps(item.id)}
                          className="px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-secondary)] flex items-center gap-1 cursor-pointer"
                        >
                          <EyeOff className="w-3.5 h-3.5" /> Thu gọn lời giải
                        </button>
                      )}
                    </div>

                    <button
                      onClick={() => onToggleMastered(item.id)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold border flex items-center gap-1.5 cursor-pointer transition ${
                        isMastered
                          ? 'border-emerald-500 bg-emerald-500/15 text-emerald-400'
                          : 'border-[var(--border-subtle)] bg-[var(--bg-inset)] text-[var(--text-secondary)] hover:border-emerald-500/50'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {isMastered ? 'Đã thuần thục' : 'Đánh dấu đã thuộc'}
                    </button>
                  </div>

                  {/* Hint block */}
                  {showHint && (
                    <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3.5 text-sm text-[var(--text-primary)]">
                      <span className="font-bold text-amber-400 mr-1.5">Gợi ý:</span>
                      <RichMath text={item.hint} />
                    </div>
                  )}

                  {/* Progressive Steps */}
                  {revealedCount > 0 && (
                    <div className="space-y-3">
                      {item.steps.slice(0, revealedCount).map((st, idx) => (
                        <div
                          key={idx}
                          className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-inset)] p-4 space-y-2"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="font-bold text-sm text-cyan-400">
                              <RichMath text={st.title} />
                            </h4>
                            <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                              {st.score}
                            </span>
                          </div>
                          <div className="text-sm leading-relaxed text-[var(--text-primary)] whitespace-pre-line">
                            <RichMath text={st.content} />
                          </div>
                        </div>
                      ))}

                      {/* Trap warning shown once at least step 1 is opened or all opened */}
                      {revealedCount === item.steps.length && (
                        <div className="rounded-lg border border-rose-500/35 bg-rose-500/10 p-3.5 flex items-start gap-2.5 text-sm">
                          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-rose-400">Bẫy giảng viên hay trừ điểm: </span>
                            <RichMath text={item.trap} />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
