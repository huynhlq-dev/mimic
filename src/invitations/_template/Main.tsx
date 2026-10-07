import { content } from "./content";
import Confetti from "./Confetti";
import { photos } from "./photos";
import s from "./style.module.css";

export default function Main() {
  const c = content.main;
  return (
    <section className={s.main}>
      <Confetti />

      <h1 className={s.headline}>{c.headline}</h1>

      <div className={s.word} aria-label={c.word}>
        {[...c.word].map((ch, i) => {
          const photo = photos.length ? photos[i % photos.length] : undefined;
          return (
            <span
              key={i}
              className={s.letter}
              style={{
                backgroundImage: photo ? `url(${photo}), url(${photo})` : undefined,
                backgroundSize: `${c.photoSize[i % c.photoSize.length]}, cover`,
                backgroundPosition: `${c.photoFocus[i % c.photoFocus.length]}, 50% 50%`,
                backgroundRepeat: `${c.photoRepeat[i % c.photoRepeat.length]}, no-repeat`,
                animationDelay: `${0.9 + i * 0.25}s`,
              }}
            >
              {ch}
            </span>
          );
        })}
      </div>

      <p className={s.join}>{c.joinText}</p>
      <h2 className={s.eventTitle}>{c.eventTitle}</h2>

      <div className={s.date}>
        <span>{c.month}</span>
        <b>{c.day}</b>
        <span>{c.time}</span>
      </div>

      <p className={s.venue}>{c.venue}</p>
      <p className={s.address}>{c.address}</p>
    </section>
  );
}
