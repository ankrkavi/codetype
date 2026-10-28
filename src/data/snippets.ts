import { Exercise, Language, Snippet } from '../types';
import { CPP_EXERCISES } from './cppExercises';
import { JAVA_EXERCISES } from './javaExercises';

export const ALL_EXERCISES: Exercise[] = [
  ...CPP_EXERCISES,
  ...JAVA_EXERCISES,
];

// Map Exercise to Snippet format for 100% backward compatibility with Arena
export const SNIPPETS: Snippet[] = ALL_EXERCISES.map((ex) => ({
  ...ex,
  concept: ex.statement,
}));

export const LANGUAGE_META = {
  cpp: {
    id: 'cpp',
    name: 'C++',
    fileExt: '.cpp',
    tagline: 'Templates, pointers, memory patterns, and STL structures',
    description: 'Sharpen speed on angle brackets, colons, arrows, and standard headers.',
    primaryColor: '#818cf8', // indigo
    badgeBg: 'rgba(129, 140, 248, 0.12)',
    accentBorder: 'rgba(129, 140, 248, 0.3)'
  },
  java: {
    id: 'java',
    name: 'Java',
    fileExt: '.java',
    tagline: 'Object-oriented rigor, streams, generics, and class hierarchies',
    description: 'Practice heavy typing with braces, semicolons, public static void, and streams.',
    primaryColor: '#fb923c', // orange
    badgeBg: 'rgba(251, 146, 60, 0.12)',
    accentBorder: 'rgba(251, 146, 60, 0.3)'
  }
} as const;

export function getExerciseById(id: string): Exercise | undefined {
  return ALL_EXERCISES.find((e) => e.id === id);
}

export function getSnippetById(id: string): Snippet | undefined {
  return SNIPPETS.find((s) => s.id === id);
}
