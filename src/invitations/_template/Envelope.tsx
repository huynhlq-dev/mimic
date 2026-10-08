import s from "./style.module.css";

const FLAP = "M10 40H310L160 150Z";

// Phong bì phẳng màu pastel xanh (cùng tông tầng bánh ở màn intro). Khi mở: nắp trước (flapFront)
// xẹp xuống, nắp sau (flapBack) lật lên phía sau tấm thiệp, rồi tấm thiệp (card) trượt ra khỏi phong bì.
export default function Envelope({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 320 250"
      aria-hidden="true"
      stroke="#93C3DB"
      strokeWidth="7"
      strokeLinejoin="round"
    >
      <rect x="10" y="40" width="300" height="200" fill="#A3D0E6" />
      <path className={s.flapBack} d={FLAP} fill="#8FC2DD" />
      <g className={s.card}>
        <rect x="34" y="58" width="252" height="160" rx="6" fill="#fff" stroke="#E3EDF3" strokeWidth="4" />
        <rect x="76" y="94" width="168" height="9" rx="4.5" fill="#F7DCE3" stroke="none" />
        <rect x="100" y="118" width="120" height="9" rx="4.5" fill="#F7DCE3" stroke="none" />
      </g>
      <path d="M10 40L160 150L310 40V240H10Z" fill="#D4EAF5" />
      <path className={s.flapFront} d={FLAP} fill="#BCDDEE" />
    </svg>
  );
}
