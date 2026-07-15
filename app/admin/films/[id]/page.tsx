import { client } from "@/lib/sanity/client";
import { writeClient } from "@/lib/sanity/writeClient";
import FilmEditorClient from "./FilmEditorClient";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export default async function AdminFilmPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (id === "new") {
    return <FilmEditorClient id={id} />;
  }

  // Fetch existing film using writeClient so we can read drafts
  let film = await writeClient
    .fetch(
      `*[_type == "film" && _id == $id][0]{
        title, genre, year, category, ottPlatform, releaseType, order, "hasPoster": defined(poster), "posterUrl": poster.asset->url
      }`,
      { id }
    )
    .catch((err) => {
      console.error("SANITY WRITE CLIENT FETCH ERROR:", err.message);
      return null;
    });

  // Fallback to public client if writeClient fails (e.g. invalid token)
  if (!film) {
    film = await client
      .fetch(
        `*[_type == "film" && (_id == $id || _id == "drafts." + $id)][0]{
          title, genre, year, category, ottPlatform, releaseType, order, "hasPoster": defined(poster), "posterUrl": poster.asset->url
        }`,
        { id }
      )
      .catch((err) => {
        console.error("SANITY PUBLIC CLIENT FETCH ERROR:", err.message);
        return null; // Return null if totally failed
      });
  }

  return <FilmEditorClient key={id} id={id} initialData={film} />;
}
