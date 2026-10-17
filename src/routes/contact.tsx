import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ContactForm } from "@/components/ContactForm";
import { EASE, GoldLine, Reveal } from "@/components/ui-kit";
import { CONTACT } from "@/lib/contact-details";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Start Your Jewellery Project | SAAVY CO." },
      { name: "description", content: "Tell SAAVY CO. about your jewellery idea, design requirements or manufacturing project." },
      { property: "og:title", content: "Contact SAAVY CO." },
      { property: "og:description", content: "Start your jewellery CAD, rendering or manufacturing project." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <section className="mx-auto grid max-w-[1440px] gap-20 px-6 pt-40 pb-32 md:px-10 lg:grid-cols-12 lg:pt-52">
      <div className="lg:col-span-5">
        <motion.p className="eyebrow mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Contact</motion.p>
        <motion.h1 className="font-display text-5xl leading-[0.95] font-light md:text-7xl" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: EASE }}>
          Let's start something <em className="text-gold-gradient">exceptional.</em>
        </motion.h1>
        <Reveal delay={0.2}><p className="mt-8 max-w-sm text-foreground/70">Tell us about your jewellery idea, design requirements or manufacturing project.</p></Reveal>
        <GoldLine className="mt-14 w-24" />
        <dl className="mt-10 space-y-6 text-sm">
          <div><dt className="text-[0.65rem] tracking-[0.25em] uppercase text-foreground/50">Email</dt><dd className="mt-1">{CONTACT.email}</dd></div>
          <div><dt className="text-[0.65rem] tracking-[0.25em] uppercase text-foreground/50">Phone</dt><dd className="mt-1">{CONTACT.phone}</dd></div>
          <div><dt className="text-[0.65rem] tracking-[0.25em] uppercase text-foreground/50">Studio</dt><dd className="mt-1">{CONTACT.location}</dd></div>
        </dl>
      </div>
      <Reveal delay={0.15} className="lg:col-span-7"><ContactForm /></Reveal>
    </section>
  );
}
