import React from 'react';
import {
  Trophy,
  Zap,
  Gauge,
  CheckCircle2,
  AlertCircle,
  Timer,
  RotateCcw,
  SkipForward,
  BookOpen,
  LayoutDashboard,
  Sparkles,
} from 'lucide-react';
import { SessionResult } from '../types';
import { LANGUAGE_META } from '../data/snippets';
import { sanitizeAccuracy } from '../utils/metrics';

interface ResultsModalProps {
  result: SessionResult;
  onTryAgain: () => void;
  onNextSnippet: () => void;
  onBrowseLessons: () => void;
  onReturnDashboard: () => void;
}

export const ResultsModal: React.FC<ResultsModalProps> = ({
  result,
  onTryAgain,
  onNextSnippet,
  onBrowseLessons,
  onReturnDashboard,
}) => {
  const langMeta = LANGUAGE_META[result.language];

  // Generate context-sensitive improvement tip
  const getImprovementTip = () => {
    if (result.accuracy < 90) {
      return 'Prioritize deliberate accuracy over raw velocity. Fixing errors mid-flight costs up to 3x the time of typing carefully on the first pass.';
    }
    if (result.incorrectChars > 4) {
      return 'Watch your bracket and symbol reaches. Anchor your right pinky when hitting braces, brackets, and semicolons to build muscle memory.';
    }
    if (result.netWpm >= 75) {
      return 'Phenomenal flow state! Your coding typing speed is in the top bracket. Try challenging yourself with Medium or Hard algorithmic snippets.';
    }
    if (result.netWpm >= 50) {
      return 'Solid speed! You have strong syntax fluency. Focus on anticipating punctuation before you reach line ends to eliminate micro-hesitations.';
    }
    return 'Consistent daily repetition on real language syntax quickly translates into fluid thought-to-editor coding speed.';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg rounded-2xl bg-[#12151b] border border-[#2d3545] p-6 sm:p-7 shadow-2xl relative flex flex-col gap-6">
        {/* Header / Personal Best Badge */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider text-[#8c94a0] font-semibold">
              Session Complete
            </div>
            <h2 className="text-xl font-bold text-[#f0f3f6] mt-0.5">
              {result.snippetTitle}
            </h2>
          </div>

          {result.isPersonalBest && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#b0ff38]/15 border border-[#b0ff38]/30 text-[#b0ff38] text-xs font-semibold">
              <Trophy className="w-3.5 h-3.5" />
              <span>Personal Best</span>
            </div>
          )}
        </div>

        {/* Big Hero Metric Display: Net WPM */}
        <div className="rounded-xl bg-[#0b0d11] border border-[#1f242d] p-5 text-center relative overflow-hidden">
          <div className="text-xs text-[#8c94a0] font-medium uppercase tracking-wider">
            Net Typing Speed
          </div>
          <div className="text-5xl font-black font-mono tabular-nums text-[#b0ff38] my-1">
            {result.netWpm}
          </div>
          <div className="text-xs text-[#647082]">
            Words Per Minute (Error penalized)
          </div>

          <div className="mt-4 pt-4 border-t border-[#1f242d] flex items-center justify-center gap-6 text-xs text-[#8c94a0]">
            <span>Language: <strong className="text-[#f0f3f6]">{langMeta.name}</strong></span>
            <span>·</span>
            <span>Difficulty: <strong className="capitalize text-[#f0f3f6]">{result.difficulty}</strong></span>
          </div>
        </div>

        {/* Detailed Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-3 rounded-lg bg-[#191e26] border border-[#1f242d]">
            <div className="flex items-center justify-center gap-1 text-[#8c94a0] text-xs mb-1">
              <Gauge className="w-3.5 h-3.5 text-sky-400" />
              <span>Gross WPM</span>
            </div>
            <div className="text-lg font-bold font-mono tabular-nums text-[#f0f3f6]">
              {result.grossWpm}
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[#191e26] border border-[#1f242d]">
            <div className="flex items-center justify-center gap-1 text-[#8c94a0] text-xs mb-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Accuracy</span>
            </div>
            <div className="text-lg font-bold font-mono tabular-nums text-[#f0f3f6]">
              {sanitizeAccuracy(result.accuracy)}%
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[#191e26] border border-[#1f242d]">
            <div className="flex items-center justify-center gap-1 text-[#8c94a0] text-xs mb-1">
              <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
              <span>Errors</span>
            </div>
            <div className="text-lg font-bold font-mono tabular-nums text-[#f0f3f6]">
              {result.incorrectChars}
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[#191e26] border border-[#1f242d]">
            <div className="flex items-center justify-center gap-1 text-[#8c94a0] text-xs mb-1">
              <Timer className="w-3.5 h-3.5 text-amber-400" />
              <span>Time</span>
            </div>
            <div className="text-lg font-bold font-mono tabular-nums text-[#f0f3f6]">
              {result.durationSeconds}s
            </div>
          </div>
        </div>

        {/* Improvement Tip Box */}
        <div className="p-4 rounded-xl bg-[#0b0d11] border border-[#1f242d] flex items-start gap-3">
          <Sparkles className="w-4 h-4 text-[#b0ff38] shrink-0 mt-0.5" />
          <div className="text-xs text-[#8c94a0] leading-relaxed">
            <span className="font-semibold text-[#f0f3f6] block mb-0.5">Improvement Insight</span>
            {getImprovementTip()}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={onTryAgain}
            className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg bg-[#b0ff38] text-[#0b0d11] hover:bg-[#9ee628] transition-colors cursor-pointer shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>

          <button
            onClick={onNextSnippet}
            className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg bg-[#191e26] border border-[#2d3545] text-[#f0f3f6] hover:bg-[#232936] transition-colors cursor-pointer"
          >
            <SkipForward className="w-3.5 h-3.5 text-[#b0ff38]" />
            <span>Next in {langMeta.name}</span>
          </button>

          <button
            onClick={onBrowseLessons}
            className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium rounded-lg border border-[#1f242d] bg-[#0b0d11] text-[#8c94a0] hover:text-[#f0f3f6] hover:bg-[#13161c] transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Browse Lessons</span>
          </button>

          <button
            onClick={onReturnDashboard}
            className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium rounded-lg border border-[#1f242d] bg-[#0b0d11] text-[#8c94a0] hover:text-[#f0f3f6] hover:bg-[#13161c] transition-colors cursor-pointer"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </button>
        </div>
      </div>
    </div>
  );
};
