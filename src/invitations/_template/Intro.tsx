import { content } from "./content";
import Cake from "./Cake";
import Strawberry from "./Strawberry";
import s from "./style.module.css";

export default function Intro({ leaving }: { leaving: boolean }) {
  const t = content.intro;
  return (
    <section className={`${s.intro} ${leaving ? s.introLeaving : ""}`}>
      <Strawberry className={`${s.berry} ${s.berryA}`} />
      <Strawberry className={`${s.berry} ${s.berryB}`} />
      <p className={s.introText}>
        <span className={s.introLine1}>{t.line1}</span>
        <br />
        <span className={s.introLine2}>
          {t.before} <b>{t.bold}</b> {t.middle} <i>{t.italic}</i>.
        </span>
      </p>
      <Cake className={s.cake} />
    </section>
  );
}
