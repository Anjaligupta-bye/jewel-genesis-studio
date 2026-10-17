import { Link, useLocation } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Our Projects" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setOpen(false), [pathname]);

  const solid = scrolled || pathname !== "/" || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-700",
        solid ? "border-b border-border bg-background/90 backdrop-blur-md" : "border-b border-transparent bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 md:px-10">
        <Link to="/" className="font-display text-2xl tracking-[0.25em] text-foreground" aria-label="SAAVY CO. home">
          SAAVY<span className="text-gold"> CO.</span>
        </Link>
        <ul className="hidden items-center gap-10 lg:flex">
          {NAV.map((n) => (
            <li key={n.to}>
              <Link
                to={n.to}
                activeOptions={{ exact: true }}
                className="group relative py-2 text-[0.68rem] font-medium tracking-[0.28em] uppercase text-foreground/75 transition-colors hover:text-foreground data-[status=active]:text-gold"
              >
                {n.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100 group-data-[status=active]:scale-x-100" />
              </Link>
            </li>
          ))}
        </ul>
        <Link
          to="/contact"
          className="hidden min-h-11 items-center border border-gold/60 px-5 text-[0.65rem] font-semibold tracking-[0.28em] uppercase text-gold transition-colors duration-500 hover:bg-gold hover:text-primary-foreground lg:inline-flex"
        >
          Start your project
        </Link>
        <button
          className="flex h-11 w-11 items-center justify-center text-foreground lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border bg-background lg:hidden"
          >
            <ul className="flex flex-col px-6 py-6">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} activeOptions={{ exact: true }} className="block py-4 font-display text-3xl text-foreground data-[status=active]:text-gold">
                    {n.label}
                  </Link>
                </li>
              ))}
              <li className="pt-4">
                <Link to="/contact" className="inline-flex min-h-12 items-center bg-primary px-6 text-[0.7rem] font-semibold tracking-[0.28em] uppercase text-primary-foreground">
                  Start your project
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
