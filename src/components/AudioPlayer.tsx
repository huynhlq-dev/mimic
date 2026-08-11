import { useEffect, useRef, useState } from "react";

interface AudioPlayerProps {
  src: string;
  label?: string;
}

const SPEEDS = [
  { key: "slow", rate: 0.7, label: "0.7x" },
  { key: "normal", rate: 1, label: "1x" },
  { key: "fast", rate: 1.3, label: "1.3x" },
] as const;

type SpeedKey = (typeof SPEEDS)[number]["key"];

export function AudioPlayer({ src, label }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<SpeedKey>("normal");

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = SPEEDS.find((s) => s.key === speed)!.rate;
    }
  }, [speed]);

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (isPlaying) {
      el.pause();
    } else {
      el.currentTime = 0;
      el.play();
    }
  };

  return (
    <div className="audio-player">
      <audio
        ref={audioRef}
        src={src}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />
      <button type="button" className="btn btn-icon" onClick={toggle} aria-label="Phát audio">
        {isPlaying ? "⏸" : "▶"} {label ?? ""}
      </button>
      <div className="speed-control" role="group" aria-label="Tốc độ phát">
        {SPEEDS.map((s) => (
          <button
            key={s.key}
            type="button"
            className={`speed-option ${speed === s.key ? "speed-option-active" : ""}`}
            onClick={() => setSpeed(s.key)}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
