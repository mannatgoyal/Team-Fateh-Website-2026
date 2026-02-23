import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { EasterEggProvider } from "@/lib/EasterEggContext";
import SmoothScroll from "@/components/visuals/SmoothScroll";
import TelemetryHUD from "@/components/visuals/TelemetryHUD";
import GlobalRacingLine from "@/components/visuals/GlobalRacingLine";
import TyreCursor from "@/components/visuals/TyreCursor";
import GameStateManager from "@/components/visuals/GameStateManager";
import SponsorBelt from "@/components/layout/SponsorBelt";
import EasterEggController from "@/components/ui/EasterEggController";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair-display" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export const metadata: Metadata = {
  title: "Team Fateh | Formula Student Electric",
  description: "Official website of Team Fateh, Thapar Institute's Formula Student Team.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased selection:bg-primary selection:text-white flex flex-col min-h-screen" suppressHydrationWarning>
        <EasterEggProvider>
          <GameStateManager />
          <TyreCursor />
          <SmoothScroll />
          <GlobalRacingLine />
          <TelemetryHUD />
          <EasterEggController />
          <Navbar />
          <main className="flex-grow pt-20">
            {children}
          </main>
          <SponsorBelt />
          <footer className="w-full bg-background border-t border-white/5 py-6 text-center z-50 relative">
            <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase opacity-40 hover:opacity-100 transition-opacity">
              Designed & Engineered by Mannat Goyal
            </p>
          </footer>
        </EasterEggProvider>
      </body>
    </html>
  );
}
