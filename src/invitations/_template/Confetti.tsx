import s from "./style.module.css";

const COLORS = ["#F09DB2", "#A9D3E8", "#F7DC85", "#BFD8B8", "#EEB09A"];

// Giá trị giả-ngẫu-nhiên cố định (không dùng Math.random để render ổn định).
const pieces = Array.from({ length: 24 }, (_, i) => {
  const r = (n: number) => {
    const x = Math.sin(i * 12.9898 + n * 78.233) * 43758.5453;
    return x - Math.floor(x);
  };
  return {
    left: r(1) * 100,
    size: 0.9 + r(2) * 1.4,
    color: COLORS[i % COLORS.length],
    duration: 10 + r(3) * 8,
    delay: -r(4) * 18,
    round: r(5) > 0.45,
  };
});

export default function Confetti() {
  return (
    <div className={s.confetti} aria-hidden="true">
      {pieces.map((p, i) => (
        <span
          key={i}
          style={{
            left: `${p.left}%`,
            width: `${p.size}cqw`,
            height: `${p.round ? p.size : p.size * 1.8}cqw`,
            background: p.color,
            borderRadius: p.round ? "50%" : "0.3cqw",
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
