"use client";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { birthdayConfig as C } from "@/config/birthday";
import { CuteButton, FloatingHearts, PhotoSlot } from "./ui/Bits";

const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);
const MARGIN = 10;

export default function RoomScene({ onNext }: { onNext: () => void }) {
  const [phase, setPhase] = useState<"ask" | "accepted">("ask");
  const [step, setStep] = useState(0);
  const area = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const last = useRef(0);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // Vị trí tính theo tọa độ cục bộ của khung, luôn clamp trong [MARGIN, max]
  const place = useCallback((random: boolean) => {
    const a = area.current, b = btn.current;
    if (!a || !b) return;
    const maxX = Math.max(MARGIN, a.clientWidth - b.offsetWidth - MARGIN);
    const maxY = Math.max(MARGIN, a.clientHeight - b.offsetHeight - MARGIN);
    setPos((p) => {
      let x: number, y: number;
      if (!random) { x = p ? p.x : maxX / 2; y = p ? p.y : maxY / 2; }
      else {
        let t = 0;
        do { x = MARGIN + Math.random() * (maxX - MARGIN); y = MARGIN + Math.random() * (maxY - MARGIN); t++; }
        while (p && Math.hypot(x - p.x, y - p.y) < Math.min(80, maxX / 2) && t < 10);
      }
      return { x: clamp(x, MARGIN, maxX), y: clamp(y, MARGIN, maxY) };
    });
  }, []);

  useLayoutEffect(() => {
    place(false);
    const ro = new ResizeObserver(() => place(false)); // resize / xoay màn hình / font load
    if (area.current) ro.observe(area.current);
    if (btn.current) ro.observe(btn.current);
    return () => ro.disconnect();
  }, [place]);

  const evade = () => {
    const now = Date.now();
    if (now - last.current < 350) return; // giới hạn tần suất
    last.current = now;
    place(true);
  };

  const accept = () => {
    if (phase === "accepted") return;
    setPhase("accepted");
    setStep(1);
    timers.current.push(window.setTimeout(() => setStep(2), 900), window.setTimeout(() => setStep(3), 1800));
  };

  return (
    <section className="scene room">
      <div className="window" aria-hidden><i className="cloud" /><i className="star">✦</i><div className="curtain l" /><div className="curtain r" /></div>

      <div className="q-block">
        <h1 className="q">{C.room.question}</h1>
        <p className="q-sub">{C.room.subtitle}</p>
      </div>

      <div className="hong-area" ref={area}>
        <button ref={btn} className="cute-btn cream hong" style={{ transform: `translate(${pos?.x ?? 0}px, ${pos?.y ?? 0}px)`, visibility: pos ? "visible" : "hidden" }}
          onPointerEnter={(e) => e.pointerType === "mouse" && evade()}
          onPointerDown={(e) => { if (e.pointerType !== "mouse") { e.preventDefault(); evade(); } }}
          onClick={evade} aria-label="Hong (nút này hay chạy trốn)">
          {C.room.no}
        </button>
      </div>
      <CuteButton className="yes" onClick={accept} disabled={phase === "accepted"}>{C.room.yes}</CuteButton>

      <div className="decor" aria-hidden>
        {/* --chèn ảnh: ảnh treo tường trong phòng */}
        <PhotoSlot src={C.photos.room} label="Chèn ảnh" className="wall-photo" />
        <div className="plant"><i /><i /><i /></div>
        <div className="rug" />
        <div className="sofa"><div className="cushion" />
          <div className="teddy"><b className="ear e1" /><b className="ear e2" /><b className="head" /><b className="snout" /><b className="body" /></div>
        </div>
      </div>

      {phase === "accepted" && (
        <div className="accept">
          <FloatingHearts />
          <div className="accept-card">
            {step >= 1 && <h2 className="pop">{C.room.accept1}</h2>}
            {step >= 2 && <p className="fade">{C.room.accept2}</p>}
            {step >= 3 && <CuteButton className="pop" onClick={onNext}>{C.room.giftBtn}</CuteButton>}
          </div>
        </div>
      )}
    </section>
  );
}
