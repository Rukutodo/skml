import { writeClient } from "@/lib/sanity/writeClient";
import FilmsListClient from "./FilmsListClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export default async function AdminFilmsPage() {
  const films = await writeClient.fetch(
    `*[_type == "film"] | order(order asc) {
      _id,
      title,
      slug,
      genre,
      year,
      category,
      ottPlatform,
      releaseType,
      order
    }`
  ).catch(() => []);
  
  return <FilmsListClient films={films} />;
}
