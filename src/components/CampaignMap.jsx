import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Cpu,
  Heart,
  Layers,
  Play,
  Radio,
  Shield,
  Sparkles,
  Star,
  Swords,
  Trophy,
  Zap,
} from 'lucide-react';
import { CAMPAIGN_STAGES } from '../data/campaignData';
import { FormulaBlock, RichMath } from './MathBlock';
import { playBossHit, playClick, playCorrect, playVictory, playWrong } from '../utils/soundFx';

export default function CampaignMap({ stageProgress, onUpdateStage, onAwardXp }) {
  const [activeStageId, setActiveStageId] = useState(null);
  const [phase, setPhase] = useState(1); // 1: Bridge, 2: Shield Trials, 3: Boss Fight

  // Phase 2 state
  const [trialIdx, setTrialIdx] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [trialPick, setTrialPick] = useState(null);
  const [trialDoneCount, setTrialDoneCount] = useState(0);

  // Phase 3 Boss state
  const [bossStepIdx, setBossStepIdx] = useState(0);
  const [bossHp, setBossHp] = useState(3);
  const [bossShaking, setBossShaking] = useState(false);
  const [critPick, setCritPick] = useState(null);
  const [unlockedSteps, setUnlockedSteps] = useState([]);

  const activeStage = useMemo(
    () => CAMPAIGN_STAGES.find((s) => s.id === activeStageId) || null,
    [activeStageId]
  );

  const totalStars = useMemo(
    () =>
      CAMPAIGN_STAGES.reduce((sum, st) => {
        const p = stageProgress[st.id] || {};
        return sum + (p.s1 ? 1 : 0) + (p.s2 ? 1 : 0) + (p.s3 ? 1 : 0);
      }, 0),
    [stageProgress]
  );

  const clearedBossCount = useMemo(
    () => CAMPAIGN_STAGES.filter((st) => stageProgress[st.id]?.s3).length,
    [stageProgress]
  );

  const readinessPct = Math.round((totalStars / (CAMPAIGN_STAGES.length * 3)) * 100);

  const enterStage = (stage, startPhase = 1) => {
    playClick();
    setActiveStageId(stage.id);
    setPhase(startPhase);
    setTrialIdx(0);
    setHearts(3);
    setTrialPick(null);
    setTrialDoneCount(0);
    setBossStepIdx(0);
    setBossHp(stage.boss.phases.length);
    setCritPick(null);
    setUnlockedSteps([]);
  };

  const completeBridgePhase = () => {
    playCorrect(1);
    onUpdateStage(activeStage.id, { s1: true });
    onAwardXp?.(20, `stage-s1-${activeStage.id}`);
    setPhase(2);
    setTrialIdx(0);
    setHearts(3);
    setTrialPick(null);
    setTrialDoneCount(0);
  };

  const handleTrialAnswer = (idx) => {
    if (trialPick !== null) return;
    const currentTrial = activeStage.shieldTrials[trialIdx];
    setTrialPick(idx);
    if (idx === currentTrial.correctIndex) {
      playCorrect(trialDoneCount + 1);
      setTrialDoneCount((c) => c + 1);
      onAwardXp?.(15);
    } else {
      playWrong();
      setHearts((h) => Math.max(0, h - 1));
    }
  };

  const advanceTrial = () => {
    playClick();
    if (trialIdx + 1 < activeStage.shieldTrials.length) {
      setTrialIdx((i) => i + 1);
      setTrialPick(null);
    } else {
      if (hearts > 0) {
        onUpdateStage(activeStage.id, { s2: true });
        onAwardXp?.(30, `stage-s2-${activeStage.id}`);
      }
      setPhase(3);
      setBossStepIdx(0);
      setBossHp(activeStage.boss.phases.length);
      setCritPick(null);
      setUnlockedSteps([]);
    }
  };

  const strikeBoss = (stepIndex, usedCritCorrect = false) => {
    if (unlockedSteps.includes(stepIndex)) return;
    const nextUnlocked = [...unlockedSteps, stepIndex];
    setUnlockedSteps(nextUnlocked);
    const nextHp = Math.max(0, activeStage.boss.phases.length - nextUnlocked.length);
    setBossHp(nextHp);
    setBossShaking(true);
    setTimeout(() => setBossShaking(false), 380);

    if (nextHp === 0) {
      playVictory();
      onUpdateStage(activeStage.id, { s1: true, s3: true });
      onAwardXp?.(usedCritCorrect ? 80 : 50, `stage-s3-${activeStage.id}`);
    } else {
      playBossHit();
      onAwardXp?.(usedCritCorrect ? 25 : 10);
    }
  };

  const handleCritChoice = (optIdx) => {
    if (critPick !== null) return;
    const curPhase = activeStage.boss.phases[bossStepIdx];
    setCritPick(optIdx);
    if (optIdx === curPhase.checkpointCorrectIndex) {
      strikeBoss(bossStepIdx, true);
    } else {
      playWrong();
    }
  };

  const goNextBossPhase = () => {
    playClick();
    if (bossStepIdx + 1 < activeStage.boss.phases.length) {
      setBossStepIdx((i) => i + 1);
      setCritPick(null);
    }
  };

  // ==================== VIEW A: CAMPAIGN OVERWORLD MAP ====================
  if (!activeStage) {
    const nextRecommended =
      CAMPAIGN_STAGES.find((st) => !stageProgress[st.id]?.s3) || CAMPAIGN_STAGES[0];

    return (
      <div className="space-y-6">
        {/* Campaign Command Banner */}
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 sm:p-6 shadow-[var(--shadow-elevated)]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="space-y-2 max-w-2xl">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
                Chiến Dịch 6 Ải Liên Hoàn: Vật Lý 2 • Lý Thuyết Mạch • Tín Hiệu
              </h1>
              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                Chinh phục từng trạm kiến thức theo chuỗi nhân quả thật của ngành ĐTVT: giải mã cầu nối 3 môn, phá giáp câu bẫy, và hạ Boss Tự Luận chuẩn barem PTIT.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-inset)] px-4 py-2.5 text-center min-w-[105px]">
                <div className="text-[11px] font-mono text-[var(--text-muted)]">SẴN SÀNG THI</div>
                <div className="text-xl font-extrabold font-mono text-emerald-400">{readinessPct}%</div>
              </div>
              <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-inset)] px-4 py-2.5 text-center min-w-[105px]">
                <div className="text-[11px] font-mono text-[var(--text-muted)]">SAO THU ĐƯỢC</div>
                <div className="text-xl font-extrabold font-mono text-amber-400">{totalStars} / 18</div>
              </div>
              <button
                onClick={() => enterStage(nextRecommended, 1)}
                className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm flex items-center gap-2 cursor-pointer transition shadow-md"
              >
                <Play className="w-4 h-4 fill-current" />
                {clearedBossCount === 0
                  ? 'Bắt đầu Ải 1'
                  : clearedBossCount === 6
                  ? 'Ôn lại Boss'
                  : `Tiếp tục ${nextRecommended.code}`}
              </button>
            </div>
          </div>

          {/* Interactive SVG Signal Bus Map */}
          <div className="mt-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-inset)] p-4 overflow-hidden">
            <div className="hidden md:block relative h-52">
              <svg viewBox="0 0 1000 200" className="w-full h-full">
                {/* Signal bus path connecting 6 sectors */}
                <path
                  d="M 100 116 L 260 68 L 430 126 L 600 68 L 760 120 L 900 68"
                  fill="none"
                  stroke="rgba(148,163,184,0.22)"
                  strokeWidth="4"
                  strokeDasharray="8 6"
                />
                {/* Highlighted progress segments */}
                {CAMPAIGN_STAGES.slice(0, -1).map((st, idx) => {
                  const next = CAMPAIGN_STAGES[idx + 1];
                  const done = !!stageProgress[st.id]?.s3;
                  if (!done) return null;
                  return (
                    <line
                      key={st.id}
                      x1={st.coords.x * 10}
                      y1={st.coords.y * 2}
                      x2={next.coords.x * 10}
                      y2={next.coords.y * 2}
                      stroke="#10b981"
                      strokeWidth="4"
                    />
                  );
                })}

                {/* Interactive Stage Nodes */}
                {CAMPAIGN_STAGES.map((st) => {
                  const prog = stageProgress[st.id] || {};
                  const stars = (prog.s1 ? 1 : 0) + (prog.s2 ? 1 : 0) + (prog.s3 ? 1 : 0);
                  const cleared = !!prog.s3;
                  const cx = st.coords.x * 10;
                  const cy = st.coords.y * 2;
                  return (
                    <g
                      key={st.id}
                      className="cursor-pointer group"
                      onClick={() => enterStage(st, 1)}
                    >
                      <circle
                        cx={cx}
                        cy={cy}
                        r="26"
                        fill={cleared ? 'rgba(16,185,129,0.18)' : 'var(--bg-surface)'}
                        stroke={cleared ? '#10b981' : '#06b6d4'}
                        strokeWidth="2.5"
                      />
                      <text
                        x={cx}
                        y={cy + 5}
                        textAnchor="middle"
                        fill="var(--text-primary)"
                        fontSize="14"
                        fontWeight="800"
                        fontFamily="JetBrains Mono"
                      >
                        0{st.order}
                      </text>
                      <text
                        x={cx}
                        y={cy + 42}
                        textAnchor="middle"
                        fill="var(--text-primary)"
                        fontSize="12"
                        fontWeight="700"
                      >
                        {st.title}
                      </text>
                      <text
                        x={cx}
                        y={cy + 58}
                        textAnchor="middle"
                        fill={stars === 3 ? '#f59e0b' : 'var(--text-muted)'}
                        fontSize="11"
                        fontFamily="JetBrains Mono"
                      >
                        {stars}/3 SAO
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Responsive Stage Cards Grid (Always crisp on both Mobile & Desktop) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-2">
              {CAMPAIGN_STAGES.map((st) => {
                const prog = stageProgress[st.id] || {};
                const stars = (prog.s1 ? 1 : 0) + (prog.s2 ? 1 : 0) + (prog.s3 ? 1 : 0);
                const cleared = !!prog.s3;

                return (
                  <button
                    key={st.id}
                    onClick={() => enterStage(st, 1)}
                    className={`text-left rounded-xl border p-4 transition cursor-pointer flex flex-col justify-between gap-3 ${
                      cleared
                        ? 'border-emerald-500/45 bg-emerald-500/5 hover:border-emerald-400'
                        : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:border-cyan-400/70'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-xs font-bold text-cyan-400">{st.code}</span>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3].map((n) => (
                            <Star
                              key={n}
                              className={`w-3.5 h-3.5 ${
                                n <= stars ? 'text-amber-400 fill-amber-400' : 'text-[var(--text-muted)] opacity-40'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <h2 className="font-bold text-base text-[var(--text-primary)] mt-1.5">
                        Ải {st.order}: {st.title}
                      </h2>
                      <p className="text-xs text-[var(--text-secondary)] mt-1 line-clamp-2">
                        <RichMath text={st.subtitle} />
                      </p>
                    </div>

                    <div className="pt-2.5 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-amber-400" title="Vật lý 2" />
                        <span className="w-2 h-2 rounded-full bg-cyan-400" title="Lý thuyết mạch" />
                        <span className="w-2 h-2 rounded-full bg-emerald-400" title="Tín hiệu & Hệ thống" />
                        <span className="text-[var(--text-muted)] ml-1">{st.boss.name}</span>
                      </div>
                      <span className={`font-mono font-semibold shrink-0 whitespace-nowrap ${cleared ? 'text-emerald-400' : 'text-cyan-400'}`}>
                        {cleared ? 'ĐÃ HẠ' : 'VÀO ẢI →'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==================== VIEW B: INSIDE A STAGE (3 PHASES) ====================
  const bossDefeated = bossHp === 0;
  const currentTrial = activeStage.shieldTrials[trialIdx];
  const currentBossPhase = activeStage.boss.phases[bossStepIdx];

  return (
    <div className="space-y-5">
      {/* Stage Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              playClick();
              setActiveStageId(null);
            }}
            className="px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)] text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Bản đồ
          </button>
          <div>
            <div className="font-mono text-xs text-cyan-400 font-bold">
              {activeStage.code} • Ải {activeStage.order}/6
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-[var(--text-primary)]">{activeStage.title}</h1>
          </div>
        </div>

        {/* 3 Phase Pills */}
        <div className="flex flex-wrap gap-1.5">
          {[
            { num: 1, label: 'Pha 1: Liên kết 3 môn', icon: Layers },
            { num: 2, label: 'Pha 2: Phá giáp bẫy', icon: Shield },
            { num: 3, label: 'Pha 3: Boss Tự Luận', icon: Swords },
          ].map((p) => {
            const Icon = p.icon;
            const active = phase === p.num;
            return (
              <button
                key={p.num}
                onClick={() => {
                  playClick();
                  setPhase(p.num);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-1.5 cursor-pointer transition ${
                  active
                    ? 'border-cyan-400 bg-cyan-500/15 text-cyan-400'
                    : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{p.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* PHASE 1: 3-LAYER BRIDGE */}
      {phase === 1 && (
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 sm:p-6 space-y-5">
          <div>
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              Giải mã Liên Kết 3 Môn: <span className="text-cyan-400">{activeStage.bridge.headline}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { col: activeStage.bridge.phys, icon: Zap, border: 'border-amber-500/35', titleCls: 'text-amber-400' },
              { col: activeStage.bridge.circ, icon: Cpu, border: 'border-cyan-500/35', titleCls: 'text-cyan-400' },
              { col: activeStage.bridge.sig, icon: Radio, border: 'border-emerald-500/35', titleCls: 'text-emerald-400' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className={`rounded-xl border ${item.border} bg-[var(--bg-inset)] p-4 flex flex-col justify-between gap-3`}
                >
                  <div>
                    <div className={`flex items-center gap-2 text-xs font-bold uppercase ${item.titleCls} mb-2.5`}>
                      <Icon className="w-4 h-4" />
                      <span>{item.col.label}</span>
                    </div>
                    <div className="rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] px-3 py-2 overflow-x-auto text-sm">
                      <FormulaBlock latex={item.col.formula} />
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    {item.col.text}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="rounded-xl border border-indigo-500/35 bg-indigo-500/10 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs sm:text-sm text-[var(--text-primary)]">
              <span className="font-bold text-indigo-400">Mẹo phòng thi: </span>
              <RichMath text={activeStage.bridge.tip} />
            </div>
            <button
              onClick={completeBridgePhase}
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm shrink-0 cursor-pointer flex items-center gap-2"
            >
              <Shield className="w-4 h-4" />
              Đã thông não → Vào Phá Giáp (Sao 1)
            </button>
          </div>
        </div>
      )}

      {/* PHASE 2: SHIELD TRIALS */}
      {phase === 2 && (
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 sm:p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-bold text-[var(--text-primary)]">
                Phá Giáp Câu Bẫy ({trialIdx + 1} / {activeStage.shieldTrials.length})
              </h2>
            </div>

            {/* Player Hearts */}
            <div className="flex items-center gap-1.5">
              {[1, 2, 3].map((n) => (
                <Heart
                  key={n}
                  className={`w-5 h-5 transition ${
                    n <= hearts ? 'text-rose-500 fill-rose-500' : 'text-[var(--text-muted)] opacity-30'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-[var(--bg-inset)] border border-[var(--border-subtle)] p-4 text-base font-semibold text-[var(--text-primary)] leading-relaxed">
            <RichMath text={currentTrial.question} />
          </div>

          <div className="space-y-2.5">
            {currentTrial.options.map((opt, idx) => {
              const revealed = trialPick !== null;
              const isCorrect = idx === currentTrial.correctIndex;
              const isPicked = idx === trialPick;
              let cls = 'border-[var(--border-subtle)] bg-[var(--bg-inset)] hover:border-cyan-400';
              if (revealed) {
                if (isCorrect) cls = 'border-emerald-500 bg-emerald-500/15';
                else if (isPicked) cls = 'border-rose-500 bg-rose-500/15';
                else cls = 'border-[var(--border-subtle)] bg-[var(--bg-inset)] opacity-55';
              }
              return (
                <button
                  key={`trial-${trialIdx}-opt-${idx}`}
                  type="button"
                  disabled={revealed}
                  onClick={() => handleTrialAnswer(idx)}
                  className={`w-full text-left px-4 py-3.5 rounded-xl border text-sm transition cursor-pointer ${cls}`}
                >
                  <RichMath text={opt} />
                </button>
              );
            })}
          </div>

          {trialPick !== null && (
            <div className="rounded-xl border border-cyan-500/35 bg-cyan-500/10 p-4 space-y-3">
              <div className="text-sm font-bold text-[var(--text-primary)]">
                {trialPick === currentTrial.correctIndex ? 'Phá giáp thành công! (+15 XP)' : 'Bị dính bẫy! Mất 1 tim — nhớ kỹ nhé:'}
              </div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                <RichMath text={currentTrial.explain} />
              </p>
              <div className="flex justify-end">
                <button
                  onClick={advanceTrial}
                  className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs cursor-pointer"
                >
                  {trialIdx + 1 < activeStage.shieldTrials.length
                    ? 'Câu phá giáp tiếp theo →'
                    : 'Xong Giáp! Vào Đấu Boss Tự Luận →'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* PHASE 3: BOSS ESSAY FIGHT */}
      {phase === 3 && (
        <div className="space-y-5">
          {/* Boss Health Bar Card */}
          <div
            className={`rounded-2xl border border-rose-500/40 bg-[var(--bg-surface)] p-5 space-y-3 ${
              bossShaking ? 'animate-boss-hit' : ''
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-xs font-mono text-rose-400 font-bold">{activeStage.boss.subjectLabel}</div>
                <h2 className="text-xl font-extrabold text-[var(--text-primary)] flex items-center gap-2 mt-0.5">
                  <Swords className="w-5 h-5 text-rose-400" />
                  {activeStage.boss.name}
                </h2>
              </div>
              <div className="font-mono text-sm font-bold text-rose-400">
                HP BOSS: {bossHp} / {activeStage.boss.phases.length}
              </div>
            </div>

            <div className="w-full h-3 rounded-full bg-[var(--bg-inset)] border border-[var(--border-subtle)] overflow-hidden">
              <div
                className="h-full bg-rose-500 hp-transition"
                style={{ width: `${(bossHp / activeStage.boss.phases.length) * 100}%` }}
              />
            </div>

            <div className="rounded-xl bg-[var(--bg-inset)] border border-[var(--border-subtle)] p-4 text-sm sm:text-base leading-relaxed text-[var(--text-primary)] whitespace-pre-line">
              <RichMath text={activeStage.boss.statement} />
            </div>
          </div>

          {/* Boss Defeated Victory Banner */}
          {bossDefeated && (
            <div className="rounded-2xl border border-emerald-500/50 bg-emerald-500/10 p-6 text-center space-y-3">
              <Trophy className="w-11 h-11 text-amber-400 mx-auto" />
              <h3 className="text-xl font-extrabold text-[var(--text-primary)]">
                Hạ gục {activeStage.boss.name} — Thu phục Ải {activeStage.order}!
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">
                Sếp đã nắm trọn cả phần liên kết lẫn barem chấm điểm tự luận của Ải này.
              </p>
              <div className="flex flex-wrap justify-center gap-3 pt-1">
                <button
                  onClick={() => setActiveStageId(null)}
                  className="px-4 py-2 rounded-lg border border-[var(--border-strong)] text-xs font-bold cursor-pointer"
                >
                  Về Bản đồ Chiến dịch
                </button>
                {activeStage.order < CAMPAIGN_STAGES.length && (
                  <button
                    onClick={() => enterStage(CAMPAIGN_STAGES[activeStage.order], 1)}
                    className="px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold cursor-pointer"
                  >
                    Tiến quân sang Ải {activeStage.order + 1} →
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Phase Step Combat Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {activeStage.boss.phases.map((ph, idx) => {
              const cleared = unlockedSteps.includes(idx);
              const active = bossStepIdx === idx;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    playClick();
                    setBossStepIdx(idx);
                    setCritPick(null);
                  }}
                  className={`p-3 rounded-xl border text-left text-xs transition cursor-pointer flex items-center justify-between gap-2 ${
                    cleared
                      ? 'border-emerald-500/45 bg-emerald-500/10 text-emerald-400'
                      : active
                      ? 'border-cyan-400 bg-cyan-500/10 text-[var(--text-primary)]'
                      : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)]'
                  }`}
                >
                  <span className="font-semibold line-clamp-1">
                    <RichMath text={ph.stepTitle} />
                  </span>
                  <span className="font-mono shrink-0">{cleared ? '✓' : ph.score}</span>
                </button>
              );
            })}
          </div>

          {/* Active Boss Phase Card */}
          <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-bold text-base text-cyan-400">
                <RichMath text={currentBossPhase.stepTitle} />
              </h3>
              <span className="font-mono text-xs px-2.5 py-1 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                {currentBossPhase.score}
              </span>
            </div>

            {!unlockedSteps.includes(bossStepIdx) ? (
              <div className="space-y-4">
                <div className="rounded-xl border border-indigo-500/35 bg-indigo-500/10 p-4 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-400">
                    <Sparkles className="w-4 h-4" />
                    ĐÒN CHÍ MẠNG (CRIT-HIT): Chọn đúng hướng giải để chém 1 HP Boss!
                  </div>
                  <div className="text-sm sm:text-base font-medium text-[var(--text-primary)]">
                    <RichMath text={currentBossPhase.checkpointQuestion} />
                  </div>
                  <div className="space-y-2">
                    {currentBossPhase.checkpointOptions.map((opt, idx) => {
                      const picked = critPick === idx;
                      const wrong = critPick !== null && picked && idx !== currentBossPhase.checkpointCorrectIndex;
                      return (
                        <button
                          key={`boss-${bossStepIdx}-opt-${idx}`}
                          type="button"
                          onClick={() => handleCritChoice(idx)}
                          className={`w-full text-left px-3.5 py-2.5 rounded-lg border text-sm transition cursor-pointer ${
                            wrong
                              ? 'border-rose-500 bg-rose-500/15'
                              : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:border-cyan-400'
                          }`}
                        >
                          <RichMath text={opt} />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => strikeBoss(bossStepIdx, false)}
                    className="px-4 py-2 rounded-lg border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
                  >
                    Tôi đã nháp xong → Mở thẳng Barem bước này
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="rounded-xl border border-emerald-500/35 bg-[var(--bg-inset)] p-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    Barem trình bày chuẩn PTIT ({currentBossPhase.score})
                  </div>
                  <div className="text-sm leading-relaxed text-[var(--text-primary)] whitespace-pre-line">
                    <RichMath text={currentBossPhase.baremSolution} />
                  </div>
                </div>

                <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3.5 flex items-start gap-2.5 text-xs sm:text-sm">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-rose-400">Bẫy trừ điểm: </span>
                    <RichMath text={currentBossPhase.trapNote} />
                  </div>
                </div>

                {bossStepIdx + 1 < activeStage.boss.phases.length && (
                  <div className="flex justify-end">
                    <button
                      onClick={goNextBossPhase}
                      className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs cursor-pointer"
                    >
                      Đánh tiếp Pha {bossStepIdx + 2} →
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
