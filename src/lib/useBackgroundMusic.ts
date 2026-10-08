import { useCallback, useEffect, useRef, useState } from "react";

// Thư viện nhạc dùng chung: mọi file trong src/mp3/. Mỗi thiệp chọn bài bằng tên file (content.ts).
const files = import.meta.glob("../mp3/*.mp3", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const urlOf = (name: string) =>
  Object.entries(files).find(([path]) => path.endsWith(`/${name}`))?.[1];

// none: thiệp không dùng nhạc · pending: đang thử tự phát · blocked: trình duyệt chặn, chờ người xem chạm
// · playing: nhạc đang phát. Chỉ đi tiến: pending → blocked/playing, blocked → playing.
export type MusicStatus = "none" | "pending" | "blocked" | "playing";

// Nhạc nền lặp lại liên tục. Mở trang là thử tự phát; bị chặn thì status = "blocked" và nhạc chỉ
// bắt đầu khi gọi start() ngay trong một lần chạm của người xem (trình duyệt không cho phát tiếng trước đó).
export function useBackgroundMusic(file: string, volume = 0.6) {
  const src = file ? urlOf(file) : undefined;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [status, setStatus] = useState<MusicStatus>(src ? "pending" : "none");

  useEffect(() => {
    if (file && !src) console.warn(`Không thấy file nhạc src/mp3/${file}`);
    if (!src) return;

    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = volume;
    audio.preload = "auto";
    audioRef.current = audio;

    const onPlaying = () => setStatus("playing");
    audio.addEventListener("playing", onPlaying);

    let cancelled = false;
    const block = () => setStatus((s) => (s === "pending" ? "blocked" : s));
    audio.play().catch(() => {
      if (!cancelled) block();
    });
    // Một số trình duyệt nhúng không báo lỗi mà treo chờ tương tác: quá 1.5s coi như bị chặn.
    // Nếu sau đó nhạc vẫn tự chạy được thì status sang "playing" như bình thường.
    const timer = setTimeout(block, 1500);

    // Rời tab thì tạm dừng, quay lại thì phát tiếp.
    let resume = false;
    const onVisibility = () => {
      if (document.hidden) {
        resume = !audio.paused;
        audio.pause();
      } else if (resume) {
        resume = false;
        audio.play().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisibility);
      audio.removeEventListener("playing", onPlaying);
      audio.pause();
      audioRef.current = null;
    };
  }, [file, src, volume]);

  const start = useCallback(() => {
    audioRef.current?.play().catch(() => {});
  }, []);

  return { status, start };
}
