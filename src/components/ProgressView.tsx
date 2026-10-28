import React, { useState } from 'react';
import {
  Trophy,
  Zap,
  CheckCircle2,
  Clock,
  Trash2,
  Layers,
  ArrowUpRight,
  BookOpen,
  Sparkles
} from 'lucide-react';
import { Language, SessionResult, UserStats } from '../types';
import { LANGUAGE_META, SNIPPETS } from '../data/snippets';
import { CURRICULUM_TAXONOMY, getTopicsForLanguage } from '../data/curriculumTaxonomy';
import { getExerciseProgressMap } from '../utils/storage';

interface ProgressViewProps {
  stats: UserStats;
  sessions: SessionResult[];
  onClearData: () => void;
  onNavigateToPractice: (lang?: Language) => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  stats,
  sessions,
  onClearData,
  onNavigateToPractice,
}) => {
  const [filterLang, setFilterLang] = useState<Language | 'all'>('all');
  const [showConfirmReset, setShowConfirmReset] = useState<boolean>(false);

  const progressMap = getExerciseProgressMap();

  const filteredSessions = sessions.filter((s) => {
    if (filterLang !== 'all' && s.language !== filterLang) return false;
    return true;
  });

  const languages: Language[] = ['cpp', 'java'];

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto w-full pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-[#b0ff38] mb-1">
            Personal Analytics & Curriculum Mastery
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#f0f3f6]">
            Typing Progress & Records
          </h1>
          <p className="text-sm text-[#8c94a0] mt-1">
            Locally stored metrics, speeds, and exercise completion progress for C++ and Java.
          </p>
        </div>

        {sessions.length > 0 && (
          <button
            onClick={() => setShowConfirmReset(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer shrink-0"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Reset History</span>
          </button>
        )}
      </div>

      {/* Confirmation Modal for Reset */}
      {showConfirmReset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-xl bg-[#12151b] border border-[#2d3545] p-5 shadow-xl flex flex-col gap-4">
            <h3 className="text-base font-semibold text-[#f0f3f6]">Clear All Practice History?</h3>
            <p className="text-xs text-[#8c94a0] leading-relaxed">
              This will remove all {sessions.length} recorded typing sessions, exercise mastery status, and personal bests from your local browser storage. This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-2 mt-2">
              <button
                onClick={() => setShowConfirmReset(false)}
                className="px-3.5 py-1.5 text-xs font-medium rounded-lg bg-[#191e26] text-[#8c94a0] hover:text-[#f0f3f6] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onClearData();
                  setShowConfirmReset(false);
                }}
                className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-rose-600 text-white hover:bg-rose-500 cursor-pointer"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Overall KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#12151b] border border-[#1f242d]">
          <div className="flex items-center justify-between text-[#8c94a0] text-xs mb-2">
            <span>Overall Best Net WPM</span>
            <Trophy className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-bold font-mono tabular-nums text-[#f0f3f6]">
            {stats.bestNetWpm > 0 ? stats.bestNetWpm : '—'}
          </div>
          <div className="text-[11px] text-[#647082] mt-1">Personal record across all runs</div>
        </div>

        <div className="p-4 rounded-xl bg-[#12151b] border border-[#1f242d]">
          <div className="flex items-center justify-between text-[#8c94a0] text-xs mb-2">
            <span>Average Net WPM</span>
            <Zap className="w-4 h-4 text-[#b0ff38]" />
          </div>
          <div className="text-3xl font-bold font-mono tabular-nums text-[#f0f3f6]">
            {stats.avgNetWpm > 0 ? stats.avgNetWpm : '—'}
          </div>
          <div className="text-[11px] text-[#647082] mt-1">Calculated over all sessions</div>
        </div>

        <div className="p-4 rounded-xl bg-[#12151b] border border-[#1f242d]">
          <div className="flex items-center justify-between text-[#8c94a0] text-xs mb-2">
            <span>Average Accuracy</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-bold font-mono tabular-nums text-[#f0f3f6]">
            {stats.totalSessions > 0 ? `${stats.avgAccuracy}%` : '—'}
          </div>
          <div className="text-[11px] text-[#647082] mt-1">Keystroke precision</div>
        </div>

        <div className="p-4 rounded-xl bg-[#12151b] border border-[#1f242d]">
          <div className="flex items-center justify-between text-[#8c94a0] text-xs mb-2">
            <span>Total Time Practiced</span>
            <Clock className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-3xl font-bold font-mono tabular-nums text-[#f0f3f6]">
            {Math.round(stats.totalTimePracticedSeconds / 60)}
            <span className="text-sm font-normal text-[#8c94a0] ml-1">mins</span>
          </div>
          <div className="text-[11px] text-[#647082] mt-1">{stats.totalSessions} sessions completed</div>
        </div>
      </div>

      {/* Language Competency & Coverage Grid */}
      <div>
        <h2 className="text-base font-semibold text-[#f0f3f6] mb-3">
          Language Competency & Personal Bests
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {languages.map((lang) => {
            const meta = LANGUAGE_META[lang];
            const sessionCount = stats.sessionsByLanguage[lang] || 0;
            const bestWpm = stats.bestWpmByLanguage[lang] || 0;
            const totalExercises = SNIPPETS.filter((s) => s.language === lang).length;
            const completedCount = stats.completedExercisesCount?.[lang] || 0;
            const masteryPct = Math.round((completedCount / Math.max(1, totalExercises)) * 100);

            return (
              <div
                key={lang}
                className="p-5 rounded-xl bg-[#12151b] border border-[#1f242d] flex flex-col justify-between hover:border-[#2d3545] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="text-xs font-mono font-bold px-2 py-0.5 rounded"
                      style={{
                        backgroundColor: meta.badgeBg,
                        color: meta.primaryColor,
                        border: `1px solid ${meta.accentBorder}`,
                      }}
                    >
                      {meta.fileExt}
                    </span>
                    <span className="text-xs text-[#8c94a0]">
                      {sessionCount} total sessions
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-[#f0f3f6]">
                    {meta.name}
                  </h3>

                  <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-[#1f242d]">
                    <div>
                      <div className="text-[11px] text-[#8c94a0]">Personal Best</div>
                      <div className="text-2xl font-bold font-mono tabular-nums text-[#f0f3f6]">
                        {bestWpm > 0 ? bestWpm : '—'}
                        {bestWpm > 0 && <span className="text-xs text-[#8c94a0] ml-1 font-normal">WPM</span>}
                      </div>
                    </div>

                    <div>
                      <div className="text-[11px] text-[#8c94a0]">Curriculum Mastered</div>
                      <div className="text-2xl font-bold font-mono tabular-nums text-[#b0ff38]">
                        {completedCount}
                        <span className="text-xs text-[#8c94a0] ml-1 font-normal">/ {totalExercises}</span>
                      </div>
                    </div>
                  </div>

                  {/* Mastery Progress Bar */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-[11px] text-[#8c94a0] mb-1">
                      <span>Coverage</span>
                      <span className="font-mono text-[#f0f3f6]">{masteryPct}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[#191e26] overflow-hidden">
                      <div
                        className="h-full bg-[#b0ff38] transition-all duration-300"
                        style={{ width: `${masteryPct}%` }}
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onNavigateToPractice(lang)}
                  className="mt-5 pt-3 border-t border-[#1f242d] text-xs font-medium text-[#b0ff38] hover:text-[#9ee628] flex items-center justify-between cursor-pointer"
                >
                  <span>Practice {meta.name}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Curriculum Topic Mastery Progress Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-[#f0f3f6]">
            Curriculum Topic Mastery
          </h2>
          <span className="text-xs text-[#8c94a0]">
            Tracked across all modules
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {CURRICULUM_TAXONOMY.map((topic) => {
            const topicSnippets = SNIPPETS.filter(
              (s) => s.language === topic.language && s.mainTopic === topic.id
            );
            const topicCompleted = topicSnippets.filter((s) => progressMap[s.id]?.completed).length;
            const topicPct =
              topicSnippets.length > 0
                ? Math.round((topicCompleted / topicSnippets.length) * 100)
                : 0;

            const langMeta = LANGUAGE_META[topic.language];

            return (
              <div
                key={topic.id}
                className="p-3.5 rounded-xl bg-[#12151b] border border-[#1f242d] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] text-[#8c94a0] mb-1.5">
                    <span
                      className="font-mono font-bold px-1.5 py-0.5 rounded"
                      style={{
                        backgroundColor: langMeta.badgeBg,
                        color: langMeta.primaryColor,
                      }}
                    >
                      {langMeta.name}
                    </span>
                    <span className="font-mono tabular-nums">
                      {topicCompleted} / {topicSnippets.length}
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-[#f0f3f6] line-clamp-1">
                    {topic.name}
                  </h4>
                  <p className="text-[11px] text-[#8c94a0] mt-0.5 line-clamp-1">
                    {topic.description}
                  </p>
                </div>

                <div className="mt-3">
                  <div className="w-full h-1 rounded-full bg-[#191e26] overflow-hidden">
                    <div
                      className="h-full bg-[#b0ff38] transition-all"
                      style={{ width: `${topicPct}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Complete Session Log Table */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <h2 className="text-base font-semibold text-[#f0f3f6]">
            Session Log History
          </h2>

          {/* Language Filter */}
          <div className="flex items-center gap-1 p-1 bg-[#12151b] rounded-lg border border-[#1f242d]">
            <button
              onClick={() => setFilterLang('all')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap cursor-pointer transition-colors ${
                filterLang === 'all'
                  ? 'bg-[#191e26] text-[#b0ff38] border border-[#2d3545]'
                  : 'text-[#8c94a0] hover:text-[#f0f3f6]'
              }`}
            >
              All
            </button>
            {languages.map((l) => (
              <button
                key={l}
                onClick={() => setFilterLang(l)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap cursor-pointer transition-colors ${
                  filterLang === l
                    ? 'bg-[#191e26] text-[#b0ff38] border border-[#2d3545]'
                    : 'text-[#8c94a0] hover:text-[#f0f3f6]'
                }`}
              >
                {LANGUAGE_META[l].name}
              </button>
            ))}
          </div>
        </div>

        {filteredSessions.length === 0 ? (
          <div className="rounded-xl border border-dashed border-[#2d3545] bg-[#0c0f14] p-8 text-center text-xs text-[#8c94a0]">
            No completed sessions found for this filter. Start a session in the Practice Arena.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-[#1f242d] bg-[#12151b]">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#1f242d] bg-[#0e1116] text-[#8c94a0]">
                  <th className="py-3 px-4 font-medium">Exercise</th>
                  <th className="py-3 px-4 font-medium">Language</th>
                  <th className="py-3 px-4 font-medium">Difficulty</th>
                  <th className="py-3 px-4 font-medium text-right">Net WPM</th>
                  <th className="py-3 px-4 font-medium text-right">Gross WPM</th>
                  <th className="py-3 px-4 font-medium text-right">Accuracy</th>
                  <th className="py-3 px-4 font-medium text-right">Errors</th>
                  <th className="py-3 px-4 font-medium text-right">Duration</th>
                  <th className="py-3 px-4 font-medium text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1f242d]">
                {filteredSessions.map((session) => {
                  const meta = LANGUAGE_META[session.language];
                  return (
                    <tr key={session.id} className="hover:bg-[#191e26]/50 transition-colors">
                      <td className="py-3 px-4 font-semibold text-[#f0f3f6]">
                        <div className="flex items-center gap-1.5">
                          {session.snippetTitle}
                          {session.isPersonalBest && (
                            <span title="Personal Best">
                              <Trophy className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-[#8c94a0]">
                        {meta.name}
                      </td>
                      <td className="py-3 px-4 capitalize text-[#8c94a0]">
                        {session.difficulty}
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-right tabular-nums text-[#b0ff38]">
                        {session.netWpm}
                      </td>
                      <td className="py-3 px-4 font-mono text-right tabular-nums text-[#8c94a0]">
                        {session.grossWpm}
                      </td>
                      <td className="py-3 px-4 font-mono text-right tabular-nums text-[#f0f3f6]">
                        {session.accuracy}%
                      </td>
                      <td className="py-3 px-4 font-mono text-right tabular-nums text-rose-400">
                        {session.incorrectChars}
                      </td>
                      <td className="py-3 px-4 font-mono text-right tabular-nums text-[#8c94a0]">
                        {session.durationSeconds}s
                      </td>
                      <td className="py-3 px-4 text-right text-[#647082] whitespace-nowrap">
                        {new Date(session.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' })}{' '}
                        {new Date(session.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
