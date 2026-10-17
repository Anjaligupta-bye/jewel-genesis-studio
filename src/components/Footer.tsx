import { Link } from "@tanstack/react-router";
import { NAV } from "./Navbar";
import { CONTACT } from "@/lib/contact-details";

export function Footer() {
  return (
    <footer className="border-t border-border bg-charcoal">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-6 py-20 md:grid-cols-3 md:px-10">
        <div>
          <p className="font-display text-3xl tracking-[0.25em]">SAAVY<span className="text-gold"> CO.</span></p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Global Jewellery Design • CAD • Manufacturing. Designed in India. Built for the World.
          </p>
        </div>
        <ul className="space-y-3">
          {NAV.map((n) => (
            <li key={n.to}>
              <Link to={n.to} className="text-xs tracking-[0.28em] uppercase text-foreground/70 transition-colors hover:text-gold">{n.label}</Link>
            </li>
          ))}
        </ul>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p className="eyebrow mb-4">Contact</p>
          <p>{CONTACT.email}</p>
          <p>{CONTACT.phone}</p>
          <p>{CONTACT.location}</p>
        </div>
      </div>
      <div className="border-t border-border px-6 py-6 text-center text-[0.65rem] tracking-[0.25em] uppercase text-muted-foreground md:px-10">
        © {new Date().getFullYear()} SAAVY CO. All rights reserved.
      </div>
    </footer>
  );
}
