import { createFileRoute } from "@tanstack/react-router";
import { HeroVideo } from "@/components/home/HeroVideo";
import { EditorialIntro } from "@/components/home/EditorialIntro";
import { StoryShowcase } from "@/components/home/StoryShowcase";
import { ExpertiseSection } from "@/components/home/ExpertiseSection";
import { RingShowcase } from "@/components/home/RingShowcase";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { FinalCta } from "@/components/FinalCta";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SAAVY CO. — From Your Idea to Finished Jewellery" },
      { name: "description", content: "Global jewellery design, CAD and manufacturing partner. From the first creative idea to precision CAD and finished jewellery." },
      { property: "og:title", content: "SAAVY CO. — From Your Idea to Finished Jewellery" },
      { property: "og:description", content: "Jewellery CAD, rendering, prototyping and manufacturing for brands and designers worldwide." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <HeroVideo />
      <EditorialIntro />
      <StoryShowcase />
      <ExpertiseSection />
      <RingShowcase />
      <ProcessTimeline />
      <FinalCta title={<>Have an idea <em className="text-gold-gradient">worth creating?</em></>} text="Let's transform your jewellery concept into something exceptional." ctaLabel="Let's start your project" />
    </>
  );
}
