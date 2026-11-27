import React, { useMemo, useState } from 'react';
import { BookOpen, Calculator, Search } from 'lucide-react';
import { CASIO_GUIDES, FORMULA_GROUPS } from '../data/formulasData';
import { SUBJECTS } from '../data/bridgesData';
import { FormulaBlock, RichMath } from './MathBlock';

export default function FormulaSurvivalKit() {
  const [query, setQuery] = useState('');
  const [subjFilter, setSubjFilter] = useState('all');

  const filteredGroups = useMemo(() => {
    return FORMULA_GROUPS.filter((g) => subjFilter === 'all' || g.subject === subjFilter)
      .map((g) => ({
        ...g,
        items: g.items.filter(
          (it) =>
            !query.trim() ||
            it.name.toLowerCase().includes(query.toLowerCase()) ||
            it.note.toLowerCase().includes(query.toLowerCase())
        ),
      }))
      .filter((g) => g.items.length > 0);
  }, [query, subjFilter]);

  return (
    <div className="space-y-8">
      <div className="border-b border-[var(--border-subtle)] pb-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
            Sổ Tay Công Thức Bỏ Túi &amp; Bí Kíp Casio Phòng Thi
          </h1>
          <p className="mt-1.5 text-sm text-[var(--text-secondary)]">
            Tra cứu nhanh toàn bộ công thức cốt lõi 3 môn và 4 chiêu bấm Casio fx-580VNX / 880BTG để kiểm tra kết quả tự luận không sai một dấu.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <div className="relative w-56">
            <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Lọc công thức (Gauss, ROC...)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-cyan-400"
            />
          </div>
          {[
            { id: 'all', label: 'Tất cả' },
            { id: 'phys', label: 'Vật lý 2' },
            { id: 'circ', label: 'Lý thuyết mạch' },
            { id: 'sig', label: 'Tín hiệu' },
          ].map((b) => (
            <button
              key={b.id}
              onClick={() => setSubjFilter(b.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border cursor-pointer ${
                subjFilter === b.id
                  ? 'border-cyan-400 bg-cyan-500/15 text-cyan-400'
                  : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)]'
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      {/* Formula Groups */}
      <div className="space-y-6">
        {filteredGroups.map((group) => {
          const subj = SUBJECTS[group.subject];
          return (
            <div key={group.subject} className="space-y-3">
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <h2 className="text-lg font-bold text-[var(--text-primary)]">{group.category}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {group.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 flex flex-col justify-between gap-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-sm text-[var(--text-primary)]">{item.name}</span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${subj.badgeClass}`}>
                        {subj.code}
                      </span>
                    </div>
                    <div className="rounded-lg bg-[var(--bg-inset)] border border-[var(--border-subtle)] px-3 py-2 text-sm overflow-x-auto">
                      <FormulaBlock latex={item.latex} />
                    </div>
                    <div className="text-xs text-[var(--text-secondary)]">
                      <RichMath text={item.note} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Casio Survival Section */}
      <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 sm:p-6 space-y-4">
        <div className="flex items-center gap-2.5">
          <Calculator className="w-5 h-5 text-amber-400" />
          <h2 className="text-lg sm:text-xl font-bold text-[var(--text-primary)]">
            4 Tuyệt Chiêu Bấm Casio fx-580VNX / 880BTG Phòng Thi Tự Luận
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CASIO_GUIDES.map((guide, i) => (
            <div
              key={i}
              className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-inset)] p-4 space-y-2.5"
            >
              <h3 className="font-bold text-sm text-cyan-400">{guide.title}</h3>
              <ul className="space-y-1.5 text-xs sm:text-sm text-[var(--text-primary)] list-disc pl-4">
                {guide.steps.map((s, j) => (
                  <li key={j} className="leading-relaxed">
                    <RichMath text={s} />
                  </li>
                ))}
              </ul>
              <div className="pt-2 border-t border-[var(--border-subtle)] text-xs text-amber-400">
                <strong>Mẹo thực chiến:</strong> <RichMath text={guide.proTip} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
