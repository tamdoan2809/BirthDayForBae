"use client";
import { useState } from "react";
import { birthdayConfig as C } from "@/config/birthday";
import { CuteButton, PhotoSlot } from "./ui/Bits";

export default function SongScene({ onNext }: { onNext: () => void }) {
  const [failed, setFailed] = useState(!C.video.src);
  const [ended, setEnded] = useState(false);
  const portrait = (() => { const [w, h] = C.video.aspect.split("/").map(Number); return h >= w; })();

  return (
    <section className="scene song">
      {["♪", "♫", "♡", "✦", "♪", "♡"].map((g, i) => <span key={i} className="note" aria-hidden style={{ left: `${8 + i * 16}%`, animationDelay: `${i * 0.7}s` }}>{g}</span>)}
      <h2 className="song-h">{C.song.heading}</h2>
      <div className="video-frame" style={{ aspectRatio: C.video.aspect, ...(portrait ? { height: "44dvh" } : { width: "100%" }), maxWidth: "100%" }}>
        {failed ? (
          <div className="video-empty"><span>🎬</span><p>Video sẽ ở đây nha</p><small>Đặt file tại public/media/birthday-song.mp4</small></div>
        ) : (
          <video src={C.video.src} poster={C.video.poster || undefined} controls playsInline preload="metadata"
            onError={() => setFailed(true)} onEnded={() => setEnded(true)} />
        )}
      </div>
      <p className="song-sub">{C.song.sub}</p>
      {/* --chèn ảnh: ảnh dưới video */}
      <PhotoSlot src={C.photos.song} label="Chèn ảnh" className="song-photo" />
      {(ended || failed) ? <CuteButton className="fade" onClick={onNext}>{C.song.nextBtn}</CuteButton>
        : <button className="skip" onClick={onNext}>{C.song.skip}</button>}
    </section>
  );
}
