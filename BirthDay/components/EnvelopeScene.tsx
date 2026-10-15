"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { birthdayConfig as C } from "@/config/birthday";
import { CuteButton, Flower, flowerColors, PhotoSlot } from "./ui/Bits";

export default function EnvelopeScene({ onRestart }: { onRestart: () => void }) {
  const [step, setStep] = useState(0); // 0 đóng, 1 nảy+hoa, 2 mở nắp, 3 thư trồi, 4 đọc thư
  const timers = useRef<number[]>([]);
  const scroller = useRef<HTMLDivElement>(null);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const flowers = useMemo(() => Array.from({ length: 14 }).map((_, i) => {
    const a = (i / 14) * Math.PI * 2 + (i % 3) * 0.15, d = 110 + (i % 4) * 28;
    return { dx: Math.cos(a) * d, dy: Math.sin(a) * d, r: (i * 47) % 360, s: 0.7 + (i % 4) * 0.2, delay: (i % 5) * 0.06, color: flowerColors[i % 4] };
  }), []);

  const open = () => {
    if (step !== 0) return;
    setStep(1);
    const at = (ms: number, s: number) => timers.current.push(window.setTimeout(() => setStep(s), ms));
    at(600, 2); at(1300, 3); at(2600, 4);
  };

  if (step === 4) {
    return (
      <section className="scene letter-scene">
        <article className="letter-card">
          <div className="letter-scroll" ref={scroller} tabIndex={0}>
            <p className="l-deco" aria-hidden>✿ ♡ ✿</p>
            <h2 className="l-greet">{C.letter.greeting}</h2>
            {/* --chèn ảnh: ảnh đầu thư */}
            <PhotoSlot
  src={C.photos.letterTop}
  label="Chèn ảnh"
  className="l-photo l-photo-top"
/>
            {C.letter.paragraphs.map((p, i) => (<div key={i}><p className="l-p">{p}</p>{i < C.letter.paragraphs.length - 1 && <p className="l-div" aria-hidden>♡</p>}</div>))}
            {/* --chèn ảnh: ảnh cuối thư */}
            <PhotoSlot src={C.photos.letterBottom} label="Chèn ảnh" className="l-photo" />
            <p className="l-sign">{C.letter.signature}</p>
            <p className="l-final">{C.letter.finalMessage}</p>
            <div className="l-actions">
              <button className="skip" onClick={() => scroller.current?.scrollTo({ top: 0, behavior: "smooth" })}>Về đầu thư</button>
              <button className="skip" onClick={onRestart}>Xem lại từ đầu</button>
            </div>
          </div>
        </article>
      </section>
    );
  }

  return (
    <section className="scene env-scene">
      <h2 className="env-title">{C.envelope.title}</h2>
      <p className="env-sub">{C.envelope.sub}</p>
      <div className="env-stage">
        {step >= 1 && flowers.map((f, i) => (
          <span key={i} className="burst" aria-hidden style={{ ["--dx" as string]: `${f.dx}px`, ["--dy" as string]: `${f.dy}px`, ["--r" as string]: `${f.r}deg`, ["--s" as string]: f.s, animationDelay: `${f.delay}s` }}>
            <Flower color={f.color} />
          </span>
        ))}
        <button className={`env ${step >= 1 ? "bounce" : ""}`} onClick={open} aria-label="Mở thư" disabled={step !== 0}>
          <span className="env-back" />
          <span className={`paper ${step >= 3 ? "out" : ""}`}><i /><i /><i /></span>
          <span className="env-front" />
          <span className={`flap ${step >= 2 ? "open" : ""}`} />
          <span className={`seal ${step >= 2 ? "gone" : ""}`}>♥</span>
        </button>
      </div>
    </section>
  );
}
