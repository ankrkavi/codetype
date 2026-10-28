import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  CheckCircle2,
  AlertCircle,
  Timer,
  Zap,
  Gauge,
  SlidersHorizontal,
  Volume2,
  VolumeX,
  Keyboard,
  Info
} from 'lucide-react';
import { Difficulty, Language, PracticeMode, Snippet, TypingMode } from '../types';
import { SNIPPETS, LANGUAGE_META } from '../data/snippets';
import { tokenizeCode, CodeCharToken } from '../utils/syntaxHighlight';
import { soundFx } from '../utils/audio';

interface ArenaProps {
  initialLanguage?: Language;
  initialDifficulty?: Difficulty;
  initialSnippetId?: string;
  onSessionComplete: (results: {
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
  }) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  typingMode: TypingMode;
  onToggleTypingMode: () => void;
}

export const Arena: React.FC<ArenaProps> = ({
  initialLanguage = 'cpp',
  initialDifficulty = 'beginner',
  initialSnippetId,
  onSessionComplete,
  soundEnabled,
  onToggleSound,
  typingMode,
  onToggleTypingMode,
}) => {
  // Filters & Selected Snippet
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(initialLanguage);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>(initialDifficulty);
  const [practiceMode, setPracticeMode] = useState<PracticeMode>('snippet');
  const [currentSnippet, setCurrentSnippet] = useState<Snippet>(() => {
    if (initialSnippetId) {
      const found = SNIPPETS.find((s) => s.id === initialSnippetId);
      if (found) return found;
    }
    return (
      SNIPPETS.find((s) => s.language === initialLanguage && s.difficulty === initialDifficulty) ||
      SNIPPETS[0]
    );
  });

  // Typing Engine State
  const [typedText, setTypedText] = useState<string>('');
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [totalKeystrokes, setTotalKeystrokes] = useState<number>(0);
  const [correctKeystrokes, setCorrectKeystrokes] = useState<number>(0);
  const [errorKeystrokes, setErrorKeystrokes] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Time limit for timed modes
  const timeLimitSeconds =
    practiceMode === 'time30' ? 30 : practiceMode === 'time60' ? 60 : practiceMode === 'time120' ? 120 : 0;

  // Refs
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const activeCharRef = useRef<HTMLSpanElement>(null);
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const pausedTimeRef = useRef<number>(0);

  // Synchronize when initialSnippetId or filters change from parent
  useEffect(() => {
    if (initialSnippetId) {
      const found = SNIPPETS.find((s) => s.id === initialSnippetId);
      if (found) {
        setSelectedLanguage(found.language);
        setSelectedDifficulty(found.difficulty);
        setCurrentSnippet(found);
        resetSession(found);
      }
    }
  }, [initialSnippetId]);

  // Tokenize the snippet code
  const tokens: CodeCharToken[] = React.useMemo(() => {
    return tokenizeCode(currentSnippet.code, currentSnippet.language);
  }, [currentSnippet.code, currentSnippet.language]);

  const targetCode = currentSnippet.code;

  // Reset Session
  const resetSession = useCallback(
    (newSnippet?: Snippet) => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      startTimeRef.current = null;
      pausedTimeRef.current = 0;
      setTypedText('');
      setIsActive(false);
      setIsPaused(false);
      setElapsedSeconds(0);
      setTotalKeystrokes(0);
      setCorrectKeystrokes(0);
      setErrorKeystrokes(0);
      setIsCompleted(false);

      if (newSnippet) {
        setCurrentSnippet(newSnippet);
      }

      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    },
    []
  );

  // Handle switching language
  const handleLanguageChange = (lang: Language) => {
    setSelectedLanguage(lang);
    const available = SNIPPETS.filter((s) => s.language === lang && s.difficulty === selectedDifficulty);
    const nextSnippet = available.length > 0 ? available[0] : SNIPPETS.find((s) => s.language === lang) || SNIPPETS[0];
    setCurrentSnippet(nextSnippet);
    resetSession(nextSnippet);
  };

  // Handle switching difficulty
  const handleDifficultyChange = (diff: Difficulty) => {
    setSelectedDifficulty(diff);
    const available = SNIPPETS.filter((s) => s.language === selectedLanguage && s.difficulty === diff);
    const nextSnippet = available.length > 0 ? available[0] : SNIPPETS[0];
    setCurrentSnippet(nextSnippet);
    resetSession(nextSnippet);
  };

  // Cycle to next snippet without immediate repetition
  const handleNextSnippet = () => {
    const matching = SNIPPETS.filter(
      (s) => s.language === selectedLanguage && s.difficulty === selectedDifficulty
    );
    if (matching.length <= 1) {
      resetSession();
      return;
    }
    const otherSnippets = matching.filter((s) => s.id !== currentSnippet.id);
    const randomIndex = Math.floor(Math.random() * otherSnippets.length);
    const nextSnippet = otherSnippets[randomIndex];
    resetSession(nextSnippet);
  };

  // Complete Session Handler
  const handleComplete = useCallback(() => {
    if (isCompleted) return;
    setIsCompleted(true);
    setIsActive(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    soundFx.playSuccess();

    const duration = Math.max(1, elapsedSeconds);
    const minutes = duration / 60;
    const typedLength = typedText.length;

    // Calculate uncorrected errors
    let uncorrectedErrors = 0;
    for (let i = 0; i < typedLength; i++) {
      if (typedText[i] !== targetCode[i]) {
        uncorrectedErrors++;
      }
    }

    // Gross WPM = (total characters typed / 5) / elapsed minutes
    const grossWpm = Math.round(typedLength / 5 / minutes);

    // Net WPM = gross WPM - (uncorrected errors / elapsed minutes)
    const netWpm = Math.max(0, Math.round(grossWpm - uncorrectedErrors / minutes));

    // Accuracy = (correct keystrokes / total keystrokes) * 100
    const accuracy =
      totalKeystrokes > 0
        ? Math.round((correctKeystrokes / totalKeystrokes) * 1000) / 10
        : 100;

    const correctChars = typedLength - uncorrectedErrors;

    onSessionComplete({
      snippetId: currentSnippet.id,
      snippetTitle: currentSnippet.title,
      language: currentSnippet.language,
      difficulty: currentSnippet.difficulty,
      mode: practiceMode,
      grossWpm,
      netWpm,
      accuracy,
      correctChars,
      incorrectChars: uncorrectedErrors,
      totalCharsTyped: typedLength,
      durationSeconds: duration,
    });
  }, [
    isCompleted,
    elapsedSeconds,
    typedText,
    targetCode,
    totalKeystrokes,
    correctKeystrokes,
    currentSnippet,
    practiceMode,
    onSessionComplete,
  ]);

  // Master Timer Tick
  useEffect(() => {
    if (isActive && !isPaused && !isCompleted) {
      if (!startTimeRef.current) {
        startTimeRef.current = Date.now() - pausedTimeRef.current * 1000;
      }

      timerRef.current = window.setInterval(() => {
        const now = Date.now();
        const elapsed = Math.floor((now - (startTimeRef.current || now)) / 1000);
        setElapsedSeconds(elapsed);

        // Check if timed mode expired
        if (timeLimitSeconds > 0 && elapsed >= timeLimitSeconds) {
          handleComplete();
        }
      }, 250);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, isPaused, isCompleted, timeLimitSeconds, handleComplete]);

  // Check Snippet completion
  useEffect(() => {
    if (isActive && !isCompleted && typedText.length >= targetCode.length) {
      // In strict mode, verify no errors
      if (typingMode === 'strict') {
        const hasError = typedText.split('').some((c, i) => c !== targetCode[i]);
        if (!hasError) {
          handleComplete();
        }
      } else {
        handleComplete();
      }
    }
  }, [typedText, targetCode, isActive, isCompleted, typingMode, handleComplete]);

  // Keyboard Event Handling
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Global restart shortcuts
    if ((e.key === 'Enter' && e.ctrlKey) || (e.key === 'Enter' && e.metaKey) || e.key === 'Escape') {
      e.preventDefault();
      resetSession();
      return;
    }

    // Toggle pause with Ctrl+P
    if (e.ctrlKey && e.key === 'p') {
      e.preventDefault();
      togglePause();
      return;
    }

    if (isCompleted || isPaused) return;

    // Start timer on first keystroke
    if (!isActive) {
      setIsActive(true);
      startTimeRef.current = Date.now();
    }

    const currentIndex = typedText.length;
    const expectedChar = targetCode[currentIndex];

    // Handle Tab
    if (e.key === 'Tab') {
      e.preventDefault();
      setTotalKeystrokes((k) => k + 1);

      // Check how many spaces are expected at this spot if indented
      const restExpected = targetCode.slice(currentIndex);
      let spacesToInsert = '  ';
      if (restExpected.startsWith('    ')) {
        spacesToInsert = '    ';
      } else if (restExpected.startsWith('  ')) {
        spacesToInsert = '  ';
      } else if (expectedChar === '\t') {
        spacesToInsert = '\t';
      }

      // Check matching
      const matches = targetCode.slice(currentIndex, currentIndex + spacesToInsert.length) === spacesToInsert;
      if (matches) {
        setCorrectKeystrokes((k) => k + spacesToInsert.length);
        soundFx.playKeyClick();
      } else {
        setErrorKeystrokes((k) => k + spacesToInsert.length);
        soundFx.playError();
      }

      setTypedText((prev) => prev + spacesToInsert);
      return;
    }

    // Handle Backspace
    if (e.key === 'Backspace') {
      e.preventDefault();
      if (typedText.length > 0) {
        setTypedText((prev) => prev.slice(0, -1));
        soundFx.playKeyClick();
      }
      return;
    }

    // Handle Enter
    if (e.key === 'Enter') {
      e.preventDefault();
      setTotalKeystrokes((k) => k + 1);
      const isCorrect = expectedChar === '\n';
      if (isCorrect) {
        setCorrectKeystrokes((k) => k + 1);
        soundFx.playKeyClick();
      } else {
        setErrorKeystrokes((k) => k + 1);
        soundFx.playError();
      }

      if (typingMode === 'strict' && !isCorrect) {
        // In strict mode, prevent advancing if wrong
        return;
      }

      // Auto-indent helper: if next line in target starts with spaces, auto-advance matching leading spaces
      let nextInput = typedText + '\n';
      const targetAfterNewline = targetCode.slice(nextInput.length);
      const leadingSpacesMatch = targetAfterNewline.match(/^[ ]+/);
      if (leadingSpacesMatch && leadingSpacesMatch[0]) {
        nextInput += leadingSpacesMatch[0];
        setCorrectKeystrokes((k) => k + leadingSpacesMatch[0].length);
      }

      setTypedText(nextInput);
      return;
    }

    // Regular single character keystroke
    if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
      e.preventDefault();
      setTotalKeystrokes((k) => k + 1);

      const isCorrect = e.key === expectedChar;

      if (isCorrect) {
        setCorrectKeystrokes((k) => k + 1);
        soundFx.playKeyClick();
      } else {
        setErrorKeystrokes((k) => k + 1);
        soundFx.playError();
      }

      // In strict mode, if incorrect, cannot advance past error until corrected
      if (typingMode === 'strict' && !isCorrect) {
        return;
      }

      setTypedText((prev) => prev + e.key);
    }
  };

  // Toggle Pause
  const togglePause = () => {
    if (!isActive || isCompleted) return;
    if (isPaused) {
      // Resume
      startTimeRef.current = Date.now() - pausedTimeRef.current * 1000;
      setIsPaused(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      // Pause
      pausedTimeRef.current = elapsedSeconds;
      setIsPaused(true);
    }
  };

  // Auto-scroll active character into view
  useEffect(() => {
    if (activeCharRef.current && editorContainerRef.current) {
      const container = editorContainerRef.current;
      const charEl = activeCharRef.current;
      const charTop = charEl.offsetTop;
      const containerTop = container.scrollTop;
      const containerHeight = container.clientHeight;

      if (charTop < containerTop + 50 || charTop > containerTop + containerHeight - 80) {
        container.scrollTo({
          top: Math.max(0, charTop - 100),
          behavior: 'smooth',
        });
      }
    }
  }, [typedText.length]);

  // Real-time metrics calculations
  const minutes = Math.max(elapsedSeconds, 1) / 60;
  const typedLength = typedText.length;
  let currentUncorrectedErrors = 0;
  for (let i = 0; i < typedLength; i++) {
    if (typedText[i] !== targetCode[i]) {
      currentUncorrectedErrors++;
    }
  }

  const liveGrossWpm =
    isActive && elapsedSeconds > 0 ? Math.round(typedLength / 5 / minutes) : 0;
  const liveNetWpm =
    isActive && elapsedSeconds > 0
      ? Math.max(0, Math.round(liveGrossWpm - currentUncorrectedErrors / minutes))
      : 0;
  const liveAccuracy =
    totalKeystrokes > 0
      ? Math.round((correctKeystrokes / totalKeystrokes) * 1000) / 10
      : 100;
  const progressPercent = Math.min(
    100,
    Math.round((typedLength / Math.max(1, targetCode.length)) * 100)
  );

  const displayTime =
    timeLimitSeconds > 0
      ? Math.max(0, timeLimitSeconds - elapsedSeconds)
      : elapsedSeconds;

  const currentLangMeta = LANGUAGE_META[selectedLanguage];

  return (
    <div className="flex flex-col gap-5 max-w-6xl mx-auto w-full pb-10">
      {/* Header Controls Bar */}
      <div className="p-4 rounded-xl bg-[#12151b] border border-[#1f242d] flex flex-wrap items-center justify-between gap-4">
        {/* Language Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#0b0d11] rounded-lg border border-[#1f242d]">
          {(['cpp', 'java'] as Language[]).map((lang) => {
            const isSel = selectedLanguage === lang;
            const meta = LANGUAGE_META[lang];
            return (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  isSel
                    ? 'bg-[#191e26] text-[#b0ff38] border border-[#2d3545] shadow-xs'
                    : 'text-[#8c94a0] hover:text-[#f0f3f6]'
                }`}
              >
                {meta.name}
              </button>
            );
          })}
        </div>

        {/* Difficulty Tabs */}
        <div className="flex items-center gap-1 p-1 bg-[#0b0d11] rounded-lg border border-[#1f242d]">
          {(['beginner', 'easy', 'medium', 'hard'] as Difficulty[]).map((diff) => {
            const isSel = selectedDifficulty === diff;
            return (
              <button
                key={diff}
                onClick={() => handleDifficultyChange(diff)}
                className={`px-3 py-1.5 text-xs capitalize font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  isSel
                    ? 'bg-[#191e26] text-[#f0f3f6] border border-[#2d3545]'
                    : 'text-[#8c94a0] hover:text-[#f0f3f6]'
                }`}
              >
                {diff}
              </button>
            );
          })}
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-1 p-1 bg-[#0b0d11] rounded-lg border border-[#1f242d]">
          <button
            onClick={() => {
              setPracticeMode('snippet');
              resetSession();
            }}
            className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              practiceMode === 'snippet'
                ? 'bg-[#191e26] text-[#b0ff38] border border-[#2d3545]'
                : 'text-[#8c94a0] hover:text-[#f0f3f6]'
            }`}
          >
            Snippet End
          </button>
          <button
            onClick={() => {
              setPracticeMode('time30');
              resetSession();
            }}
            className={`px-2.5 py-1.5 text-xs font-mono font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              practiceMode === 'time30'
                ? 'bg-[#191e26] text-[#b0ff38] border border-[#2d3545]'
                : 'text-[#8c94a0] hover:text-[#f0f3f6]'
            }`}
          >
            30s
          </button>
          <button
            onClick={() => {
              setPracticeMode('time60');
              resetSession();
            }}
            className={`px-2.5 py-1.5 text-xs font-mono font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              practiceMode === 'time60'
                ? 'bg-[#191e26] text-[#b0ff38] border border-[#2d3545]'
                : 'text-[#8c94a0] hover:text-[#f0f3f6]'
            }`}
          >
            60s
          </button>
          <button
            onClick={() => {
              setPracticeMode('time120');
              resetSession();
            }}
            className={`px-2.5 py-1.5 text-xs font-mono font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              practiceMode === 'time120'
                ? 'bg-[#191e26] text-[#b0ff38] border border-[#2d3545]'
                : 'text-[#8c94a0] hover:text-[#f0f3f6]'
            }`}
          >
            120s
          </button>
        </div>

        {/* Secondary Toggles & Actions */}
        <div className="flex items-center gap-2">
          {/* Strict vs Free Mode */}
          <button
            onClick={onToggleTypingMode}
            title={typingMode === 'strict' ? 'Strict Mode: Must fix mistakes before continuing' : 'Free Mode: Normal editing with backspace'}
            className={`px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer flex items-center gap-1.5 ${
              typingMode === 'strict'
                ? 'border-amber-500/40 bg-amber-500/10 text-amber-400'
                : 'border-[#1f242d] bg-[#0b0d11] text-[#8c94a0] hover:text-[#f0f3f6]'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="capitalize">{typingMode} Mode</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            title="Audio feedback"
            className={`p-2 rounded-lg border transition-colors cursor-pointer ${
              soundEnabled
                ? 'border-[#b0ff38]/40 bg-[#b0ff38]/10 text-[#b0ff38]'
                : 'border-[#1f242d] bg-[#0b0d11] text-[#8c94a0] hover:text-[#f0f3f6]'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* Pause / Resume */}
          {isActive && !isCompleted && (
            <button
              onClick={togglePause}
              title={isPaused ? 'Resume typing (Ctrl+P)' : 'Pause typing (Ctrl+P)'}
              className="p-2 rounded-lg border border-[#1f242d] bg-[#0b0d11] text-[#8c94a0] hover:text-[#f0f3f6] transition-colors cursor-pointer"
            >
              {isPaused ? <Play className="w-3.5 h-3.5 text-[#b0ff38]" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
          )}

          {/* Next snippet button */}
          <button
            onClick={handleNextSnippet}
            title="Next snippet challenge"
            className="p-2 rounded-lg border border-[#1f242d] bg-[#0b0d11] text-[#8c94a0] hover:text-[#f0f3f6] hover:border-[#2d3545] transition-colors cursor-pointer"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>

          {/* Restart Button */}
          <button
            onClick={() => resetSession()}
            title="Restart session (Esc)"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-[#1f242d] bg-[#0b0d11] text-[#8c94a0] hover:text-[#f0f3f6] hover:border-[#2d3545] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Live Telemetry KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Net WPM */}
        <div className="p-3.5 rounded-xl bg-[#12151b] border border-[#1f242d]">
          <div className="flex items-center gap-1.5 text-[#8c94a0] text-xs mb-1">
            <Zap className="w-3.5 h-3.5 text-[#b0ff38]" />
            <span>Net WPM</span>
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-[#f0f3f6]">
            {liveNetWpm}
          </div>
        </div>

        {/* Gross WPM */}
        <div className="p-3.5 rounded-xl bg-[#12151b] border border-[#1f242d]">
          <div className="flex items-center gap-1.5 text-[#8c94a0] text-xs mb-1">
            <Gauge className="w-3.5 h-3.5 text-sky-400" />
            <span>Gross WPM</span>
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-[#f0f3f6]">
            {liveGrossWpm}
          </div>
        </div>

        {/* Accuracy */}
        <div className="p-3.5 rounded-xl bg-[#12151b] border border-[#1f242d]">
          <div className="flex items-center gap-1.5 text-[#8c94a0] text-xs mb-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Accuracy</span>
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-[#f0f3f6]">
            {liveAccuracy}
            <span className="text-sm font-normal text-[#8c94a0] ml-0.5">%</span>
          </div>
        </div>

        {/* Time */}
        <div className="p-3.5 rounded-xl bg-[#12151b] border border-[#1f242d]">
          <div className="flex items-center gap-1.5 text-[#8c94a0] text-xs mb-1">
            <Timer className="w-3.5 h-3.5 text-amber-400" />
            <span>{timeLimitSeconds > 0 ? 'Remaining' : 'Elapsed'}</span>
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-[#f0f3f6]">
            {displayTime}s
          </div>
        </div>

        {/* Characters Correct / Total */}
        <div className="p-3.5 rounded-xl bg-[#12151b] border border-[#1f242d]">
          <div className="flex items-center gap-1.5 text-[#8c94a0] text-xs mb-1">
            <Keyboard className="w-3.5 h-3.5 text-indigo-400" />
            <span>Chars</span>
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-[#f0f3f6]">
            {typedLength}
            <span className="text-sm font-normal text-[#647082]">/{targetCode.length}</span>
          </div>
        </div>

        {/* Errors */}
        <div className="p-3.5 rounded-xl bg-[#12151b] border border-[#1f242d]">
          <div className="flex items-center gap-1.5 text-[#8c94a0] text-xs mb-1">
            <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
            <span>Errors</span>
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-[#f0f3f6]">
            {currentUncorrectedErrors}
          </div>
        </div>
      </div>

      {/* Snippet Header Information */}
      <div className="flex items-center justify-between text-xs text-[#8c94a0] px-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[#f0f3f6] text-sm">{currentSnippet.title}</span>
          <span>·</span>
          <span>{currentLangMeta.name}</span>
          <span>·</span>
          <span className="capitalize">{currentSnippet.difficulty}</span>
          <span>·</span>
          <span>{currentSnippet.concept}</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[11px] text-[#647082] font-mono">
          <span>Tab+Enter / Esc to restart</span>
        </div>
      </div>

      {/* Code Challenge Panel & Synchronized Editor */}
      <div
        className="relative rounded-xl border border-[#1f242d] bg-[#0c0f14] shadow-lg overflow-hidden group focus-within:border-[#b0ff38]/50 focus-within:ring-1 focus-within:ring-[#b0ff38]/20 transition-all cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Top Window Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#13171e] border-b border-[#1f242d] text-xs select-none">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#2d3545]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#2d3545]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#2d3545]" />
            </div>
            <span className="text-[#8c94a0] font-mono text-[11px] ml-2">
              {currentSnippet.title.toLowerCase().replace(/\s+/g, '_')}{currentLangMeta.fileExt}
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-[#8c94a0]">
            <span>{currentSnippet.estimatedDuration} est.</span>
            <span>UTF-8</span>
          </div>
        </div>

        {/* Progress Bar Line */}
        <div className="h-0.5 w-full bg-[#191e26]">
          <div
            className="h-full bg-[#b0ff38] transition-all duration-150 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Hidden Accessible Textarea that captures all real keyboard input */}
        <textarea
          ref={inputRef}
          value=""
          onChange={() => {}}
          onKeyDown={handleKeyDown}
          className="absolute -top-9999px -left-9999px opacity-0 pointer-events-none"
          autoFocus
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          aria-label="Code typing input area"
        />

        {/* Pause Overlay */}
        {isPaused && (
          <div className="absolute inset-0 z-30 bg-[#0c0f14]/80 backdrop-blur-xs flex flex-col items-center justify-center gap-3">
            <div className="text-base font-semibold text-[#f0f3f6]">Practice Paused</div>
            <p className="text-xs text-[#8c94a0]">Elapsed time accumulation is frozen</p>
            <button
              onClick={togglePause}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#b0ff38] text-[#0b0d11] hover:bg-[#9ee628] transition-colors cursor-pointer"
            >
              Resume Practice
            </button>
          </div>
        )}

        {/* Code Renderer Container with Line Numbers */}
        <div
          ref={editorContainerRef}
          className="p-5 font-mono text-sm leading-relaxed overflow-x-auto max-h-[460px] overflow-y-auto select-none"
        >
          {(() => {
            // Group tokens into lines
            const lines: CodeCharToken[][] = [];
            let currentLineTokens: CodeCharToken[] = [];

            tokens.forEach((token) => {
              if (token.char === '\n') {
                lines.push(currentLineTokens);
                currentLineTokens = [];
              } else {
                currentLineTokens.push(token);
              }
            });
            if (currentLineTokens.length > 0) {
              lines.push(currentLineTokens);
            }

            return (
              <div className="table w-full border-collapse">
                {lines.map((lineTokens, lineIndex) => {
                  const lineNum = lineIndex + 1;
                  const hasActiveCharInLine = lineTokens.some((t) => t.index === typedText.length);

                  return (
                    <div
                      key={lineNum}
                      className={`table-row transition-colors ${
                        hasActiveCharInLine ? 'bg-[#191e26]/30' : ''
                      }`}
                    >
                      {/* Line Number Gutter */}
                      <div className="table-cell select-none pr-5 text-right text-xs text-[#454e5d] w-8 tabular-nums align-top">
                        {lineNum}
                      </div>

                      {/* Line Characters */}
                      <div className="table-cell whitespace-pre font-mono">
                        {lineTokens.length === 0 ? (
                          <span className="opacity-0">{' '}</span>
                        ) : (
                          lineTokens.map((t) => {
                            const isTyped = t.index < typedText.length;
                            const isCurrent = t.index === typedText.length;
                            const userChar = isTyped ? typedText[t.index] : undefined;
                            const isCorrect = isTyped && userChar === t.char;
                            const isIncorrect = isTyped && !isCorrect;

                            // Token syntax color styling
                            let syntaxColor = '#8c94a0'; // default
                            if (t.tokenType === 'keyword') syntaxColor = '#c084fc'; // purple
                            else if (t.tokenType === 'string') syntaxColor = '#4ade80'; // soft green
                            else if (t.tokenType === 'number') syntaxColor = '#fb923c'; // orange
                            else if (t.tokenType === 'comment') syntaxColor = '#647082'; // muted slate
                            else if (t.tokenType === 'operator') syntaxColor = '#38bdf8'; // sky
                            else if (t.tokenType === 'type') syntaxColor = '#38bdf8'; // sky/cyan

                            if (isCorrect) {
                              return (
                                <span
                                  key={t.index}
                                  className="text-[#f0f3f6] font-medium"
                                >
                                  {t.char}
                                </span>
                              );
                            }

                            if (isIncorrect) {
                              return (
                                <span
                                  key={t.index}
                                  className="bg-rose-500/25 text-rose-300 underline decoration-rose-500 rounded-xs"
                                  title={`Expected: '${t.char === ' ' ? 'space' : t.char}', typed: '${userChar === ' ' ? 'space' : userChar}'`}
                                >
                                  {t.char}
                                </span>
                              );
                            }

                            if (isCurrent) {
                              return (
                                <span
                                  key={t.index}
                                  ref={activeCharRef}
                                  className="relative text-[#e2e8f0] font-semibold bg-[#b0ff38]/15 rounded-xs"
                                >
                                  {/* Blinking Caret Indicator */}
                                  <span className="absolute -left-0.5 top-0 bottom-0 w-[2.5px] bg-[#b0ff38] animate-pulse" />
                                  {t.char}
                                </span>
                              );
                            }

                            // Pending character
                            return (
                              <span
                                key={t.index}
                                style={{ color: syntaxColor }}
                                className="opacity-75"
                              >
                                {t.char}
                              </span>
                            );
                          })
                        )}
                        {/* Caret if at very end of line */}
                        {lineTokens.length > 0 &&
                          lineTokens[lineTokens.length - 1].index + 1 === typedText.length && (
                            <span
                              ref={activeCharRef}
                              className="inline-block w-[2px] h-4 bg-[#b0ff38] align-middle ml-0.5 animate-pulse"
                            />
                          )}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </div>

        {/* Bottom Focus Hint */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-[#1f242d] bg-[#0f1217] text-[11px] text-[#647082]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#b0ff38]/80" />
            <span>Editor active. Click anywhere to re-focus.</span>
          </div>
          <div className="flex items-center gap-3">
            <span>Spaces: 2/4 preserve indent</span>
            <span>Backspace supported</span>
          </div>
        </div>
      </div>

      {/* Concept Explanation Card */}
      <div className="p-4 rounded-xl bg-[#12151b] border border-[#1f242d] flex items-start gap-3">
        <Info className="w-4 h-4 text-[#b0ff38] shrink-0 mt-0.5" />
        <div className="text-xs">
          <div className="font-semibold text-[#f0f3f6] mb-0.5">
            Focus: {currentSnippet.title}
          </div>
          <p className="text-[#8c94a0] leading-relaxed">
            {currentSnippet.concept}. Practice maintaining fluid typing velocity through brackets, operators, and indentation without stopping your train of thought.
          </p>
        </div>
      </div>
    </div>
  );
};
