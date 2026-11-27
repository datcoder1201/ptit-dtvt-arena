import React, { useEffect, useState } from 'react';
import { CheckSquare, Clock, FileCheck2, Pause, Play, RotateCcw, Square, Trophy } from 'lucide-react';
import { MOCK_EXAMS } from '../data/formulasData';
import { SUBJECTS } from '../data/bridgesData';
import { RichMath } from './MathBlock';

export default function MockExamRoom({ onAwardXp }) {
  const [selectedExamId, setSelectedExamId] = useState(MOCK_EXAMS[0].id);
  const exam = MOCK_EXAMS.find((e) => e.id === selectedExamId) || MOCK_EXAMS[0];

  const [secondsLeft, setSecondsLeft] = useState(exam.durationMin * 60);
  const [running, setRunning] = useState(false);
  const [gradingMode, setGradingMode] = useState(false);
  const [checkedRubrics, setCheckedRubrics] = useState({});
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('ptit_exam_history') || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    setSecondsLeft(exam.durationMin * 60);
    setRunning(false);
    setGradingMode(false);
    setCheckedRubrics({});
  }, [exam.id, exam.durationMin]);

  useEffect(() => {
    if (!running || secondsLeft <= 0) return;
    const t = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [running, secondsLeft]);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const toggleRubric = (qId, idx) => {
    const key = `${qId}-${idx}`;
    setCheckedRubrics((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const totalScore = exam.questions.reduce((acc, q) => {
    return (
      acc +
      q.rubric.reduce((qSum, r, idx) => {
        return qSum + (checkedRubrics[`${q.id}-${idx}`] ? r.pts : 0);
      }, 0)
    );
  }, 0);

  const saveResult = () => {
    const entry = {
      id: Date.now(),
      examTitle: exam.title,
      score: Number(totalScore.toFixed(2)),
      date: new Date().toLocaleString('vi-VN'),
    };
    const next = [entry, ...history].slice(0, 6);
    setHistory(next);
    localStorage.setItem('ptit_exam_history', JSON.stringify(next));
    onAwardXp?.(Math.round(totalScore * 10));
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-[var(--border-subtle)] pb-5 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
            Phòng Thi Thử Tự Luận 90 Phút &amp; Barem Tự Chấm
          </h1>
          <p className="mt-1.5 text-sm text-[var(--text-secondary)]">
            Bấm Bắt đầu để chạy đồng hồ 90 phút và làm ra giấy thi như phòng thi thật. Làm xong bấm "Nộp bài &amp; Mở Barem" để tick tự chấm từng 0.25 điểm.
          </p>
        </div>

        {/* Exam selector */}
        <div className="flex flex-wrap gap-2">
          {MOCK_EXAMS.map((e) => (
            <button
              key={e.id}
              onClick={() => setSelectedExamId(e.id)}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold border cursor-pointer transition ${
                selectedExamId === e.id
                  ? 'border-cyan-400 bg-cyan-500/15 text-cyan-400'
                  : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)]'
              }`}
            >
              {e.title}
            </button>
          ))}
        </div>
      </div>

      {/* Timer & Controls Bar */}
      <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[var(--bg-inset)] border border-[var(--border-subtle)] font-mono text-xl font-bold text-cyan-400">
            <Clock className="w-5 h-5" />
            {formatTime(secondsLeft)}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setRunning((r) => !r)}
              className="px-3.5 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer hover:bg-cyan-400"
            >
              {running ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {running ? 'Tạm dừng' : 'Bắt đầu tính giờ'}
            </button>
            <button
              onClick={() => {
                setSecondsLeft(exam.durationMin * 60);
                setRunning(false);
              }}
              className="px-3 py-2 rounded-lg border border-[var(--border-subtle)] text-xs font-semibold flex items-center gap-1 cursor-pointer hover:border-[var(--border-strong)]"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Đặt lại
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {gradingMode && (
            <div className="px-3.5 py-1.5 rounded-lg border border-emerald-500/40 bg-emerald-500/10 font-mono text-sm font-bold text-emerald-400">
              Điểm tự chấm: {totalScore.toFixed(2)} / 10.00
            </div>
          )}
          <button
            onClick={() => {
              setGradingMode((g) => !g);
              setRunning(false);
            }}
            className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer transition ${
              gradingMode
                ? 'border border-[var(--border-strong)] bg-[var(--bg-inset)] text-[var(--text-primary)]'
                : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
            }`}
          >
            <FileCheck2 className="w-4 h-4" />
            {gradingMode ? 'Quay lại chế độ ẩn đáp án' : 'Nộp bài & Mở Barem chấm điểm'}
          </button>
        </div>
      </div>

      {/* Exam Questions */}
      <div className="space-y-4">
        {exam.questions.map((q) => {
          const subj = SUBJECTS[q.subject];
          return (
            <div
              key={q.id}
              className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className={`text-xs font-mono px-2 py-0.5 rounded border ${subj.badgeClass}`}>
                    {subj.shortName}
                  </span>
                  <h3 className="font-bold text-base text-[var(--text-primary)]">{q.title}</h3>
                </div>
                <span className="font-mono text-xs font-bold text-amber-400">{q.points.toFixed(2)} điểm</span>
              </div>

              <div className="rounded-lg bg-[var(--bg-inset)] border border-[var(--border-subtle)] p-4 text-sm sm:text-base leading-relaxed text-[var(--text-primary)]">
                <RichMath text={q.prompt} />
              </div>

              {gradingMode && (
                <div className="pt-2 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Tick các ý Sếp đã giải đúng trên giấy để cộng điểm:
                  </div>
                  {q.rubric.map((r, idx) => {
                    const checked = !!checkedRubrics[`${q.id}-${idx}`];
                    return (
                      <button
                        key={idx}
                        onClick={() => toggleRubric(q.id, idx)}
                        className={`w-full text-left px-3.5 py-2.5 rounded-lg border text-sm flex items-start justify-between gap-3 cursor-pointer transition ${
                          checked
                            ? 'border-emerald-500/60 bg-emerald-500/10 text-[var(--text-primary)]'
                            : 'border-[var(--border-subtle)] bg-[var(--bg-inset)] text-[var(--text-secondary)]'
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          {checked ? (
                            <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          ) : (
                            <Square className="w-4 h-4 text-[var(--text-muted)] shrink-0 mt-0.5" />
                          )}
                          <RichMath text={r.label} />
                        </div>
                        <span className="font-mono text-xs text-emerald-400 shrink-0">+{r.pts}đ</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {gradingMode && (
        <div className="flex justify-end">
          <button
            onClick={saveResult}
            className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm flex items-center gap-2 cursor-pointer hover:bg-amber-400"
          >
            <Trophy className="w-4 h-4" />
            Lưu điểm ({totalScore.toFixed(2)}/10) &amp; Nhận XP
          </button>
        </div>
      )}

      {/* Exam History */}
      {history.length > 0 && (
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5">
          <h3 className="font-bold text-sm text-[var(--text-primary)] mb-3">Lịch sử thi thử gần đây</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {history.map((h) => (
              <div
                key={h.id}
                className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-inset)] p-3 flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-semibold text-[var(--text-primary)] line-clamp-1">{h.examTitle}</div>
                  <div className="text-[11px] font-mono text-[var(--text-muted)] mt-0.5">{h.date}</div>
                </div>
                <span className="font-mono font-bold text-base text-emerald-400">{h.score}/10</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
