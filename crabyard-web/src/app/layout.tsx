import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Blue Crab Yard — Ship Rust Tauri Desktop Apps Fast",
  description:
    "Ship production-ready Rust Tauri desktop apps in minutes, not months. Auth, settings, UI components, auto-updates — all wired up.",
  metadataBase: new URL("https://crabyard.dev"),
  openGraph: {
    title: "Blue Crab Yard — Ship Rust Tauri Desktop Apps Fast",
    description:
      "Production-ready starter kit for Tauri v2 desktop apps. Pick your auth and UI framework, then start building.",
    type: "website",
    url: "https://crabyard.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blue Crab Yard — Ship Rust Tauri Desktop Apps Fast",
    description: "Production-ready starter kit for Tauri v2 desktop apps.",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable} scroll-smooth`}>
      <body
        className="bg-abyss-950 text-zinc-200 antialiased selection:bg-cyan-400/30 selection:text-white"
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
      >
        <SmoothScroll>{children}</SmoothScroll>
        <CustomCursor />
      </body>
    </html>
  );
}
