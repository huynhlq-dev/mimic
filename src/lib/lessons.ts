import { useEffect, useState } from "react";
import type { Lesson, LessonsFile } from "../types";

let cache: Lesson[] | null = null;

async function fetchLessons(): Promise<Lesson[]> {
  if (cache) return cache;
  const res = await fetch("/data/lessons.json");
  const json = (await res.json()) as LessonsFile;
  cache = json.lessons;
  return cache;
}

export function useLessons() {
  const [lessons, setLessons] = useState<Lesson[] | null>(cache);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cache) {
      setLessons(cache);
      return;
    }
    fetchLessons()
      .then(setLessons)
      .catch((e) => setError(String(e)));
  }, []);

  return { lessons, error };
}

export function audioUrl(path: string): string {
  return `/audio/${path}`;
}
