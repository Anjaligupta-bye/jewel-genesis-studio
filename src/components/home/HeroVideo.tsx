import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import video from "@/assets/saavy-flower-to-ring.mp4.asset.json";
import poster from "@/assets/saavy-hero-poster.jpg.asset.json";
import { CtaLink, EASE } from "@/components/ui-kit";

const LINES = [["FROM", "IMAGINATION"], ["TO", "CREATION."]];

export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (reduce) { v.pause(); return; }
    v.play().catch(() => { /* autoplay blocked — poster frame stays visible */ });
  }, [reduce]);

  return (
    <section className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-background">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.4, ease: EASE }}
      >
        {failed ? (
          <img src={poster.url} alt="Golden flower transforming into a solitaire ring" className="h-full w-full object-cover" />
        ) : (
          <video
            ref={ref}
            className="h-full w-full object-cover object-center"
            src={video.url}
            poster={poster.url}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label="A translucent golden flower transforms into a gold solitaire ring"
            onError={() => setFailed(true)}
          />
        )}
      </motion.div>
      {/* Overlays: darken edges and bottom, keep centre (the ring) clean */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,var(--obsidian)_100%)] opacity-80" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-background via-background/60 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background/80 to-transparent" />

      <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-end px-6 pb-28 md:px-10 md:pb-24">
        <motion.p className="eyebrow mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 1 }}>
          Global Jewellery Design • CAD • Manufacturing
        </motion.p>
        <h1 className="font-display text-[13vw] leading-[0.9] font-light tracking-tight sm:text-7xl lg:text-[7.5rem]">
          {LINES.map((line, li) => (
            <span key={li} className="block overflow-hidden">
              {line.map((w, wi) => (
                <motion.span
                  key={w}
                  className={`mr-[0.25em] inline-block ${li === 1 && wi === 1 ? "text-gold-gradient italic" : ""}`}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.2, ease: EASE, delay: 1 + li * 0.2 + wi * 0.1 }}
                >
                  {w}
                </motion.span>
              ))}
            </span>
          ))}
        </h1>
        <motion.div
          className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 1, ease: EASE }}
        >
          <p className="max-w-md text-base leading-relaxed text-foreground/80">
            We transform jewellery concepts into precision-designed, beautifully crafted finished products.
          </p>
          <div className="flex flex-wrap gap-4">
            <CtaLink to="/contact">Start your project</CtaLink>
            <CtaLink to="/services" variant="ghost">Explore our services</CtaLink>
          </div>
        </motion.div>
      </div>

      <a href="#story" className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[0.6rem] tracking-[0.3em] uppercase text-foreground/60" aria-label="Scroll to discover">
        <span className="relative h-10 w-6 rounded-full border border-foreground/40">
          <span className="absolute top-2 left-1/2 h-1.5 w-px -translate-x-1/2 bg-gold" style={{ animation: "scroll-dot 2s ease-in-out infinite" }} />
        </span>
      </a>
    </section>
  );
}
