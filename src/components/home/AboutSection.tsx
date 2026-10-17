import about from "@/assets/about-studio.jpg";
import { CtaLink, GoldLine, ImageReveal, Reveal, SectionHeading } from "@/components/ui-kit";

const PILLARS = ["Design thinking", "CAD precision", "Craftsmanship", "Manufacturing expertise"];

export function AboutSection() {
  return (
    <section className="mx-auto grid max-w-[1440px] gap-16 px-6 py-32 md:px-10 lg:grid-cols-12 lg:py-44">
      <ImageReveal src={about} alt="A jewellery designer sketching a ring beside loose diamonds" width={1024} height={1280} className="aspect-[4/5] lg:col-span-5" />
      <div className="flex flex-col justify-center lg:col-span-6 lg:col-start-7">
        <SectionHeading eyebrow="About SAAVY CO." title={<>More than manufacturing. <em className="text-gold-gradient">A creative partner.</em></>} />
        <Reveal delay={0.2}>
          <p className="mt-10 max-w-xl text-base leading-relaxed text-foreground/75">
            SAAVY CO. works alongside jewellery brands, designers and manufacturers to take ideas from the first sketch to a finished piece.
            We combine design thinking with CAD precision, then carry the work through rendering, prototyping and manufacturing — one partner for the whole journey.
          </p>
        </Reveal>
        <ul className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6">
          {PILLARS.map((p, i) => (
            <Reveal key={p} delay={0.1 * i}>
              <li>
                <GoldLine className="mb-3 w-12" />
                <span className="text-xs tracking-[0.22em] uppercase text-foreground/80">{p}</span>
              </li>
            </Reveal>
          ))}
        </ul>
        <Reveal delay={0.3} className="mt-12">
          <CtaLink to="/services" variant="ghost">Our services</CtaLink>
        </Reveal>
      </div>
    </section>
  );
}
