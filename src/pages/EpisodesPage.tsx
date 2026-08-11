import { Link } from "react-router-dom";
import { useLessons } from "../lib/lessons";
import { loadProgress, getSentenceProgress } from "../lib/storage";

const ICONS: Record<string, string> = {
  "introducing-yourself": "🙋",
  "ordering-food": "🍜",
  "late-for-work": "⏰",
  "weekend-story": "🌤️",
  "making-an-appointment": "📅",
  "describing-a-problem": "🔧",
  "giving-an-opinion": "💬",
  "making-small-talk": "☕",
};

function lessonProgressPercent(sentenceIds: string[]): number {
  const map = loadProgress();
  if (sentenceIds.length === 0) return 0;
  const masteredCount = sentenceIds.filter((id) => {
    const p = getSentenceProgress(map, id);
    return p.status === "recall_free";
  }).length;
  return Math.round((masteredCount / sentenceIds.length) * 100);
}

export function EpisodesPage() {
  const { lessons, error } = useLessons();

  if (error) return <p className="error-text">Không tải được dữ liệu bài học.</p>;
  if (!lessons) return <p className="muted">Đang tải...</p>;

  return (
    <div className="page">
      <header className="page-header">
        <h1>Mimic</h1>
        <p className="muted">Luyện nói tiếng Anh theo podcast ngắn — nghe, bắt chước, nói lại.</p>
      </header>

      <div className="episode-list">
        {lessons.map((lesson) => {
          const ids = lesson.sentences.map((s) => s.id);
          const percent = lessonProgressPercent(ids);
          return (
            <Link to={`/episode/${lesson.id}`} key={lesson.id} className="episode-row">
              <div className="episode-row-icon">{ICONS[lesson.id] ?? "🎧"}</div>
              <div className="episode-row-body">
                <div className="episode-row-top">
                  <h2>{lesson.title}</h2>
                  <span className="badge">{lesson.level}</span>
                </div>
                <p className="muted small">
                  {lesson.title_vi} · {lesson.sentences.length} câu
                </p>
                <div className="progress-bar">
                  <div className="progress-bar-fill" style={{ width: `${percent}%` }} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
