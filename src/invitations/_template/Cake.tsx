import s from "./style.module.css";

const PINK = "#F09DB2";
const BLUE = "#A9D3E8";
const FLAME = "#FBD35B";

// x = tâm nến, top = đỉnh nến (đáy nến luôn ở y=403), flame = tâm ngọn lửa
const candles = [
  { x: 60, top: 215, color: PINK, flame: 185 },
  { x: 136, top: 180, color: BLUE, flame: 152 },
  { x: 311, top: 189, color: BLUE, flame: 160 },
  { x: 386, top: 218, color: PINK, flame: 190 },
];

const layers = ["#EEB09A", "#A9D3E8", "#F4BBC8", "#F7DC85"];

export default function Cake({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 445 752" aria-hidden="true">
      {layers.map((fill, i) => (
        <rect
          key={fill}
          className={s.layer}
          style={{ animationDelay: `${0.5 + (layers.length - 1 - i) * 0.18}s` }}
          x="0"
          y={393 + i * 92.5}
          width="445"
          height="82"
          rx="36"
          fill={fill}
        />
      ))}

      {candles.map((c, i) => (
        <g key={i}>
          <g className={s.candle} style={{ animationDelay: `${1.4 + i * 0.12}s` }}>
            <rect x={c.x - 15} y={c.top} width="30" height={403 - c.top} rx="14" fill={c.color} />
            {Array.from({ length: Math.floor((403 - c.top - 20) / 45) }, (_, k) => (
              <rect key={k} x={c.x - 12} y={c.top + 22 + k * 45} width="24" height="11" fill="#fff" />
            ))}
          </g>
          <ellipse
            className={s.flame}
            style={{ animationDelay: `${2.0 + i * 0.12}s, ${2.4 + i * 0.12}s` }}
            cx={c.x}
            cy={c.flame}
            rx="13"
            ry="21"
            fill={FLAME}
          />
        </g>
      ))}

      <g className={s.candle} style={{ animationDelay: "1.3s" }}>
        <polygon points="166,150 227,68 274,68 274,405 215,405 215,135 190,150" fill={PINK} />
        {[153, 212, 270, 332, 391].map((y) => (
          <rect key={y} x="219" y={y} width="52" height="12" fill="#fff" />
        ))}
      </g>
      <ellipse
        className={s.flame}
        style={{ animationDelay: "1.9s, 2.3s" }}
        cx="222"
        cy="30"
        rx="17"
        ry="26"
        fill={FLAME}
      />
    </svg>
  );
}
