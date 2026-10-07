import { useCallback, useEffect, useState } from "react";
import { content } from "./content";
import Intro from "./Intro";
import Main from "./Main";
import s from "./style.module.css";

export const meta = content.meta;

type Scene = "intro" | "leaving" | "main";

// Scene 1 (intro) tự chuyển sang scene 2 (main) sau vài giây hoặc khi chạm màn hình.
export default function Invitation() {
  const [scene, setScene] = useState<Scene>("intro");
  const next = useCallback(() => setScene((v) => (v === "intro" ? "leaving" : v)), []);

  useEffect(() => {
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
        {scene !== "main" && <Intro leaving={scene === "leaving"} />}
        {scene === "main" && <Main />}
      </div>
    </div>
  );
}
