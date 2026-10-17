import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { EASE, SectionHeading } from "@/components/ui-kit";

const STEPS = [
  ["Brief", "Understanding the idea and project requirements."],
  ["CAD Design", "Transforming the concept into a precise 3D model."],
  ["Render", "Presenting realistic jewellery visuals."],
  ["Prototype", "Preparing the design for physical production."],
  ["Manufacturing", "Producing jewellery in the agreed material and specifications."],
  ["QC & Dispatch", "Quality checks and final delivery preparation."],
];

export function ProcessTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });

  return (
    <section className="border-t border-border bg-charcoal py-32 lg:py-44">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <SectionHeading eyebrow="The process" title={<>From brief <em className="text-gold-gradient">to dispatch.</em></>} className="max-w-3xl" />
        <div ref={ref} className="relative mt-20 ml-3 md:ml-[calc(25%)]">
          <span className="absolute top-0 left-0 h-full w-px bg-foreground/10" />
          <motion.span className="absolute top-0 left-0 h-full w-px origin-top bg-gold" style={{ scaleY }} />
          <ol className="space-y-16">
            {STEPS.map(([t, d], i) => (
              <motion.li
                key={t}
                className="relative pl-10 md:pl-16"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{ duration: 0.9, ease: EASE }}
              >
                <span className="absolute top-3 -left-[5px] h-[11px] w-[11px] rotate-45 border border-gold bg-charcoal" />
                <p className="font-display text-xl text-gold">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-1 font-display text-3xl tracking-wide uppercase md:text-5xl">{t}</h3>
                <p className="mt-3 max-w-md text-sm text-foreground/70 md:text-base">{d}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
