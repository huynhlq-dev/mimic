import { useCallback, useEffect, useState } from "react";
import { useBackgroundMusic } from "../../lib/useBackgroundMusic";
import { content } from "./content";
import Cover from "./Cover";
import Intro from "./Intro";
import Main from "./Main";
import s from "./style.module.css";

export const meta = content.meta;

// boot: chờ biết nhạc có tự phát được không · cover: bìa "Chạm để mở thiệp" (chỉ khi nhạc bị chặn)
// · opening: bìa đang mở · intro → leaving → main: như cũ
type Scene = "boot" | "cover" | "opening" | "intro" | "leaving" | "main";

const OPENING_MS = 1400; // khớp thời lượng animation mở bìa trong style.module.css

// Scene 1 (intro) tự chuyển sang scene 2 (main) sau vài giây hoặc khi chạm màn hình.
export default function Invitation() {
  const { status, start } = useBackgroundMusic(content.music.file, content.music.volume);
  const [scene, setScene] = useState<Scene>(status === "none" ? "intro" : "boot");
  const next = useCallback(() => setScene((v) => (v === "intro" ? "leaving" : v)), []);
  const open = useCallback(() => {
    start(); // phải gọi ngay trong lần chạm thì trình duyệt mới cho phát tiếng
    setScene("opening");
  }, [start]);

  useEffect(() => {
    // Tự phát được (hoặc không dùng nhạc) thì vào thẳng thiệp, bị chặn thì hiện bìa.
    if (scene === "boot" && status !== "pending") {
      setScene(status === "blocked" ? "cover" : "intro");
    }
    // Đang chờ ở bìa mà nhạc đã tự chạy được thì mở bìa luôn.
    if (scene === "cover" && status === "playing") setScene("opening");
  }, [scene, status]);

  useEffect(() => {
    if (scene === "opening") {
      const t = setTimeout(() => setScene("intro"), OPENING_MS);
      return () => clearTimeout(t);
    }
    if (scene === "intro") {
      const t = setTimeout(next, content.introSeconds * 1000);
      return () => clearTimeout(t);
    }
    if (scene === "leaving") {
      const t = setTimeout(() => setScene("main"), 700);
      return () => clearTimeout(t);
    }
  }, [scene, next]);

  return (
    <div className={s.root} onClick={next}>
      <div className={s.stage}>
        {(scene === "cover" || scene === "opening") && (
          <Cover opening={scene === "opening"} onOpen={open} />
        )}
        {(scene === "intro" || scene === "leaving") && <Intro leaving={scene === "leaving"} />}
        {scene === "main" && <Main />}
      </div>
    </div>
  );
}
