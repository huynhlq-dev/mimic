import { content } from "./content";
import Confetti from "./Confetti";
import Envelope from "./Envelope";
import Strawberry from "./Strawberry";
import s from "./style.module.css";

// Bìa "Chạm để mở thiệp": chỉ hiện khi trình duyệt chặn tự phát nhạc.
// Một lần chạm = mở khoá nhạc + mở phong bì để vào thiệp.
export default function Cover({ opening, onOpen }: { opening: boolean; onOpen: () => void }) {
  const t = content.cover;
  return (
    <div className={`${s.cover} ${opening ? s.coverOpening : ""}`}>
      <Confetti />
      <button type="button" className={s.coverBtn} onClick={onOpen}>
        <span className={s.coverEyebrow}>{t.eyebrow}</span>
        <span className={s.coverTitle}>{t.title}</span>
        <span className={s.envelope}>
          <Envelope className={s.envelopeSvg} />
          <span className={s.sealRing} />
          <Strawberry className={s.seal} />
        </span>
        <span className={s.coverHint}>{t.hint}</span>
      </button>
    </div>
  );
}
