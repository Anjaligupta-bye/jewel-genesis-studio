import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import cadImg from "@/assets/cad-wireframe.jpg";
import { SectionHeading } from "@/components/ui-kit";

const JewelleryScene = lazy(() => import("./JewelleryScene"));

function webglAvailable() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch { return false; }
}

/** The site's single WebGL canvas: lazy-loaded, mounted only when near, paused offscreen. */
export function RingShowcase() {
  const section = useRef<HTMLElement>(null);
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<"pending" | "3d" | "fallback">("pending");
  const reduce = useReducedMotion();

  useEffect(() => {
    setMode(webglAvailable() ? "3d" : "fallback");
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e) return;
        setVisible(e.isIntersecting);
        if (e.isIntersecting) setNear(true);
      },
      { rootMargin: "400px" },
    );
    if (section.current) io.observe(section.current);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={section} className="relative overflow-hidden bg-obsidian" aria-label="Interactive ring viewer">
      <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-6 py-28 md:px-10 lg:grid-cols-12 lg:py-40">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow="In three dimensions" title={<>Turn it over. <em className="text-gold-gradient">Look closer.</em></>} />
          <p className="mt-8 max-w-md text-foreground/70">
            An interactive study of a solitaire ring — the same care we give every CAD model. Drag to rotate.
          </p>
        </div>
        <div className="relative aspect-square cursor-grab active:cursor-grabbing lg:col-span-6 lg:col-start-7">
          {mode === "3d" && near && !reduce ? (
            <Suspense fallback={<div className="h-full w-full bg-obsidian" />}>
              <JewelleryScene running={visible} />
            </Suspense>
          ) : mode !== "pending" ? (
            <img src={cadImg} alt="CAD wireframe of a solitaire ring" loading="lazy" width={1024} height={1024} className="h-full w-full object-contain opacity-70" />
          ) : null}
        </div>
      </div>
    </section>
  );
}
