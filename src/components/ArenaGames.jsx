import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  Award,
  Bug,
  CheckCircle2,
  Clock,
  Flame,
  Gamepad2,
  ListOrdered,
  RotateCcw,
  Sparkles,
  XCircle,
} from 'lucide-react';
import {
  BUG_HUNTER_CASES,
  MATCH_DECKS,
  STEP_BUILDER_PROBLEMS,
  TRAP_BUSTER_QUESTIONS,
} from '../data/gamesData';
import { SUBJECTS } from '../data/bridgesData';
import { RichMath } from './MathBlock';
import { playClick, playCorrect, playVictory, playWrong } from '../utils/soundFx';

function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function ArenaGames({ onAwardXp }) {
  const [gameMode, setGameMode] = useState('match'); // match | bug | steps | trap

  // ---- GAME 1: SPEED MATCH ----
  const [deckId, setDeckId] = useState(MATCH_DECKS[0].id);
  const currentDeck = useMemo(
    () => MATCH_DECKS.find((d) => d.id === deckId) || MATCH_DECKS[0],
    [deckId]
  );
  const [leftItems, setLeftItems] = useState([]);
  const [rightItems, setRightItems] = useState([]);
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [selectedRight, setSelectedRight] = useState(null);
  const [matchedIds, setMatchedIds] = useState([]);
  const [matchError, setMatchError] = useState(false);
  const [combo, setCombo] = useState(0);
  const [matchTime, setMatchTime] = useState(0);

  const resetMatch = (deck = currentDeck) => {
    setLeftItems(shuffle(deck.pairs.map((p) => ({ id: p.id, label: p.left }))));
    setRightItems(shuffle(deck.pairs.map((p) => ({ id: p.id, label: p.right }))));
    setSelectedLeft(null);
    setSelectedRight(null);
    setMatchedIds([]);
    setMatchError(false);
    setCombo(0);
    setMatchTime(0);
  };

  useEffect(() => {
    resetMatch(currentDeck);
  }, [currentDeck]);

  useEffect(() => {
    if (gameMode !== 'match' || matchedIds.length === currentDeck.pairs.length) return;
    const id = setInterval(() => setMatchTime((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, [gameMode, matchedIds.length, currentDeck.pairs.length]);

  const tryMatch = (lId, rId) => {
    if (!lId || !rId) return;
    if (lId === rId) {
      const next = [...matchedIds, lId];
      setMatchedIds(next);
      setCombo((c) => c + 1);
      setSelectedLeft(null);
      setSelectedRight(null);
      if (next.length === currentDeck.pairs.length) playVictory();
      else playCorrect(combo);
      onAwardXp?.(15 + combo * 5);
    } else {
      playWrong();
      setMatchError(true);
      setCombo(0);
      setTimeout(() => {
        setSelectedLeft(null);
        setSelectedRight(null);
        setMatchError(false);
      }, 480);
    }
  };

  // ---- GAME 2: BUG HUNTER ----
  const [bugIdx, setBugIdx] = useState(0);
  const [pickedLine, setPickedLine] = useState(null);
  const bugCase = BUG_HUNTER_CASES[bugIdx];

  const handlePickBugLine = (idx) => {
    if (pickedLine !== null) return;
    setPickedLine(idx);
    if (idx === bugCase.bugLineIndex) {
      playCorrect(2);
      onAwardXp?.(30, `bug-${bugCase.id}`);
    } else {
      playWrong();
    }
  };

  // ---- GAME 3: STEP BUILDER ----
  const [sbIdx, setSbIdx] = useState(0);
  const sbProblem = STEP_BUILDER_PROBLEMS[sbIdx];
  const [userOrder, setUserOrder] = useState([]);
  const [sbChecked, setSbChecked] = useState(false);

  const initStepBuilder = (prob = sbProblem) => {
    const indexed = prob.correctSteps.map((text, origIndex) => ({ text, origIndex }));
    let shuffled = shuffle(indexed);
    // Avoid starting already 100% solved
    if (shuffled.every((it, idx) => it.origIndex === idx) && shuffled.length > 1) {
      [shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]];
    }
    setUserOrder(shuffled);
    setSbChecked(false);
  };

  useEffect(() => {
    initStepBuilder(sbProblem);
  }, [sbProblem]);

  const moveStep = (index, dir) => {
    if (sbChecked) return;
    const target = index + dir;
    if (target < 0 || target >= userOrder.length) return;
    const next = [...userOrder];
    [next[index], next[target]] = [next[target], next[index]];
    setUserOrder(next);
  };

  const checkStepBuilder = () => {
    setSbChecked(true);
    const allCorrect = userOrder.every((it, idx) => it.origIndex === idx);
    if (allCorrect) {
      playVictory();
      onAwardXp?.(35, `sb-${sbProblem.id}`);
    } else {
      playWrong();
    }
  };

  // ---- GAME 4: TRAP BUSTER (15s) ----
  const [trapIdx, setTrapIdx] = useState(0);
  const [trapTimer, setTrapTimer] = useState(15);
  const [trapPick, setTrapPick] = useState(null);
  const trapQ = TRAP_BUSTER_QUESTIONS[trapIdx];

  useEffect(() => {
    if (gameMode !== 'trap' || trapPick !== null) return;
    if (trapTimer <= 0) {
      playWrong();
      setTrapPick(-1); // Timeout
      return;
    }
    const t = setTimeout(() => setTrapTimer((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [gameMode, trapTimer, trapPick]);

  const pickTrapOption = (idx) => {
    if (trapPick !== null) return;
    setTrapPick(idx);
    if (idx === trapQ.correctIndex) {
      playCorrect(1);
      onAwardXp?.(25, `trap-${trapQ.id}`);
    } else {
      playWrong();
    }
  };

  const nextTrap = () => {
    setTrapIdx((i) => (i + 1) % TRAP_BUSTER_QUESTIONS.length);
    setTrapTimer(15);
    setTrapPick(null);
  };

  const modeTabs = [
    { id: 'match', label: '1. Ghép Cặp Thần Tốc', icon: Gamepad2, desc: 'Nối công thức & định luật' },
    { id: 'bug', label: '2. Bắt Bệnh Tự Luận', icon: Bug, desc: 'Tìm dòng sai mất điểm' },
    { id: 'steps', label: '3. Xếp Quy Trình Barem', icon: ListOrdered, desc: 'Sắp đúng thứ tự giải' },
    { id: 'trap', label: '4. Phản Xạ Bẫy 15s', icon: Flame, desc: 'Chốt nhanh ROC & điều kiện' },
  ];

  return (
    <div className="space-y-6">
      {/* Header & Mode Switcher */}
      <div className="border-b border-[var(--border-subtle)] pb-5">
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
          Đấu Trường Game Tổng Ôn — Phản Xạ Tự Luận
        </h1>
        <p className="mt-1.5 text-sm text-[var(--text-secondary)]">
          Thay vì đọc vẹt, chơi 4 chế độ luyện phản xạ dưới đây để nhớ vĩnh viễn các cặp biến đổi, bẫy ROC, dấu hỗ cảm và quy trình trình bày chuẩn barem PTIT.
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
          {modeTabs.map((t) => {
            const Icon = t.icon;
            const active = gameMode === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setGameMode(t.id)}
                className={`p-3.5 rounded-xl border text-left transition cursor-pointer ${
                  active
                    ? 'border-[var(--accent-circ)] bg-cyan-500/10 text-[var(--text-primary)]'
                    : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
                }`}
              >
                <div className="flex items-center gap-2 font-semibold text-sm">
                  <Icon className={`w-4 h-4 ${active ? 'text-cyan-400' : ''}`} />
                  <span>{t.label}</span>
                </div>
                <div className="text-xs text-[var(--text-muted)] mt-1">{t.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* MODE 1: SPEED MATCH */}
      {gameMode === 'match' && (
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div className="flex flex-wrap gap-2">
              {MATCH_DECKS.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setDeckId(d.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                    deckId === d.id
                      ? 'border-cyan-500/60 bg-cyan-500/15 text-cyan-400'
                      : 'border-[var(--border-subtle)] bg-[var(--bg-inset)] text-[var(--text-secondary)]'
                  }`}
                >
                  {d.title}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="flex items-center gap-1 text-amber-400">
                <Flame className="w-4 h-4" /> Combo x{combo}
              </span>
              <span className="flex items-center gap-1 text-[var(--text-secondary)]">
                <Clock className="w-4 h-4" /> {matchTime}s
              </span>
              <button
                onClick={() => resetMatch()}
                className="flex items-center gap-1 px-2.5 py-1 rounded border border-[var(--border-subtle)] hover:border-[var(--border-strong)] cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Chơi lại
              </button>
            </div>
          </div>

          {matchedIds.length === currentDeck.pairs.length ? (
            <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-6 text-center space-y-2">
              <Award className="w-10 h-10 text-emerald-400 mx-auto" />
              <h3 className="text-lg font-bold text-[var(--text-primary)]">
                Quét sạch bộ "{currentDeck.title}" trong {matchTime} giây!
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">
                Sếp có thể chọn bộ môn khác ở trên hoặc bấm Chơi lại để phá kỷ lục thời gian.
              </p>
              <button
                onClick={() => resetMatch()}
                className="mt-2 px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 font-semibold text-sm cursor-pointer hover:bg-emerald-400"
              >
                Xáo trộn &amp; Làm ván mới
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2.5">
                <div className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  Cột A — Biểu thức / Công thức
                </div>
                {leftItems.map((item) => {
                  const isMatched = matchedIds.includes(item.id);
                  const isSelected = selectedLeft === item.id;
                  return (
                    <button
                      key={item.id}
                      disabled={isMatched}
                      onClick={() => {
                        setSelectedLeft(item.id);
                        if (selectedRight) tryMatch(item.id, selectedRight);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg border transition text-sm cursor-pointer ${
                        isMatched
                          ? 'opacity-35 border-emerald-500/30 bg-emerald-500/5 cursor-default'
                          : isSelected
                          ? matchError
                            ? 'border-rose-500 bg-rose-500/15'
                            : 'border-cyan-400 bg-cyan-500/15'
                          : 'border-[var(--border-subtle)] bg-[var(--bg-inset)] hover:border-[var(--border-strong)]'
                      }`}
                    >
                      <RichMath text={item.label} />
                    </button>
                  );
                })}
              </div>

              <div className="space-y-2.5">
                <div className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  Cột B — Bản chất / Điều kiện
                </div>
                {rightItems.map((item) => {
                  const isMatched = matchedIds.includes(item.id);
                  const isSelected = selectedRight === item.id;
                  return (
                    <button
                      key={item.id}
                      disabled={isMatched}
                      onClick={() => {
                        setSelectedRight(item.id);
                        if (selectedLeft) tryMatch(selectedLeft, item.id);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg border transition text-sm cursor-pointer ${
                        isMatched
                          ? 'opacity-35 border-emerald-500/30 bg-emerald-500/5 cursor-default'
                          : isSelected
                          ? matchError
                            ? 'border-rose-500 bg-rose-500/15'
                            : 'border-cyan-400 bg-cyan-500/15'
                          : 'border-[var(--border-subtle)] bg-[var(--bg-inset)] hover:border-[var(--border-strong)]'
                      }`}
                    >
                      <RichMath text={item.label} />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* MODE 2: BUG HUNTER */}
      {gameMode === 'bug' && (
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className={`text-xs font-mono px-2.5 py-0.5 rounded border ${SUBJECTS[bugCase.subject].badgeClass}`}>
                {SUBJECTS[bugCase.subject].shortName}
              </span>
              <h3 className="font-bold text-lg text-[var(--text-primary)]">
                <RichMath text={bugCase.title} />
              </h3>
            </div>
            <span className="text-xs font-mono text-[var(--text-muted)]">
              Tình huống {bugIdx + 1} / {BUG_HUNTER_CASES.length}
            </span>
          </div>

          <p className="text-sm text-[var(--text-secondary)]">
            <RichMath text={bugCase.prompt} />
          </p>

          <div className="space-y-2.5">
            {bugCase.lines.map((line, idx) => {
              const revealed = pickedLine !== null;
              const isBug = idx === bugCase.bugLineIndex;
              const isPicked = idx === pickedLine;
              let cls = 'border-[var(--border-subtle)] bg-[var(--bg-inset)] hover:border-amber-400/60';
              if (revealed) {
                if (isBug) cls = 'border-emerald-500 bg-emerald-500/15';
                else if (isPicked) cls = 'border-rose-500 bg-rose-500/15';
                else cls = 'border-[var(--border-subtle)] bg-[var(--bg-inset)] opacity-60';
              }
              return (
                <button
                  key={idx}
                  onClick={() => handlePickBugLine(idx)}
                  className={`w-full text-left px-4 py-3.5 rounded-lg border transition text-sm cursor-pointer flex items-center justify-between gap-3 ${cls}`}
                >
                  <div className="leading-relaxed">
                    <RichMath text={line} />
                  </div>
                  {revealed && isBug && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                  {revealed && isPicked && !isBug && <XCircle className="w-5 h-5 text-rose-400 shrink-0" />}
                </button>
              );
            })}
          </div>

          {pickedLine !== null && (
            <div className="rounded-xl border border-amber-500/35 bg-amber-500/10 p-4 space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-amber-400">
                <AlertTriangle className="w-4 h-4" />
                {pickedLine === bugCase.bugLineIndex ? 'Bắt trúng lỗi mất điểm! (+30 XP)' : 'Chưa đúng dòng lỗi — xem giải thích:'}
              </div>
              <p className="text-sm text-[var(--text-primary)] leading-relaxed">
                <RichMath text={bugCase.explanation} />
              </p>
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => {
                    setBugIdx((i) => (i + 1) % BUG_HUNTER_CASES.length);
                    setPickedLine(null);
                  }}
                  className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-semibold text-xs cursor-pointer hover:bg-cyan-400"
                >
                  Sang bài lỗi tiếp theo →
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* MODE 3: STEP BUILDER */}
      {gameMode === 'steps' && (
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className={`text-xs font-mono px-2.5 py-0.5 rounded border ${SUBJECTS[sbProblem.subject].badgeClass}`}>
                {SUBJECTS[sbProblem.subject].shortName}
              </span>
              <h3 className="font-bold text-lg text-[var(--text-primary)]">{sbProblem.title}</h3>
            </div>
            <div className="flex gap-2">
              {STEP_BUILDER_PROBLEMS.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => setSbIdx(idx)}
                  className={`px-2.5 py-1 rounded text-xs font-mono border cursor-pointer ${
                    idx === sbIdx
                      ? 'border-cyan-400 bg-cyan-500/15 text-cyan-400'
                      : 'border-[var(--border-subtle)] text-[var(--text-secondary)]'
                  }`}
                >
                  Bài {idx + 1}
                </button>
              ))}
            </div>
          </div>

          <p className="text-sm text-[var(--text-secondary)]">
            Bấm mũi tên lên/xuống để sắp xếp các bước dưới đây đúng theo trình tự trình bày tự luận chuẩn barem PTIT:
          </p>

          <div className="space-y-2.5">
            {userOrder.map((step, idx) => {
              const isCorrectPos = sbChecked && step.origIndex === idx;
              const isWrongPos = sbChecked && step.origIndex !== idx;
              return (
                <div
                  key={step.origIndex}
                  className={`rounded-lg border p-3.5 flex items-center justify-between gap-3 transition ${
                    isCorrectPos
                      ? 'border-emerald-500 bg-emerald-500/10'
                      : isWrongPos
                      ? 'border-rose-500 bg-rose-500/10'
                      : 'border-[var(--border-subtle)] bg-[var(--bg-inset)]'
                  }`}
                >
                  <div className="flex items-start gap-3 text-sm">
                    <span className="font-mono font-bold text-cyan-400 shrink-0 mt-0.5">
                      B{idx + 1}.
                    </span>
                    <RichMath text={step.text} />
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      disabled={idx === 0 || sbChecked}
                      onClick={() => moveStep(idx, -1)}
                      className="p-1.5 rounded border border-[var(--border-subtle)] hover:border-[var(--border-strong)] disabled:opacity-30 cursor-pointer"
                      aria-label="Di chuyển lên"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      disabled={idx === userOrder.length - 1 || sbChecked}
                      onClick={() => moveStep(idx, 1)}
                      className="p-1.5 rounded border border-[var(--border-subtle)] hover:border-[var(--border-strong)] disabled:opacity-30 cursor-pointer"
                      aria-label="Di chuyển xuống"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            {sbChecked ? (
              <div className="text-sm font-semibold">
                {userOrder.every((it, idx) => it.origIndex === idx) ? (
                  <span className="text-emerald-400">Chuẩn 10/10 barem PTIT! (+35 XP)</span>
                ) : (
                  <span className="text-rose-400">Vẫn còn bước bị đảo ngược — bấm Trộn lại để thử lại nhé Sếp!</span>
                )}
              </div>
            ) : (
              <span />
            )}

            <div className="flex gap-2">
              <button
                onClick={() => initStepBuilder(sbProblem)}
                className="px-3.5 py-2 rounded-lg border border-[var(--border-subtle)] text-xs font-semibold cursor-pointer hover:border-[var(--border-strong)]"
              >
                Trộn lại
              </button>
              {!sbChecked && (
                <button
                  onClick={checkStepBuilder}
                  className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 text-xs font-bold cursor-pointer hover:bg-emerald-400"
                >
                  Kiểm tra thứ tự
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODE 4: TRAP BUSTER 15s */}
      {gameMode === 'trap' && (
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <span className={`text-xs font-mono px-2.5 py-0.5 rounded border ${SUBJECTS[trapQ.subject].badgeClass}`}>
              {SUBJECTS[trapQ.subject].shortName}
            </span>
            <div className="flex items-center gap-3">
              <span className={`text-sm font-mono font-bold ${trapTimer <= 5 ? 'text-rose-400' : 'text-cyan-400'}`}>
                {trapTimer}s
              </span>
              <span className="text-xs font-mono text-[var(--text-muted)]">
                Câu {trapIdx + 1}/{TRAP_BUSTER_QUESTIONS.length}
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1.5 rounded-full bg-[var(--bg-inset)] overflow-hidden">
            <div
              className={`h-full transition-all duration-1000 ${trapTimer <= 5 ? 'bg-rose-500' : 'bg-cyan-400'}`}
              style={{ width: `${(trapTimer / 15) * 100}%` }}
            />
          </div>

          <h3 className="text-base sm:text-lg font-semibold text-[var(--text-primary)] leading-relaxed">
            <RichMath text={trapQ.question} />
          </h3>

          <div className="space-y-2.5">
            {trapQ.options.map((opt, idx) => {
              const revealed = trapPick !== null;
              const isCorrect = idx === trapQ.correctIndex;
              const isPicked = idx === trapPick;
              let cls = 'border-[var(--border-subtle)] bg-[var(--bg-inset)] hover:border-cyan-400';
              if (revealed) {
                if (isCorrect) cls = 'border-emerald-500 bg-emerald-500/15';
                else if (isPicked) cls = 'border-rose-500 bg-rose-500/15';
                else cls = 'border-[var(--border-subtle)] bg-[var(--bg-inset)] opacity-55';
              }
              return (
                <button
                  key={idx}
                  disabled={revealed}
                  onClick={() => pickTrapOption(idx)}
                  className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition cursor-pointer ${cls}`}
                >
                  <RichMath text={opt} />
                </button>
              );
            })}
          </div>

          {trapPick !== null && (
            <div className="rounded-xl border border-cyan-500/35 bg-cyan-500/10 p-4 space-y-2">
              <div className="text-sm font-bold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                {trapPick === trapQ.correctIndex
                  ? 'Chuẩn xác! (+25 XP)'
                  : trapPick === -1
                  ? 'Hết 15 giây!'
                  : 'Dính bẫy rồi Sếp ơi!'}
              </div>
              <p className="text-sm text-[var(--text-primary)] leading-relaxed">
                <RichMath text={trapQ.explain} />
              </p>
              <div className="flex justify-end pt-1">
                <button
                  onClick={nextTrap}
                  className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 text-xs font-bold cursor-pointer hover:bg-cyan-400"
                >
                  Câu phản xạ tiếp theo →
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
