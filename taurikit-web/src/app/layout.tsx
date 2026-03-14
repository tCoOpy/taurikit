import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TauriKit — Ship Rust Tauri Desktop Apps Fast",
  description:
    "Ship production-ready Rust Tauri desktop apps in minutes, not months. Auth, settings, UI components, auto-updates — all wired up.",
  metadataBase: new URL("https://taurikit.dev"),
  openGraph: {
    title: "TauriKit — Ship Rust Tauri Desktop Apps Fast",
    description:
      "Production-ready starter kit for Tauri v2 desktop apps. Pick your auth and UI framework, then start building.",
    type: "website",
    url: "https://taurikit.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "TauriKit — Ship Rust Tauri Desktop Apps Fast",
    description: "Production-ready starter kit for Tauri v2 desktop apps.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body
        className="bg-zinc-950 text-zinc-200 antialiased"
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
