import type { ReactNode } from "react";
import { CtaLink, Reveal } from "@/components/ui-kit";

const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  left: (i * 37) % 100,
  delay: (i * 0.73) % 8,
  dur: 8 + ((i * 3) % 7),
  size: 1 + (i % 3),
}));

export function FinalCta({ title, text }: { title: ReactNode; text: string }) {
  return (
    <section className="relative overflow-hidden" style={{ background: "var(--gradient-fade-gold)" }}>
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="absolute bottom-0 rounded-full bg-gold"
            style={{ left: `${p.left}%`, width: p.size, height: p.size, animation: `float-up ${p.dur}s linear ${p.delay}s infinite`, opacity: 0 }}
          />
        ))}
      </div>
      <div className="relative mx-auto flex max-w-[1440px] flex-col items-center px-6 py-36 text-center md:px-10 lg:py-48">
        <Reveal><h2 className="font-display text-5xl leading-[1] font-light md:text-7xl lg:text-8xl">{title}</h2></Reveal>
        <Reveal delay={0.15}><p className="mt-8 max-w-lg text-foreground/80">{text}</p></Reveal>
        <Reveal delay={0.3} className="mt-12"><CtaLink to="/contact">Start your project</CtaLink></Reveal>
      </div>
    </section>
  );
}
