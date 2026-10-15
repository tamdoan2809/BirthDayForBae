"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import DoorScene from "./DoorScene";
import RoomScene from "./RoomScene";
import SongScene from "./SongScene";
import EnvelopeScene from "./EnvelopeScene";

type Stage = "door" | "room" | "song" | "envelope"; // "accepted" nằm trong room, "letter" nằm trong envelope

export default function Experience() {
  const [stage, setStage] = useState<Stage>("door");
  const [veil, setVeil] = useState(false);
  const busy = useRef(false);
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // Chuyển cảnh qua lớp phủ trắng ấm, chống bấm nhiều lần
  const go = useCallback((next: Stage) => {
    if (busy.current) return;
    busy.current = true;
    setVeil(true);
    timers.current.push(window.setTimeout(() => {
      setStage(next);
      timers.current.push(window.setTimeout(() => { setVeil(false); busy.current = false; }, 200));
    }, 550));
  }, []);

  return (
    <main>
      {stage === "door" && <DoorScene onFinish={() => go("room")} />}
      {stage === "room" && <RoomScene onNext={() => go("song")} />}
      {stage === "song" && <SongScene onNext={() => go("envelope")} />}
      {stage === "envelope" && <EnvelopeScene onRestart={() => go("door")} />}
      <div className={`veil ${veil ? "on" : ""}`} aria-hidden />
    </main>
  );
}
