import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

type CtaProps = { to: "/" | "/services" | "/projects" | "/contact"; children: ReactNode; variant?: "solid" | "ghost"; className?: string };

export function CtaLink({ to, children, variant = "solid", className }: CtaProps) {
  return (
    <Link
      to={to}
      className={cn(
        "group relative inline-flex min-h-12 items-center gap-3 overflow-hidden px-7 text-[0.7rem] font-semibold tracking-[0.28em] uppercase transition-colors duration-500",
        variant === "solid"
          ? "bg-primary text-primary-foreground hover:bg-ivory"
          : "border border-foreground/30 text-foreground hover:border-gold hover:text-gold",
        className,
      )}
    >
      <span>{children}</span>
      <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

export function ImageReveal({ src, alt, className, width = 1024, height = 1024 }: { src: string; alt: string; className?: string; width?: number; height?: number }) {
  return (
    <motion.div
      className={cn("relative overflow-hidden", className)}
      initial={{ clipPath: "inset(100% 0 0 0)" }}
      whileInView={{ clipPath: "inset(0% 0 0 0)" }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.4, ease: EASE }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        width={width}
        height={height}
        className="h-full w-full object-cover"
        initial={{ scale: 1.2 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: EASE }}
      />
    </motion.div>
  );
}

export function GoldLine({ className }: { className?: string }) {
  return (
    <motion.span
      aria-hidden
      className={cn("block h-px origin-left bg-gold/60", className)}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.6, ease: EASE }}
    />
  );
}

export function SectionHeading({ eyebrow, title, className }: { eyebrow?: string; title: ReactNode; className?: string }) {
  return (
    <div className={className}>
      {eyebrow && <Reveal><p className="eyebrow mb-6">{eyebrow}</p></Reveal>}
      <Reveal delay={0.1}>
        <h2 className="font-display text-4xl leading-[1.02] font-light tracking-tight md:text-6xl lg:text-7xl">{title}</h2>
      </Reveal>
    </div>
  );
}

export { EASE };
