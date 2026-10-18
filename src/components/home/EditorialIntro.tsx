import about from "@/assets/about-studio.jpg";
import { CtaLink, ImageReveal, Reveal, SectionHeading } from "@/components/ui-kit";

export function EditorialIntro() {
  return (
    <section id="intro" className="section-light">
      <div className="mx-auto grid max-w-[1440px] gap-16 px-6 py-28 md:px-10 lg:grid-cols-12 lg:py-40">
        <div className="flex flex-col justify-center lg:col-span-6 lg:pr-10">
          <SectionHeading eyebrow="The studio" title={<>Designed with intention.<br /><em className="text-bronze not-italic font-light italic">Crafted with precision.</em></>} />
          <Reveal delay={0.2}>
            <p className="mt-10 max-w-xl text-base leading-relaxed text-foreground/70">
              SAAVY CO. works alongside jewellery brands, designers and manufacturers to take ideas from the first sketch to a finished piece.
              We combine design thinking with CAD precision, then carry the work through rendering, prototyping and manufacturing — one partner for the whole journey.
            </p>
          </Reveal>
          <Reveal delay={0.3} className="mt-12">
            <CtaLink to="/services" variant="ghost">Our services</CtaLink>
          </Reveal>
        </div>
        <ImageReveal src={about} alt="A jewellery designer sketching a ring beside loose diamonds" width={1024} height={1280} className="aspect-[4/5] lg:col-span-5 lg:col-start-8" />
      </div>
    </section>
  );
}
