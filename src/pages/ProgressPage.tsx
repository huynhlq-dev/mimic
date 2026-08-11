import { Link } from "react-router-dom";
import { useLessons } from "../lib/lessons";
import { getSentenceProgress, isDue, loadProgress } from "../lib/storage";

export function ProgressPage() {
  const { lessons } = useLessons();
  const progress = loadProgress();

  if (!lessons) return <p className="muted">Đang tải...</p>;

  const allSentences = lessons.flatMap((l) => l.sentences.map((s) => ({ lesson: l, sentence: s })));

  let newCount = 0;
  let practicedCount = 0;
  let recallHelpCount = 0;
  let recallFreeCount = 0;

  const dueItems: { lessonId: string; lessonTitle: string; sentenceId: string; index: number; text: string }[] = [];

  for (const { lesson, sentence } of allSentences) {
    const p = getSentenceProgress(progress, sentence.id);
    if (p.status === "new") newCount++;
    else if (p.status === "practiced") practicedCount++;
    else if (p.status === "recall_help") recallHelpCount++;
    else if (p.status === "recall_free") recallFreeCount++;

    if (isDue(p)) {
      const index = lesson.sentences.findIndex((s) => s.id === sentence.id);
      dueItems.push({ lessonId: lesson.id, lessonTitle: lesson.title, sentenceId: sentence.id, index, text: sentence.text });
    }
  }

  const total = allSentences.length;
  const masteredPercent = total > 0 ? Math.round((recallFreeCount / total) * 100) : 0;

  return (
    <div className="page">
      <Link to="/" className="back-link">
        ← Danh sách bài học
      </Link>
      <header className="page-header">
        <h1>Tiến độ học tập</h1>
        <p className="muted">Chỉ số quan trọng nhất: bạn có thể nói mà không nhìn transcript.</p>
      </header>

      <div className="stat-grid">
        <div className="card stat-card">
          <span className="stat-number">{masteredPercent}%</span>
          <span className="muted small">Câu nói được không cần transcript</span>
        </div>
        <div className="card stat-card">
          <span className="stat-number">{recallFreeCount}</span>
          <span className="muted small">/ {total} câu đã thành thạo</span>
        </div>
        <div className="card stat-card">
          <span className="stat-number">{dueItems.length}</span>
          <span className="muted small">câu cần ôn hôm nay</span>
        </div>
      </div>

      <div className="legend">
        <span><i className="dot dot-new" /> Chưa học ({newCount})</span>
        <span><i className="dot dot-practiced" /> Đã luyện ({practicedCount})</span>
        <span><i className="dot dot-help" /> Nhớ nhờ gợi ý ({recallHelpCount})</span>
        <span><i className="dot dot-mastered" /> Thành thạo ({recallFreeCount})</span>
      </div>

      <h2 className="section-title">Ôn tập hôm nay</h2>
      {dueItems.length === 0 ? (
        <p className="muted">Không có câu nào cần ôn. Hãy học bài mới hoặc luyện thêm!</p>
      ) : (
        <ul className="review-list">
          {dueItems.map((item) => (
            <li key={item.sentenceId}>
              <Link to={`/episode/${item.lessonId}?sentence=${item.index}&tab=recall`}>
                <span className="muted small">{item.lessonTitle}</span>
                <p>{item.text}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
