import type { MasteryStatus, ProgressMap, SentenceProgress } from "../types";

const STORAGE_KEY = "mimic:progress:v1";

export const REVIEW_SCHEDULE_DAYS = [1, 3, 7, 14, 30];

function emptyProgress(): SentenceProgress {
  return {
    status: "new",
    practiceCount: 0,
    recallCount: 0,
    intervalIndex: -1,
    nextReviewDate: null,
    lastResult: null,
    updatedAt: new Date().toISOString(),
  };
}

export function loadProgress(): ProgressMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ProgressMap) : {};
  } catch {
    return {};
  }
}

function saveProgress(map: ProgressMap): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}

export function getSentenceProgress(map: ProgressMap, sentenceId: string): SentenceProgress {
  return map[sentenceId] ?? emptyProgress();
}

function addDays(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

export function recordPractice(map: ProgressMap, sentenceId: string): ProgressMap {
  const prev = getSentenceProgress(map, sentenceId);
  const next: SentenceProgress = {
    ...prev,
    status: prev.status === "new" ? "practiced" : prev.status,
    practiceCount: prev.practiceCount + 1,
    updatedAt: new Date().toISOString(),
  };
  const updated = { ...map, [sentenceId]: next };
  saveProgress(updated);
  return updated;
}

export function recordRecall(
  map: ProgressMap,
  sentenceId: string,
  result: "recall_free" | "recall_help" | "recall_fail"
): ProgressMap {
  const prev = getSentenceProgress(map, sentenceId);
  let intervalIndex = prev.intervalIndex;
  let nextReviewDate: string;
  let status: MasteryStatus;

  if (result === "recall_free") {
    intervalIndex = Math.min(intervalIndex + 1, REVIEW_SCHEDULE_DAYS.length - 1);
    nextReviewDate = addDays(REVIEW_SCHEDULE_DAYS[intervalIndex]);
    status = "recall_free";
  } else if (result === "recall_help") {
    intervalIndex = Math.max(intervalIndex, 0);
    nextReviewDate = addDays(REVIEW_SCHEDULE_DAYS[0]);
    status = "recall_help";
  } else {
    intervalIndex = -1;
    nextReviewDate = addDays(1);
    status = "practiced";
  }

  const next: SentenceProgress = {
    ...prev,
    status,
    recallCount: prev.recallCount + 1,
    intervalIndex,
    nextReviewDate,
    lastResult: result === "recall_free" ? "recall_free" : result === "recall_help" ? "recall_help" : "practiced",
    updatedAt: new Date().toISOString(),
  };
  const updated = { ...map, [sentenceId]: next };
  saveProgress(updated);
  return updated;
}

export function isDue(progress: SentenceProgress): boolean {
  if (!progress.nextReviewDate) return false;
  return new Date(progress.nextReviewDate).getTime() <= Date.now();
}
