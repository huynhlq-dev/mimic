import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useLessons, audioUrl } from "../lib/lessons";
import {
  getSentenceProgress,
  loadProgress,
  recordPractice,
  recordRecall,
} from "../lib/storage";
import type { MasteryStatus, ProgressMap, Sentence } from "../types";
import { AudioPlayer } from "../components/AudioPlayer";
import { Recorder } from "../components/Recorder";

type Tab = "explore" | "practice" | "recall";

function statusDotClass(status: MasteryStatus): string {
  switch (status) {
    case "recall_free":
      return "dot dot-mastered";
    case "recall_help":
      return "dot dot-help";
    case "practiced":
      return "dot dot-practiced";
    default:
      return "dot dot-new";
  }
}

function maskKeywords(text: string): string {
  return text
    .split(" ")
    .map((word) => {
      const match = word.match(/^([A-Za-z']+)(.*)$/);
      if (!match) return word;
      const [, letters, rest] = match;
      if (letters.length <= 1) return word;
      return letters[0] + "_".repeat(letters.length - 1) + rest;
    })
    .join(" ");
}

export function EpisodeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { lessons } = useLessons();
  const [searchParams, setSearchParams] = useSearchParams();

  const lesson = useMemo(() => lessons?.find((l) => l.id === id) ?? null, [lessons, id]);

  const rawIndex = Number(searchParams.get("sentence") ?? 0);
  const initialIndex = Number.isFinite(rawIndex) && rawIndex >= 0 ? rawIndex : 0;
  const rawTab = searchParams.get("tab");
  const initialTab: Tab =
    rawTab === "explore" || rawTab === "practice" || rawTab === "recall" ? rawTab : "explore";

  const [index, setIndex] = useState(initialIndex);
  const [tab, setTab] = useState<Tab>(initialTab);
  const [hintLevel, setHintLevel] = useState(0);
  const [progress, setProgress] = useState<ProgressMap>(() => loadProgress());
  const [playingAll, setPlayingAll] = useState(false);
  const allAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setHintLevel(0);
  }, [index, tab]);

  useEffect(() => {
    setSearchParams({ sentence: String(index), tab }, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, tab]);

  // Every hook must run on every render regardless of whether `lesson` has
  // loaded yet — otherwise the hook count changes between the "loading"
  // render and the "loaded" render (a Rules-of-Hooks violation) and React
  // throws. Guard the body instead of the hook call itself.
  useEffect(() => {
    if (!playingAll || !lesson) return;
    const el = allAudioRef.current;
    const currentSentence = lesson.sentences[Math.min(index, lesson.sentences.length - 1)];
    if (!el || !currentSentence) return;
    el.src = audioUrl(currentSentence.audio_file);
    el.play();
  }, [playingAll, index, lesson]);

  if (!lesson) {
    return (
      <div className="page">
        <p className="muted">Đang tải...</p>
      </div>
    );
  }

  const sentences = lesson.sentences;
  // Clamp defensively: a stale/hand-edited `?sentence=` query param could
  // point past the end of this lesson's sentence list.
  const safeIndex = Math.min(Math.max(index, 0), sentences.length - 1);
  const sentence: Sentence = sentences[safeIndex];
  const sentenceProgress = getSentenceProgress(progress, sentence.id);

  const goTo = (i: number) => {
    if (i < 0 || i >= sentences.length) return;
    setIndex(i);
  };

  const handlePractice = () => {
    setProgress(recordPractice(progress, sentence.id));
  };

  const handleRecall = (result: "recall_free" | "recall_help" | "recall_fail") => {
    setProgress(recordRecall(progress, sentence.id, result));
    setHintLevel(3);
  };

  const playAll = () => {
    setPlayingAll(true);
    setIndex(0);
  };

  const stopAll = () => {
    setPlayingAll(false);
    allAudioRef.current?.pause();
  };

  const onAllEnded = () => {
    if (safeIndex < sentences.length - 1) {
      setIndex(safeIndex + 1);
    } else {
      setPlayingAll(false);
    }
  };

  return (
    <div className="page">
      <Link to="/" className="back-link">
        ← Danh sách bài học
      </Link>
      <header className="page-header">
        <h1>{lesson.title}</h1>
        <p className="muted">{lesson.title_vi}</p>
        {playingAll ? (
          <button type="button" className="btn btn-chip" onClick={stopAll}>
            ■ Dừng phát toàn bài
          </button>
        ) : (
          <button type="button" className="btn btn-chip" onClick={playAll}>
            ▶ Nghe toàn bài
          </button>
        )}
        <audio ref={allAudioRef} onEnded={onAllEnded} style={{ display: "none" }} />
      </header>

      <div className="dot-nav">
        {sentences.map((s, i) => {
          const p = getSentenceProgress(progress, s.id);
          return (
            <button
              key={s.id}
              type="button"
              className={`${statusDotClass(p.status)} ${i === safeIndex ? "dot-active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Câu ${i + 1}`}
            />
          );
        })}
      </div>

      <div className="sentence-nav">
        <button type="button" className="btn btn-chip" onClick={() => goTo(safeIndex - 1)} disabled={safeIndex === 0}>
          ← Trước
        </button>
        <span className="muted">
          Câu {safeIndex + 1} / {sentences.length}
        </span>
        <button
          type="button"
          className="btn btn-chip"
          onClick={() => goTo(safeIndex + 1)}
          disabled={safeIndex === sentences.length - 1}
        >
          Sau →
        </button>
      </div>

      <div className="tabs">
        <button
          type="button"
          className={`tab ${tab === "explore" ? "tab-active" : ""}`}
          onClick={() => setTab("explore")}
        >
          1. Khám phá
        </button>
        <button
          type="button"
          className={`tab ${tab === "practice" ? "tab-active" : ""}`}
          onClick={() => setTab("practice")}
        >
          2. Nói theo
        </button>
        <button
          type="button"
          className={`tab ${tab === "recall" ? "tab-active" : ""}`}
          onClick={() => setTab("recall")}
        >
          3. Recall
        </button>
      </div>

      <div className="card sentence-card">
        {tab === "explore" && (
          <div>
            <p className="sentence-text">{sentence.text}</p>
            <p className="sentence-translation">{sentence.translation}</p>
            <AudioPlayer src={audioUrl(sentence.audio_file)} />
          </div>
        )}

        {tab === "practice" && (
          <div>
            <p className="sentence-text">{sentence.text}</p>
            <p className="sentence-translation">{sentence.translation}</p>
            <AudioPlayer src={audioUrl(sentence.audio_file)} />
            <p className="muted small section-label">Ghi âm và nói lại câu trên:</p>
            <Recorder />
            <button type="button" className="btn btn-primary" onClick={handlePractice}>
              ✓ Đã luyện xong ({sentenceProgress.practiceCount} lần)
            </button>
          </div>
        )}

        {tab === "recall" && (
          <div>
            {hintLevel < 3 && <p className="sentence-translation">{sentence.translation}</p>}
            {hintLevel >= 1 && hintLevel < 3 && (
              <p className="sentence-hint">{maskKeywords(sentence.text)}</p>
            )}
            {hintLevel >= 3 && <p className="sentence-text">{sentence.text}</p>}

            {hintLevel === 0 && (
              <button type="button" className="btn btn-chip" onClick={() => setHintLevel(1)}>
                Gợi ý: từ khoá
              </button>
            )}
            {hintLevel === 1 && (
              <button type="button" className="btn btn-chip" onClick={() => setHintLevel(3)}>
                Xem transcript đầy đủ
              </button>
            )}

            <p className="muted small section-label">Nói lại câu này (không nhìn transcript nếu có thể):</p>
            <Recorder />

            <p className="muted small section-label">Bạn nhớ được đến mức nào?</p>
            <div className="recall-actions">
              <button type="button" className="btn btn-success" onClick={() => handleRecall("recall_free")}>
                Nhớ tốt, không cần gợi ý
              </button>
              <button type="button" className="btn btn-warning" onClick={() => handleRecall("recall_help")}>
                Nhớ được nhờ gợi ý
              </button>
              <button type="button" className="btn btn-danger" onClick={() => handleRecall("recall_fail")}>
                Chưa nhớ
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
