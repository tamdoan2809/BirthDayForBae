"use client";
import { useEffect, useRef, useState } from "react";
import { birthdayConfig as C } from "@/config/birthday";
import { SpeechBubble } from "./ui/Bits";

function KnockingHand() {
  return (
    <svg className="hand" viewBox="0 0 110 80" aria-hidden>
      <rect x="66" y="20" width="42" height="40" rx="10" fill="#F7B8D0" stroke="#E98BB0" strokeWidth="3" />
      <rect x="8" y="16" width="64" height="46" rx="22" fill="#FFE3D3" stroke="#E9A9A0" strokeWidth="3" />
      <path d="M26 20v22M42 18v26M58 20v22" stroke="#E9A9A0" strokeWidth="3" strokeLinecap="round" fill="none" />
      <ellipse cx="30" cy="56" rx="16" ry="8" fill="#FFE3D3" stroke="#E9A9A0" strokeWidth="3" />
    </svg>
  );
}

function Leaf({ side, open }: { side: "left" | "right"; open: boolean }) {
  return (
    <div className={`leaf ${side} ${open ? "open" : ""}`}>
      <div className="panel p1"><i>♥</i></div>
      <div className="panel p2" />
      <b className="handle" />
    </div>
  );
}

export default function DoorScene({ onFinish }: { onFinish: () => void }) {
  const [phase, setPhase] = useState<"idle" | "knock" | "open">("idle");
  const [knocks, setKnocks] = useState(0);
  const [bubble, setBubble] = useState(false);
  const [push, setPush] = useState(false);
  const lock = useRef(false);
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const at = (ms: number, fn: () => void) => { timers.current.push(window.setTimeout(fn, ms)); };

  const start = () => {
    if (lock.current) return; // chỉ chạy một lần
    lock.current = true;
    setPhase("knock");
    at(300, () => setKnocks(1)); at(650, () => setKnocks(2)); at(1000, () => setKnocks(3));
    at(1500, () => { setKnocks(0); setBubble(true); });
    at(2300, () => setPush(true));    // camera push-in ~1.1s
    at(3500, () => setPhase("open")); // cửa mở
    at(3900, onFinish);               // phủ trắng ấm rồi sang phòng
  };

  return (
    <section className="scene door-bg">
      <p className="hint" style={{ opacity: phase === "idle" ? 1 : 0 }}>{C.door.hint}</p>
      <div className={`push ${push ? "pushed" : ""}`}>
        <div className="door-wrap">
          {bubble && <SpeechBubble className="door-bubble">{C.door.reply}</SpeechBubble>}
          {knocks > 0 && <span key={knocks} className="knock-text">{C.door.knock}</span>}
          <div className={`door-frame ${phase === "knock" ? "thump" : ""}`} role="button" tabIndex={0} aria-label="Gõ cửa"
            onClick={start} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && start()}>
            <div className="glow" />
            <Leaf side="left" open={phase === "open"} />
            <Leaf side="right" open={phase === "open"} />
            <span className="sparkle s1">✦</span><span className="sparkle s2">✦</span>
          </div>
          {phase === "knock" && <KnockingHand />}
        </div>
      </div>
    </section>
  );
}
