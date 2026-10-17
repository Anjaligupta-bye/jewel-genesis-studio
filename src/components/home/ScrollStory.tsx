import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import cadImg from "@/assets/cad-wireframe.jpg";
import { EASE } from "@/components/ui-kit";

const JewelleryScene = lazy(() => import("./JewelleryScene"));

const STAGES = [
  { n: "01", label: "The Idea", title: "Every Masterpiece Begins With an Idea.", body: "A sketch, a feeling, a reference. Golden lines emerge from darkness as the concept takes shape." },
  { n: "02", label: "The Design", title: "Precision in Every Detail.", body: "The idea becomes a jewellery CAD model — every prong, gallery and setting measured for production." },
  { n: "03", label: "The Creation", title: "Crafted to Become Reality.", body: "The wireframe turns into polished metal and stone: a finished piece, ready for the world." },
];

function webglAvailable() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch { return false; }
}

export function ScrollStory() {
  const section = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  const drag = useRef(0);
  const last = useRef<number | null>(null);
  const [stage, setStage] = useState(0);
  const [mode, setMode] = useState<"pending" | "3d" | "fallback">("pending");
  const [lite, setLite] = useState(false);
  const [near, setNear] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    setLite(window.matchMedia("(max-width: 768px), (pointer: coarse)").matches);
    setMode(webglAvailable() ? "3d" : "fallback");
    const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { setNear(true); io.disconnect(); } }, { rootMargin: "400px" });
    if (section.current) io.observe(section.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const st = ScrollTrigger.create({
      trigger: section.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        progress.current = self.progress;
        setStage(self.progress < 0.36 ? 0 : self.progress < 0.7 ? 1 : 2);
      },
    });
    return () => st.kill();
  }, []);

  const onMove = (e: React.PointerEvent) => {
    if (lite) return;
    const r = e.currentTarget.getBoundingClientRect();
    pointer.current = { x: ((e.clientX - r.left) / r.width) * 2 - 1, y: -(((e.clientY - r.top) / r.height) * 2 - 1) };
    if (last.current !== null && e.buttons === 1) drag.current = (e.clientX - last.current) * 0.004;
    last.current = e.clientX;
  };

  const s = STAGES[stage] ?? STAGES[0]!;

  return (
    <section id="story" ref={section} className="relative h-[320vh] bg-background" aria-label="From idea to creation">
      <div className="sticky top-0 h-[100svh] overflow-hidden" onPointerMove={onMove} onPointerLeave={() => { pointer.current = { x: 0, y: 0 }; last.current = null; }}>
        <div className="absolute inset-0 cursor-grab active:cursor-grabbing">
          {mode === "3d" && near && !reduce ? (
            <Suspense fallback={<div className="h-full w-full bg-background" />}>
              <JewelleryScene progress={progress} pointer={pointer} drag={drag} lite={lite} />
            </Suspense>
          ) : mode !== "pending" ? (
            <img src={cadImg} alt="CAD wireframe of a solitaire ring" loading="lazy" width={1024} height={1024} className="mx-auto h-full max-w-3xl object-contain opacity-60" />
          ) : null}
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent md:via-transparent" />

        <div className="pointer-events-none relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-end px-6 pb-16 md:justify-center md:px-10 md:pb-0">
          <div className="max-w-lg">
            <div className="mb-8 flex gap-6">
              {STAGES.map((x, i) => (
                <div key={x.n} className="flex items-center gap-2">
                  <span className={`h-px transition-all duration-700 ${i === stage ? "w-10 bg-gold" : "w-4 bg-foreground/30"}`} />
                  <span className={`text-[0.6rem] tracking-[0.3em] uppercase ${i === stage ? "text-gold" : "text-foreground/40"}`}>{x.n}</span>
                </div>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
                transition={{ duration: 0.8, ease: EASE }}
              >
                <p className="eyebrow mb-5">Stage {s.n} — {s.label}</p>
                <h2 className="font-display text-4xl leading-[1.02] font-light md:text-6xl">{s.title}</h2>
                <p className="mt-6 max-w-sm text-sm leading-relaxed text-foreground/70 md:text-base">{s.body}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        {!lite && mode === "3d" && (
          <p className="absolute right-6 bottom-6 z-10 text-[0.6rem] tracking-[0.3em] uppercase text-foreground/40 md:right-10">Move or drag to explore</p>
        )}
      </div>
    </section>
  );
}
