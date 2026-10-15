import type { Metadata, Viewport } from "next";
import { Nunito, Patrick_Hand, Baloo_2 } from "next/font/google";
import "./globals.css";

const body = Nunito({ subsets: ["latin", "vietnamese"], variable: "--font-body", display: "swap" });
const hand = Patrick_Hand({ subsets: ["latin", "vietnamese"], weight: "400", variable: "--font-hand", display: "swap" });
const display = Baloo_2({ subsets: ["latin", "vietnamese"], variable: "--font-display", display: "swap" });

export const metadata: Metadata = { title: "Quà sinh nhật cho em 💗", description: "Một món quà nhỏ dành riêng cho em" };
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#FFF8F0" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${body.variable} ${hand.variable} ${display.variable}`}>
      <body>{children}</body>
    </html>
  );
}
