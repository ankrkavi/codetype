import React, { useState, useMemo } from 'react';
import {
  Play,
  Search,
  Timer,
  CheckCircle2,
  Circle,
  Dices,
  Filter,
  Layers,
  Sparkles,
  ArrowRight,
  Code2
} from 'lucide-react';
import { CodeLength, Difficulty, Exercise, Language, Snippet } from '../types';
import { SNIPPETS, LANGUAGE_META } from '../data/snippets';
import { CURRICULUM_TAXONOMY } from '../data/curriculumTaxonomy';
import { getExerciseProgressMap } from '../utils/storage';

interface LessonsViewProps {
  onStartLesson: (snippet: Snippet) => void;
  initialLanguageFilter?: Language | 'all';
}

const PLAYLISTS = [
  {
    id: 'cpp-fund',
    title: 'C++ Foundations',
    lang: 'cpp' as Language,
    topic: 'cpp-fundamentals',
    desc: 'Input, output, loops, conditionals, and primitives'
  },
  {
    id: 'cpp-stl',
    title: 'C++ STL Master',
    lang: 'cpp' as Language,
    topic: 'cpp-stl',
    desc: 'Vectors, stacks, deques, maps, and STL algorithms'
  },
  {
    id: 'cpp-dsa',
    title: 'C++ DSA & Trees',
    lang: 'cpp' as Language,
    topic: 'cpp-data-structures',
    desc: 'Linked lists, trees, BST, heaps, and DSU'
  },
  {
    id: 'java-oop',
    title: 'Java OOP Rigor',
    lang: 'java' as Language,
    topic: 'java-oop',
    desc: 'Encapsulation, inheritance, polymorphism, and exceptions'
  },
  {
    id: 'java-coll',
    title: 'Java Collections Pro',
    lang: 'java' as Language,
    topic: 'java-collections',
    desc: 'ArrayList, Deque, PriorityQueue, and Comparators'
  },
  {
    id: 'java-algo',
    title: 'Java Algorithmic Flow',
    lang: 'java' as Language,
    topic: 'java-algorithms',
    desc: 'Binary search, sliding window, backtracking, and DP'
  }
];

