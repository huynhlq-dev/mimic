export interface Sentence {
  id: string;
  text: string;
  translation: string;
  audio_file: string;
}

export interface Lesson {
  id: string;
  title: string;
  title_vi: string;
  level: string;
  topic: string;
  sentences: Sentence[];
}

export interface LessonsFile {
  lessons: Lesson[];
}

export type MasteryStatus = "new" | "practiced" | "recall_help" | "recall_free";

export interface SentenceProgress {
  status: MasteryStatus;
  practiceCount: number;
  recallCount: number;
  intervalIndex: number;
  nextReviewDate: string | null;
  lastResult: MasteryStatus | null;
  updatedAt: string;
}

export type ProgressMap = Record<string, SentenceProgress>;
