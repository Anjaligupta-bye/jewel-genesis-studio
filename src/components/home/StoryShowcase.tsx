import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import idea from "@/assets/about-studio.jpg";
import cad from "@/assets/cad-wireframe.jpg";
import finished from "@/assets/gold-solitaire.jpg";
import { SectionHeading } from "@/components/ui-kit";

const STAGES = [
  { n: "01", label: "The Idea", title: "Every masterpiece begins with an idea.", body: "A sketch, a feeling, a reference — the concept takes shape.", img: idea, alt: "A designer sketching a jewellery concept" },
  { n: "02", label: "The Design", title: "Precision in every detail.", body: "The idea becomes a jewellery CAD model — every prong, gallery and setting measured for production.", img: cad, alt: "CAD wireframe of a solitaire ring" },
  { n: "03", label: "The Creation", title: "Crafted to become reality.", body: "The wireframe turns into polished metal and stone: a finished piece, ready for the world.", img: finished, alt: "A finished gold solitaire ring" },
];

function Stage({ stage, i, progress }: { stage: (typeof STAGES)[number]; i: number; progress: MotionValue<number> }) {
  // Each image crossfades in and out across its third of the scroll range — transforms/opacity only
  const start = i / STAGES.length;
  const end = (i + 1) / STAGES.length;
  const fadeIn = 0.06 / STAGES.length;
  const opacity = useTransform(
    progress,
    [Math.max(0, start - fadeIn), start + fadeIn, end - fadeIn, Math.min(1, end + (i === STAGES.length - 1 ? 0 : fadeIn))],
    i === 0 ? [1, 1, 1, i === STAGES.length - 1 ? 1 : 0] : [0, 1, 1, i === STAGES.length - 1 ? 1 : 0],
  );
  const scale = useTransform(progress, [start, end], [1.06, 1]);
  return (
    <motion.div style={{ opacity }} className="absolute inset-0">
      <motion.img style={{ scale }} src={stage.img} alt={stage.alt} loading="lazy" width={1024} height={1024} className="h-full w-full object-cover" />
    </motion.div>
  );
}

export function StoryShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section className="border-y border-border bg-espresso">
      <div className="mx-auto max-w-[1440px] px-6 pt-28 md:px-10 lg:pt-36">
        <SectionHeading eyebrow="The journey" title={<>From concept <em className="text-gold-gradient">to creation.</em></>} className="max-w-3xl" />
      </div>
      {reduce ? (
        <div className="mx-auto grid max-w-[1440px] gap-16 px-6 py-20 md:px-10">
          {STAGES.map((s) => (
            <div key={s.n} className="grid items-center gap-8 md:grid-cols-2">
              <img src={s.img} alt={s.alt} loading="lazy" width={1024} height={1024} className="aspect-[4/3] w-full object-cover" />
              <div>
                <p className="eyebrow-dark mb-4">Stage {s.n} — {s.label}</p>
                <h3 className="font-display text-4xl font-light">{s.title}</h3>
                <p className="mt-4 max-w-md text-foreground/70">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div ref={ref} className="relative h-[300vh]">
          <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
            <div className="mx-auto grid w-full max-w-[1440px] items-center gap-10 px-6 md:grid-cols-2 md:px-10">
              <div className="relative aspect-[4/3] overflow-hidden">
                {STAGES.map((s, i) => <Stage key={s.n} stage={s} i={i} progress={scrollYProgress} />)}
              </div>
              <div className="relative min-h-56">
                {STAGES.map((s, i) => (
                  <StageText key={s.n} stage={s} i={i} progress={scrollYProgress} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function StageText({ stage, i, progress }: { stage: (typeof STAGES)[number]; i: number; progress: MotionValue<number> }) {
  const start = i / STAGES.length;
  const end = (i + 1) / STAGES.length;
  const f = 0.05 / STAGES.length;
  const opacity = useTransform(progress, [Math.max(0, start - f), start + f, end - f, Math.min(1, end + (i === STAGES.length - 1 ? 0 : f))], i === 0 ? [1, 1, 1, i === STAGES.length - 1 ? 1 : 0] : [0, 1, 1, i === STAGES.length - 1 ? 1 : 0]);
  const y = useTransform(progress, [Math.max(0, start - f), start + f], [24, 0]);
  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 flex flex-col justify-center">
      <p className="eyebrow-dark mb-4">Stage {stage.n} — {stage.label}</p>
      <h3 className="font-display text-4xl leading-[1.05] font-light md:text-5xl">{stage.title}</h3>
      <p className="mt-5 max-w-md text-foreground/70">{stage.body}</p>
    </motion.div>
  );
}
