import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import cad from "@/assets/cad-wireframe.jpg";
import render from "@/assets/earrings-render.jpg";
import proto from "@/assets/prototype.jpg";
import manu from "@/assets/manufacturing.jpg";
import qc from "@/assets/qc.jpg";
import { CtaLink, EASE, GoldLine, Reveal } from "@/components/ui-kit";
import { FinalCta } from "@/components/FinalCta";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Jewellery CAD, Rendering & Manufacturing | SAAVY CO." },
      { name: "description", content: "Jewellery CAD design, 3D rendering, prototyping, manufacturing and quality control from SAAVY CO." },
      { property: "og:title", content: "Services | SAAVY CO." },
      { property: "og:description", content: "From CAD to quality control — jewellery product development services." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Services,
});

const SERVICES = [
  { t: "Jewellery CAD Design", d: "Precise 3D jewellery modelling for production-ready designs.", img: cad, alt: "CAD wireframe views of a solitaire ring" },
  { t: "3D Rendering & Visualisation", d: "High-quality jewellery renders for design approval and presentations.", img: render, alt: "Rendered gold drop earrings with pear-cut stones" },
  { t: "Prototyping", d: "Turning approved digital designs into physical prototypes.", img: proto, alt: "Wax ring prototypes on a casting tree" },
  { t: "Jewellery Manufacturing", d: "Manufacturing support for agreed designs, materials and specifications.", img: manu, alt: "Goldsmith polishing a gold ring" },
  { t: "Quality Control & Dispatch", d: "Inspection and preparation for final delivery.", img: qc, alt: "Jeweller inspecting a ring through a loupe" },
];

function ServiceRow({ s, i }: { s: (typeof SERVICES)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <Reveal>
      <article tabIndex={0} className="group grid gap-8 border-t border-border py-12 outline-none md:grid-cols-12 md:items-center md:py-16 focus-visible:bg-charcoal">
        <p className="font-display text-2xl text-gold md:col-span-1">{String(i + 1).padStart(2, "0")}</p>
        <div className="md:col-span-6">
          <h2 className="font-display text-4xl leading-none font-light uppercase transition-colors duration-500 group-hover:text-gold md:text-6xl">{s.t}</h2>
          <span className="mt-6 block h-px w-0 bg-gold transition-all duration-700 group-hover:w-32 group-focus:w-32" />
          <p className="mt-6 max-w-md text-foreground/70">{s.d}</p>
        </div>
        <div ref={ref} className="relative aspect-[4/3] overflow-hidden md:col-span-4 md:col-start-9 md:[clip-path:inset(0_0_100%_0)] md:transition-[clip-path] md:duration-[900ms] md:ease-[cubic-bezier(0.22,1,0.36,1)] md:group-hover:[clip-path:inset(0_0_0%_0)] md:group-focus:[clip-path:inset(0_0_0%_0)]">
          <motion.img style={{ y }} src={s.img} alt={s.alt} loading="lazy" width={1024} height={1024} className="h-[116%] w-full object-cover" />
        </div>
      </article>
    </Reveal>
  );
}

function Services() {
  return (
    <>
      <section className="mx-auto max-w-[1440px] px-6 pt-40 pb-20 md:px-10 lg:pt-52">
        <motion.p className="eyebrow mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>Services</motion.p>
        <motion.h1
          className="font-display text-6xl leading-[0.92] font-light md:text-8xl lg:text-[9rem]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: EASE }}
        >
          Every stage,<br /><em className="text-gold-gradient">one partner.</em>
        </motion.h1>
        <Reveal delay={0.2}><p className="mt-10 max-w-xl text-foreground/70">From the first CAD model to the final quality check, we carry your jewellery concept through each step of product development.</p></Reveal>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 pb-24 md:px-10">
        {SERVICES.map((s, i) => <ServiceRow key={s.t} s={s} i={i} />)}
        <GoldLine />
      </section>

      <section className="mx-auto grid max-w-[1440px] gap-12 px-6 pb-32 md:grid-cols-2 md:px-10">
        <Reveal className="border border-border p-10">
          <p className="eyebrow mb-6">Materials</p>
          <p className="font-display text-3xl font-light md:text-4xl">925 Silver • CZ • Lab-grown Diamonds • Gold</p>
          <p className="mt-6 text-sm text-foreground/60">Material availability is confirmed per project.</p>
        </Reveal>
        <Reveal delay={0.1} className="border border-border p-10">
          <p className="eyebrow mb-6">Design capabilities</p>
          <p className="font-display text-3xl font-light md:text-4xl">Rhino • Matrix • JewelCAD • DesignGold • ZBrush</p>
          <p className="mt-6 text-sm text-foreground/60">Tooling is matched to each brief — ask us which suits your project.</p>
        </Reveal>
        <div className="md:col-span-2"><CtaLink to="/contact">Enquire about a service</CtaLink></div>
      </section>

      <FinalCta title={<>Have a project <em className="text-gold-gradient">in mind?</em></>} text="Tell us what you're creating and which stages you need support with." />
    </>
  );
}
