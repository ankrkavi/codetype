import React from 'react';
import {
  Play,
  Layers,
  ArrowRight,
  BookOpen,
  CheckCircle2
} from 'lucide-react';
import { Difficulty, Language } from '../types';
import { LANGUAGE_META, SNIPPETS } from '../data/snippets';
import { getTopicsForLanguage } from '../data/curriculumTaxonomy';
import { getExerciseProgressMap } from '../utils/storage';

interface LanguagesViewProps {
  onSelectLanguage: (lang: Language, diff?: Difficulty) => void;
  onBrowseLessonsForLang: (lang: Language) => void;
}

export const LanguagesView: React.FC<LanguagesViewProps> = ({
  onSelectLanguage,
  onBrowseLessonsForLang,
}) => {
  const languages: Language[] = ['cpp', 'java'];
  const progressMap = getExerciseProgressMap();

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto w-full pb-12">
      {/* Header */}
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-[#b0ff38] mb-1">
          Systems & Enterprise Curriculum
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#f0f3f6]">
          C++ & Java Language Explorer
        </h1>
        <p className="text-sm text-[#8c94a0] mt-1 max-w-2xl">
          Structured learning tracks designed to cultivate finger fluency, muscle memory for syntax, brackets, semicolons, and algorithmic code structure.
        </p>
      </div>

      {/* Language Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {languages.map((lang) => {
          const meta = LANGUAGE_META[lang];
          const langSnippets = SNIPPETS.filter((s) => s.language === lang);
          const sampleSnippet = langSnippets[0];
          const topics = getTopicsForLanguage(lang);

          const practicedCount = langSnippets.filter((s) => progressMap[s.id]?.completed).length;
          const completionPct = Math.round((practicedCount / Math.max(1, langSnippets.length)) * 100);

          return (
            <div
              key={lang}
              className="rounded-xl bg-[#12151b] border border-[#1f242d] p-6 flex flex-col justify-between hover:border-[#2d3545] transition-all group"
            >
              <div>
                {/* Header Strip */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-sm"
                      style={{
                        backgroundColor: meta.badgeBg,
                        color: meta.primaryColor,
                        border: `1px solid ${meta.accentBorder}`,
                      }}
                    >
                      {meta.fileExt}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#f0f3f6] group-hover:text-[#b0ff38] transition-colors">
                        {meta.name}
                      </h3>
                      <div className="text-xs text-[#8c94a0]">
                        {langSnippets.length} Curated Exercises · 4 Difficulty Levels
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-[#8c94a0]">
                    <Layers className="w-3.5 h-3.5" />
                    <span>{topics.length} Core Modules</span>
                  </div>
                </div>

                <p className="text-xs text-[#8c94a0] leading-relaxed mb-4">
                  {meta.description}
                </p>

                {/* Progress bar */}
                <div className="mb-5 p-3 rounded-lg bg-[#0b0d11] border border-[#1f242d]">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-[#8c94a0]">Curriculum Completion</span>
                    <span className="font-mono font-semibold text-[#b0ff38]">
                      {practicedCount} / {langSnippets.length} ({completionPct}%)
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[#191e26] overflow-hidden">
                    <div
                      className="h-full bg-[#b0ff38] transition-all duration-300"
                      style={{ width: `${completionPct}%` }}
                    />
                  </div>
                </div>

                {/* Curriculum Modules Pill-List (Clean Unboxed) */}
                <div className="mb-5">
                  <div className="text-[11px] uppercase font-semibold text-[#647082] mb-2">
                    Topics Included:
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 text-xs text-[#8c94a0]">
                    {topics.map((t) => (
                      <div key={t.id} className="flex items-center gap-1.5 truncate">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#b0ff38]/60 shrink-0" />
                        <span className="truncate">{t.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Code Preview Box */}
                <div className="rounded-lg bg-[#0c0f14] border border-[#1a1f29] p-3 text-xs font-mono text-[#8c94a0] overflow-hidden max-h-24 relative">
                  <pre className="text-[11px] leading-snug whitespace-pre overflow-x-hidden">
                    {sampleSnippet.code.slice(0, 160)}...
                  </pre>
                  <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#0c0f14] to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-6 pt-4 border-t border-[#1f242d] flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => onBrowseLessonsForLang(lang)}
                  className="text-xs text-[#8c94a0] hover:text-[#f0f3f6] transition-colors cursor-pointer inline-flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Browse All Exercises</span>
                  <ArrowRight className="w-3 h-3" />
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onSelectLanguage(lang, 'beginner')}
                    className="px-2.5 py-1 text-xs font-medium rounded-md bg-[#191e26] text-[#8c94a0] hover:text-[#f0f3f6] hover:bg-[#232936] transition-colors cursor-pointer"
                  >
                    Beginner
                  </button>
                  <button
                    onClick={() => onSelectLanguage(lang, 'easy')}
                    className="px-2.5 py-1 text-xs font-medium rounded-md bg-[#191e26] text-[#8c94a0] hover:text-[#f0f3f6] hover:bg-[#232936] transition-colors cursor-pointer"
                  >
                    Easy
                  </button>
                  <button
                    onClick={() => onSelectLanguage(lang, 'medium')}
                    className="px-2.5 py-1 text-xs font-medium rounded-md bg-[#191e26] text-[#8c94a0] hover:text-[#f0f3f6] hover:bg-[#232936] transition-colors cursor-pointer"
                  >
                    Medium
                  </button>
                  <button
                    onClick={() => onSelectLanguage(lang, 'hard')}
                    className="px-2.5 py-1 text-xs font-medium rounded-md bg-[#191e26] text-[#8c94a0] hover:text-[#f0f3f6] hover:bg-[#232936] transition-colors cursor-pointer"
                  >
                    Hard
                  </button>
                  <button
                    onClick={() => onSelectLanguage(lang)}
                    className="px-3 py-1.5 text-xs font-semibold rounded-md bg-[#b0ff38] text-[#0b0d11] hover:bg-[#9ee628] transition-colors cursor-pointer inline-flex items-center gap-1 ml-1"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Practice</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
