export type Language = 'cpp' | 'java';

export type Difficulty = 'beginner' | 'easy' | 'medium' | 'hard';

export type CodeLength = 'short' | 'medium' | 'long';

export type PracticeMode = 'snippet' | 'time30' | 'time60' | 'time120';

export type TypingMode = 'strict' | 'free';

export interface Exercise {
  id: string;
  title: string;
  language: Language;
  mainTopic: string;
  subtopic: string;
  difficulty: Difficulty;
  statement: string;
  concepts: string[];
  code: string;
  estimatedDuration: string;
  codeLength: CodeLength;
  prerequisites?: string[];
  tags: string[];
}

// Backward compatibility alias for Snippet
export interface Snippet extends Exercise {
  concept: string; // mapped to statement
}

export interface SessionResult {
  id: string;
  timestamp: number;
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
  isPersonalBest: boolean;
}

export interface ExerciseProgress {
  exerciseId: string;
  completed: boolean;
  bestNetWpm: number;
  latestAccuracy: number;
  attempts: number;
  lastPracticedTimestamp: number;
}

export interface UserStats {
  totalSessions: number;
  totalTimePracticedSeconds: number;
  bestNetWpm: number;
  avgNetWpm: number;
  avgAccuracy: number;
  sessionsByLanguage: Record<Language, number>;
  bestWpmByLanguage: Record<Language, number>;
  completedExercisesCount: Record<Language, number>;
}

export interface UserPreferences {
  theme: 'dark' | 'light';
  soundEnabled: boolean;
  typingMode: TypingMode;
}

export interface CurriculumTopic {
  id: string;
  name: string;
  language: Language;
  description: string;
  subtopics: string[];
}
