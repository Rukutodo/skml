import { getAbout } from "@/lib/sanity/queries";
import AboutEditorClient from "./AboutEditorClient";

const DEFAULTS = {
  headline: "Crafting Stories",
  headlineAccent: "That Resonate",
  description: [
    "SKML Motion Pictures is a dynamic film production and distribution company dedicated to producing compelling, high-quality cinema.",
    "From script to screen, our mission is to bring untold stories to audiences worldwide.",
  ],
  ctaText: "View Our Films",
  stats: [
    { value: "6+", label: "Films Produced" },
    { value: "50M+", label: "Audience Reached" },
    { value: "3", label: "OTT Platforms" },
    { value: "2018", label: "Established" },
  ],
};

export default async function AdminAboutPage() {
  const data = await getAbout().catch(() => null);

  return (
    <AboutEditorClient
      initialData={{
        headline: data?.headline || DEFAULTS.headline,
        headlineAccent: data?.headlineAccent || DEFAULTS.headlineAccent,
        description: data?.description || DEFAULTS.description,
        ctaText: data?.ctaText || DEFAULTS.ctaText,
        stats: data?.stats || DEFAULTS.stats,
      }}
    />
  );
}
