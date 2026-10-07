export default function Strawberry({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 130" aria-hidden="true">
      <path
        d="M58 28C28 22 6 44 12 76c5 26 26 46 48 46s44-18 48-44C113 46 88 24 58 28Z"
        fill="#FDDCE3"
        stroke="#EBC4CD"
        strokeWidth="7"
        strokeLinejoin="round"
      />
      <path
        d="M30 30c-8-10-6-20 4-22 8 4 14 6 22 2 6-8 16-8 22 0 10-2 18 4 16 12-2 8-12 10-20 8-8 6-18 6-26 0-8 4-14 2-18 0Z"
        fill="#D3E8DA"
        stroke="#B9D8C5"
        strokeWidth="6"
        strokeLinejoin="round"
        transform="translate(4 14)"
      />
      {[
        [38, 66],
        [62, 58],
        [82, 76],
        [54, 88],
        [74, 100],
      ].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="5.5" ry="7" fill="#FFFBEF" transform={`rotate(-15 ${x} ${y})`} />
      ))}
    </svg>
  );
}
