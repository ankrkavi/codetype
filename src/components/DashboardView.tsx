import React from 'react';
import {
  Play,
  Zap,
  Trophy,
  CheckCircle2,
  Calendar,
  Clock,
  Sparkles,
  ArrowRight,
  Flame,
  Code2,
  BookOpen
} from 'lucide-react';
import { Difficulty, Language, SessionResult, UserStats } from '../types';
import { DayActivity } from '../utils/storage';
import { LANGUAGE_META, SNIPPETS } from '../data/snippets';

interface DashboardViewProps {
  stats: UserStats;
  recentSessions: SessionResult[];
  weeklyActivity: DayActivity[];
  onStartPracticing: (lang?: Language, diff?: Difficulty, snippetId?: string) => void;
  onExploreLanguages: () => void;
  onBrowseLessons: () => void;
}

const MOTIVATIONAL_LINES = [
  'Think in code. Type with flow.',
  'Speed in syntax removes friction from thought.',
  'Brackets, colons, and indentation become second nature.',
  'Fluency in typing accelerates algorithmic problem solving.',
  'Zero hesitations between your brain and the compiler.',
];

export const DashboardView: React.FC<DashboardViewProps> = ({
  stats,
  recentSessions,
  weeklyActivity,
  onStartPracticing,
  onExploreLanguages,
  onBrowseLessons,
}) => {
  // Pick motivational line based on day
  const motivationalLine = MOTIVATIONAL_LINES[new Date().getDay() % MOTIVATIONAL_LINES.length];

  // Daily challenge snippet (fixed per day of year)
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
  );
  const dailySnippet = SNIPPETS[dayOfYear % SNIPPETS.length];
  const dailyLangMeta = LANGUAGE_META[dailySnippet.language];

  // Continue Learning recommendation
  const latestSession = recentSessions[0];
  const recommendedSnippet = latestSession
    ? SNIPPETS.find((s) => s.language === latestSession.language && s.id !== latestSession.snippetId) || SNIPPETS[1]
    : SNIPPETS[0];
  const recLangMeta = LANGUAGE_META[recommendedSnippet.language];

  // Maximum characters in weekly activity for chart height scaling
  const maxWeeklyChars = Math.max(...weeklyActivity.map((d) => d.totalChars), 100);

  const hasData = stats.totalSessions > 0;

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto w-full pb-12">
      {/* Greeting & Hero Banner */}
      <div className="relative rounded-2xl bg-gradient-to-r from-[#12151b] via-[#161a22] to-[#12151b] border border-[#1f242d] p-6 sm:p-8 overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#b0ff38] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Developer Typing Workspace</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#f0f3f6]">
            Welcome back to CodeType
          </h1>

          <p className="text-sm sm:text-base text-[#8c94a0] mt-1.5 mb-6 text-balance">
            {motivationalLine}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onStartPracticing()}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg bg-[#b0ff38] text-[#0b0d11] hover:bg-[#9ee628] transition-all cursor-pointer shadow-sm hover:shadow-[0_0_20px_rgba(176,255,56,0.3)] whitespace-nowrap"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Start Practicing</span>
            </button>

            <button
              onClick={onBrowseLessons}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg bg-[#191e26] border border-[#2d3545] text-[#f0f3f6] hover:bg-[#232936] transition-colors cursor-pointer whitespace-nowrap"
            >
              <BookOpen className="w-4 h-4 text-[#8c94a0]" />
              <span>Browse Lessons</span>
            </button>
          </div>
        </div>

        {/* Ambient background glow */}
        <div className="absolute right-0 top-0 bottom-0 w-80 bg-gradient-to-l from-[#b0ff38]/5 to-transparent pointer-events-none" />
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Current Speed */}
        <div className="p-4 rounded-xl bg-[#12151b] border border-[#1f242d] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#8c94a0] text-xs mb-2">
            <span>Current Speed</span>
            <Zap className="w-4 h-4 text-[#b0ff38]" />
          </div>
          <div className="text-3xl font-bold font-mono tabular-nums text-[#f0f3f6]">
            {latestSession ? latestSession.netWpm : '—'}
            {latestSession && <span className="text-sm font-normal text-[#8c94a0] ml-1">WPM</span>}
          </div>
          <div className="text-[11px] text-[#647082] mt-2">
            {latestSession ? `From latest session` : 'Complete a test to establish'}
          </div>
        </div>

        {/* Best Speed */}
        <div className="p-4 rounded-xl bg-[#12151b] border border-[#1f242d] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#8c94a0] text-xs mb-2">
            <span>Personal Best</span>
            <Trophy className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-bold font-mono tabular-nums text-[#f0f3f6]">
            {stats.bestNetWpm > 0 ? stats.bestNetWpm : '—'}
            {stats.bestNetWpm > 0 && <span className="text-sm font-normal text-[#8c94a0] ml-1">WPM</span>}
          </div>
          <div className="text-[11px] text-[#647082] mt-2">
            {stats.bestNetWpm > 0 ? `Across all languages` : 'No personal records yet'}
          </div>
        </div>

        {/* Accuracy */}
        <div className="p-4 rounded-xl bg-[#12151b] border border-[#1f242d] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#8c94a0] text-xs mb-2">
            <span>Avg Accuracy</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-bold font-mono tabular-nums text-[#f0f3f6]">
            {hasData ? `${stats.avgAccuracy}%` : '—'}
          </div>
          <div className="text-[11px] text-[#647082] mt-2">
            {hasData ? `Over ${stats.totalSessions} sessions` : 'Target: 95%+ for fluency'}
          </div>
        </div>

        {/* Total Sessions */}
        <div className="p-4 rounded-xl bg-[#12151b] border border-[#1f242d] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#8c94a0] text-xs mb-2">
            <span>Sessions</span>
            <Clock className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-3xl font-bold font-mono tabular-nums text-[#f0f3f6]">
            {stats.totalSessions}
          </div>
          <div className="text-[11px] text-[#647082] mt-2">
            {stats.totalTimePracticedSeconds > 0
              ? `${Math.round(stats.totalTimePracticedSeconds / 60)} mins practiced`
              : 'Zero sessions logged'}
          </div>
        </div>
      </div>

      {/* 2-Column Section: Daily Challenge & Weekly Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Challenge Card */}
        <div className="rounded-xl bg-[#12151b] border border-[#1f242d] p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400">
                <Flame className="w-4 h-4" />
                <span>Daily Challenge</span>
              </div>
              <div className="text-xs text-[#8c94a0]">
                {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </div>
            </div>

            <h3 className="text-base font-semibold text-[#f0f3f6]">
              {dailySnippet.title}
            </h3>

            <p className="text-xs text-[#8c94a0] mt-1 leading-relaxed">
              {dailySnippet.concept}
            </p>

            <div className="mt-3 flex items-center gap-2 text-xs text-[#647082]">
              <span className="text-[#f0f3f6] font-medium">{dailyLangMeta.name}</span>
              <span>·</span>
              <span className="capitalize">{dailySnippet.difficulty}</span>
              <span>·</span>
              <span>{dailySnippet.estimatedDuration}</span>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-[#1f242d] flex items-center justify-between">
            <div className="text-xs text-[#8c94a0] font-mono">
              {dailySnippet.tags.slice(0, 2).map((t) => `#${t}`).join(' ')}
            </div>
            <button
              onClick={() => onStartPracticing(dailySnippet.language, dailySnippet.difficulty, dailySnippet.id)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#b0ff38] text-[#0b0d11] hover:bg-[#9ee628] transition-colors cursor-pointer"
            >
              <span>Accept Challenge</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Weekly Activity Chart */}
        <div className="rounded-xl bg-[#12151b] border border-[#1f242d] p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#f0f3f6]">
              <Calendar className="w-4 h-4 text-[#b0ff38]" />
              <span>Weekly Activity</span>
            </div>
            <div className="text-xs text-[#8c94a0]">
              Past 7 days
            </div>
          </div>

          {/* Simple compact bar chart */}
          <div className="h-32 flex items-end justify-between gap-2 px-2 pb-1 border-b border-[#1f242d]">
            {weeklyActivity.map((day, idx) => {
              const heightPct = Math.max(8, Math.round((day.totalChars / maxWeeklyChars) * 100));
              const hasActivity = day.sessionCount > 0;

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group relative">
                  {/* Tooltip on hover */}
                  <div className="absolute -top-8 hidden group-hover:flex px-2 py-0.5 bg-[#0b0d11] border border-[#2d3545] rounded text-[10px] text-[#f0f3f6] whitespace-nowrap z-20">
                    {day.sessionCount} sessions ({day.totalChars} chars)
                  </div>

                  <div
                    className={`w-full max-w-[28px] rounded-t-sm transition-all duration-300 ${
                      hasActivity
                        ? 'bg-[#b0ff38] group-hover:bg-[#9ee628]'
                        : 'bg-[#191e26] hover:bg-[#232936]'
                    }`}
                    style={{ height: `${heightPct}%` }}
                  />
                  <span className="text-[10px] font-mono text-[#8c94a0]">
                    {day.dayName}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-[#8c94a0]">
            <span>Sessions this week: <strong className="text-[#f0f3f6]">{weeklyActivity.reduce((acc, d) => acc + d.sessionCount, 0)}</strong></span>
            <span>Total typed: <strong className="text-[#f0f3f6]">{weeklyActivity.reduce((acc, d) => acc + d.totalChars, 0)}</strong> chars</span>
          </div>
        </div>
      </div>

      {/* Continue Learning Strip */}
      <div className="rounded-xl bg-[#12151b] border border-[#1f242d] p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#191e26] border border-[#2d3545] flex items-center justify-center text-[#b0ff38] shrink-0">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#b0ff38]">
              Continue Learning
            </div>
            <h4 className="text-sm font-semibold text-[#f0f3f6]">
              {recommendedSnippet.title}
            </h4>
            <p className="text-xs text-[#8c94a0] mt-0.5">
              {recLangMeta.name} · {recommendedSnippet.concept}
            </p>
          </div>
        </div>

        <button
          onClick={() => onStartPracticing(recommendedSnippet.language, recommendedSnippet.difficulty, recommendedSnippet.id)}
          className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#191e26] border border-[#2d3545] text-[#f0f3f6] hover:bg-[#232936] transition-colors cursor-pointer shrink-0 inline-flex items-center gap-1.5"
        >
          <span>Practice Now</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#b0ff38]" />
        </button>
      </div>

      {/* Recent Practice Section */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-[#f0f3f6]">
            Recent Practice Sessions
          </h3>
          {hasData && (
            <span className="text-xs text-[#8c94a0]">
              Showing latest {recentSessions.length} sessions
            </span>
          )}
        </div>

        {!hasData ? (
          /* Empty State - Clear Baseline Explanation */
          <div className="rounded-xl border border-dashed border-[#2d3545] bg-[#0c0f14] p-8 text-center flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-xl bg-[#191e26] border border-[#2d3545] flex items-center justify-center text-[#b0ff38] mb-3">
              <Zap className="w-6 h-6" />
            </div>
            <h4 className="text-base font-semibold text-[#f0f3f6]">
              Establish Your Coding Baseline
            </h4>
            <p className="text-xs text-[#8c94a0] max-w-md mt-1 mb-5 leading-relaxed">
              No sessions recorded yet. Complete your first practice challenge to calculate your net words-per-minute, keystroke accuracy, and personal records.
            </p>
            <button
              onClick={() => onStartPracticing('cpp', 'beginner')}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#b0ff38] text-[#0b0d11] hover:bg-[#9ee628] transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Take 1-Minute Baseline Test</span>
            </button>
          </div>
        ) : (
          /* Populated Table / Cards */
          <div className="overflow-x-auto rounded-xl border border-[#1f242d] bg-[#12151b]">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#1f242d] bg-[#0e1116] text-[#8c94a0]">
                  <th className="py-3 px-4 font-medium">Snippet</th>
                  <th className="py-3 px-4 font-medium">Language</th>
                  <th className="py-3 px-4 font-medium">Difficulty</th>
                  <th className="py-3 px-4 font-medium text-right">Net WPM</th>
                  <th className="py-3 px-4 font-medium text-right">Accuracy</th>
                  <th className="py-3 px-4 font-medium text-right">Duration</th>
                  <th className="py-3 px-4 font-medium text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1f242d]">
                {recentSessions.slice(0, 6).map((s) => {
                  const meta = LANGUAGE_META[s.language];
                  return (
                    <tr key={s.id} className="hover:bg-[#191e26]/50 transition-colors">
                      <td className="py-3 px-4 font-semibold text-[#f0f3f6]">
                        {s.snippetTitle}
                      </td>
                      <td className="py-3 px-4 text-[#8c94a0]">
                        {meta.name}
                      </td>
                      <td className="py-3 px-4 capitalize text-[#8c94a0]">
                        {s.difficulty}
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-right tabular-nums text-[#b0ff38]">
                        {s.netWpm}
                      </td>
                      <td className="py-3 px-4 font-mono text-right tabular-nums text-[#f0f3f6]">
                        {s.accuracy}%
                      </td>
                      <td className="py-3 px-4 font-mono text-right tabular-nums text-[#8c94a0]">
                        {s.durationSeconds}s
                      </td>
                      <td className="py-3 px-4 text-right text-[#647082]">
                        {new Date(s.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
