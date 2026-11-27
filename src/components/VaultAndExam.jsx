import React, { useState } from 'react';
import { Clock, FileText } from 'lucide-react';
import EssayCoach from './EssayCoach';
import MockExamRoom from './MockExamRoom';
import { playClick } from '../utils/soundFx';

export default function VaultAndExam({ masteredIds, onToggleMastered, onAwardXp }) {
  const [mode, setMode] = useState('essays'); // essays | exam

  return (
    <div className="space-y-6">
      <div className="inline-flex rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-1 gap-1">
        <button
          onClick={() => {
            playClick();
            setMode('essays');
          }}
          className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-2 cursor-pointer transition ${
            mode === 'essays'
              ? 'bg-cyan-500 text-slate-950'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Kho 18 Dạng Tự Luận Tủ</span>
        </button>

        <button
          onClick={() => {
            playClick();
            setMode('exam');
          }}
          className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-2 cursor-pointer transition ${
            mode === 'exam'
              ? 'bg-cyan-500 text-slate-950'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Phòng Thi Thử 90 Phút (4 Đề)</span>
        </button>
      </div>

      {mode === 'essays' ? (
        <EssayCoach masteredIds={masteredIds} onToggleMastered={onToggleMastered} />
      ) : (
        <MockExamRoom onAwardXp={onAwardXp} />
      )}
    </div>
  );
}
