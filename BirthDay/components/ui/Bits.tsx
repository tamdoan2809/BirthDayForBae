"use client";
import { useState } from "react";

export function CuteButton({ children, variant = "pink", ...p }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "pink" | "cream" }) {
  return <button {...p} className={`cute-btn ${variant} ${p.className ?? ""}`}>{children}</button>;
}

export function SpeechBubble({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`bubble ${className}`} role="status">{children}</div>;
}

export function FloatingHearts({ count = 16 }: { count?: number }) {
  return (
    <div className="hearts" aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ left: `${(i * 37) % 95}%`, animationDelay: `${(i % 6) * 0.15}s`, animationDuration: `${1.8 + (i % 5) * 0.3}s`, fontSize: `${16 + (i % 4) * 7}px` }}>
          {i % 3 === 0 ? "💗" : i % 3 === 1 ? "💖" : "✦"}
        </span>
      ))}
    </div>
  );
}

export const flowerColors = ["#F7B8D0", "#FFD9C7", "#E8DDF8", "#FFF1DD"];
export function Flower({ color = flowerColors[0], size = 44 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="-50 -50 100 100" aria-hidden>
      {[0, 60, 120, 180, 240, 300].map((r) => <ellipse key={r} cx="0" cy="-24" rx="14" ry="22" fill={color} stroke="#fff" strokeWidth="2" transform={`rotate(${r})`} />)}
      <circle r="12" fill="#FFE08A" stroke="#fff" strokeWidth="2" />
    </svg>
  );
}

// Ô ảnh: chưa có ảnh -> hiện khung chờ, không vỡ layout
export function PhotoSlot({ src, label, className = "" }: { src: string; label: string; className?: string }) {
  const [bad, setBad] = useState(false);
  return (
    <div className={`photo ${className}`}>
      {src && !bad ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={label} loading="lazy" onError={() => setBad(true)} />
      ) : (
        <div className="photo-empty"><span>📷</span><small>{label}</small></div>
      )}
    </div>
  );
}
