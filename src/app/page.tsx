"use client";

import Hero from "@/components/layout/Hero";
import Link from "next/link";
import { motion } from "framer-motion";
import Marquee from "@/components/visuals/Marquee";

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-hidden">
      <Hero />

      {/* Chapter 1: The Origin */}
      <section className="py-32 md:py-48 relative border-b border-secondary/5">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />

        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <h3 className="text-primary font-mono text-sm tracking-widest mb-4 uppercase">Chapter 01 // The Origin</h3>
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight text-slate-200">
                BORN IN <br />
                <span className="italic text-muted-foreground">2008.</span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-xl md:text-2xl text-slate-500 leading-relaxed font-light">
                We started with a dream at Thapar Institute. Today, we are a force in Formula Student India.
                <br /><br />
                <span className="text-slate-200 font-bold">18 Cars later</span>, our mission remains unchanged:
                Build the fastest student racing car in the country.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Chapter 2: The Machine (Video) */}
      <section className="py-0 relative overflow-hidden group">
        <div className="w-full h-screen max-h-[800px] relative">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/jYNff6cg0NE?autoplay=1&mute=1&controls=0&loop=1&playlist=jYNff6cg0NE"
            title="Team Fateh Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700"
            style={{ pointerEvents: 'none' }} // Background video feel
          ></iframe>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

          <div className="absolute bottom-20 left-6 md:left-20 max-w-4xl z-10">
            <FadeIn>
              <h2 className="text-5xl md:text-8xl font-display font-bold text-white mb-2">PURE. SPEED.</h2>
              <p className="text-2xl text-primary font-mono">Formula Bharat 2026 // EV Class</p>
            </FadeIn>
          </div>
        </div>
      </section>

      <Marquee text=" // AGGRESSIVE IN VISION. CONSISTENT IN PROCESS. RELENTLESS IN EXECUTION // TEAM FATEH // BUILT IN THE WORKSHOP. PROVEN ON TRACK. " />

      {/* Chapter 3: The Mission */}
      <section className="py-32 bg-secondary/5 border-t border-secondary/5">
        <div className="container mx-auto px-6 max-w-6xl text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-12 text-slate-200">
              &quot;NOBODY IS BOTHERED FOR AN INSTITUTION <br />
              MORE THAN ITS <span className="text-primary">ALUMNI</span>.&quot;
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="p-8 border border-secondary/10 bg-white rounded-xl shadow-sm hover:shadow-md hover:border-primary/50 transition-all">
                <h4 className="text-4xl font-bold text-secondary mb-2">200+</h4>
                <p className="font-mono text-sm text-slate-500 uppercase tracking-widest">Engineers</p>
              </div>
              <div className="p-8 border border-secondary/10 bg-white rounded-xl shadow-sm hover:shadow-md hover:border-primary/50 transition-all">
                <h4 className="text-4xl font-bold text-secondary mb-2">18</h4>
                <p className="font-mono text-sm text-slate-500 uppercase tracking-widest">Cars Built</p>
              </div>
              <div className="p-8 border border-secondary/10 bg-white rounded-xl shadow-sm hover:shadow-md hover:border-primary/50 transition-all">
                <h4 className="text-4xl font-bold text-secondary mb-2">1</h4>
                <p className="font-mono text-sm text-slate-500 uppercase tracking-widest">Goal: Victory</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 flex flex-col items-center justify-center text-center relative overflow-hidden bg-secondary text-white">
        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 opacity-20" />
        <FadeIn>
          <h2 className="text-6xl md:text-9xl font-display font-black mb-8 text-white opacity-5 select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap z-0">
            JOIN THE TEAM
          </h2>
          <div className="relative z-10">
            <h3 className="text-4xl font-display font-bold mb-8">BECOME PART OF THE LEGACY</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/join" className="px-10 py-4 bg-white text-secondary font-bold uppercase tracking-widest hover:bg-primary transition-colors">
                Join Team Fateh
              </Link>
              <Link href="/partners" className="px-10 py-4 border border-white/20 text-white font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">
                Become a Partner
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
