import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import solitaire from "@/assets/gold-solitaire.jpg";
import pave from "@/assets/silver-pave.jpg";
import earrings from "@/assets/earrings-render.jpg";
import studs from "@/assets/halo-studs.jpg";
import cad from "@/assets/cad-wireframe.jpg";
import necklace from "@/assets/necklace.jpg";
import proto from "@/assets/prototype.jpg";
import { EASE, Reveal } from "@/components/ui-kit";
import { FinalCta } from "@/components/FinalCta";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Our Projects — Jewellery Portfolio | SAAVY CO." },
      { name: "description", content: "A portfolio of rings, earrings, jewellery CAD, 3D renders and finished jewellery by SAAVY CO." },
      { property: "og:title", content: "Our Projects | SAAVY CO." },
      { property: "og:description", content: "Explore jewellery CAD, renders and finished pieces." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Projects,
});

const CATS = ["All", "Rings", "Earrings", "Jewellery CAD", "3D Renders", "Finished Jewellery"] as const;
type Cat = (typeof CATS)[number];

// SAMPLE WORK — demonstration entries until real projects are supplied.
const PROJECTS: { id: string; name: string; cats: Cat[]; img: string; material: string; scope: string; span: string }[] = [
  { id: "oval", name: "Oval Solitaire Study", cats: ["Rings", "3D Renders"], img: solitaire, material: "Gold • Lab-grown diamond", scope: "CAD design and photorealistic rendering", span: "md:col-span-7 md:row-span-2 aspect-[4/5] md:aspect-auto" },
  { id: "pear", name: "Pear Cascade Earrings", cats: ["Earrings", "3D Renders"], img: earrings, material: "Gold • CZ", scope: "Rendering for design approval", span: "md:col-span-5 aspect-square" },
  { id: "cad", name: "Solitaire Technical Views", cats: ["Jewellery CAD", "Rings"], img: cad, material: "CAD model", scope: "Production-ready modelling with orthographic views", span: "md:col-span-5 aspect-square" },
  { id: "pave", name: "Pavé Band Solitaire", cats: ["Rings", "Finished Jewellery"], img: pave, material: "925 Silver • CZ", scope: "Manufacturing and finishing", span: "md:col-span-4 aspect-[3/4]" },
  { id: "tennis", name: "Tennis Necklace", cats: ["Finished Jewellery"], img: necklace, material: "Gold • Lab-grown diamonds", scope: "Manufacturing and quality control", span: "md:col-span-8 aspect-[16/10]" },
  { id: "halo", name: "Halo Stud Pair", cats: ["Earrings", "Finished Jewellery"], img: studs, material: "Gold • CZ", scope: "CAD, prototyping and manufacturing", span: "md:col-span-6 aspect-[4/3]" },
  { id: "wax", name: "Ring Prototype Tree", cats: ["Jewellery CAD"], img: proto, material: "Wax prototypes", scope: "Prototyping ahead of casting", span: "md:col-span-6 aspect-[4/3]" },
];

function Projects() {
  const [cat, setCat] = useState<Cat>("All");
  const [open, setOpen] = useState<string | null>(null);
  const list = PROJECTS.filter((p) => cat === "All" || p.cats.includes(cat));
  const active = PROJECTS.find((p) => p.id === open);

  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <section className="mx-auto max-w-[1440px] px-6 pt-40 pb-12 md:px-10 lg:pt-52">
        <motion.p className="eyebrow mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Our projects</motion.p>
        <motion.h1 className="font-display text-6xl leading-[0.92] font-light md:text-8xl lg:text-[9rem]" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: EASE }}>
          Selected <em className="text-gold-gradient">work.</em>
        </motion.h1>
        <p className="mt-8 inline-block border border-gold/40 px-4 py-2 text-[0.65rem] tracking-[0.25em] uppercase text-gold">Sample work — demonstration content</p>
        <div className="mt-14 flex flex-wrap gap-3" role="tablist" aria-label="Filter projects">
          {CATS.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={cat === c}
              onClick={() => setCat(c)}
              className={cn("min-h-11 border px-5 text-[0.65rem] tracking-[0.25em] uppercase transition-colors duration-500", cat === c ? "border-gold bg-gold text-primary-foreground" : "border-border text-foreground/70 hover:border-gold hover:text-gold")}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 pb-32 md:px-10">
        <motion.div layout className="grid gap-6 md:grid-cols-12">
          <AnimatePresence mode="popLayout">
            {list.map((p) => (
              <motion.button
                layout
                key={p.id}
                onClick={() => setOpen(p.id)}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.8, ease: EASE }}
                className={cn("group relative overflow-hidden text-left", cat === "All" ? p.span : "md:col-span-6 aspect-[4/3]")}
                aria-label={`View ${p.name}`}
              >
                <motion.img layoutId={`img-${p.id}`} src={p.img} alt={p.name} loading="lazy" width={1024} height={1024} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <p className="eyebrow mb-2">{p.cats.join(" • ")}</p>
                  <h2 className="font-display text-3xl font-light md:text-4xl">{p.name}</h2>
                  <span className="mt-4 block h-px w-0 bg-gold transition-all duration-700 group-hover:w-24" />
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <AnimatePresence>
        {active && (
          <motion.div className="fixed inset-0 z-[60] flex items-center justify-center bg-background/90 p-4 backdrop-blur-md md:p-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)} role="dialog" aria-modal="true" aria-label={active.name}>
            <motion.div className="relative grid max-h-full w-full max-w-6xl overflow-auto border border-border bg-espresso md:grid-cols-2" onClick={(e) => e.stopPropagation()} initial={{ y: 30 }} animate={{ y: 0 }} exit={{ y: 30 }} transition={{ duration: 0.6, ease: EASE }}>
              <motion.img layoutId={`img-${active.id}`} src={active.img} alt={active.name} className="aspect-square h-full w-full object-cover" />
              <div className="flex flex-col justify-center p-8 md:p-14">
                <p className="eyebrow mb-4">Sample project</p>
                <h2 className="font-display text-4xl font-light md:text-5xl">{active.name}</h2>
                <dl className="mt-10 space-y-6 text-sm">
                  <div><dt className="text-[0.65rem] tracking-[0.25em] uppercase text-foreground/50">Category</dt><dd className="mt-1">{active.cats.join(", ")}</dd></div>
                  <div><dt className="text-[0.65rem] tracking-[0.25em] uppercase text-foreground/50">Material</dt><dd className="mt-1">{active.material}</dd></div>
                  <div><dt className="text-[0.65rem] tracking-[0.25em] uppercase text-foreground/50">Scope</dt><dd className="mt-1">{active.scope}</dd></div>
                </dl>
                <p className="mt-10 text-xs text-foreground/50">Demonstration content — to be replaced with real project details.</p>
              </div>
              <button onClick={() => setOpen(null)} className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center bg-background/70 text-foreground hover:text-gold" aria-label="Close project">
                <X className="h-5 w-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Reveal><FinalCta title={<>Have a project in mind?<br /><em className="text-gold-gradient">Let's create it together.</em></>} text="Share your concept and we'll shape the path from CAD to finished jewellery." /></Reveal>
    </>
  );
}
