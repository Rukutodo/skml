import { writeClient } from "@/lib/sanity/writeClient";
import ProducerEditorClient from "./ProducerEditorClient";

export const dynamic = "force-dynamic";

const DEFAULTS = {
  firstName: "Kandregula",
  lastName: "Adhinarayana",
  role: "Founder & Producer",
  bio: [
    "With a deep passion for cinema and a visionary approach to filmmaking, Kandregula Adhinarayana founded SKML Motion Pictures in 2018.",
    "Under his leadership, SKML has produced over 6 feature films and successfully navigated OTT distribution across major platforms.",
  ],
  quote: "Every story deserves its screen.",
};

export default async function AdminProducerPage() {
  const data = await writeClient.fetch(
    `*[_type == "producer" && _id == "founderSettings"][0]{
      firstName, lastName, role, bio, quote,
      "hasPortrait": defined(portrait),
      "portraitUrl": portrait.asset->url
    }`
  ).catch(() => null);

  return (
    <ProducerEditorClient
      initialData={{
        firstName: data?.firstName || DEFAULTS.firstName,
        lastName: data?.lastName || DEFAULTS.lastName,
        role: data?.role || DEFAULTS.role,
        bio: data?.bio || DEFAULTS.bio,
        quote: data?.quote || DEFAULTS.quote,
        hasPortrait: data?.hasPortrait || false,
        portraitUrl: data?.portraitUrl || "",
      }}
    />
  );
}
