import { CPP_EXERCISES } from './cppExercises';
import { JAVA_EXERCISES } from './javaExercises';
import { CURRICULUM_TAXONOMY } from './curriculumTaxonomy';

export interface TopicManifestItem {
  topicId: string;
  topicName: string;
  language: 'cpp' | 'java';
  implementedCount: number;
  exerciseIds: string[];
  subtopicsCovered: string[];
}

export interface CurriculumManifest {
  version: string;
  lastUpdated: string;
  totalExercises: number;
  cppCount: number;
  javaCount: number;
  topicBreakdown: TopicManifestItem[];
}

export function generateCurriculumManifest(): CurriculumManifest {
  const allExercises = [...CPP_EXERCISES, ...JAVA_EXERCISES];

  const topicBreakdown: TopicManifestItem[] = CURRICULUM_TAXONOMY.map((topic) => {
    const topicExercises = allExercises.filter(
      (e) => e.language === topic.language && e.mainTopic === topic.id
    );

    const subtopicsCovered = Array.from(
      new Set(topicExercises.map((e) => e.subtopic))
    );

    return {
      topicId: topic.id,
      topicName: topic.name,
      language: topic.language,
      implementedCount: topicExercises.length,
      exerciseIds: topicExercises.map((e) => e.id),
      subtopicsCovered,
    };
  });

  return {
    version: '2.0.0',
    lastUpdated: '2026-10-28',
    totalExercises: allExercises.length,
    cppCount: CPP_EXERCISES.length,
    javaCount: JAVA_EXERCISES.length,
    topicBreakdown,
  };
}

export const CURRENT_MANIFEST = generateCurriculumManifest();
