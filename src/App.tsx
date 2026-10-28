import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { Arena } from './components/Arena';
import { LanguagesView } from './components/LanguagesView';
import { LessonsView } from './components/LessonsView';
import { ProgressView } from './components/ProgressView';
import { ResultsModal } from './components/ResultsModal';
import { Difficulty, Language, PracticeMode, SessionResult, Snippet, UserPreferences, UserStats } from './types';
import {
  clearAllPracticeData,
  getPreferences,
  getSessionResults,
  getUserStats,
  getWeeklyActivity,
  savePreferences,
  saveSessionResult,
} from './utils/storage';
import { soundFx } from './utils/audio';
import { SNIPPETS } from './data/snippets';

export default function App() {
  // Navigation State
  const [currentView, setCurrentView] = useState<'overview' | 'practice' | 'languages' | 'lessons' | 'progress'>('overview');

  // Preferences State
  const [preferences, setPreferences] = useState<UserPreferences>(() => getPreferences());

  // Practice Arena Selected Parameters
  const [practiceLang, setPracticeLang] = useState<Language>('cpp');
  const [practiceDiff, setPracticeDiff] = useState<Difficulty>('beginner');
  const [practiceSnippetId, setPracticeSnippetId] = useState<string | undefined>(undefined);

  // Lesson view filter passing
  const [lessonFilterLang, setLessonFilterLang] = useState<Language | 'all'>('all');

  // Local Data State
  const [stats, setStats] = useState<UserStats>(() => getUserStats());
  const [sessions, setSessions] = useState<SessionResult[]>(() => getSessionResults());
  const [weeklyActivity, setWeeklyActivity] = useState(() => getWeeklyActivity());

  // Results Modal State
  const [completedResult, setCompletedResult] = useState<SessionResult | null>(null);

  // Initialize soundFx and theme on mount
  useEffect(() => {
    soundFx.setEnabled(preferences.soundEnabled);

    // Apply theme to document root
    if (preferences.theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [preferences.theme, preferences.soundEnabled]);

  const handleToggleSound = () => {
    const nextVal = !preferences.soundEnabled;
    soundFx.setEnabled(nextVal);
    const updated = savePreferences({ soundEnabled: nextVal });
    setPreferences(updated);
  };

  const handleToggleTheme = () => {
    const nextTheme = preferences.theme === 'dark' ? 'light' : 'dark';
    const updated = savePreferences({ theme: nextTheme });
    setPreferences(updated);
  };

  const handleToggleTypingMode = () => {
    const nextMode = preferences.typingMode === 'strict' ? 'free' : 'strict';
    const updated = savePreferences({ typingMode: nextMode });
    setPreferences(updated);
  };

  // Launch practice from dashboard or buttons
  const handleStartPracticing = (lang?: Language, diff?: Difficulty, snippetId?: string) => {
    if (lang) setPracticeLang(lang);
    if (diff) setPracticeDiff(diff);
    if (snippetId) setPracticeSnippetId(snippetId);
    else setPracticeSnippetId(undefined);
    setCurrentView('practice');
  };

  const handleBrowseLessonsForLang = (lang: Language) => {
    setLessonFilterLang(lang);
    setCurrentView('lessons');
  };

  const handleStartLesson = (snippet: Snippet) => {
    setPracticeLang(snippet.language);
    setPracticeDiff(snippet.difficulty);
    setPracticeSnippetId(snippet.id);
    setCurrentView('practice');
  };

  // Handle Session Completed
  const handleSessionComplete = (data: {
    snippetId: string;
    snippetTitle: string;
    language: Language;
    difficulty: Difficulty;
    mode: PracticeMode;
    grossWpm: number;
    netWpm: number;
    accuracy: number;
    correctChars: number;
    incorrectChars: number;
    totalCharsTyped: number;
    durationSeconds: number;
  }) => {
    const newSession: SessionResult = {
      id: `session_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      timestamp: Date.now(),
      ...data,
      isPersonalBest: false,
    };

    const { isPersonalBest, savedResult } = saveSessionResult(newSession);

    // Refresh state
    setStats(getUserStats());
    setSessions(getSessionResults());
    setWeeklyActivity(getWeeklyActivity());

    // Show Results Modal
    setCompletedResult(savedResult);
  };

  const handleTryAgain = () => {
    setCompletedResult(null);
    // Keep current snippet in practice arena
  };

  const handleNextInLanguage = () => {
    if (!completedResult) return;
    const currentLang = completedResult.language;
    const sameLangSnippets = SNIPPETS.filter((s) => s.language === currentLang);
    const otherSnippets = sameLangSnippets.filter((s) => s.id !== completedResult.snippetId);
    const nextSnippet =
      otherSnippets.length > 0
        ? otherSnippets[Math.floor(Math.random() * otherSnippets.length)]
        : sameLangSnippets[0];

    setPracticeSnippetId(nextSnippet.id);
    setPracticeDiff(nextSnippet.difficulty);
    setCompletedResult(null);
  };

  const handleClearData = () => {
    clearAllPracticeData();
    setStats(getUserStats());
    setSessions([]);
    setWeeklyActivity(getWeeklyActivity());
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors ${
      preferences.theme === 'light' ? 'bg-[#f7f9fb] text-[#121820]' : 'bg-[#0b0d11] text-[#f0f3f6]'
    }`}>
      {/* Top Navbar adhering to Top Bar Contract */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => {
          setCompletedResult(null);
          setCurrentView(view);
        }}
        preferences={preferences}
        onToggleSound={handleToggleSound}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Workspace with Compact Sidebar */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar
          currentView={currentView}
          onNavigate={(view) => {
            setCompletedResult(null);
            setCurrentView(view);
          }}
        />

        {/* View Content Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-full">
          {currentView === 'overview' && (
            <DashboardView
              stats={stats}
              recentSessions={sessions}
              weeklyActivity={weeklyActivity}
              onStartPracticing={handleStartPracticing}
              onExploreLanguages={() => setCurrentView('languages')}
              onBrowseLessons={() => setCurrentView('lessons')}
            />
          )}

          {currentView === 'practice' && (
            <Arena
              initialLanguage={practiceLang}
              initialDifficulty={practiceDiff}
              initialSnippetId={practiceSnippetId}
              onSessionComplete={handleSessionComplete}
              soundEnabled={preferences.soundEnabled}
              onToggleSound={handleToggleSound}
              typingMode={preferences.typingMode}
              onToggleTypingMode={handleToggleTypingMode}
            />
          )}

          {currentView === 'languages' && (
            <LanguagesView
              onSelectLanguage={(lang, diff) => handleStartPracticing(lang, diff)}
              onBrowseLessonsForLang={handleBrowseLessonsForLang}
            />
          )}

          {currentView === 'lessons' && (
            <LessonsView
              onStartLesson={handleStartLesson}
              initialLanguageFilter={lessonFilterLang}
            />
          )}

          {currentView === 'progress' && (
            <ProgressView
              stats={stats}
              sessions={sessions}
              onClearData={handleClearData}
              onNavigateToPractice={(lang) => handleStartPracticing(lang)}
            />
          )}
        </main>
      </div>

      {/* Results Summary Modal */}
      {completedResult && (
        <ResultsModal
          result={completedResult}
          onTryAgain={handleTryAgain}
          onNextSnippet={handleNextInLanguage}
          onBrowseLessons={() => {
            setCompletedResult(null);
            setCurrentView('lessons');
          }}
          onReturnDashboard={() => {
            setCompletedResult(null);
            setCurrentView('overview');
          }}
        />
      )}
    </div>
  );
}
