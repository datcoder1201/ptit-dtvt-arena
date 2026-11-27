import React, { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  BookMarked,
  Compass,
  FileText,
  Gamepad2,
  Moon,
  RadioTower,
  Star,
  Sun,
  Volume2,
  VolumeX,
  Zap,
} from 'lucide-react';
import CampaignMap from './components/CampaignMap';
import InteractiveLabs from './components/InteractiveLabs';
import ArenaGames from './components/ArenaGames';
import VaultAndExam from './components/VaultAndExam';
import FormulaSurvivalKit from './components/FormulaSurvivalKit';
import { CAMPAIGN_STAGES } from './data/campaignData';
import { isSoundMuted, playClick, setSoundMuted } from './utils/soundFx';

const TABS = [
  { id: 'campaign', label: 'Chiến dịch 6 Ải', icon: Compass },
  { id: 'labs', label: 'Phòng Lab 3 Môn', icon: Activity },
  { id: 'games', label: 'Đấu trường Game', icon: Gamepad2 },
  { id: 'vault', label: 'Tự luận & Thi 90p', icon: FileText },
  { id: 'formulas', label: 'Sổ tay & Casio', icon: BookMarked },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('campaign');
  const [theme, setTheme] = useState(() => localStorage.getItem('ptit_theme') || 'dark');
  const [muted, setMuted] = useState(() => isSoundMuted());

  const [xp, setXp] = useState(() => Number(localStorage.getItem('ptit_xp') || '0'));
  const [awardedKeys, setAwardedKeys] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('ptit_awarded_keys') || '[]');
    } catch {
      return [];
    }
  });
  const [masteredIds, setMasteredIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('ptit_mastered_essays') || '[]');
    } catch {
      return [];
    }
  });
  const [stageProgress, setStageProgress] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('ptit_stage_progress') || '{}');
    } catch {
      return {};
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ptit_theme', theme);
  }, [theme]);

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    setSoundMuted(next);
    if (!next) playClick();
  };

  const awardXp = (amount, uniqueKey = null) => {
    if (uniqueKey) {
      if (awardedKeys.includes(uniqueKey)) return;
      const nextKeys = [...awardedKeys, uniqueKey];
      setAwardedKeys(nextKeys);
      localStorage.setItem('ptit_awarded_keys', JSON.stringify(nextKeys));
    }
    setXp((prev) => {
      const next = prev + amount;
      localStorage.setItem('ptit_xp', String(next));
      return next;
    });
  };

  const updateStageProgress = (stageId, patch) => {
    setStageProgress((prev) => {
      const next = {
        ...prev,
        [stageId]: { ...(prev[stageId] || {}), ...patch },
      };
      localStorage.setItem('ptit_stage_progress', JSON.stringify(next));
      return next;
    });
  };

  const toggleMastered = (id) => {
    setMasteredIds((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((x) => x !== id) : [...prev, id];
      localStorage.setItem('ptit_mastered_essays', JSON.stringify(next));
      if (!exists) {
        awardXp(40, `master-${id}`);
      }
      return next;
    });
  };

  const totalStars = useMemo(
    () =>
      CAMPAIGN_STAGES.reduce((sum, st) => {
        const p = stageProgress[st.id] || {};
        return sum + (p.s1 ? 1 : 0) + (p.s2 ? 1 : 0) + (p.s3 ? 1 : 0);
      }, 0),
    [stageProgress]
  );

  const level = Math.floor(xp / 150) + 1;
  const levelProgress = ((xp % 150) / 150) * 100;

  return (
    <div className="min-h-screen lab-grid-bg flex flex-col">
      {/* Top Instrument Header */}
      <header className="sticky top-0 z-30 border-b border-[var(--border-subtle)] bg-[var(--bg-canvas)]/92 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          {/* Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-cyan-500/15 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <RadioTower className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-sm sm:text-base tracking-tight text-[var(--text-primary)] leading-none">
                SIGNAL CORE
              </div>
              <div className="text-[11px] font-mono text-[var(--text-muted)] mt-1">
                PTIT ĐTVT • BAS1225 • ELE1318 • TEL1368
              </div>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 bg-[var(--bg-surface)] p-1 rounded-xl border border-[var(--border-subtle)]">
            {TABS.map((t) => {
              const Icon = t.icon;
              const active = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    playClick();
                    setActiveTab(t.id);
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                    active
                      ? 'bg-cyan-500 text-slate-950 shadow-sm'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right HUD */}
          <div className="flex items-center gap-2">
            <div className="flex sm:hidden items-center gap-1.5 text-[11px] font-mono px-2 py-1 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
              <span className="font-bold text-[var(--text-primary)]">LV.{level}</span>
              <span className="text-amber-400">★{totalStars}</span>
            </div>

            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <div className="text-xs font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[var(--text-primary)]">LV.{level}</span>
                  <span className="text-amber-400">{xp} XP</span>
                </div>
                <div className="w-16 h-1 bg-[var(--bg-inset)] rounded-full overflow-hidden mt-0.5">
                  <div className="h-full bg-amber-400" style={{ width: `${levelProgress}%` }} />
                </div>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-1 text-xs font-mono px-2.5 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{totalStars}/18</span>
            </div>

            <button
              onClick={toggleMute}
              className="p-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
              aria-label="Bật tắt âm thanh"
              title={muted ? 'Bật âm thanh hiệu ứng' : 'Tắt âm thanh hiệu ứng'}
            >
              {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
            </button>

            <button
              onClick={() => {
                playClick();
                setTheme((th) => (th === 'dark' ? 'light' : 'dark'));
              }}
              className="p-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
              aria-label="Đổi giao diện Sáng/Tối"
              title="Đổi giao diện Midnight Oscilloscope / Blueprint Paper"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Scrollable Tabs */}
        <div className="lg:hidden border-t border-[var(--border-subtle)] px-3 py-2 flex items-center gap-1.5 overflow-x-auto">
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => {
                  playClick();
                  setActiveTab(t.id);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  active
                    ? 'bg-cyan-500 text-slate-950'
                    : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-subtle)]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === 'campaign' && (
          <CampaignMap
            stageProgress={stageProgress}
            onUpdateStage={updateStageProgress}
            onAwardXp={awardXp}
          />
        )}
        {activeTab === 'labs' && <InteractiveLabs onAwardXp={awardXp} />}
        {activeTab === 'games' && <ArenaGames onAwardXp={awardXp} />}
        {activeTab === 'vault' && (
          <VaultAndExam
            masteredIds={masteredIds}
            onToggleMastered={toggleMastered}
            onAwardXp={awardXp}
          />
        )}
        {activeTab === 'formulas' && <FormulaSurvivalKit />}
      </main>

      <footer className="border-t border-[var(--border-subtle)] py-4 px-4 text-center text-xs text-[var(--text-muted)]">
        SIGNAL CORE • PTIT ĐTVT Arena — Tổng ôn cuối kỳ tự luận Vật lý 2, Lý thuyết mạch &amp; Tín hiệu Hệ thống • ptit.raumaduongtau.online
      </footer>
    </div>
  );
}
