import cad from "@/assets/cad-wireframe.jpg";
import render from "@/assets/earrings-render.jpg";
import proto from "@/assets/prototype.jpg";
import manu from "@/assets/manufacturing.jpg";
import { CtaLink, Reveal, SectionHeading } from "@/components/ui-kit";

const ITEMS = [
  { t: "Jewellery CAD Design", d: "Precise 3D modelling for production-ready designs.", img: cad, alt: "CAD wireframe views of a solitaire ring" },
  { t: "3D Rendering", d: "Photorealistic visuals for design approval and presentation.", img: render, alt: "Rendered gold drop earrings with pear-cut stones" },
  { t: "Prototyping", d: "Approved digital designs turned into physical prototypes.", img: proto, alt: "Wax ring prototypes on a casting tree" },
  { t: "Manufacturing", d: "Production in the agreed material and specifications.", img: manu, alt: "Goldsmith polishing a gold ring" },
];

export function ExpertiseSection() {
  return (
    <section className="section-light">
      <div className="mx-auto max-w-[1440px] px-6 py-28 md:px-10 lg:py-40">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading eyebrow="Our expertise" title={<>Four crafts, <em className="text-bronze italic">one journey.</em></>} className="max-w-2xl" />
          <Reveal delay={0.2}><CtaLink to="/services" variant="ghost">All services</CtaLink></Reveal>
        </div>
        <div className="mt-16 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((s, i) => (
            <Reveal key={s.t} delay={0.08 * i} className="group bg-ivory">
              <article className="flex h-full flex-col">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img src={s.img} alt={s.alt} loading="lazy" width={1024} height={1024} className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105" />
                  <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-700 group-hover:scale-x-100" />
                </div>
                <div className="p-6">
                  <p className="font-display text-lg text-bronze">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-1 font-display text-2xl font-light">{s.t}</h3>
                  <p className="mt-2 text-sm text-foreground/65">{s.d}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
