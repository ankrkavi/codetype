import { ExerciseProgress, Language, SessionResult, UserPreferences, UserStats } from '../types';
import { ALL_EXERCISES } from '../data/snippets';
import { sanitizeAccuracy } from './metrics';

const STORAGE_KEYS = {
  SESSIONS: 'codetype_sessions_v1',
  PREFERENCES: 'codetype_preferences_v1',
  EXERCISE_PROGRESS: 'codetype_exercise_progress_v1',
};

const DEFAULT_PREFERENCES: UserPreferences = {
  theme: 'dark',
  soundEnabled: false,
  typingMode: 'free',
};

export function getPreferences(): UserPreferences {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
    if (!raw) return DEFAULT_PREFERENCES;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_PREFERENCES, ...parsed };
  } catch {
    return DEFAULT_PREFERENCES;
  }
}

export function savePreferences(prefs: Partial<UserPreferences>): UserPreferences {
  const current = getPreferences();
  const updated = { ...current, ...prefs };
  try {
    localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(updated));
  } catch {
    // fallback
  }
  return updated;
}

export function getSessionResults(): SessionResult[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SESSIONS);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed
        .map((s) => ({
          ...s,
          accuracy: sanitizeAccuracy(s.accuracy),
        }))
        .sort((a, b) => b.timestamp - a.timestamp);
    }
    return [];
  } catch {
    return [];
  }
}

export function getExerciseProgressMap(): Record<string, ExerciseProgress> {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.EXERCISE_PROGRESS);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (typeof parsed === 'object' && parsed !== null) {
      // Sanitize any corrupt accuracy in progress map
      const sanitizedMap: Record<string, ExerciseProgress> = {};
      Object.entries(parsed).forEach(([k, v]) => {
        if (v && typeof v === 'object') {
          sanitizedMap[k] = {
            ...(v as ExerciseProgress),
            latestAccuracy: sanitizeAccuracy((v as ExerciseProgress).latestAccuracy),
          };
        }
      });
      return sanitizedMap;
    }
    return {};
  } catch {
    return {};
  }
}

export function saveExerciseProgress(
  exerciseId: string,
  netWpm: number,
  accuracy: number
): ExerciseProgress {
  const map = getExerciseProgressMap();
  const existing = map[exerciseId] || {
    exerciseId,
    completed: false,
    bestNetWpm: 0,
    latestAccuracy: 0,
    attempts: 0,
    lastPracticedTimestamp: 0,
  };

  const updated: ExerciseProgress = {
    exerciseId,
    completed: true,
    bestNetWpm: Math.max(existing.bestNetWpm, netWpm),
    latestAccuracy: sanitizeAccuracy(accuracy),
    attempts: existing.attempts + 1,
    lastPracticedTimestamp: Date.now(),
  };

  map[exerciseId] = updated;

  try {
    localStorage.setItem(STORAGE_KEYS.EXERCISE_PROGRESS, JSON.stringify(map));
  } catch {
    // ignore
  }

  return updated;
}

export function isExerciseCompleted(exerciseId: string): boolean {
  const map = getExerciseProgressMap();
  return Boolean(map[exerciseId]?.completed);
}

export function saveSessionResult(result: SessionResult): {
  isPersonalBest: boolean;
  savedResult: SessionResult;
} {
  const sessions = getSessionResults();
  
  // Calculate if personal best for this language
  const prevSessionsForLang = sessions.filter(s => s.language === result.language);
  const bestPrevWpm = prevSessionsForLang.reduce((max, s) => Math.max(max, s.netWpm), 0);
  const isPersonalBest = result.netWpm > bestPrevWpm && result.netWpm > 0;

  const savedResult: SessionResult = {
    ...result,
    accuracy: sanitizeAccuracy(result.accuracy),
    isPersonalBest
  };

  const updatedSessions = [savedResult, ...sessions];
  try {
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(updatedSessions));
  } catch {
    // quota limits fallback
  }

  // Update exercise specific progress
  if (result.snippetId) {
    saveExerciseProgress(result.snippetId, result.netWpm, savedResult.accuracy);
  }

  return { isPersonalBest, savedResult };
}

export function getUserStats(): UserStats {
  const sessions = getSessionResults();
  const progressMap = getExerciseProgressMap();

  const completedExercisesCount: Record<Language, number> = {
    cpp: 0,
    java: 0,
  };

  ALL_EXERCISES.forEach((ex) => {
    if (progressMap[ex.id]?.completed) {
      completedExercisesCount[ex.language]++;
    }
  });

  if (sessions.length === 0) {
    return {
      totalSessions: 0,
      totalTimePracticedSeconds: 0,
      bestNetWpm: 0,
      avgNetWpm: 0,
      avgAccuracy: 0,
      sessionsByLanguage: {
        cpp: 0,
        java: 0
      },
      bestWpmByLanguage: {
        cpp: 0,
        java: 0
      },
      completedExercisesCount
    };
  }

  const totalSessions = sessions.length;
  const totalTimePracticedSeconds = sessions.reduce((acc, s) => acc + (s.durationSeconds || 0), 0);
  const bestNetWpm = Math.max(...sessions.map(s => s.netWpm), 0);
  const avgNetWpm = Math.round(sessions.reduce((acc, s) => acc + s.netWpm, 0) / totalSessions);
  const avgAccuracy = sanitizeAccuracy(
    Math.round((sessions.reduce((acc, s) => acc + sanitizeAccuracy(s.accuracy), 0) / totalSessions) * 10) / 10
  );

  const sessionsByLanguage: Record<Language, number> = {
    cpp: 0,
    java: 0
  };

  const bestWpmByLanguage: Record<Language, number> = {
    cpp: 0,
    java: 0
  };

  sessions.forEach(s => {
    if (sessionsByLanguage[s.language] !== undefined) {
      sessionsByLanguage[s.language]++;
      if (s.netWpm > bestWpmByLanguage[s.language]) {
        bestWpmByLanguage[s.language] = s.netWpm;
      }
    }
  });

  return {
    totalSessions,
    totalTimePracticedSeconds,
    bestNetWpm,
    avgNetWpm,
    avgAccuracy,
    sessionsByLanguage,
    bestWpmByLanguage,
    completedExercisesCount
  };
}

export interface DayActivity {
  dayName: string;
  dateStr: string;
  sessionCount: number;
  totalChars: number;
}

export function getWeeklyActivity(): DayActivity[] {
  const sessions = getSessionResults();
  const days: DayActivity[] = [];
  const now = new Date();

  // Last 7 days in order Mon-Sun or ending today
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });

    const daySessions = sessions.filter(s => {
      const sessionDate = new Date(s.timestamp).toISOString().split('T')[0];
      return sessionDate === dateStr;
    });

    const sessionCount = daySessions.length;
    const totalChars = daySessions.reduce((acc, s) => acc + (s.totalCharsTyped || 0), 0);

    days.push({
      dayName,
      dateStr,
      sessionCount,
      totalChars
    });
  }

  return days;
}

export function clearAllPracticeData() {
  localStorage.removeItem(STORAGE_KEYS.SESSIONS);
  localStorage.removeItem(STORAGE_KEYS.EXERCISE_PROGRESS);
}