export const LessonsView: React.FC<LessonsViewProps> = ({
  onStartLesson,
  initialLanguageFilter = 'all',
}) => {
  const [selectedLang, setSelectedLang] = useState<Language | 'all'>(initialLanguageFilter);
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [selectedSubtopic, setSelectedSubtopic] = useState<string>('all');
  const [selectedDiff, setSelectedDiff] = useState<Difficulty | 'all'>('all');
  const [selectedLength, setSelectedLength] = useState<CodeLength | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'unpracticed'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const progressMap = useMemo(() => getExerciseProgressMap(), []);

  // Filter available topics based on selected language
  const availableTopics = useMemo(() => {
    if (selectedLang === 'all') return CURRICULUM_TAXONOMY;
    return CURRICULUM_TAXONOMY.filter((t) => t.language === selectedLang);
  }, [selectedLang]);

  // Available subtopics based on selected topic
  const availableSubtopics = useMemo(() => {
    if (selectedTopic === 'all') {
      const subtopicsSet = new Set<string>();
      availableTopics.forEach((t) => t.subtopics.forEach((s) => subtopicsSet.add(s)));
      return Array.from(subtopicsSet);
    }
    const topicObj = availableTopics.find((t) => t.id === selectedTopic);
    return topicObj ? topicObj.subtopics : [];
  }, [selectedTopic, availableTopics]);

  // Main filter engine
  const filteredSnippets = useMemo(() => {
    return SNIPPETS.filter((s) => {
      if (selectedLang !== 'all' && s.language !== selectedLang) return false;
      if (selectedTopic !== 'all' && s.mainTopic !== selectedTopic) return false;
      if (selectedSubtopic !== 'all' && s.subtopic !== selectedSubtopic) return false;
      if (selectedDiff !== 'all' && s.difficulty !== selectedDiff) return false;
      if (selectedLength !== 'all' && s.codeLength !== selectedLength) return false;

      const isCompleted = Boolean(progressMap[s.id]?.completed);
      if (statusFilter === 'completed' && !isCompleted) return false;
      if (statusFilter === 'unpracticed' && isCompleted) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = s.title.toLowerCase().includes(q);
        const matchStatement = s.statement.toLowerCase().includes(q);
        const matchSubtopic = s.subtopic.toLowerCase().includes(q);
        const matchTag = s.tags.some((t) => t.toLowerCase().includes(q));
        const matchConcept = s.concepts.some((c) => c.toLowerCase().includes(q));
        if (!matchTitle && !matchStatement && !matchSubtopic && !matchTag && !matchConcept) {
          return false;
        }
      }

      return true;
    });
  }, [
    selectedLang,
    selectedTopic,
    selectedSubtopic,
    selectedDiff,
    selectedLength,
    statusFilter,
    searchQuery,
    progressMap,
  ]);

  // Topic Completion Progress Calculation
  const totalInFilter = filteredSnippets.length;
  const completedInFilter = filteredSnippets.filter((s) => progressMap[s.id]?.completed).length;
  const completionPercentage =
    totalInFilter > 0 ? Math.round((completedInFilter / totalInFilter) * 100) : 0;

  // Random Challenge action
  const handleRandomChallenge = () => {
    if (filteredSnippets.length === 0) return;
    const randomIndex = Math.floor(Math.random() * filteredSnippets.length);
    onStartLesson(filteredSnippets[randomIndex]);
  };

  // Select Playlist
  const handleSelectPlaylist = (lang: Language, topic: string) => {
    setSelectedLang(lang);
    setSelectedTopic(topic);
    setSelectedSubtopic('all');
    setSelectedDiff('all');
  };

  const handleResetFilters = () => {
    setSelectedLang('all');
    setSelectedTopic('all');
    setSelectedSubtopic('all');
    setSelectedDiff('all');
    setSelectedLength('all');
    setStatusFilter('all');
    setSearchQuery('');
  };

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto w-full pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-[#b0ff38] mb-1">
            Curriculum Bank
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#f0f3f6]">
            C++ & Java Exercises
          </h1>
          <p className="text-sm text-[#8c94a0] mt-1 max-w-2xl">
            Explore authentic code exercises covering fundamentals, OOP, STL, Java Collections, and DSA patterns. Select any exercise to load into the Practice Arena.
          </p>
        </div>

        {/* Surprise Me Button */}
        <button
          onClick={handleRandomChallenge}
          disabled={filteredSnippets.length === 0}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-[#191e26] border border-[#2d3545] text-[#f0f3f6] hover:bg-[#232936] hover:border-[#b0ff38]/40 transition-colors cursor-pointer shrink-0 disabled:opacity-50"
        >
          <Dices className="w-4 h-4 text-[#b0ff38]" />
          <span>Surprise Challenge</span>
        </button>
      </div>

      {/* Recommended Topic Playlists Strip */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-[#8c94a0] mb-2.5">
          <Sparkles className="w-3.5 h-3.5 text-[#b0ff38]" />
          <span>Quick Topic Playlists</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {PLAYLISTS.map((pl) => {
            const isPlActive = selectedLang === pl.lang && selectedTopic === pl.topic;
            const meta = LANGUAGE_META[pl.lang];
            return (
              <button
                key={pl.id}
                onClick={() => handleSelectPlaylist(pl.lang, pl.topic)}
                className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isPlActive
                    ? 'border-[#b0ff38]/40 bg-[#b0ff38]/10 text-[#f0f3f6]'
                    : 'border-[#1f242d] bg-[#12151b] hover:bg-[#161a22] text-[#8c94a0]'
                }`}
              >
                <div>
                  <span
                    className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded font-semibold inline-block mb-1"
                    style={{
                      backgroundColor: meta.badgeBg,
                      color: meta.primaryColor,
                    }}
                  >
                    {meta.name}
                  </span>
                  <div className="text-xs font-semibold text-[#f0f3f6] truncate">
                    {pl.title}
                  </div>
                </div>
                <div className="text-[10px] text-[#647082] mt-1 line-clamp-1">
                  {pl.desc}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-[#12151b] border border-[#1f242d] flex flex-col gap-4">
        {/* Row 1: Language Tabs & Search */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Language Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#0b0d11] rounded-lg border border-[#1f242d] w-fit">
            <button
              onClick={() => {
                setSelectedLang('all');
                setSelectedTopic('all');
                setSelectedSubtopic('all');
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                selectedLang === 'all'
                  ? 'bg-[#191e26] text-[#b0ff38] border border-[#2d3545]'
                  : 'text-[#8c94a0] hover:text-[#f0f3f6]'
              }`}
            >
              All Languages
            </button>
            {(['cpp', 'java'] as Language[]).map((lang) => {
              const isSel = selectedLang === lang;
              const meta = LANGUAGE_META[lang];
              return (
                <button
                  key={lang}
                  onClick={() => {
                    setSelectedLang(lang);
                    setSelectedTopic('all');
                    setSelectedSubtopic('all');
                  }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                    isSel
                      ? 'bg-[#191e26] text-[#b0ff38] border border-[#2d3545]'
                      : 'text-[#8c94a0] hover:text-[#f0f3f6]'
                  }`}
                >
                  {meta.name}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#8c94a0] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, concepts, or tags..."
              className="w-full bg-[#0b0d11] border border-[#1f242d] rounded-lg pl-9 pr-3 py-1.5 text-xs text-[#f0f3f6] placeholder-[#647082] focus:outline-none focus:border-[#b0ff38]/50"
            />
          </div>
        </div>

        {/* Row 2: Secondary Dropdowns (Topic, Subtopic, Difficulty, Length, Status) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 pt-2 border-t border-[#1f242d]">
          {/* Topic Select */}
          <div>
            <label className="block text-[10px] uppercase font-semibold text-[#647082] mb-1">
              Main Topic
            </label>
            <select
              value={selectedTopic}
              onChange={(e) => {
                setSelectedTopic(e.target.value);
                setSelectedSubtopic('all');
              }}
              className="w-full bg-[#0b0d11] border border-[#1f242d] rounded-lg px-2.5 py-1.5 text-xs text-[#f0f3f6] focus:outline-none focus:border-[#b0ff38]/50 cursor-pointer"
            >
              <option value="all">All Topics</option>
              {availableTopics.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* Subtopic Select */}
          <div>
            <label className="block text-[10px] uppercase font-semibold text-[#647082] mb-1">
              Subtopic
            </label>
            <select
              value={selectedSubtopic}
              onChange={(e) => setSelectedSubtopic(e.target.value)}
              className="w-full bg-[#0b0d11] border border-[#1f242d] rounded-lg px-2.5 py-1.5 text-xs text-[#f0f3f6] focus:outline-none focus:border-[#b0ff38]/50 cursor-pointer"
            >
              <option value="all">All Subtopics</option>
              {availableSubtopics.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Select */}
          <div>
            <label className="block text-[10px] uppercase font-semibold text-[#647082] mb-1">
              Difficulty
            </label>
            <select
              value={selectedDiff}
              onChange={(e) => setSelectedDiff(e.target.value as Difficulty | 'all')}
              className="w-full bg-[#0b0d11] border border-[#1f242d] rounded-lg px-2.5 py-1.5 text-xs text-[#f0f3f6] focus:outline-none focus:border-[#b0ff38]/50 cursor-pointer capitalize"
            >
              <option value="all">All Difficulties</option>
              <option value="beginner">Beginner</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          {/* Code Length Select */}
          <div>
            <label className="block text-[10px] uppercase font-semibold text-[#647082] mb-1">
              Length
            </label>
            <select
              value={selectedLength}
              onChange={(e) => setSelectedLength(e.target.value as CodeLength | 'all')}
              className="w-full bg-[#0b0d11] border border-[#1f242d] rounded-lg px-2.5 py-1.5 text-xs text-[#f0f3f6] focus:outline-none focus:border-[#b0ff38]/50 cursor-pointer capitalize"
            >
              <option value="all">All Lengths</option>
              <option value="short">Short (&lt; 15 lines)</option>
              <option value="medium">Medium (15-25 lines)</option>
              <option value="long">Long (25+ lines)</option>
            </select>
          </div>

          {/* Status Select */}
          <div>
            <label className="block text-[10px] uppercase font-semibold text-[#647082] mb-1">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'completed' | 'unpracticed')}
              className="w-full bg-[#0b0d11] border border-[#1f242d] rounded-lg px-2.5 py-1.5 text-xs text-[#f0f3f6] focus:outline-none focus:border-[#b0ff38]/50 cursor-pointer"
            >
              <option value="all">All Exercises</option>
              <option value="completed">Practiced Only</option>
              <option value="unpracticed">Unpracticed Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Filter Summary & Progress Bar Strip */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#8c94a0] px-1">
        <div className="flex items-center gap-3">
          <span>
            Showing <strong className="text-[#f0f3f6]">{filteredSnippets.length}</strong> matching exercises
          </span>
          <span>·</span>
          <span>
            Practiced: <strong className="text-[#b0ff38]">{completedInFilter}</strong> of {totalInFilter} ({completionPercentage}%)
          </span>
        </div>

        {(selectedLang !== 'all' || selectedTopic !== 'all' || selectedSubtopic !== 'all' || selectedDiff !== 'all' || selectedLength !== 'all' || statusFilter !== 'all' || searchQuery) && (
          <button
            onClick={handleResetFilters}
            className="text-[11px] text-[#b0ff38] hover:underline cursor-pointer"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Empty State */}
      {filteredSnippets.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#2d3545] bg-[#0c0f14] p-10 text-center flex flex-col items-center justify-center">
          <Filter className="w-8 h-8 text-[#647082] mb-2" />
          <h3 className="text-base font-semibold text-[#f0f3f6]">No exercises match your filter criteria</h3>
          <p className="text-xs text-[#8c94a0] max-w-sm mt-1 mb-4 leading-relaxed">
            Try resetting your topic, difficulty, or search term to discover more C++ and Java exercises.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#b0ff38] text-[#0b0d11] hover:bg-[#9ee628] transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        /* Exercise Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSnippets.map((exercise) => {
            const langMeta = LANGUAGE_META[exercise.language];
            const prog = progressMap[exercise.id];
            const isCompleted = Boolean(prog?.completed);

            return (
              <div
                key={exercise.id}
                className="rounded-xl bg-[#12151b] border border-[#1f242d] p-4 flex flex-col justify-between hover:border-[#2d3545] transition-all group"
              >
                <div>
                  {/* Top Bar Badges */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="text-[10px] font-mono px-2 py-0.5 rounded font-semibold"
                        style={{
                          backgroundColor: langMeta.badgeBg,
                          color: langMeta.primaryColor,
                          border: `1px solid ${langMeta.accentBorder}`,
                        }}
                      >
                        {langMeta.name}
                      </span>
                      <span className="text-[10px] text-[#8c94a0] bg-[#191e26] px-1.5 py-0.5 rounded border border-[#1f242d] truncate max-w-[140px]">
                        {exercise.subtopic}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-[10px] text-[#8c94a0]">
                      <span className="capitalize">{exercise.difficulty}</span>
                      <span>·</span>
                      <span className="flex items-center gap-0.5">
                        <Timer className="w-3 h-3" />
                        {exercise.estimatedDuration}
                      </span>
                    </div>
                  </div>

                  {/* Title & Practiced Icon */}
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h3 className="text-sm font-semibold text-[#f0f3f6] group-hover:text-[#b0ff38] transition-colors line-clamp-1">
                      {exercise.title}
                    </h3>
                    {isCompleted ? (
                      <span title={`Practiced! Best: ${prog.bestNetWpm} WPM`} className="shrink-0 text-[#b0ff38] mt-0.5">
                        <CheckCircle2 className="w-4 h-4 fill-[#b0ff38]/20" />
                      </span>
                    ) : (
                      <span title="Not yet practiced" className="shrink-0 text-[#454e5d] mt-0.5">
                        <Circle className="w-4 h-4" />
                      </span>
                    )}
                  </div>

                  {/* Problem Statement */}
                  <p className="text-xs text-[#8c94a0] leading-relaxed mb-3 line-clamp-2">
                    {exercise.statement}
                  </p>

                  {/* Code Snapshot */}
                  <div className="rounded-md bg-[#0c0f14] border border-[#1a1f29] p-2.5 text-[11px] font-mono text-[#8c94a0] overflow-hidden max-h-24">
                    <pre className="overflow-x-hidden whitespace-pre">
                      {exercise.code.slice(0, 110)}...
                    </pre>
                  </div>
                </div>

                {/* Footer with Concepts & Action Button */}
                <div className="mt-4 pt-3 border-t border-[#1f242d] flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1 text-[10px] text-[#647082] truncate max-w-[150px]">
                    <Code2 className="w-3 h-3 shrink-0" />
                    <span className="truncate">{exercise.concepts.slice(0, 2).join(', ')}</span>
                  </div>

                  <button
                    onClick={() => onStartLesson(exercise)}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#b0ff38] text-[#0b0d11] hover:bg-[#9ee628] transition-colors cursor-pointer inline-flex items-center gap-1.5 shrink-0"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Practice</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
