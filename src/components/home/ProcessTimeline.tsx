import { motion } from "framer-motion";
import { EASE, SectionHeading } from "@/components/ui-kit";

const STEPS = [
  ["Brief", "Understanding the idea and project requirements."],
  ["CAD", "Transforming the concept into a precise 3D model."],
  ["Render", "Presenting realistic jewellery visuals."],
  ["Prototype", "Preparing the design for physical production."],
  ["Manufacturing", "Producing jewellery to the agreed specifications."],
  ["Quality Control", "Inspection and final delivery preparation."],
];

export function ProcessTimeline() {
  return (
    <section className="border-t border-border bg-espresso py-28 lg:py-40">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <SectionHeading eyebrow="The process" title={<>From brief <em className="text-gold-gradient">to dispatch.</em></>} className="max-w-3xl" />

        {/* Horizontal on desktop */}
        <div className="mt-20 hidden lg:block">
          <div className="relative">
            <span className="absolute top-[5px] left-0 h-px w-full bg-foreground/10" />
            <motion.span
              className="absolute top-[5px] left-0 h-px w-full origin-left bg-gold"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-20% 0px" }}
              transition={{ duration: 2, ease: EASE }}
            />
            <ol className="grid grid-cols-6 gap-8">
              {STEPS.map(([t, d], i) => (
                <motion.li
                  key={t}
                  className="relative pt-10"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20% 0px" }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.25 * i }}
                >
                  <span className="absolute top-0 left-0 h-[11px] w-[11px] rotate-45 border border-gold bg-espresso" />
                  <p className="font-display text-lg text-gold">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-1 font-display text-2xl tracking-wide uppercase">{t}</h3>
                  <p className="mt-3 text-sm text-foreground/65">{d}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>

        {/* Vertical on mobile */}
        <div className="relative mt-16 ml-3 lg:hidden">
          <span className="absolute top-0 left-0 h-full w-px bg-foreground/10" />
          <motion.span
            className="absolute top-0 left-0 h-full w-px origin-top bg-gold"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 2, ease: EASE }}
          />
          <ol className="space-y-14">
            {STEPS.map(([t, d], i) => (
              <motion.li
                key={t}
                className="relative pl-10"
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{ duration: 0.8, ease: EASE }}
              >
                <span className="absolute top-2 -left-[5px] h-[11px] w-[11px] rotate-45 border border-gold bg-espresso" />
                <p className="font-display text-lg text-gold">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-1 font-display text-3xl tracking-wide uppercase">{t}</h3>
                <p className="mt-3 max-w-md text-sm text-foreground/70">{d}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
